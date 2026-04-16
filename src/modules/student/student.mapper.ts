import type { StudentResponse } from "./student.response.js";

export const toStudentResponse = (student: any): StudentResponse => {
  return {
    id: student.id,
    studentCode: student.studentCode,
    fullName: student.fullName,
    email: student.email,
    status: student.status,

    major: {
      id: student.major.id,
      name: student.major.name,
    },

    class: student.class
      ? {
          id: student.class.id,
          name: student.class.name,
        }
      : null,
  };
};
