import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { useGetTasksQuery, useDeleteTaskMutation } from '../slices/tasksApiSlice';

const TaskList = () => {
    const { data: tasks, isLoading, error, refetch } = useGetTasksQuery();
    const [deleteTask, { isLoading: loadingDelete }] = useDeleteTaskMutation();

    const deleteHandler = async (id) => {
        if (window.confirm('Are you sure you want to delete this task?')) {
            try {
                await deleteTask(id);
                refetch();
            } catch (err) {
                console.error(err);
            }
        }
    };

    return (
        <div className="min-h-screen bg-slate-900 text-white p-8">
            <div className="max-w-7xl mx-auto space-y-6">
                <div className="flex justify-between items-center bg-slate-800 p-6 rounded-xl border border-slate-700 shadow-sm">
                    <h1 className="text-2xl font-bold tracking-tight">Tasks</h1>
                    <Link to="/tasks/add" className="bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded-lg font-medium transition-colors flex items-center gap-2">
                        <span className="text-xl leading-none">+</span> Add Task
                    </Link>
                </div>

                <div className="bg-slate-800 p-6 rounded-xl border border-slate-700 shadow-sm">
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
                                        <th className="p-4 font-semibold">Title</th>
                                        <th className="p-4 font-semibold">Assigned To</th>
                                        <th className="p-4 font-semibold">Priority</th>
                                        <th className="p-4 font-semibold">Deadline</th>
                                        <th className="p-4 font-semibold">Status</th>
                                        <th className="p-4 font-semibold text-right">Actions</th>
                                    </tr>
                                </thead>
                                <tbody className="divide-y divide-slate-700">
                                    {tasks.map((task) => (
                                        <tr key={task._id} className="hover:bg-slate-700/50 transition-colors">
                                            <td className="p-4 font-medium text-white">{task.title}</td>
                                            <td className="p-4 text-slate-300">
                                                {task.assignedTo?.name || 'Unassigned'}
                                            </td>
                                            <td className="p-4">
                                                <span className={`text-xs px-2 py-1 rounded-full font-medium border ${task.priority === 'High' ? 'bg-red-900/30 text-red-400 border-red-900/50' :
                                                        task.priority === 'Medium' ? 'bg-yellow-900/30 text-yellow-400 border-yellow-900/50' :
                                                            'bg-green-900/30 text-green-400 border-green-900/50'
                                                    }`}>
                                                    {task.priority}
                                                </span>
                                            </td>
                                            <td className="p-4 text-slate-300">
                                                {new Date(task.deadline).toLocaleDateString()}
                                            </td>
                                            <td className="p-4">
                                                <span className={`text-xs px-2 py-1 rounded-full font-medium border ${task.status === 'Completed' ? 'bg-green-900/30 text-green-400 border-green-900/50' :
                                                        task.status === 'In Progress' ? 'bg-blue-900/30 text-blue-400 border-blue-900/50' :
                                                            'bg-slate-700 text-slate-300 border-slate-600'
                                                    }`}>
                                                    {task.status}
                                                </span>
                                            </td>
                                            <td className="p-4 text-right space-x-3">
                                                <Link to={`/tasks/${task._id}/edit`} className="text-blue-400 hover:text-blue-300 transition-colors text-sm font-medium">
                                                    Edit
                                                </Link>
                                                <button
                                                    onClick={() => deleteHandler(task._id)}
                                                    className="text-red-400 hover:text-red-300 transition-colors text-sm font-medium"
                                                >
                                                    Delete
                                                </button>
                                            </td>
                                        </tr>
                                    ))}
                                </tbody>
                            </table>
                            {tasks.length === 0 && (
                                <div className="text-center py-10 text-slate-500">
                                    No tasks found.
                                </div>
                            )}
                        </div>
                    )}
                </div>
            </div>
        </div>
    );
};

export default TaskList;
