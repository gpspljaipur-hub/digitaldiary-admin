import { api } from "./api";
export const teacherScheduleApi =
  api.injectEndpoints({

    endpoints: (builder) => ({

      getTeacherSchedule: builder.query({

        query: (schoolId) => ({

          url: "teacher-schedule/list",
          method: "POST",
          body: {
            schoolId
          }

        }),

        providesTags: ["TeacherSchedule"],

      }),

      addTeacherSchedule: builder.mutation({

        query: (body) => ({

          url: "teacher-schedule/add",

          method: "POST",

          body,

        }),

        invalidatesTags: ["TeacherSchedule"],

      }),

    }),

  });

export const {
  useGetTeacherScheduleQuery,
  useAddTeacherScheduleMutation,
} = teacherScheduleApi;