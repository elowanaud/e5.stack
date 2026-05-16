import stringHelpers from "@adonisjs/core/helpers/string";
import { DateTime } from "luxon";
import User from "#models/user";
import UserToken, { UserTokenType } from "#models/user_token";

export default class UserTokenService {
	async generate(params: GenerateDTOs["params"]) {
		const { user, type, expiresAt } = params;

		const token = stringHelpers.random(64);

		await this.revoke({ user, type });

		const record = await user.related("tokens").create({
			type,
			token,
			expiresAt,
		});

		return record.token;
	}

	async verify(params: VerifyDTOs["params"]) {
		const { token, type } = params;

		const record = await UserToken.query()
			.preload("user")
			.where("token", token)
			.where("type", type)
			.where("expires_at", ">", DateTime.now().toSQL())
			.orderBy("created_at", "desc")
			.first();

		if (!record) {
			return { valid: false } as const;
		}

		return { valid: true, user: record.user } as const;
	}

	async revoke(params: RevokeDTOs["params"]) {
		const { user, type } = params;

		await user
			.related("tokens")
			.query()
			.where("type", type)
			.update({ expiresAt: DateTime.now().toSQL() });
	}
}

type GenerateDTOs = {
	params: {
		user: User;
		type: UserTokenType;
		expiresAt?: DateTime;
	};
};

type VerifyDTOs = {
	params: {
		token: string;
		type: UserTokenType;
	};
};

type RevokeDTOs = {
	params: {
		user: User;
		type: UserTokenType;
	};
};
