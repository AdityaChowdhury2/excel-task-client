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
            invalidatesTags: ['Users']
        }),
        loginUser: builder.mutation({
            query: (user) => ({
                url: 'users/login',
                method: 'POST',
                body: user
            }),
            // invalidatesTags: ['Users']
        }),
        addTask: builder.mutation({
            query: (newTask) => ({
                url: 'tasks',
                method: 'POST',
                body: newTask,
            }),
            invalidatesTags: ['Task'],
        }),
        updateTaskById: builder.mutation({
            query: ({ id, updates }) => ({
                url: `tasks/${id}`,
                method: 'PATCH',
                body: updates
            }),
            invalidatesTags: ['Task'],
        }),
        getTasks: builder.query({
            query: ({ searchText, searchBy }) => `tasks?searchText=${searchText}&searchBy=${searchBy || 'title'}`,
            providesTags: ['Task'],
        }),
        getUsers: builder.query({
            query: (role) => `users?role=${role || ''}`,
            providesTags: ['Users'],
        }),
        addProject: builder.mutation({
            query: (newProject) => ({
                url: 'projects',
                method: 'POST',
                body: newProject,
            }),
            invalidatesTags: ['Projects'],
        }),
        getProjects: builder.query({
            query: () => `projects`,
            providesTags: ['Projects']
        }),
        getProjectById: builder.query({
            query: (id) => `projects/${id}`,
            providesTags: ['SingleProject']
        }),
        updateProjectById: builder.mutation({
            query: ({ id, data }) => ({
                url: `/projects/${id}`,
                method: 'PATCH',
                body: data
            }),
            invalidatesTags: ['SingleProject', "Projects"]
        }),
        deleteProject: builder.mutation({
            query: (id) => ({
                url: `/projects/${id}`,
                method: 'DELETE',
                credentials: 'include',
            }),
            invalidatesTags: ['Projects'],
        })
    })


});


export const { useCreateUserMutation, useUpdateTaskByIdMutation, useLoginUserMutation, useUpdateProjectByIdMutation, useGetProjectByIdQuery, useDeleteProjectMutation, useGetProjectsQuery, useGetCurrentUserQuery, useAddTaskMutation, useGetUsersQuery, useAddProjectMutation, useGetTasksQuery } = apiService;