import { StudentStatus } from "@prisma/client";

export interface CreateStudentDTO {
  studentCode: string;
  fullName: string;
  birthday: Date;
  gender: string;
  phone?: string;
  email?: string;
  address?: string;
  citizenId?: string;

  majorId: number;
  classId?: number;
  userId?: number;

  status?: StudentStatus;
}

export interface UpdateStudentDTO {
  fullName?: string;
  birthday?: Date;
  gender?: string;
  phone?: string;
  email?: string;
  address?: string;
  citizenId?: string;

  majorId?: number;
  classId?: number;
  userId?: number;

  status?: StudentStatus;
}

export interface QueryStudentDTO {
  keyword?: string; // search chung (tên, mã HS, email...)
  status?: StudentStatus;
  majorId?: number;
  classId?: number;
  isHasAccount?: boolean; // có user hay chưa

  page?: number;
  limit?: number;
}
