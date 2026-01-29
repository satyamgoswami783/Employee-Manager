import { apiSlice } from './apiSlice';
const EMPLOYEES_URL = '/api/employees';

export const employeesApiSlice = apiSlice.injectEndpoints({
    endpoints: (builder) => ({
        getEmployees: builder.query({
            query: (keyword) => ({
                url: EMPLOYEES_URL,
                params: { keyword },
            }),
            providesTags: ['Employee'],
            keepUnusedDataFor: 5,
        }),
        getEmployeeDetails: builder.query({
            query: (employeeId) => ({
                url: `${EMPLOYEES_URL}/${employeeId}`,
            }),
            keepUnusedDataFor: 5,
        }),
        createEmployee: builder.mutation({
            query: (data) => ({
                url: EMPLOYEES_URL,
                method: 'POST',
                body: data,
            }),
            invalidatesTags: ['Employee'],
        }),
        updateEmployee: builder.mutation({
            query: (data) => ({
                url: `${EMPLOYEES_URL}/${data.employeeId}`,
                method: 'PUT',
                body: data,
            }),
            invalidatesTags: ['Employee'],
        }),
        deleteEmployee: builder.mutation({
            query: (employeeId) => ({
                url: `${EMPLOYEES_URL}/${employeeId}`,
                method: 'DELETE',
            }),
            invalidatesTags: ['Employee'],
        }),
    }),
});

export const {
    useGetEmployeesQuery,
    useGetEmployeeDetailsQuery,
    useCreateEmployeeMutation,
    useUpdateEmployeeMutation,
    useDeleteEmployeeMutation,
} = employeesApiSlice;
