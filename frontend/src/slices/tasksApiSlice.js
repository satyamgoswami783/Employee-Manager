import { apiSlice } from './apiSlice';
const TASKS_URL = '/api/tasks';

export const tasksApiSlice = apiSlice.injectEndpoints({
    endpoints: (builder) => ({
        getTasks: builder.query({
            query: (keyword) => ({
                url: TASKS_URL,
                params: { keyword },
            }),
            providesTags: ['Task'],
            keepUnusedDataFor: 5,
        }),
        getTaskDetails: builder.query({
            query: (taskId) => ({
                url: `${TASKS_URL}/${taskId}`,
            }),
            keepUnusedDataFor: 5,
        }),
        createTask: builder.mutation({
            query: (data) => ({
                url: TASKS_URL,
                method: 'POST',
                body: data,
            }),
            invalidatesTags: ['Task'],
        }),
        updateTask: builder.mutation({
            query: (data) => ({
                url: `${TASKS_URL}/${data.taskId}`,
                method: 'PUT',
                body: data,
            }),
            invalidatesTags: ['Task'],
        }),
        deleteTask: builder.mutation({
            query: (taskId) => ({
                url: `${TASKS_URL}/${taskId}`,
                method: 'DELETE',
            }),
            invalidatesTags: ['Task'],
        }),
    }),
});

export const {
    useGetTasksQuery,
    useGetTaskDetailsQuery,
    useCreateTaskMutation,
    useUpdateTaskMutation,
    useDeleteTaskMutation,
} = tasksApiSlice;
