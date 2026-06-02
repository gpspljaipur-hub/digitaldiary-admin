import { api } from "./api";
export const examTypeApi =
  api.injectEndpoints({
    endpoints: (builder) => ({
      getExamType: builder.query({
        query: () => ({
          url: "examType/list",
        }),
        providesTags: ["ExamType"],
      }),


      addExamType: builder.mutation({
        query: (body) => ({
          url: "/examType/add",
          method: "POST",
          body,
        }),
        invalidatesTags: ["ExamType"],
      }),
    }),
  });

export const {
  useGetExamTypeQuery,
  useAddExamTypeMutation,
} = examTypeApi;