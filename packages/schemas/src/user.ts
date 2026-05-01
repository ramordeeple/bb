import {Type, type Static} from "@sinclair/typebox";

const MIN_NAME_LENGTH: number = 4;
const MAX_NAME_LENGTH: number = 20;
const MIN_PASSWORD_LENGTH: number = 8;

export const UserSchema = Type.Object({
  id: Type.String({format: "uuid"}),
  email: Type.String({format: "email"}),
  name: Type.String({minLength: MIN_NAME_LENGTH, maxLength: MAX_NAME_LENGTH}),
  createdAt: Type.String({format: "date-time"}),
});

export const CreateUserSchema = Type.Object({
  email: Type.String({format: "email"}),
  name: Type.String({minLength: MIN_NAME_LENGTH, maxLength: MAX_NAME_LENGTH}),
  password: Type.String({minLength: MIN_PASSWORD_LENGTH}),
});

export type User = Static<typeof UserSchema>;
export type CreateUser = Static<typeof CreateUserSchema>;