import { api } from "./api";
export const achievementsApi =
  api.injectEndpoints({
    endpoints: (builder) => ({
      getAchievements: builder.query({
        query: ({ schoolId }) => ({
          url: "achievements/list",
          method: "POST",
          body: {
            schoolId
          }
        }),
        providesTags: ["Achievements"],
      }),


      addAchievements: builder.mutation({
        query: (body) => ({
          url: "achievements/add",
          method: "POST",
          body,
        }),
        invalidatesTags: ["Achievements"],
      }),
    }),
  });

export const {
  useGetAchievementsQuery,
  useAddAchievementsMutation,
} = achievementsApi;