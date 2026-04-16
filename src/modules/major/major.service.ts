import prisma from "../../lib/prisma.js";
import type {
  CreateMajorDTO,
  QueryMajorDTO,
  UpdateMajorDTO,
} from "./major.dto.js";

export class MajorService {
  async create(data: CreateMajorDTO) {
    return prisma.major.create({
      data: {
        name: data.name,
        code: data.code,
        department: {
          connect: { id: data.departmentId },
        },
      },
      include: {
        department: true,
      },
    });
  }

  async findAll() {
    return prisma.major.findMany({
      include: {
        department: true,
        _count: {
          select: {
            students: true,
            classes: true,
          },
        },
      },
      orderBy: { createdAt: "desc" },
    });
  }

  async searchMajor(query: QueryMajorDTO) {
    const { keyword, departmentId, page = 1, limit = 10 } = query;

    const where: any = {
      AND: [],
    };

    // 🔹 keyword search
    if (keyword) {
      where.AND.push({
        OR: [
          {
            name: {
              contains: keyword,
              mode: "insensitive",
            },
          },
          {
            code: {
              contains: keyword,
              mode: "insensitive",
            },
          },
        ],
      });
    }

    // 🔹 filter theo department
    if (departmentId) {
      where.AND.push({ departmentId });
    }

    // nếu không có điều kiện → bỏ AND
    if (where.AND.length === 0) {
      delete where.AND;
    }

    const skip = (page - 1) * limit;

    const [data, total] = await Promise.all([
      prisma.major.findMany({
        where,
        skip,
        take: limit,
        include: {
          department: true,
          _count: {
            select: {
              students: true,
              classes: true,
            },
          },
        },
        orderBy: { createdAt: "desc" },
      }),
      prisma.major.count({ where }),
    ]);

    return {
      data,
      total,
      page,
      limit,
    };
  }

  async findById(id: number) {
    const major = await prisma.major.findUnique({
      where: { id },
      include: {
        department: true,
        students: true,
        classes: true,
      },
    });

    if (!major) throw new Error("Major not found");

    return major;
  }

  async update(id: number, data: UpdateMajorDTO) {
    await this.findById(id);

    return prisma.major.update({
      where: { id },
      data: {
        name: data.name,
        code: data.code,
        department: data.departmentId
          ? { connect: { id: data.departmentId } }
          : undefined,
      },
      include: {
        department: true,
      },
    });
  }

  async delete(id: number) {
    await this.findById(id);

    return prisma.major.delete({
      where: { id },
    });
  }
}
