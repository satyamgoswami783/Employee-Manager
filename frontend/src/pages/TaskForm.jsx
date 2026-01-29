import { useState, useEffect } from 'react';
import { Link, useNavigate, useParams } from 'react-router-dom';
import { useCreateTaskMutation, useGetTaskDetailsQuery, useUpdateTaskMutation } from '../slices/tasksApiSlice';
import { useGetEmployeesQuery } from '../slices/employeesApiSlice';

const TaskForm = () => {
    const { id: taskId } = useParams();
    const isEditMode = !!taskId;

    const [title, setTitle] = useState('');
    const [description, setDescription] = useState('');
    const [assignedTo, setAssignedTo] = useState('');
    const [priority, setPriority] = useState('Medium');
    const [deadline, setDeadline] = useState('');
    const [status, setStatus] = useState('Pending');

    const navigate = useNavigate();

    const { data: task, isLoading: loadingDetails } = useGetTaskDetailsQuery(taskId, {
        skip: !isEditMode,
    });

    const { data: employees, isLoading: loadingEmployees } = useGetEmployeesQuery('');

    const [createTask, { isLoading: loadingCreate }] = useCreateTaskMutation();
    const [updateTask, { isLoading: loadingUpdate }] = useUpdateTaskMutation();

    useEffect(() => {
        if (isEditMode && task) {
            setTitle(task.title);
            setDescription(task.description);
            setAssignedTo(task.assignedTo?._id || task.assignedTo);
            setPriority(task.priority);
            setDeadline(task.deadline ? new Date(task.deadline).toISOString().substr(0, 10) : '');
            setStatus(task.status);
        }
    }, [isEditMode, task]);

    const submitHandler = async (e) => {
        e.preventDefault();
        try {
            const taskData = {
                title,
                description,
                assignedTo,
                priority,
                deadline,
                status,
            };

            if (isEditMode) {
                await updateTask({ taskId, ...taskData }).unwrap();
            } else {
                await createTask(taskData).unwrap();
            }
            navigate('/tasks');
        } catch (err) {
            console.error(err);
        }
    };

    return (
        <div className="min-h-screen bg-slate-900 text-white p-8">
            <Link to="/tasks" className="inline-flex items-center text-slate-400 hover:text-white mb-6 transition-colors font-medium">
                ← Back to List
            </Link>

            <div className="max-w-2xl mx-auto bg-slate-800 rounded-xl shadow-lg border border-slate-700 p-8">
                <h1 className="text-2xl font-bold mb-6 text-white tracking-tight">
                    {isEditMode ? 'Edit Task' : 'Add Task'}
                </h1>

                {loadingDetails || loadingEmployees ? (
                    <div className="text-slate-400">Loading details...</div>
                ) : (
                    employees && employees.length === 0 ? (
                        <div className="text-center py-10">
                            <div className="bg-yellow-900/20 text-yellow-200 p-4 rounded-lg mb-6 border border-yellow-900/50">
                                <p className="font-medium">No employees found</p>
                                <p className="text-sm mt-1 opacity-80">You need to add employees before you can create tasks.</p>
                            </div>
                            <Link
                                to="/employees/add"
                                className="inline-flex items-center justify-center bg-blue-600 hover:bg-blue-700 text-white font-semibold py-2 px-6 rounded-lg transition-all"
                            >
                                Add First Employee
                            </Link>
                        </div>
                    ) : (
                        <form onSubmit={submitHandler} className="space-y-6">
                            <div>
                                <label className="block text-sm font-medium text-slate-300 mb-2">Title</label>
                                <input
                                    type="text"
                                    placeholder="Enter task title"
                                    value={title}
                                    onChange={(e) => setTitle(e.target.value)}
                                    className="w-full px-4 py-2 bg-slate-900 border border-slate-600 rounded-lg text-white focus:ring-2 focus:ring-blue-500 focus:border-transparent outline-none transition-all"
                                    required
                                />
                            </div>

                            <div>
                                <label className="block text-sm font-medium text-slate-300 mb-2">Description</label>
                                <textarea
                                    placeholder="Enter task description"
                                    value={description}
                                    onChange={(e) => setDescription(e.target.value)}
                                    className="w-full px-4 py-2 bg-slate-900 border border-slate-600 rounded-lg text-white focus:ring-2 focus:ring-blue-500 focus:border-transparent outline-none transition-all h-32 resize-none"
                                    required
                                ></textarea>
                            </div>

                            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                                <div>
                                    <label className="block text-sm font-medium text-slate-300 mb-2">Assigned To</label>
                                    <select
                                        value={assignedTo}
                                        onChange={(e) => setAssignedTo(e.target.value)}
                                        className="w-full px-4 py-2 bg-slate-900 border border-slate-600 rounded-lg text-white focus:ring-2 focus:ring-blue-500 focus:border-transparent outline-none transition-all appearance-none"
                                        required
                                    >
                                        <option value="">Select Employee</option>
                                        {employees?.map((emp) => (
                                            <option key={emp._id} value={emp._id}>
                                                {emp.name}
                                            </option>
                                        ))}
                                    </select>
                                </div>

                                <div>
                                    <label className="block text-sm font-medium text-slate-300 mb-2">Priority</label>
                                    <select
                                        value={priority}
                                        onChange={(e) => setPriority(e.target.value)}
                                        className="w-full px-4 py-2 bg-slate-900 border border-slate-600 rounded-lg text-white focus:ring-2 focus:ring-blue-500 focus:border-transparent outline-none transition-all appearance-none"
                                    >
                                        <option value="Low">Low</option>
                                        <option value="Medium">Medium</option>
                                        <option value="High">High</option>
                                    </select>
                                </div>

                                <div>
                                    <label className="block text-sm font-medium text-slate-300 mb-2">Deadline</label>
                                    <input
                                        type="date"
                                        value={deadline}
                                        onChange={(e) => setDeadline(e.target.value)}
                                        className="w-full px-4 py-2 bg-slate-900 border border-slate-600 rounded-lg text-white focus:ring-2 focus:ring-blue-500 focus:border-transparent outline-none transition-all"
                                        required
                                    />
                                </div>

                                <div>
                                    <label className="block text-sm font-medium text-slate-300 mb-2">Status</label>
                                    <select
                                        value={status}
                                        onChange={(e) => setStatus(e.target.value)}
                                        className="w-full px-4 py-2 bg-slate-900 border border-slate-600 rounded-lg text-white focus:ring-2 focus:ring-blue-500 focus:border-transparent outline-none transition-all appearance-none"
                                    >
                                        <option value="Pending">Pending</option>
                                        <option value="In Progress">In Progress</option>
                                        <option value="Completed">Completed</option>
                                    </select>
                                </div>
                            </div>

                            <div className="pt-4">
                                <button
                                    type="submit"
                                    className="w-full bg-blue-600 hover:bg-blue-700 text-white font-semibold py-3 px-4 rounded-lg transition-all focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 focus:ring-offset-slate-800"
                                >
                                    {isEditMode ? 'Update Task' : 'Add Task'}
                                </button>
                            </div>
                        </form>
                    )
                )}
            </div>
        </div>
    );
};

export default TaskForm;
