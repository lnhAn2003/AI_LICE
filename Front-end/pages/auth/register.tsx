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
            `url('https://ailice.s3.ap-southeast-2.amazonaws.com/auth/register.jpg?X-Amz-Algorithm=AWS4-HMAC-SHA256&X-Amz-Content-Sha256=UNSIGNED-PAYLOAD&X-Amz-Credential=ASIA4DMVQIWWVTBW5MP2%2F20241210%2Fap-southeast-2%2Fs3%2Faws4_request&X-Amz-Date=20241210T040348Z&X-Amz-Expires=300&X-Amz-Security-Token=IQoJb3JpZ2luX2VjEMz%2F%2F%2F%2F%2F%2F%2F%2F%2F%2FwEaDmFwLXNvdXRoZWFzdC0yIkcwRQIhAIzjid8CHNOiSZBJMy3OJJ8uUf4l0qYdVcQv%2Bp2jc26lAiAN7RKTS6UC1Wv5K8ALDlOe33oqnzY7RAvFX9k6Vk4tvSr1AgiF%2F%2F%2F%2F%2F%2F%2F%2F%2F%2F8BEAAaDDgzMTkyNjU4NDc0OSIMQMCWQ454mOzcIs79KskCVq8l8ZzBVKuXS7cpOWljTwMrFFpYMpuMgdOy%2FAjwuijrvJmmuHk3CtYKEjF07vPlWm11n5ntZdjRiAKF6%2Bj7bX8dJQtXs6ezOL1risMFpOGekXtyDgiRiYuHFwqn5tWAWdRBGy6%2BZ9J4nF1R9AKlv0AsT6bgWYHK%2FQyxCC%2FlWYNRpUzD6yp6CRPwe7fxsxLSQ72wVa3ceo%2FQcPYtF7tIiNTE3IM%2BWJbsNLvy4m%2Fs7ZBpix1%2BeoVORJrytdfXzSrBBIptxw2nFwqNeBOdtedkNkDZyWX4H75Za2LuHxYpOk0W6Rtj3Ypiwoe9K9WXb2LiA6vMuw4dKTwRw54VOj4H%2BWgj39cX7kqj%2BqbOZadJ9CxZrRxshZ9IPpccFOGAVF5DZQD6RqiIFi0nw4OgEud6FPbwl5ym1768YGb88Na57XGxnpiwLCSRk1MwpvneugY6swLYyARVT7Spq2l1dDKf8pywhaGH7Oje02FaSpZnRr6fSdFzhQTJEksBKKJ%2F5jx600ZQy62y%2B3kSy19KiAJb0utg2vAIhOYYAYHldXNqlUhOxQck%2FwqYOj1u4IaVC1LwriXgjg2lwPO%2BXCpnC3ArEL6pGvLpnABf8l0xlbPpJO38Oi1zN4AMiSqx6p6iXFiGT%2B9kbpg6XzCwiuETyLnjJ9CLxXcAliEJ1u1S%2BdgpINrIdYnWtyhAq%2F7smEjRgHAkRg4HV2HUdLJCcUd2ifbfnBO5KCeiDxQXCZSVs%2FelCsOIazRNIoPhBG6RBvR8eIOFBDvzz2ngPbcuqjvV3319d%2BljVYtmniutTbC8ecyh6JEiZ2B7PQDyUE5Upfc6Y5pHrEseTr%2FiNCKyd4DRsayaccBN%2Fd3V&X-Amz-Signature=64f1f2bf4db91c19797e705e31a286314345335e807866e7decac521816075f3&X-Amz-SignedHeaders=host&response-content-disposition=inline')`,
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
