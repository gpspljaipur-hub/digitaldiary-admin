import { api } from "./api";
export const complaintApi =
  api.injectEndpoints({

    endpoints: (builder) => ({

      getComplaint: builder.query({

        query: () => ({
          url: "complaint/list",
        }),

        providesTags: ["Complaints"],

      }),

      addComplaintCategory: builder.mutation({

        query: (body) => ({

          url: "complaint-category/add",

          method: "POST",

          body,

        }),

        invalidatesTags: ["ComplaintsCategory"],

      }),

    }),

  });

export const {
  useGetComplaintQuery,
  useAddComplaintCategoryMutation,
} = complaintApi;