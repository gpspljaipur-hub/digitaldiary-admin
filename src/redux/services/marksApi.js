import { api} from "./api";
export const marksApi = api.injectEndpoints({
    endpoints: (builder) => ({

        getMarks: builder.query({
            query: ({schoolId, classId, studentId, examType}) => ({
                url: "marks/list",
                method: "POST",
                body: {
                    schoolId,
                    classId,
                    studentId,
                    examType
                },
            }),
            providesTags: ["Marks"],
        }),
        getReportCard: builder.query({
            query: ({schoolId, classId, studentId, examType}) => ({
                url: "marks/report-card",
                method: "POST",
                body: {
                    schoolId,
                    classId,
                    studentId,
                    examType
                },
            }),
        }),
    }),
});
export const {
    useGetMarksQuery,
    useGetReportCardQuery,
    useLazyGetReportCardQuery,
} = marksApi;