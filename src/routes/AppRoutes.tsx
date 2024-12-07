import { BrowserRouter as Router, Route, Routes, Navigate } from 'react-router-dom';
import AnimatedBackground from '../components/AnimatedBackground';
import AuthPage from '../pages/AuthPage';

const PrivateRoute = ({ children }: { children: JSX.Element }) => {
  const token = localStorage.getItem('token');
  return token ? children : <Navigate to="/login" />;
};

const AppRoutes = () => {
  return (
    <Routes>
      <Route path="/" element={
        <div className="min-h-screen">
        <AnimatedBackground />
        <AuthPage />
      </div>
      } />
    </Routes>
  );
};

export default AppRoutes;

/*
path="/dashboard"
          element={
            <PrivateRoute>
              
            </PrivateRoute>
          }*/
