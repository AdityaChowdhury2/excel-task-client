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
            providesTags: ['Users'],
        }),
        createUser: builder.mutation({
            query: (newUser) => ({
                url: 'users/register',
                method: 'POST',
                body: newUser,
            }),
        }),
        loginUser: builder.mutation({
            query: (user) => ({
                url: 'users/login',
                method: 'POST',
                body: user
            }),
            invalidatesTags: ['Users']
        }),
        addTask: builder.mutation({
            query: (newTask) => ({
                url: 'tasks',
                method: 'POST',
                body: newTask,
            }),
            invalidatesTags: ['Task'],
        }),
        getTasks: builder.query({
            query: () => 'tasks',
            providesTags: ['Task'],
        }),
        getUsers: builder.query({
            query: (role) => `users?role=${role || ''}`,
            // providesTags: ['Users'],
        }),
        addProject: builder.mutation({
            query: (newProject) => ({
                url: 'projects',
                method: 'POST',
                body: newProject,
            }),
            invalidatesTags: ['Projects'],
        }),
    })


});


export const { useCreateUserMutation, useLoginUserMutation, useGetCurrentUserQuery, useAddTaskMutation, useGetUsersQuery, useAddProjectMutation, useGetTasksQuery } = apiService;