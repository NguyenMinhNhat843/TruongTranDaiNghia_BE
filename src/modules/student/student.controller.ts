import {
  Body,
  Controller,
  Get,
  Post,
  Route,
  Tags,
  Path,
  Put,
  Delete,
  Query,
} from "tsoa";
import { StudentService } from "./student.service.js";
import type { CreateStudentDTO, UpdateStudentDTO } from "./student.dto.js";
import type { StudentStatus } from "@prisma/client";
import type { StudentResponse } from "./student.response.js";
import type { PaginationResponse } from "../../responses/pagination.response.js";

@Route("students")
@Tags("Student")
export class StudentController extends Controller {
  private studentService = new StudentService();

  @Post("/")
  async create(@Body() body: CreateStudentDTO) {
    return this.studentService.create(body);
  }

  @Get("/search")
  async searchStudent(
    @Query() keyword?: string,
    @Query() status?: StudentStatus,
    @Query() majorId?: number,
    @Query() classId?: number,
    @Query() isHasAccount?: boolean,
    @Query() page?: number,
    @Query() limit?: number,
  ): Promise<PaginationResponse<StudentResponse>> {
    return this.studentService.searchStudent({
      keyword,
      status,
      majorId,
      classId,
      isHasAccount,
      page,
      limit,
    });
  }

  @Get("/")
  async findAll() {
    return this.studentService.findAll();
  }

  @Get("{id}")
  async findById(@Path() id: number) {
    return this.studentService.findById(id);
  }

  @Put("{id}")
  async update(@Path() id: number, @Body() body: UpdateStudentDTO) {
    return this.studentService.update(id, body);
  }

  @Delete("{id}")
  async delete(@Path() id: number) {
    return this.studentService.delete(id);
  }
}
