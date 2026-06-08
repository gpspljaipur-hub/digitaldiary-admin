import { api } from "./api";
export const timeTableApi =
  api.injectEndpoints({
    endpoints: (builder) => ({
      getTimeTable: builder.query({
        query: ({ schoolId, classId }) => ({
          url: "class-timetable/list",
          method: "POST",
          body: {
            schoolId,
            classId
          }
        }),
        providesTags: ["TimeTable"],
      }),


      addTimeTable: builder.mutation({
        query: (body) => ({
          url: "class-timetable/add",
          method: "POST",
          body,
        }),
        invalidatesTags: ["TimeTable"],
      }),
    }),
  });

export const {
  useGetTimeTableQuery,
  useAddTimeTableMutation,
} = timeTableApi;