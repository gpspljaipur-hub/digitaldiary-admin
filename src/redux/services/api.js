import {
  createApi,
  fetchBaseQuery,
} from "@reduxjs/toolkit/query/react";

export const BASE_URL = "https://digitaldiry-backend.onrender.com";

export const api = createApi({

  reducerPath: "api",

  baseQuery: fetchBaseQuery({
    baseUrl: BASE_URL,
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
    "TimeTable",
    "Fees",
    "Achievements",
    "News",
    "Banners",
    "Gallery"
  ],

  endpoints: () => ({}),

});
