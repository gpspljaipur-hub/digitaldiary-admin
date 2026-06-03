import { api} from "./api";
export const marksApi = api.injectEndpoints({
    endpoints: (builder) => ({

        getMarks: builder.query({
            query: ({schoolId, classId, subjectId}) => ({
                url: "marks/list",
                method: "POST",
                body: {
                    schoolId,
                    classId,
                    subjectId
                },
            }),
            providesTags: ["Marks"],
        }),
        }),
        });
export const {
    useGetMarksQuery,
} = marksApi;