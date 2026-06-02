import { api } from "./api";
export const teacherScheduleApi =
  api.injectEndpoints({

    endpoints: (builder) => ({

      getTeacherSchedule: builder.query({

        query: () => ({

          url: "teacher-schedule/list",

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