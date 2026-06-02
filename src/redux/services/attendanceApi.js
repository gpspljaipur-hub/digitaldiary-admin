import { api} from "./api";
export const attendanceApi = api.injectEndpoints({
    endpoints: (builder) => ({

        getAttendance: builder.query({
            query: ({teacherId, date}) => ({
                url: "attendance/list",
                method: "POST",
                body: {
                    teacherId,
                    date
                },
            }),
            providesTags: ["Attendance"],
        }),
        }),
        });
export const {
    useGetAttendanceQuery,
} = attendanceApi;