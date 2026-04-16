import { Prisma } from "@prisma/client";
import prisma from "../../lib/prisma.js";

export class DepartmentService {
  async getAll() {
    return await prisma.department.findMany({
      include: {
        _count: { select: { majors: true } },
      },
      orderBy: { name: "asc" },
    });
  }

  async getById(id: number) {
    return await prisma.department.findUnique({
      where: { id },
      include: { majors: true }, // Lấy kèm danh sách ngành thuộc khoa
    });
  }

  async create(data: { name: string; code: string }) {
    return await prisma.department.create({ data });
  }

  async update(id: number, data: Prisma.DepartmentUpdateInput) {
    return await prisma.department.update({
      where: { id },
      data,
    });
  }

  async delete(id: number) {
    return await prisma.department.delete({
      where: { id },
    });
  }
}
