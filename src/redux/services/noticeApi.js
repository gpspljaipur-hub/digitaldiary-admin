import { api } from "./api";
export const noticeApi =
  api.injectEndpoints({

    endpoints: (builder) => ({

      getNotice: builder.query({

        query: (schoolId) => ({

          url: "/notice/notice-school",

          method: "POST",

          body: {
            schoolId,
          },

        }),

        providesTags: ["Notices"],

      }),

      addNotice: builder.mutation({

        query: (body) => ({

          url: "/notice/add",

          method: "POST",

          body,

        }),

        invalidatesTags: ["Notices"],

      }),

    }),

  });

export const {
  useGetNoticeQuery,
  useAddNoticeMutation,
} = noticeApi;