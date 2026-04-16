import { type Request, type Response } from "express"; // Bắt buộc phải có dòng này
import { CreateDepartmentSchema } from "../../config/openapi-registry.js";
import prisma from "../../lib/prisma.js";

export const createDepartment = async (req: Request, res: Response) => {
  const validatedData = CreateDepartmentSchema.parse(req.body);

  const newDept = await prisma.department.create({
    data: validatedData,
  });

  // Bây giờ res.json sẽ hiểu là của Express và hết lỗi
  return res.status(200).json(newDept);
};

export const getAllDepartments = async (req: Request, res: Response) => {
  const departments = await prisma.department.findMany();
  res.json(departments);
};
