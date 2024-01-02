import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";
import { serverHost } from "../../utils/confiig";
export interface Credentials {
    username: string;
    password: string;
}

export interface User {
    username: string;
    password: string;
    token: string;
}

export const UserApi = createApi({
    reducerPath: "UserApi",
    baseQuery: fetchBaseQuery({
        baseUrl: serverHost,
        headers: {
            "Access-Control-Allow-Origin": serverHost + "*",
        },
    }),
    tagTypes: ["User"],
    endpoints: (builder) => ({
        login: builder.mutation<string, Credentials>({
            query: (credentials) => ({
                url: "/login",
                method: "POST",
                body: credentials,
            }),
        }),
        register: builder.mutation<string, Credentials>({
            query: (credentials) => ({
                url: "/register",
                method: "POST",
                body: credentials,
            }),
        }),
    }),
});

export const { useLoginMutation, useRegisterMutation } = UserApi;