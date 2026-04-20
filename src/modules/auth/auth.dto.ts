// src/models/auth.model.ts

import type { Student, User } from "@prisma/client";

type UserAuthFields = Pick<
  User,
  | "username"
  | "password"
  | "email"
  | "role"
  | "gender"
  | "address"
  | "phone"
  | "birthday"
  | "fullName"
>;

export interface RegisterRequest extends UserAuthFields {
  // Nếu có field nào đặc thù không nằm trong DB thì thêm ở đây
  confirmPassword?: string;
}
