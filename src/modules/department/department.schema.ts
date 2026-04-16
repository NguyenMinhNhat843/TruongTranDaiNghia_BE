import { z } from "zod";
import { registry } from "../../config/openapi-registry.js";

// Định nghĩa một Schema mẫu (Ví dụ cho Department)
export const DepartmentSchema = registry.register(
  "Department",
  z.object({
    id: z.number().openapi({ example: 1 }),
    name: z.string().openapi({ example: "Công nghệ thông tin" }),
    code: z.string().openapi({ example: "CNTT" }),
    createdAt: z.date(),
    updatedAt: z.date(),
  }),
);

// Schema cho việc tạo mới (không cần ID)
// Trong file openapi-registry.ts hoặc schema.ts
export const CreateDepartmentSchema = registry.register(
  "CreateDepartment", // Đặt tên cho schema này trong Swagger
  z.object({
    name: z.string().min(3).openapi({ example: "Cơ khí" }),
    code: z.string().min(2).openapi({ example: "CK" }),
  }),
);
