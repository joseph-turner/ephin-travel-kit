'use client';

import { signIn } from 'next-auth/react';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import { useState } from 'react';

export default function LoginPage() {
  const router = useRouter();
  const [error, setError] = useState<null | string>(null);

  async function handleSubmit(event: React.FormEvent<HTMLFormElement>) {
    try {
      event.preventDefault();
      const formData = new FormData(event.currentTarget);
      const response = await signIn('credentials', {
        ...Object.fromEntries(formData),
        redirect: false,
      });

      if (response?.error) {
        setError('Invalid credentials');
        return;
      }

      router.push('/');
      router.refresh();
    } catch {
      setError('An error occurred during login');
    }
  }

  const handleGoogleSignIn = () => {
    signIn('google');
  };

  return (
    <main className="flex min-h-screen flex-col items-center justify-center bg-gray-100">
      <h1 className="mb-8 text-4xl font-bold">Login</h1>
      <form className="mt-8 space-y-6" onSubmit={handleSubmit}>
        <div className="rounded-md shadow-sm -space-y-px">
          <div>
            <label className="sr-only" htmlFor="email">
              Email address
            </label>
            <input
              className="appearance-none rounded-none relative block w-full px-3 py-2 border border-gray-300 placeholder-gray-500 text-gray-900 rounded-t-md focus:outline-none focus:ring-blue-500 focus:border-blue-500 focus:z-10 sm:text-sm"
              id="email"
              name="email"
              placeholder="Email address"
              required
              type="email"
            />
          </div>
          <div>
            <label className="sr-only" htmlFor="password">
              Password
            </label>
            <input
              className="appearance-none rounded-none relative block w-full px-3 py-2 border border-gray-300 placeholder-gray-500 text-gray-900 rounded-b-md focus:outline-none focus:ring-blue-500 focus:border-blue-500 focus:z-10 sm:text-sm"
              id="password"
              name="password"
              placeholder="Password"
              required
              type="password"
            />
          </div>
        </div>

        {error && (
          <div className="text-red-500 text-sm text-center">{error}</div>
        )}

        <div>
          <button
            className="group relative w-full flex justify-center py-2 px-4 border border-transparent text-sm font-medium rounded-md text-white bg-blue-600 hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500 cursor-pointer"
            type="submit"
          >
            Sign in
          </button>
        </div>
      </form>
      <div className="flex flex-col items-center space-y-4">
        <button
          className="bg-blue-500 text-white p-2 cursor-pointer rounded"
          onClick={handleGoogleSignIn}
          type="button"
        >
          Sign in with Google
        </button>
      </div>
      <div className="text-center">
        <Link className="text-blue-600 hover:underline" href="/register">
          No account? Register.
        </Link>
      </div>
    </main>
  );
}
