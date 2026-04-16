import { Router } from "express";
import {
  CreateDepartmentSchema,
  DepartmentSchema,
  registry,
} from "../../config/openapi-registry.js";
import * as controller from "./department.controller.js";

const router = Router();

registry.registerPath({
  method: "get",
  path: "/departments",
  summary: "Lấy danh sách khoa",
  tags: ["Department"],
  responses: {
    200: {
      description: "Thành công",
      content: {
        "application/json": {
          schema: DepartmentSchema.array(),
        },
      },
    },
  },
});

registry.registerPath({
  method: "post",
  path: "/departments/create", // Phải khớp với cấu trúc route thực tế
  summary: "Tạo mới một khoa",
  tags: ["Department"],
  requestBody: {
    content: {
      "application/json": {
        schema: {
          type: "object",
          items: {
            $ref: "#/components/schemas/CreateDepartment",
          },
        },
      },
    },
  },
  responses: {
    201: {
      description: "Tạo thành công",
      content: { "application/json": { schema: DepartmentSchema } },
    },
    400: {
      description: "Dữ liệu không hợp lệ",
    },
  },
});

router.get("/", controller.getAllDepartments);
router.post("/create", controller.createDepartment);

export default router;
