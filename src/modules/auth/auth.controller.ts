import { Body, Controller, Post, Route, SuccessResponse, Tags } from "tsoa";
import type { RegisterRequest } from "./auth.dto.js";
import { AuthService } from "./auth.service.js";
import type { RegisterResponse } from "./auth.response.js";

@Route("auth")
@Tags("Auth")
export class AuthController extends Controller {
  @Post("register")
  @SuccessResponse("201", "Created")
  public async register(
    @Body() data: RegisterRequest,
  ): Promise<RegisterResponse> {
    const authService = new AuthService();
    const result = await authService.register(data);
    return result;
  }
}
