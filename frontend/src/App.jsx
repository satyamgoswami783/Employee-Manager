import { BrowserRouter, Routes, Route } from 'react-router-dom';
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import Login from './pages/Login';
import Signup from './pages/Signup';
import Dashboard from './pages/Dashboard';
import PrivateRoute from './components/PrivateRoute';
import Header from './components/Header';
import EmployeeList from './pages/EmployeeList';
import EmployeeForm from './pages/EmployeeForm';
import TaskList from './pages/TaskList';
import TaskForm from './pages/TaskForm';
import UserListScreen from './screens/UserListScreen';

function App() {
  return (
    <BrowserRouter>
      <ToastContainer />
      <Routes>
        <Route path="/login" element={<Login />} />
        <Route path="/signup" element={<Signup />} />

        {/* Protected Routes */}
        <Route path="" element={<PrivateRoute />}>
          <Route path="/" element={
            <>
              <Header />
              <Dashboard />
            </>
          } />
          <Route path="/employees" element={
            <>
              <Header />
              <EmployeeList />
            </>
          } />
          <Route path="/employees/add" element={
            <>
              <Header />
              <EmployeeForm />
            </>
          } />
          <Route path="/employees/:id/edit" element={
            <>
              <Header />
              <EmployeeForm />
            </>
          } />
          <Route path="/tasks" element={
            <>
              <Header />
              <TaskList />
            </>
          } />
          <Route path="/tasks/add" element={
            <>
              <Header />
              <TaskForm />
            </>
          } />
          <Route path="/tasks/:id/edit" element={
            <>
              <Header />
              <TaskForm />
            </>
          } />
          <Route path="/admin/users" element={
            <>
              <Header />
              <UserListScreen />
            </>
          } />
        </Route>
      </Routes>
    </BrowserRouter>
  );
}

export default App;
