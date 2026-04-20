// src/responses/user.response.ts
import { UserRole, type User } from "@prisma/client";

export type UserResponse = Pick<
  User,
  | "username"
  | "email"
  | "role"
  | "isActive"
  | "createdAt"
  | "updatedAt"
  | "id"
  | "fullName"
  | "address"
  | "birthday"
  | "gender"
  | "phone"
>;
