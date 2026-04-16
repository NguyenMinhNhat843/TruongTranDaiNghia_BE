// src/services/user.service.ts
import { UserRole } from "@prisma/client";
import prisma from "../../lib/prisma.js";
import type { QueryUserDTO } from "./user.dto.js";

export class UserService {
  async create(data: {
    username: string;
    password: string;
    email?: string;
    role?: UserRole;
  }) {
    return prisma.user.create({
      data: {
        ...data,
      },
    });
  }

  async queryUser(query: QueryUserDTO) {
    const { email, role, isActive, username, page = 1, limit = 10 } = query;

    const where: any = {};

    if (email) {
      where.email = {
        contains: email, // search gần đúng
        mode: "insensitive", // không phân biệt hoa thường
      };
    }

    if (username) {
      where.username = {
        contains: username,
        mode: "insensitive",
      };
    }

    if (role) {
      where.role = role;
    }

    if (isActive !== undefined) {
      where.isActive = isActive;
    }

    return prisma.user.findMany({
      where,
      skip: (page - 1) * limit,
      take: limit,
      orderBy: { createdAt: "desc" },
    });
  }

  async findAll() {
    return prisma.user.findMany({
      orderBy: { createdAt: "desc" },
    });
  }

  async findById(id: number) {
    const user = await prisma.user.findUnique({
      where: { id },
    });

    if (!user) throw new Error("User not found");

    return user;
  }

  async update(
    id: number,
    data: Partial<{
      username: string;
      password: string;
      email: string;
      role: UserRole;
      isActive: boolean;
    }>,
  ) {
    await this.findById(id); // check tồn tại

    return prisma.user.update({
      where: { id },
      data,
    });
  }

  async delete(id: number) {
    await this.findById(id);

    return prisma.user.delete({
      where: { id },
    });
  }
}
