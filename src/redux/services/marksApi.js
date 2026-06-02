import { api} from "./api";
export const marksApi = api.injectEndpoints({
    endpoints: (builder) => ({

        getMarks: builder.query({
            query: ({schoolId, classId}) => ({
                url: "marks/list",
                method: "POST",
                body: {
                    schoolId,
                    classId
                },
            }),
            providesTags: ["Marks"],
        }),
        }),
        });
export const {
    useGetMarksQuery,
} = marksApi;