import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { useGetEmployeesQuery, useDeleteEmployeeMutation } from '../slices/employeesApiSlice';
import { toast } from 'react-toastify';

const EmployeeList = () => {
    const [keyword, setKeyword] = useState('');
    const { data: employees, isLoading, error, refetch } = useGetEmployeesQuery(keyword);
    const [deleteEmployee, { isLoading: loadingDelete }] = useDeleteEmployeeMutation();

    const deleteHandler = async (id) => {
        if (window.confirm('Are you sure you want to delete this employee?')) {
            try {
                await deleteEmployee(id);
                // toast.success('Employee deleted successfully');
                refetch();
            } catch (err) {
                // toast.error(err?.data?.message || err.error);
                console.error(err);
            }
        }
    };

    const submitHandler = (e) => {
        e.preventDefault();
        // Trigger refetch with new keyword handled by query hook automatically dependency
    };

    return (
        <div className="min-h-screen bg-slate-900 text-white p-8">
            <div className="max-w-7xl mx-auto space-y-6">
                <div className="flex justify-between items-center bg-slate-800 p-6 rounded-xl border border-slate-700 shadow-sm">
                    <h1 className="text-2xl font-bold tracking-tight">Employees</h1>
                    <Link to="/employees/add" className="bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded-lg font-medium transition-colors flex items-center gap-2">
                        <span className="text-xl leading-none">+</span> Add Employee
                    </Link>
                </div>

                <div className="bg-slate-800 p-6 rounded-xl border border-slate-700 shadow-sm">
                    <form onSubmit={submitHandler} className="mb-6">
                        <div className="relative max-w-md">
                            <input
                                type="text"
                                name="q"
                                onChange={(e) => setKeyword(e.target.value)}
                                placeholder="Search by name..."
                                className="w-full pl-4 pr-10 py-2 bg-slate-900 border border-slate-600 rounded-lg text-white placeholder-slate-400 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                            />
                            <button type="submit" className="absolute right-2 top-2 text-slate-400 hover:text-white">
                                <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
                                </svg>
                            </button>
                        </div>
                    </form>

                    {isLoading ? (
                        <div className="text-center py-10 text-slate-400">Loading...</div>
                    ) : error ? (
                        <div className="text-red-400 bg-red-900/20 p-4 rounded-lg border border-red-900/50">
                            {error?.data?.message || error.error}
                        </div>
                    ) : (
                        <div className="overflow-x-auto">
                            <table className="w-full text-left border-collapse">
                                <thead>
                                    <tr className="border-b border-slate-700 text-slate-400 uppercase text-xs tracking-wider">
                                        <th className="p-4 font-semibold">Name</th>
                                        <th className="p-4 font-semibold">Email</th>
                                        <th className="p-4 font-semibold">Department</th>
                                        <th className="p-4 font-semibold">Status</th>
                                        <th className="p-4 font-semibold text-right">Actions</th>
                                    </tr>
                                </thead>
                                <tbody className="divide-y divide-slate-700">
                                    {employees.map((employee) => (
                                        <tr key={employee._id} className="hover:bg-slate-700/50 transition-colors">
                                            <td className="p-4 font-medium text-white">{employee.name}</td>
                                            <td className="p-4 text-slate-300">{employee.email}</td>
                                            <td className="p-4 text-slate-300">
                                                <span className="bg-slate-700 text-slate-300 text-xs px-2 py-1 rounded-full border border-slate-600">
                                                    {employee.department}
                                                </span>
                                            </td>
                                            <td className="p-4">
                                                <span className={`text-xs px-2 py-1 rounded-full font-medium border ${employee.status === 'Active'
                                                        ? 'bg-green-900/30 text-green-400 border-green-900/50'
                                                        : 'bg-red-900/30 text-red-400 border-red-900/50'
                                                    }`}>
                                                    {employee.status}
                                                </span>
                                            </td>
                                            <td className="p-4 text-right space-x-3">
                                                <Link to={`/employees/${employee._id}/edit`} className="text-blue-400 hover:text-blue-300 transition-colors text-sm font-medium">
                                                    Edit
                                                </Link>
                                                <button
                                                    onClick={() => deleteHandler(employee._id)}
                                                    className="text-red-400 hover:text-red-300 transition-colors text-sm font-medium"
                                                >
                                                    Delete
                                                </button>
                                            </td>
                                        </tr>
                                    ))}
                                </tbody>
                            </table>
                            {employees.length === 0 && (
                                <div className="text-center py-10 text-slate-500">
                                    No employees found.
                                </div>
                            )}
                        </div>
                    )}
                </div>
            </div>
        </div>
    );
};

export default EmployeeList;
