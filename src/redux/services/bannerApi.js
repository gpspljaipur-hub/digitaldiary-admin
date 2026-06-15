import { api } from "./api";
export const bannerApi =
  api.injectEndpoints({
    endpoints: (builder) => ({
      getBanners: builder.query({
        query: ({ schoolId }) => ({
          url: "banner/get",
          method: "POST",
          body: {
            schoolId
          }
        }),
        providesTags: ["Banners"],
      }),


      addBanner: builder.mutation({
        query: (body) => ({
          url: "banner/add",
          method: "POST",
          body,
        }),
        invalidatesTags: ["Banners"],
      }),
    }),
  });

export const {
  useGetBannersQuery,
  useAddBannerMutation,
} = bannerApi;