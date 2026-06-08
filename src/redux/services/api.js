import {
  createApi,
  fetchBaseQuery,
} from "@reduxjs/toolkit/query/react";

export const api = createApi({

  reducerPath: "api",

  baseQuery: fetchBaseQuery({
    baseUrl:
      "https://digitaldiry-backend.onrender.com",
  }),

  tagTypes: [
    "Classes",
    "Subjects",
    "Teachers",
    "Notices",
    "Complaints",
    "ComplaintsCategory",
    "Students", 
    "Leaves",
    "Homework",
    "Marks",
    "Attendance",
    "ExamType",
    "TeacherSchedule",
    "Schools",
    "TimeTable"
  ],

  endpoints: () => ({}),

});
