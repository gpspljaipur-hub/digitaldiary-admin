import { api } from "./api";
export const newsApi =
  api.injectEndpoints({
    endpoints: (builder) => ({
      getNews: builder.query({
        query: ({ schoolId }) => ({
          url: "news/list",
          method: "POST",
          body: {
            schoolId
          }
        }),
        providesTags: ["News"],
      }),


      addNews: builder.mutation({
        query: (body) => ({
          url: "news/add",
          method: "POST",
          body,
        }),
        invalidatesTags: ["News"],
      }),
    }),
  });

export const {
  useGetNewsQuery,
  useAddNewsMutation,
} = newsApi;