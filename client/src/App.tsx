import './App.css';
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import HomePage from './pages/HomePage/HomePage';
import CoursesPage from './pages/CoursesPage/CoursesPage';
import SignUpPage from './pages/AuthenticationPage/SignUpPage/SignUpPage';
import LoginPage from './pages/AuthenticationPage/LoginPage/LoginPage';
import { useAuth } from './context/AuthContext';
import PublicLayout from './layouts/PublicLayout';
import DashboardLayout from './layouts/Dashboard/DashboardLayout';
import Dashboard from './pages/DashboardPage/Dashboard';

function App() {
  const { isAuthenticated } = useAuth();

  return (
    <Router>
      <Routes>
        {isAuthenticated ? (
          // Routes available only to authenticated users
          <>
            <Route path="/dashboard" element={<DashboardLayout><Dashboard /></DashboardLayout>} />
            {/* Redirect root and other unspecified routes to /dashboard when authenticated */}
            <Route path="/" element={<Navigate to="/dashboard" replace />} />
            <Route path="*" element={<Navigate to="/dashboard" replace />} />
          </>
        ) : (
          // Public routes
          <>
            <Route path="/" element={<PublicLayout><HomePage /></PublicLayout>} />
            <Route path="/courses" element={<PublicLayout><CoursesPage /></PublicLayout>} />
            <Route path="/signup" element={<PublicLayout><SignUpPage /></PublicLayout>} />
            <Route path="/login" element={<PublicLayout><LoginPage /></PublicLayout>} />
            <Route path="/dashboard/*" element={<Navigate to="/login" />} />
            {/* Fallback for any other public route */}
            <Route path="*" element={<h1>404 - Not Found</h1>} />
          </>
        )}
      </Routes>
      <ToastContainer position='bottom-left' newestOnTop={true} closeOnClick={true} autoClose={3500} pauseOnHover={false} />
    </Router>
  );
}

export default App;
