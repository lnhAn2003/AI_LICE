import { z } from 'zod';

export const registerSchema = z.object({
  username: z.string().nonempty('Tên đăng nhập là bắt buộc'),
  email: z.string().email('Email không hợp lệ').nonempty('Email là bắt buộc'),
  password: z
    .string()
    .min(8, 'Mật khẩu phải có ít nhất 8 ký tự')
    .regex(/[a-z]/, 'Mật khẩu phải chứa ít nhất một chữ cái thường')
    .regex(/[A-Z]/, 'Mật khẩu phải chứa ít nhất một chữ cái hoa')
    .regex(/[0-9]/, 'Mật khẩu phải chứa ít nhất một chữ số'),
  confirmPassword: z.string(),
}).refine((data) => data.password === data.confirmPassword, {
  message: 'Mật khẩu xác nhận không khớp',
  path: ['confirmPassword'],
});
