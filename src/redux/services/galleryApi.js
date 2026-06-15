import { api } from "./api";
export const galleryApi =
  api.injectEndpoints({
    endpoints: (builder) => ({
      getGallery: builder.query({
        query: ({ schoolId }) => ({
          url: "gallery/get",
          method: "POST",
          body: {
            schoolId
          }
        }),
        providesTags: ["Gallery"],
      }),


      addGallery:  builder.mutation({
        query: (body) => ({
          url: "gallery/add",
          method: "POST",
          body,
        }),
        invalidatesTags: ["Gallery"],
      }),
    }),
  });

export const {
  useGetGalleryQuery,
  useAddGalleryMutation,
} = galleryApi;