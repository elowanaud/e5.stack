import vine from "@vinejs/vine";

export const passwordValidator = vine.string().minLength(8).maxLength(32);
