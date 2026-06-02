import { api } from "./api";
export const classApi =
  api.injectEndpoints({

    endpoints: (builder) => ({

      getClasses: builder.query({

        query: (schoolId) => ({

          url: "/classes/school-classes",

          method: "POST",

          body: {
            schoolId,
          },

        }),

        providesTags: ["Classes"],

      }),

      addClass: builder.mutation({

        query: (body) => ({

          url: "/classes/add",

          method: "POST",

          body,

        }),

        invalidatesTags: ["Classes"],

      }),

    }),

  });

export const {
  useGetClassesQuery,
  useAddClassMutation,
} = classApi;