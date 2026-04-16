import type { StudentStatus } from "@prisma/client";

export interface StudentResponse {
  id: number;
  studentCode: string;
  fullName: string;
  email?: string | null;

  status: StudentStatus;

  major: {
    id: number;
    name: string;
  };

  class?: {
    id: number;
    name: string;
  } | null;
}
