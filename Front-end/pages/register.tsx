import React from 'react';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { registerSchema } from '../schemas/userSchema';
import { z } from 'zod';
import { AuthContext } from '../contexts/AuthContext';
import { useContext } from 'react';

type RegisterInput = z.infer<typeof registerSchema>;

const RegisterPage: React.FC = () => {
  const { register: registerUser } = useContext(AuthContext)!;

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<RegisterInput>({
    resolver: zodResolver(registerSchema),
  });

  const onSubmit = async (data: RegisterInput) => {
    try {
      await registerUser({
        username: data.username,
        email: data.email,
        password: data.password,
      });
    } catch (err) {
        throw(err);
    }
  };

  return (
    <div>
      <h1>Đăng Ký</h1>
      <form onSubmit={handleSubmit(onSubmit)}>
        <div>
          <input {...register('username')} placeholder="Tên đăng nhập" />
          {errors.username && <p style={{ color: 'red' }}>{errors.username.message}</p>}
        </div>
        <div>
          <input {...register('email')} placeholder="Email" />
          {errors.email && <p style={{ color: 'red' }}>{errors.email.message}</p>}
        </div>
        <div>
          <input {...register('password')} type="password" placeholder="Mật khẩu" />
          {errors.password && <p style={{ color: 'red' }}>{errors.password.message}</p>}
        </div>
        <div>
          <input {...register('confirmPassword')} type="password" placeholder="Xác nhận mật khẩu" />
          {errors.confirmPassword && (
            <p style={{ color: 'red' }}>{errors.confirmPassword.message}</p>
          )}
        </div>
        <button type="submit">Đăng Ký</button>
      </form>
    </div>
  );
};

export default RegisterPage;
