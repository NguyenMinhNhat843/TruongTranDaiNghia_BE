import { UserRole } from "@prisma/client";

export interface CreateUserDTO {
  username: string;
  password: string;
  email?: string;
  role?: UserRole;
}

export interface UpdateUserDTO {
  username?: string;
  password?: string;
  email?: string;
  role?: UserRole;
  isActive?: boolean;
}

export interface QueryUserDTO {
  email?: string;
  role?: UserRole;
  isActive?: boolean;
  username?: string;

  page?: number;
  limit?: number;
}
