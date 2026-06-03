import { api } from "./api";
export const schoolApi =
  api.injectEndpoints({
    endpoints: (builder) => ({
      getSchool: builder.query({
        query: () => ({
          url: "school/list",
        }),
        providesTags: ["Schools"],
      }),

    }),
  });

export const {
  useGetSchoolQuery,
} = schoolApi;