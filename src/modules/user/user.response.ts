// src/responses/user.response.ts
import { UserRole } from "@prisma/client";

export interface UserResponse {
  id: number;
  username: string;
  email?: string | null;
  role: UserRole;
  isActive: boolean;

  createdAt: Date;
  updatedAt: Date;
}
