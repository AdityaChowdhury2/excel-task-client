import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';
import { getToken } from '../../utils/localDb';

export const apiService = createApi({
    reducerPath: 'api',
    baseQuery: fetchBaseQuery({
        baseUrl: `${import.meta.env.VITE_SERVER_URL}/api/v1`,
        prepareHeaders: (headers) => {
            const token = getToken();
            if (token) {
                headers.set('authorization', token);
            }
            return headers;
        }
    }),

    endpoints: (builder) => ({
        getCurrentUser: builder.query({
            query: () => 'users/current',
            providesTags: ['User'],
        }),
        createUser: builder.mutation({
            query: (newUser) => ({
                url: 'users/register',
                method: 'POST',
                body: newUser,
            }),
            // Pick out data and prevent nested properties in a hook or selector
            // transformResponse: (response) => response,
        }),
        loginUser: builder.mutation({
            query: (user) => ({
                url: 'users/login',
                method: 'POST',
                body: user
            }),
            invalidatesTags: ['User']
        }),


    }),
});


export const { useCreateUserMutation, useLoginUserMutation, useGetCurrentUserQuery } = apiService;