import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query";
import { serverHost } from "../../utils/confiig";

interface Credentials {
    username: string;
    password: string;
}


const authApi = createApi({
  reducerPath: "authApi",
  baseQuery: fetchBaseQuery({
    baseUrl: serverHost,
    headers: {
      "Access-Control-Allow-Origin": serverHost + "*",
    },
  }),
  tagTypes: ["Auth"],
  endpoints: (builder) => ({
    login: builder.mutation<string, Credentials> ({
      query: (credentials) => ({
        url: "/login",
        method: "POST",
        body: credentials,
      }),
    }),
  }),
});
