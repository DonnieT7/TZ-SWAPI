import React from 'react';
import { useForm } from 'react-hook-form';

interface LoginFormProps {
  onSubmit: (data: LoginFormValues) => void;
}

interface LoginFormValues {
  username: string;
  password: string;
}

// Компонент формы авторизации
const AuthForm: React.FC<LoginFormProps> = ({ onSubmit }) => {
  const { register, handleSubmit } = useForm<LoginFormValues>();

  return (
    <form onSubmit={handleSubmit(onSubmit)} className="w-full max-w-md p-8 mx-auto space-y-4 bg-white rounded shadow-md">
      <h2 className="text-2xl font-semibold text-center text-gray-700">Login</h2>
      {/* Поле ввода имени пользователя */}
      <div>
        <label className="block mb-2 text-sm font-medium text-gray-600">Username</label>
        <input
          {...register('username', { required: true })}
          className="w-full px-3 py-2 border rounded focus:outline-none focus:ring-2 focus:ring-purple-500"
          placeholder="Enter username"
        />
      </div>
      {/* Поле ввода пароля */}
      <div>
        <label className="block mb-2 text-sm font-medium text-gray-600">Password</label>
        <input
          type="password"
          {...register('password', { required: true })}
          className="w-full px-3 py-2 border rounded focus:outline-none focus:ring-2 focus:ring-purple-500"
          placeholder="Enter password"
        />
      </div>
      {/* Кнопка отправки формы */}
      <button
        type="submit"
        className="w-full px-4 py-2 text-white bg-purple-500 rounded hover:bg-purple-600 focus:outline-none focus:ring-2 focus:ring-purple-500"
      >
        Login
      </button>
    </form>
  );
};

export default AuthForm;
