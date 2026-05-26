import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";

export const api = createApi({

  reducerPath: "api",

  baseQuery: fetchBaseQuery({
    baseUrl: "https://digitaldiry-backend.onrender.com",
  }),

  tagTypes: ["Classes"],

  endpoints: (builder) => ({

    getClasses: builder.query({
      query: () => "/classes/all",

      providesTags: ["Classes"],
    }),

    addClass: builder.mutation({
        query: (body) => ({
            url: "/classes/add",
            method: "POST",
            body,
        }),

        invalidatesTags: ["Classes"]
    }),

  }),
});

export const {
  useGetClassesQuery,
  useAddClassMutation
} = api;