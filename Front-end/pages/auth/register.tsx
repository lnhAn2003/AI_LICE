// pages/auth/register.tsx
import React, { useContext } from 'react';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { AuthContext } from '../../src/contexts/AuthContext';
import axiosInstance from '../../src/utils/axiosInstance';
import Link from 'next/link';
import { registerSchema } from '../../src/schemas/userSchema';

type RegisterInput = {
  username: string;
  email: string;
  password: string;
  confirmPassword: string;
};

const RegisterPage: React.FC = () => {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<RegisterInput>({
    resolver: zodResolver(registerSchema),
  });

  const authContext = useContext(AuthContext);
  if (!authContext) return null;

  const { login } = authContext;

  const onSubmit = async (data: RegisterInput) => {
    try {
      await axiosInstance.post('/users/register', {
        username: data.username,
        email: data.email,
        password: data.password,
      });
      await login(data.email, data.password);
    } catch (err) {
      console.error(err);
    }
  };

  return (
    <div className="min-h-screen relative flex items-center justify-center bg-gray-100 dark:bg-gray-900">
      {/* Background Image */}
      <div
        className="absolute inset-0 bg-cover bg-center filter brightness-75"
        style={{
          backgroundImage:
            `url('https://img.freepik.com/free-vector/geometric-gradient-futuristic-background_23-2149116406.jpg')`,
        }}
      />
      {/* Gradient Overlay */}
      <div className="absolute inset-0 bg-gradient-to-br from-black/60 to-transparent" />

      <div className="relative w-full max-w-md bg-white dark:bg-gray-800 p-8 rounded shadow-2xl ring-1 ring-black/5">
        <h1 className="text-3xl font-extrabold mb-6 text-center text-gray-800 dark:text-gray-100">
          Create Your Account
        </h1>
        <form onSubmit={handleSubmit(onSubmit)} className="space-y-5">
          <div>
            <input
              {...register('username')}
              placeholder="Username"
              className="w-full px-3 py-2 border border-gray-300 dark:border-gray-700 rounded focus:outline-none focus:ring-2 focus:ring-primary dark:bg-gray-700 dark:text-gray-100"
            />
            {errors.username && <p className="text-red-500 mt-1 font-semibold">{errors.username.message}</p>}
          </div>
          <div>
            <input
              {...register('email')}
              placeholder="Email"
              type="email"
              className="w-full px-3 py-2 border border-gray-300 dark:border-gray-700 rounded focus:outline-none focus:ring-2 focus:ring-primary dark:bg-gray-700 dark:text-gray-100"
            />
            {errors.email && <p className="text-red-500 mt-1 font-semibold">{errors.email.message}</p>}
          </div>
          <div>
            <input
              {...register('password')}
              placeholder="Password"
              type="password"
              className="w-full px-3 py-2 border border-gray-300 dark:border-gray-700 rounded focus:outline-none focus:ring-2 focus:ring-primary dark:bg-gray-700 dark:text-gray-100"
            />
            {errors.password && <p className="text-red-500 mt-1 font-semibold">{errors.password.message}</p>}
          </div>
          <div>
            <input
              {...register('confirmPassword')}
              placeholder="Confirm Password"
              type="password"
              className="w-full px-3 py-2 border border-gray-300 dark:border-gray-700 rounded focus:outline-none focus:ring-2 focus:ring-primary dark:bg-gray-700 dark:text-gray-100"
            />
            {errors.confirmPassword && (
              <p className="text-red-500 mt-1 font-semibold">{errors.confirmPassword.message}</p>
            )}
          </div>
          <button
            type="submit"
            className="w-full bg-green-600 hover:bg-green-700 text-white py-2 rounded transition font-semibold"
          >
            Register
          </button>
        </form>
        <p className="text-center mt-4 text-gray-700 dark:text-gray-300">
          Already have an account?{' '}
          <Link href="/auth/login" className="text-blue-500 hover:underline font-semibold">
            Login here
          </Link>
        </p>
      </div>
    </div>
  );
};

export default RegisterPage;
