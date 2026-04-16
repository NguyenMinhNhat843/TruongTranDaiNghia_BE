import prisma from "../../lib/prisma.js";

export class DepartmentService {
  // Lấy toàn bộ danh sách khoa, kèm theo số lượng ngành trong khoa đó
  async getAllDepartments() {
    return await prisma.department.findMany({
      include: {
        _count: {
          select: { majors: true },
        },
      },
      orderBy: { name: "asc" },
    });
  }

  // Tạo mới một khoa
  async createDepartment(data: { name: string; code: string }) {
    return await prisma.department.create({
      data,
    });
  }
}
