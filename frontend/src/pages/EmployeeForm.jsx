import { useState, useEffect } from 'react';
import { Link, useNavigate, useParams } from 'react-router-dom';
import { toast } from 'react-toastify';
import { useCreateEmployeeMutation, useGetEmployeeDetailsQuery, useUpdateEmployeeMutation } from '../slices/employeesApiSlice';

const EmployeeForm = () => {
    const { id: employeeId } = useParams();
    const isEditMode = !!employeeId;

    const [name, setName] = useState('');
    const [email, setEmail] = useState('');
    const [phone, setPhone] = useState('');
    const [department, setDepartment] = useState('');
    const [status, setStatus] = useState('Active');

    const navigate = useNavigate();

    const { data: employee, isLoading: loadingDetails } = useGetEmployeeDetailsQuery(employeeId, {
        skip: !isEditMode,
    });

    const [createEmployee, { isLoading: loadingCreate }] = useCreateEmployeeMutation();
    const [updateEmployee, { isLoading: loadingUpdate }] = useUpdateEmployeeMutation();

    useEffect(() => {
        if (isEditMode && employee) {
            setName(employee.name);
            setEmail(employee.email);
            setPhone(employee.phone);
            setDepartment(employee.department);
            setStatus(employee.status);
        }
    }, [isEditMode, employee]);

    const submitHandler = async (e) => {
        e.preventDefault();
        try {
            if (isEditMode) {
                await updateEmployee({ employeeId, name, email, phone, department, status }).unwrap();
            } else {
                await createEmployee({ name, email, phone, department, status }).unwrap();
            }
            navigate('/employees');
        } catch (err) {
            toast.error(err?.data?.message || err.error);
            console.error(err);
        }
    };

    return (
        <div className="min-h-screen bg-slate-900 text-white p-8">
            <Link to="/employees" className="inline-flex items-center text-slate-400 hover:text-white mb-6 transition-colors font-medium">
                ← Back to List
            </Link>

            <div className="max-w-2xl mx-auto bg-slate-800 rounded-xl shadow-lg border border-slate-700 p-8">
                <h1 className="text-2xl font-bold mb-6 text-white tracking-tight">
                    {isEditMode ? 'Edit Employee' : 'Add Employee'}
                </h1>

                {loadingDetails ? (
                    <div className="text-slate-400">Loading details...</div>
                ) : (
                    <form onSubmit={submitHandler} className="space-y-6">
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                            <div className="col-span-2">
                                <label className="block text-sm font-medium text-slate-300 mb-2">Name</label>
                                <input
                                    type="text"
                                    placeholder="Enter full name"
                                    value={name}
                                    onChange={(e) => setName(e.target.value)}
                                    className="w-full px-4 py-2 bg-slate-900 border border-slate-600 rounded-lg text-white focus:ring-2 focus:ring-blue-500 focus:border-transparent outline-none transition-all"
                                    required
                                />
                            </div>

                            <div>
                                <label className="block text-sm font-medium text-slate-300 mb-2">Email Address</label>
                                <input
                                    type="email"
                                    placeholder="Enter email"
                                    value={email}
                                    onChange={(e) => setEmail(e.target.value)}
                                    className="w-full px-4 py-2 bg-slate-900 border border-slate-600 rounded-lg text-white focus:ring-2 focus:ring-blue-500 focus:border-transparent outline-none transition-all"
                                    required
                                />
                            </div>

                            <div>
                                <label className="block text-sm font-medium text-slate-300 mb-2">Phone Number</label>
                                <input
                                    type="text"
                                    placeholder="Enter phone number"
                                    value={phone}
                                    onChange={(e) => setPhone(e.target.value)}
                                    className="w-full px-4 py-2 bg-slate-900 border border-slate-600 rounded-lg text-white focus:ring-2 focus:ring-blue-500 focus:border-transparent outline-none transition-all"
                                    required
                                />
                            </div>

                            <div>
                                <label className="block text-sm font-medium text-slate-300 mb-2">Department</label>
                                <input
                                    type="text"
                                    placeholder="e.g. Engineering"
                                    value={department}
                                    onChange={(e) => setDepartment(e.target.value)}
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
                                    <option value="Active">Active</option>
                                    <option value="Inactive">Inactive</option>
                                </select>
                            </div>
                        </div>

                        <div className="pt-4">
                            <button
                                type="submit"
                                className="w-full bg-blue-600 hover:bg-blue-700 text-white font-semibold py-3 px-4 rounded-lg transition-all focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 focus:ring-offset-slate-800"
                            >
                                {isEditMode ? 'Update Employee' : 'Add Employee'}
                            </button>
                        </div>
                    </form>
                )}
            </div>
        </div>
    );
};

export default EmployeeForm;
