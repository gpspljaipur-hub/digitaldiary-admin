import { api} from "./api";
export const teacherApi = api.injectEndpoints({
    endpoints: (builder) => ({

                getTeacher: builder.query({

                 query: () => "/teachers/all",

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