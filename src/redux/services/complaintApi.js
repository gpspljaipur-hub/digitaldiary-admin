import { api } from "./api";
export const complaintApi =
  api.injectEndpoints({

    endpoints: (builder) => ({

      getComplaint: builder.query({

        query: (schoolId) => ({
          url: "complaint/complaint-by-school",
          method: "POST",
          body: {schoolId}
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