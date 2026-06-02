import { api} from "./api";
export const studentApi = api.injectEndpoints({
    endpoints: (builder) => ({

        getStudent: builder.query({
            query: ({classId, schoolId}) => ({
                url: "students/list-by-class",
                method: "POST",
                body: {
                    classId,
                    schoolId,
                },
            }),
            providesTags: ["Students"],
        }),

         addStudent: builder.mutation({

                    query: (body) => ({

                    url: "/students/add",

                    method: "POST",

                    body,

                    }),

                    invalidatesTags: ["Students"],
                }),
            }),
        });

export const {
    useGetStudentQuery,
    useAddStudentMutation,
} = studentApi;