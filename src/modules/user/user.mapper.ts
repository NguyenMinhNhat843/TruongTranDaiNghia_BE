import type { User } from "@prisma/client";
import type { UserResponse } from "./user.response.js";

export const toUserResponse = (user: User): UserResponse => {
  return {
    id: user.id,
    username: user.username,
    email: user.email,
    role: user.role,
    isActive: user.isActive,
    createdAt: user.createdAt,
    updatedAt: user.updatedAt,
  };
};
