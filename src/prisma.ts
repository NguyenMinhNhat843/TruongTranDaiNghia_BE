import { PrismaClient } from "@prisma/client";

// Khởi tạo một instance duy nhất để dùng toàn app
export const db = new PrismaClient();

// Export thêm các Type nếu ông cần dùng ở nơi khác
export type { User } from "@prisma/client";
