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
            `url('https://ailice.s3.ap-southeast-2.amazonaws.com/auth/login.jpg?X-Amz-Algorithm=AWS4-HMAC-SHA256&X-Amz-Content-Sha256=UNSIGNED-PAYLOAD&X-Amz-Credential=ASIA4DMVQIWWY4DH34NF%2F20241210%2Fap-southeast-2%2Fs3%2Faws4_request&X-Amz-Date=20241210T040153Z&X-Amz-Expires=300&X-Amz-Security-Token=IQoJb3JpZ2luX2VjEMz%2F%2F%2F%2F%2F%2F%2F%2F%2F%2FwEaDmFwLXNvdXRoZWFzdC0yIkYwRAIgEvqBjj9LZ904wXWNFmxSfjX2FAD4%2B84kSi4lm%2FszfbACIB7MWSQeuN8MZP55hfGhvW7B9VDn7d7ZmF%2BOXwhoIJLEKvUCCIX%2F%2F%2F%2F%2F%2F%2F%2F%2F%2FwEQABoMODMxOTI2NTg0NzQ5Igwk9ut2GRejLvGpcHwqyQKpxu5heBI6zJe3AzCvL7Yna3ouNFtdDp%2BhEs5ijJgdHs5fcHu8cc8jDLmJ43ag8skuPdKUOHseAlFK%2FievxO0Fr6hJrer978sQPKWdvCQNBUWtaJSQWY%2BXeGG%2FZ%2FB%2BmpKoiz%2BTkawwzBTvvYJ%2F8oXQcgVrEeDZcqYlQnOzSBW4bQqYR1Fcd0IKPGJvFLesUFDVok5NLxImU3Z4qdf9X5AwnXwigo%2BUY65L4sAvhesRrSMdIeLGl%2FeolP3GkKS6cvB1Tgbmgve5fmadbXsgOMlj7kgkV%2BAKkZmwaRLRiltL%2BjqVv4DbjuRRdBw0zrq62B5pAO2rxtqDTD4%2FO41%2B2m3bUNg55upTLFke4POzDvaL%2FmUQygUE9rJ4x4e4PR1%2B1YcvOVwJ1%2BtEMRwVGY0wI7SkeFBXTnTGidoN1PT8vEuPCjNFTFLE1ltItjCm%2Bd66Bjq0Ap4sg064mdkn1xE4N4yVFExjZ3%2Bx%2F%2BAB2nKNlOCdoRu0wQdRW0ZM7hcOcct%2BZ3CeDSLNyZieMqnnXTFyLkvTRRLX1tAo6jJOGUYGM1xURbJEms1HWRw7ZjSdV%2BKt84ocKHqogI3hzcfGZbEc2WpLOIUZsqVW48g%2FkDm3hSxhsl1z4M4irKqvc%2FjTpE1WIbaUTX5puq5hAtVxEgdzZX2c%2FhgmKsnkBes8u75jxeSry1VHZC%2FZflxXZhl6d2eqYqUR2pxg3TcD%2B%2BIxCk6zdbIZbOOCR%2FgT4Mu5VEKeebYO6pwjc4eQKP4QkfcL0o6%2FCaSzYmJ4lIEUdLbrw%2FvAy6471l81WmVxXIns41gokV7TEHvfOB2246HUI6UElbgwkx3E7KR%2FVOtSZb43lZ4F84%2B%2BTuJ1f8G%2B&X-Amz-Signature=70cda870d1e7fbfc08ffac0c4ea0ab2121d48bc3a9929a7e23eed5bb6eba6fb2&X-Amz-SignedHeaders=host&response-content-disposition=inline')`,
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
