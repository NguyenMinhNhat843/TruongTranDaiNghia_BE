import {
  Controller,
  Get,
  Post,
  Body,
  Route,
  Tags,
  Path,
  SuccessResponse,
  Put,
  Delete,
} from "tsoa";
import { DepartmentService } from "./department.service.js";
import type { Department } from "@prisma/client";

// DTO cho tạo mới
interface DepartmentCreateRequest {
  name: string;
  code: string;
}

// DTO cho cập nhật (Dùng Partial để các trường là optional nếu muốn)
interface DepartmentUpdateRequest {
  name?: string;
  code?: string;
}

@Route("departments")
@Tags("Department")
export class DepartmentController extends Controller {
  private service = new DepartmentService();

  /**
   * Lấy danh sách toàn bộ khoa
   */
  @Get("/")
  public async getAll(): Promise<Department[]> {
    return await this.service.getAll();
  }

  /**
   * Lấy chi tiết một khoa theo ID
   */
  @Get("{id}")
  public async getById(@Path() id: number): Promise<Department | null> {
    const department = await this.service.getById(id);
    if (!department) {
      this.setStatus(404);
      return null;
    }
    return department;
  }

  /**
   * Tạo mới một khoa
   */
  @SuccessResponse("201", "Created")
  @Post("/create")
  public async create(
    @Body() body: DepartmentCreateRequest,
  ): Promise<Department> {
    this.setStatus(201);
    return await this.service.create(body);
  }

  /**
   * Cập nhật thông tin khoa
   */
  @Put("{id}")
  public async update(
    @Path() id: number,
    @Body() body: DepartmentUpdateRequest,
  ): Promise<Department> {
    return await this.service.update(id, body);
  }

  /**
   * Xóa một khoa khỏi hệ thống
   */
  @SuccessResponse("204", "No Content")
  @Delete("{id}")
  public async delete(@Path() id: number): Promise<void> {
    await this.service.delete(id);
    this.setStatus(204); // Trả về 204 No Content là chuẩn nhất cho lệnh xóa thành công
    return;
  }
}
