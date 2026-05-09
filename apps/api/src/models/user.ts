import { withAuthFinder } from "@adonisjs/auth/mixins/lucid";
import { compose } from "@adonisjs/core/helpers";
import hash from "@adonisjs/core/services/hash";
import vine from "@vinejs/vine";
import { UserSchema } from "#database/schema";

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
