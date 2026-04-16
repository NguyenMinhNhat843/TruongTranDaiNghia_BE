import express from "express";
import dotenv from "dotenv";
import swaggerUi from "swagger-ui-express";
import { getOpenApiDocumentation } from "./config/swagger.js";
import departmentRoutes from "./modules/department/department.routes.js";

dotenv.config();

const app = express();
const PORT = Number(process.env.PORT) || 3000;

app.use(express.json());

// Route cho Swagger
const swaggerDoc = getOpenApiDocumentation();
app.use("/api-docs", swaggerUi.serve, swaggerUi.setup(swaggerDoc));

// Route
app.use("/api/departments", departmentRoutes);

// middleware xử lý lỗi chung
app.use((err: any, req: any, res: any, next: any) => {
  console.error(err.stack);

  // Nếu là lỗi validate từ Zod
  if (err.name === "ZodError") {
    return res.status(400).json({
      message: "Dữ liệu không hợp lệ",
      errors: err.errors,
    });
  }

  res.status(err.status || 500).json({
    message: err.message || "Lỗi hệ thống",
  });
});

app.listen(PORT, () => {
  console.log(`[server]: Server is running at http://localhost:${PORT}`);
});
