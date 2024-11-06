// pages/register.tsx

import React, { useContext } from 'react';
import { useForm } from 'react-hook-form';
import { AuthContext } from '../contexts/AuthContext';
import axios from 'axios';

type RegisterInput = {
  username: string;
  email: string;
  password: string;
};

const RegisterPage: React.FC = () => {
  const { register, handleSubmit, formState: { errors } } = useForm<RegisterInput>();
  const { login } = useContext(AuthContext)!;

  const onSubmit = async (data: RegisterInput) => {
    try {
      await axios.post('http://localhost:5000/users/register', data);
      await login(data.email, data.password);
    } catch (err) {
      console.error(err);
    }
  };

  return (
    <form onSubmit={handleSubmit(onSubmit)}>
      <input {...register('username', { required: 'Username required' })} placeholder="Username" />
      {errors.username && <p>{errors.username.message}</p>}
      <input {...register('email', { required: 'Email required' })} placeholder="Email" />
      {errors.email && <p>{errors.email.message}</p>}
      <input {...register('password', { required: 'Password required' })} placeholder="Password" type="password" />
      {errors.password && <p>{errors.password.message}</p>}
      <button type="submit">Register</button>
    </form>
  );
};

export default RegisterPage;
