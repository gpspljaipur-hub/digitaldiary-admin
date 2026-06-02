import { api} from "./api";
export const leaveApi = api.injectEndpoints({
    endpoints: (builder) => ({

        getLeave: builder.query({
            query: ({teacherId}) => ({
                url: "leave/class-teacher-leaves",
                method: "POST",
                body: {
                    teacherId
                },
            }),
            providesTags: ["Leaves"],
        }),
        }),
        });
export const {
    useGetLeaveQuery,
} = leaveApi;