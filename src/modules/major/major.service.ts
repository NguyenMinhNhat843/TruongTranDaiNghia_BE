import { BaseService } from "../../common/base.service.js";
import prisma from "../../lib/prisma.js";
import type {
  CreateMajorDTO,
  QueryMajorDTO,
  UpdateMajorDTO,
} from "./major.dto.js";

export class MajorService extends BaseService<typeof prisma.major> {
  constructor() {
    super(prisma.major);
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
}
