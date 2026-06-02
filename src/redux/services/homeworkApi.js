import { api} from "./api";
export const homeworkApi = api.injectEndpoints({
    endpoints: (builder) => ({

        getHomework: builder.query({
            query: ({classId, subjectId}) => ({
                url: "homework/list",
                method: "POST",
                body: {
                    classId,
                    subjectId
                },
            }),
            providesTags: ["Homework"],
        }),
        }),
        });
export const {
    useGetHomeworkQuery,
} = homeworkApi;