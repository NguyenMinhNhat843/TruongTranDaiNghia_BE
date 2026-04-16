// src/controllers/major.controller.ts
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
import type { CreateMajorDTO, UpdateMajorDTO } from "./major.dto.js";
import { MajorService } from "./major.service.js";

@Route("majors")
@Tags("Major")
export class MajorController extends Controller {
  private majorService = new MajorService();

  @Post("/")
  async create(@Body() body: CreateMajorDTO) {
    return this.majorService.create({
      data: body,
    });
  }

  @Get("/search")
  async searchMajor(
    @Query() keyword?: string,
    @Query() departmentId?: number,
    @Query() page?: number,
    @Query() limit?: number,
  ) {
    return this.majorService.searchMajor({
      keyword,
      departmentId,
      page,
      limit,
    });
  }

  @Get("/")
  async findAll() {
    return this.majorService.findAll();
  }

  @Get("{id}")
  async findById(@Path() id: number) {
    return this.majorService.findById({
      where: { id },
    });
  }

  @Put("{id}")
  async update(@Path() id: number, @Body() body: UpdateMajorDTO) {
    return this.majorService.update({
      where: { id },
      data: body,
    });
  }

  @Delete("{id}")
  async delete(@Path() id: number) {
    return this.majorService.delete({
      where: { id },
    });
  }
}
