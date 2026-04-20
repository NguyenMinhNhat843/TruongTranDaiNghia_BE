// src/services/auth.service.ts

import prisma from "../../lib/prisma.js";
import generateUniqueId from "../../utils/generateUniqueId.js";
import type { RegisterRequest } from "./auth.dto.js";
import bcrypt from "bcryptjs";

export class AuthService {
  public async register(data: RegisterRequest): Promise<any> {
    // 1. Kiểm tra email tồn tại (Prisma sẽ báo lỗi P2002 nếu không check, nhưng check thủ công để custom message)
    const existingUser = await prisma.user.findUnique({
      where: { email: String(data.email) },
    });

    if (existingUser) {
      throw new Error("Email already registered");
    }

    // 2. Hash mật khẩu
    const salt = await bcrypt.genSalt(10);
    const hashedPassword = await bcrypt.hash(data.password, salt);

    // 3. Tạo User mới trong DB
    const newUser = await prisma.user.create({
      data: {
        email: data.email || "",
        password: hashedPassword,
        role: data.role,
        username: String(data.email).split("@")[0],
        fullName: data.fullName,
        gender: data.gender,
        address: data.address,
        phone: data.phone,
        birthday: data.birthday,
        id: generateUniqueId(),
      },
    });

    return {
      user: {
        id: newUser.id,
        email: String(newUser.email),
        fullName: String(newUser.fullName) || "",
      },
    };
  }
}
