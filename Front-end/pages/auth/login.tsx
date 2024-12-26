// pages/auth/login.tsx
import React, { useState, useContext } from 'react';
import Link from 'next/link';
import { AuthContext } from '../../src/contexts/AuthContext';
import axios from 'axios';

const LoginPage: React.FC = () => {
  const authContext = useContext(AuthContext);
  if (!authContext) return null;

  const { login } = authContext;

  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState<string>('');

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      await login(email, password);
    } catch (err) {
      if (axios.isAxiosError(err)) {
        setError(err.response?.data?.message || 'An error occurred');
      } else {
        setError('An unexpected error occurred');
      }
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
          Welcome Back
        </h1>
        {error && (
          <p className="text-red-500 text-center mb-4 font-semibold">{error}</p>
        )}
        <form onSubmit={handleSubmit} className="space-y-5">
          <input
            name="email"
            type="email"
            placeholder="Email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
            className="w-full px-3 py-2 border border-gray-300 dark:border-gray-700 rounded focus:outline-none focus:ring-2 focus:ring-primary dark:bg-gray-700 dark:text-gray-100"
          />
          <input
            name="password"
            type="password"
            placeholder="Password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required
            className="w-full px-3 py-2 border border-gray-300 dark:border-gray-700 rounded focus:outline-none focus:ring-2 focus:ring-primary dark:bg-gray-700 dark:text-gray-100"
          />
          <button
            type="submit"
            className="w-full bg-primary hover:bg-primary-dark text-white py-2 rounded transition font-semibold"
          >
            Login
          </button>
        </form>
        <p className="text-center mt-4 text-gray-700 dark:text-gray-300">
          Don&apos;t have an account?{' '}
          <Link href="/auth/register" className="text-primary hover:underline font-semibold">
            Register here
          </Link>
        </p>
      </div>
    </div>
  );
};

export default LoginPage;
