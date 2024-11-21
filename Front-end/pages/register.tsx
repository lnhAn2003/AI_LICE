import React, { useContext } from 'react';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { AuthContext } from '../src/contexts/AuthContext';
import axiosInstance from '../src/utils/axiosInstance';
import Link from 'next/link';
import { registerSchema } from '../src/schemas/userSchema';

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
    <div
      className="min-h-screen flex items-center justify-center bg-cover bg-center"
      style={{ backgroundImage: `url('https://images.unsplash.com/photo-1554110397-9bac083977c6?q=80&w=1470&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D')` }}
    >
      <div className="w-full max-w-md bg-white p-8 rounded shadow-md">
        <h1 className="text-2xl font-bold mb-4 text-center">Register</h1>
        <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
          <div>
            <input
              {...register('username')}
              placeholder="Username"
              className="w-full px-3 py-2 border rounded focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
            {errors.username && <p className="text-red-500 mt-1">{errors.username.message}</p>}
          </div>
          <div>
            <input
              {...register('email')}
              placeholder="Email"
              type="email"
              className="w-full px-3 py-2 border rounded focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
            {errors.email && <p className="text-red-500 mt-1">{errors.email.message}</p>}
          </div>
          <div>
            <input
              {...register('password')}
              placeholder="Password"
              type="password"
              className="w-full px-3 py-2 border rounded focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
            {errors.password && <p className="text-red-500 mt-1">{errors.password.message}</p>}
          </div>
          <div>
            <input
              {...register('confirmPassword')}
              placeholder="Confirm Password"
              type="password"
              className="w-full px-3 py-2 border rounded focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
            {errors.confirmPassword && (
              <p className="text-red-500 mt-1">{errors.confirmPassword.message}</p>
            )}
          </div>
          <button
            type="submit"
            className="w-full bg-green-500 text-white py-2 rounded hover:bg-green-600 transition"
          >
            Register
          </button>
        </form>
        <p className="text-center mt-4">
          Already have an account?{' '}
          <Link href="/login" className="text-blue-500 hover:underline">
            Login here
          </Link>
        </p>
      </div>
    </div>
  );
};

export default RegisterPage;
