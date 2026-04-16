// src/dtos/major.dto.ts
export interface CreateMajorDTO {
  name: string;
  code: string;
  departmentId: number;
}

export interface UpdateMajorDTO {
  name?: string;
  code?: string;
  departmentId?: number;
}

export interface QueryMajorDTO {
  keyword?: string;
  departmentId?: number;

  page?: number;
  limit?: number;
}
