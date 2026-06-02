import { api} from "./api";
export const subjectApi = api.injectEndpoints({
    endpoints: (builder) => ({

        getSubject: builder.query({
            query: ({classId, schoolId}) => ({
                url: "/subjects/list",
                method: "POST",
                body: {
                    classId,
                    schoolId,
                },
            }),
            providesTags: ["Subjects"],
        }),

         addSubject: builder.mutation({

                    query: (body) => ({

                    url: "/subjects/add",

                    method: "POST",

                    body,

                    }),

                    invalidatesTags: ["Subjects"],
                }),
            }),
        });

export const {
    useGetSubjectQuery,
    useAddSubjectMutation,
} = subjectApi;