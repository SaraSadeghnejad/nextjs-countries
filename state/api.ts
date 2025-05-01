import { CountryData } from "@/containers/charts/Row2";
import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";

export const api = createApi({
  baseQuery: fetchBaseQuery({
    baseUrl: process.env.NEXT_PUBLIC_API_BASE_URL,
  }),
  reducerPath: "api",
  tagTypes: ["Countries"],
  endpoints: (build) => ({
    getCountries: build.query<Array<CountryData>, void>({
      query: () => "/all",
      providesTags: ["Countries"],
    }),
  }),
});


export const { useGetCountriesQuery } = api;