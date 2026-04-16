import { OpenApiGeneratorV3 } from "@asteasolutions/zod-to-openapi";
import { registry } from "./openapi-registry.js";

export function getOpenApiDocumentation() {
  const generator = new OpenApiGeneratorV3(registry.definitions);

  return generator.generateDocument({
    openapi: "3.0.0",
    info: {
      version: "1.0.0",
      title: "TruongTranDaiNghia API",
      description: "Hệ thống quản lý trường học chuẩn Typesafe",
    },
    servers: [{ url: "/api" }],
  });
}
