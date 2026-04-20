import type { UserResponse } from "../user/user.response.js";

export interface RegisterResponse {
  message: string;
  user: UserResponse;
}
