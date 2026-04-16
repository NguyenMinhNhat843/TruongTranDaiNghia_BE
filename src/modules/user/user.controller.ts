// src/controllers/user.controller.ts
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
import { UserService } from "./user.service.js";
import type { CreateUserDTO, UpdateUserDTO } from "./user.dto.js";
import type { UserRole } from "@prisma/client";

@Route("users")
@Tags("User")
export class UserController extends Controller {
  private userService = new UserService();

  @Post("/")
  async create(@Body() body: CreateUserDTO) {
    return this.userService.create(body);
  }

  @Get("/search")
  async queryUser(
    @Query() email?: string,
    @Query() username?: string,
    @Query() role?: UserRole,
    @Query() isActive?: boolean,
    @Query() page?: number,
    @Query() limit?: number,
  ) {
    return this.userService.queryUser({
      email,
      username,
      role,
      isActive,
      page,
      limit,
    });
  }

  @Get("/")
  async findAll() {
    return this.userService.findAll();
  }

  @Get("{id}")
  async findById(@Path() id: number) {
    return this.userService.findById(id);
  }

  @Put("{id}")
  async update(@Path() id: number, @Body() body: UpdateUserDTO) {
    return this.userService.update(id, body);
  }

  @Delete("{id}")
  async delete(@Path() id: number) {
    return this.userService.delete(id);
  }
}
