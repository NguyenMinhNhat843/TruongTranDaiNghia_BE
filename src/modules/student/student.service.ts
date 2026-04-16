// src/services/student.service.ts

import prisma from "../../lib/prisma.js";
import type {
  CreateStudentDTO,
  QueryStudentDTO,
  UpdateStudentDTO,
} from "./student.dto.js";

export class StudentService {
  async create(data: CreateStudentDTO) {
    return prisma.student.create({
      data,
      include: {
        user: true,
        major: true,
        class: true,
      },
    });
  }

  async findAll() {
    return prisma.student.findMany({
      include: {
        user: true,
        major: true,
        class: true,
      },
      orderBy: { createdAt: "desc" },
    });
  }

  async searchStudent(query: QueryStudentDTO) {
    const {
      keyword,
      status,
      majorId,
      classId,
      isHasAccount,
      page = 1,
      limit = 10,
    } = query;

    const where: any = {
      AND: [],
    };

    // 🔹 keyword search (OR)
    if (keyword) {
      where.AND.push({
        OR: [
          {
            fullName: {
              contains: keyword,
              mode: "insensitive",
            },
          },
          {
            studentCode: {
              contains: keyword,
              mode: "insensitive",
            },
          },
          {
            email: {
              contains: keyword,
              mode: "insensitive",
            },
          },
          {
            phone: {
              contains: keyword,
            },
          },
        ],
      });
    }

    // 🔹 filter riêng lẻ (AND)
    if (status) {
      where.AND.push({ status });
    }

    if (majorId) {
      where.AND.push({ majorId });
    }

    if (classId) {
      where.AND.push({ classId });
    }

    // 🔹 có account hay chưa
    if (isHasAccount !== undefined) {
      where.AND.push({
        userId: isHasAccount ? { not: null } : null,
      });
    }

    // nếu không có điều kiện nào → tránh AND rỗng
    if (where.AND.length === 0) {
      delete where.AND;
    }

    const skip = (page - 1) * limit;

    const [data, total] = await Promise.all([
      prisma.student.findMany({
        where,
        skip,
        take: limit,
        include: {
          user: true,
          major: true,
          class: true,
        },
        orderBy: { createdAt: "desc" },
      }),
      prisma.student.count({ where }),
    ]);

    return {
      data,
      total,
      page,
      limit,
    };
  }

  async findById(id: number) {
    const student = await prisma.student.findUnique({
      where: { id },
      include: {
        user: true,
        major: true,
        class: true,
        grades: true,
        gradResults: true,
      },
    });

    if (!student) throw new Error("Student not found");

    return student;
  }

  async update(id: number, data: UpdateStudentDTO) {
    await this.findById(id);

    return prisma.student.update({
      where: { id },
      data,
      include: {
        user: true,
        major: true,
        class: true,
      },
    });
  }

  async delete(id: number) {
    await this.findById(id);

    return prisma.student.delete({
      where: { id },
    });
  }
}
