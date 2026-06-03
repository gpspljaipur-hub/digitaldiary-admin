import { api} from "./api";
export const teacherApi = api.injectEndpoints({
    endpoints: (builder) => ({

                 getTeacher: builder.query({

        query: (schoolId) => ({

          url: "/teachers/teacher-by-school",

          method: "POST",

          body: {
            schoolId,
          },

        }),

        providesTags: ["Teachers"],

      }),

         addTeacher: builder.mutation({

                    query: (body) => ({

                    url: "/teachers/add",

                    method: "POST",

                    body,

                    }),

                    invalidatesTags: ["Teachers"],
                }),
            }),
        });

export const {
    useGetTeacherQuery,
    useAddTeacherMutation,
} = teacherApi;