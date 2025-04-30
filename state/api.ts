import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";

export const api = createApi({
  baseQuery: fetchBaseQuery({
    baseUrl: process.env.NEXT_PUBLIC_API_BASE_URL,
  }),
  reducerPath: "api",
  tagTypes: ["Countries"],
  endpoints: (build) => ({
    getCountries: build.query<Array<any>, void>({
      query: () => "/all",
      providesTags: ["Countries"],
    }),
  }),
});


export const { useGetCountriesQuery } = api;