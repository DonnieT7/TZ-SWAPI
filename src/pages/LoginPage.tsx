import React from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Navigate } from 'react-router-dom';
import { RootState } from '../store/store';
import { login } from '../store/slices/authSlice';
import AuthForm from '../components/AuthForm';

const LoginPage: React.FC = () => {
  const dispatch = useDispatch();
  const isAuthenticated = useSelector((state: RootState) => state.auth.isAuthenticated);

  const handleLogin = (data: { username: string; password: string }) => {
    if (data.username === 'admin' && data.password === 'password') {
      dispatch(login(data.username));
    } else {
      alert('Invalid login information');
    }
  };

  if (isAuthenticated) {
    return <Navigate to="/" />;
  }

  return (
    <div className="flex items-center justify-center min-h-screen bg-gray-100">
      <AuthForm onSubmit={handleLogin} />
    </div>
  );
};

export default LoginPage;
