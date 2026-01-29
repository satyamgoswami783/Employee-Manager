import { Link, useNavigate } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { logout } from '../slices/authSlice';

const Header = () => {
    const { userInfo } = useSelector((state) => state.auth);
    const dispatch = useDispatch();
    const navigate = useNavigate();

    const logoutHandler = () => {
        dispatch(logout());
        navigate('/login');
    };

    return (
        <header className="bg-slate-800 border-b border-slate-700 shadow-sm">
            <nav className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-16 flex items-center justify-between">
                <Link to="/" className="text-xl font-bold text-white tracking-tight hover:text-blue-400 transition-colors">
                    EmpManager
                </Link>
                {userInfo && (
                    <div className="flex items-center gap-6">
                        {userInfo.isAdmin && (
                            <>
                                <Link to="/" className="text-sm font-medium text-slate-300 hover:text-white transition-colors">
                                    Dashboard
                                </Link>
                                <Link to="/employees" className="text-sm font-medium text-slate-300 hover:text-white transition-colors">
                                    Employees
                                </Link>
                            </>
                        )}
                        <Link to="/tasks" className="text-sm font-medium text-slate-300 hover:text-white transition-colors">
                            Tasks
                        </Link>

                        <div className="flex items-center gap-4 pl-6 border-l border-slate-700">
                            <span className="text-sm text-slate-400">
                                {userInfo.name}
                            </span>
                            <button
                                onClick={logoutHandler}
                                className="text-sm font-medium text-red-400 hover:text-red-300 transition-colors"
                            >
                                Logout
                            </button>
                        </div>
                    </div>
                )}
            </nav>
        </header>
    );
};

export default Header;
