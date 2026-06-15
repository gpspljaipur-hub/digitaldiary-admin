import { api } from "./api";
export const feesApi =
  api.injectEndpoints({
    endpoints: (builder) => ({
      getFees: builder.query({
        query: ({ schoolId, classId }) => ({
          url: "fees-structure/list",
          method: "POST",
          body: {
            schoolId,
            classId
          }
        }),
        providesTags: ["Fees"],
      }),


      addFees: builder.mutation({
        query: (body) => ({
          url: "fees-structure/add",
          method: "POST",
          body,
        }),
        invalidatesTags: ["Fees"],
      }),
    }),
  });

export const {
  useGetFeesQuery,
  useAddFeesMutation,
} = feesApi;