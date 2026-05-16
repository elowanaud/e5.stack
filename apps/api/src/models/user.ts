import { withAuthFinder } from "@adonisjs/auth/mixins/lucid";
import { compose } from "@adonisjs/core/helpers";
import hash from "@adonisjs/core/services/hash";
import { hasMany } from "@adonisjs/lucid/orm";
import type { HasMany } from "@adonisjs/lucid/types/relations";
import vine from "@vinejs/vine";
import { UserSchema } from "#database/schema";
import UserToken from "#models/user_token";

const authFinder = withAuthFinder(() => hash.use("scrypt"), {
	uids: ["email"],
	passwordColumnName: "password",
});

export default class User extends compose(UserSchema, authFinder) {
	static createSchema = vine.object({
		name: vine.string().minLength(2).maxLength(255),
		email: vine.string().email().maxLength(254).unique({ table: "users", column: "email" }),
		password: vine.string().minLength(8).maxLength(32),
	});

	static updateSchema = this.createSchema.partial();

	@hasMany(() => UserToken)
	declare tokens: HasMany<typeof UserToken>;

	toJSON() {
		return {
			id: this.id,

			name: this.name,
			email: this.email,

			createdAt: this.createdAt.toJSDate(),
			updatedAt: this.updatedAt.toJSDate(),
		};
	}
}
