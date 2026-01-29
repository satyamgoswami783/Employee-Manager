import { useRef } from 'react';
import { useSelector } from 'react-redux';
import { useGetStatsQuery } from '../slices/statsApiSlice';
import { useGetTasksQuery } from '../slices/tasksApiSlice';

const Dashboard = () => {
    const { userInfo } = useSelector((state) => state.auth);

    // Admin Stats Query
    const { data: stats, isLoading: statsLoading, error: statsError } = useGetStatsQuery(undefined, {
        skip: !userInfo?.isAdmin,
    });

    // Employee Tasks Query
    const { data: tasks, isLoading: tasksLoading, error: tasksError } = useGetTasksQuery(undefined, {
        skip: userInfo?.isAdmin,
    });

    const cards = [
        { title: 'Total Employees', value: stats?.totalEmployees, color: 'bg-blue-600', icon: '👥' },
        { title: 'Total Tasks', value: stats?.totalTasks, color: 'bg-purple-600', icon: '📋' },
        { title: 'Pending Tasks', value: stats?.pendingTasks, color: 'bg-yellow-600', icon: '⏳' },
        { title: 'Completed Tasks', value: stats?.completedTasks, color: 'bg-green-600', icon: '✅' },
    ];

    if (userInfo?.isAdmin) {
        return (
            <div className="min-h-screen bg-slate-900 text-white p-8">
                <div className="max-w-7xl mx-auto space-y-8">
                    <h1 className="text-3xl font-bold tracking-tight">Dashboard Overview</h1>

                    {statsLoading ? (
                        <div className="text-slate-400">Loading stats...</div>
                    ) : statsError ? (
                        <div className="text-red-400 bg-red-900/20 p-4 rounded-lg border border-red-900/50">
                            {statsError?.data?.message || 'Error loading stats'}
                        </div>
                    ) : (
                        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
                            {cards.map((card, index) => (
                                <div key={index} className={`p-6 rounded-xl shadow-lg border border-slate-700/50 ${card.color} bg-opacity-20 backdrop-blur-sm`}>
                                    <div className="flex items-center justify-between mb-4">
                                        <h3 className="text-lg font-medium text-slate-200">{card.title}</h3>
                                        <span className="text-2xl">{card.icon}</span>
                                    </div>
                                    <p className="text-4xl font-bold text-white">{card.value}</p>
                                </div>
                            ))}
                        </div>
                    )}

                    <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 mt-8">
                        <div className="bg-slate-800 p-6 rounded-xl border border-slate-700 shadow-sm">
                            <h3 className="text-xl font-bold mb-4">Quick Actions</h3>
                            <div className="space-y-3">
                                <p className="text-slate-400">Manage your workforce efficiently.</p>
                            </div>
                        </div>

                        <div className="bg-slate-800 p-6 rounded-xl border border-slate-700 shadow-sm">
                            <h3 className="text-xl font-bold mb-4">System Status</h3>
                            <div className="space-y-3">
                                <p className="text-green-400">● All systems operational</p>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        );
    }

    return (
        <div className="min-h-screen bg-slate-900 text-white p-8">
            <div className="max-w-7xl mx-auto space-y-8">
                <h1 className="text-3xl font-bold tracking-tight">My Assigned Tasks</h1>

                {tasksLoading ? (
                    <div className="text-slate-400">Loading tasks...</div>
                ) : tasksError ? (
                    <div className="text-red-400 bg-red-900/20 p-4 rounded-lg border border-red-900/50">
                        {tasksError?.data?.message || 'Error loading tasks'}
                    </div>
                ) : tasks && tasks.length > 0 ? (
                    <div className="grid gap-4">
                        {tasks.map((task) => (
                            <div key={task._id} className="bg-slate-800 p-6 rounded-xl border border-slate-700 shadow-sm hover:border-blue-500/50 transition-all">
                                <div className="flex justify-between items-start mb-2">
                                    <h3 className="text-xl font-semibold text-white">{task.title}</h3>
                                    <span className={`px-3 py-1 rounded-full text-xs font-medium ${task.priority === 'High' ? 'bg-red-500/20 text-red-400' :
                                            task.priority === 'Medium' ? 'bg-yellow-500/20 text-yellow-400' :
                                                'bg-blue-500/20 text-blue-400'
                                        }`}>
                                        {task.priority}
                                    </span>
                                </div>
                                <p className="text-slate-400 mb-4">{task.description}</p>
                                <div className="flex items-center gap-4 text-sm text-slate-500">
                                    <span>Due: {new Date(task.deadline).toLocaleDateString()}</span>
                                    <span className={`px-2 py-0.5 rounded ${task.status === 'Completed' ? 'bg-green-500/20 text-green-400' : 'bg-slate-700 text-slate-300'
                                        }`}>
                                        {task.status}
                                    </span>
                                </div>
                            </div>
                        ))}
                    </div>
                ) : (
                    <div className="text-center py-12 bg-slate-800/50 rounded-xl border border-slate-700 border-dashed">
                        <p className="text-slate-400 text-lg">No tasks assigned to you yet.</p>
                    </div>
                )}
            </div>
        </div>
    );
};

export default Dashboard;
