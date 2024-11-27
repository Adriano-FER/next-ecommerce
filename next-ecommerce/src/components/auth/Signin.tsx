"use client";

import React, { useState } from "react";
import Link from "next/link";
import { useRouter } from 'next/navigation';
import { useAuth } from "@/context/AuthContext";

const Signin = () => {
  const router = useRouter();
  const { login } = useAuth();
  const [error, setError] = useState<string | null>(null);
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setError(null);
    setLoading(true);

    const formData = new FormData(e.currentTarget);
    const email = formData.get('email');
    const password = formData.get('password');

    try {
      const response = await fetch('http://localhost:4444/login', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ email, password }),
      });

      const data = await response.json();

      if (!response.ok) {
        throw new Error(data.message || 'Error al iniciar sesión');
      }

      login(data.token, data.userId);
      router.push('/');
      router.refresh();

    } catch (error: any) {
      setError(error.message);
    } finally {
      setLoading(false);
    }
  };

  return (
    <section className="flex items-center justify-center w-full h-screen px-4">
      <form
        onSubmit={handleSubmit}
        className="p-6 xs:p-10 w-full max-w-[350px] flex flex-col justify-between items-center gap-4 bg-white rounded text-black"
      >
        <h1 className="w-full text-2xl font-bold">Iniciar sesión</h1>

        {error && (
          <div className="w-full p-3 text-sm text-red-500 bg-red-100 rounded">
            {error}
          </div>
        )}
        
        <div className="w-full">
          <label htmlFor="email" className="block text-sm font-medium text-gray-700 mb-1">
            Email
          </label>
          <input
            type="email"
            id="email"
            name="email"
            defaultValue="mockuser@example.com"
            className="w-full p-2 border rounded-md"
            required
          />
        </div>

        <div className="w-full">
          <label htmlFor="password" className="block text-sm font-medium text-gray-700 mb-1">
            Contraseña
          </label>
          <input
            type="password"
            id="password"
            name="password"
            defaultValue="mockpass"
            className="w-full p-2 border rounded-md"
            required
          />
        </div>

        <button
          type="submit"
          disabled={loading}
          className={`w-full py-2 px-4 bg-lama text-white rounded-md transition-colors
            ${loading ? 'opacity-50 cursor-not-allowed' : 'hover:bg-lama/90'}`}
        >
          {loading ? 'Iniciando sesión...' : 'Iniciar sesión'}
        </button>

        <div className="w-full flex items-center my-4">
          <div className="flex-1 border-t"></div>
          <span className="px-4 text-sm text-gray-500">o</span>
          <div className="flex-1 border-t"></div>
        </div>

        <button
          type="button"
          className="w-full h-10 justify-center flex py-1.5 px-4 text-sm align-middle items-center rounded text-999 bg-[#F4F4F5] transition duration-150 ease hover:bg-gray-200 gap-3"
          onClick={() => signIn("google")}
        >
          <svg
            data-testid="geist-icon"
            height="24"
            strokeLinejoin="round"
            viewBox="0 0 16 16"
            width="24"
            style={{ color: 'currentColor' }}
          >
            <path
              d="M8.15991 6.54543V9.64362H12.4654C12.2763 10.64 11.709 11.4837 10.8581 12.0509L13.4544 14.0655C14.9671 12.6692 15.8399 10.6182 15.8399 8.18188C15.8399 7.61461 15.789 7.06911 15.6944 6.54552L8.15991 6.54543Z"
              fill="#4285F4"
            ></path>
            <path
              d="M3.6764 9.52268L3.09083 9.97093L1.01807 11.5855C2.33443 14.1963 5.03241 16 8.15966 16C10.3196 16 12.1305 15.2873 13.4542 14.0655L10.8578 12.0509C10.1451 12.5309 9.23598 12.8219 8.15966 12.8219C6.07967 12.8219 4.31245 11.4182 3.67967 9.5273L3.6764 9.52268Z"
              fill="#34A853"
            ></path>
            <path
              d="M1.01803 4.41455C0.472607 5.49087 0.159912 6.70543 0.159912 7.99995C0.159912 9.29447 0.472607 10.509 1.01803 11.5854C1.01803 11.5926 3.6799 9.51991 3.6799 9.51991C3.5199 9.03991 3.42532 8.53085 3.42532 7.99987C3.42532 7.46889 3.5199 6.95983 3.6799 6.47983L1.01803 4.41455Z"
              fill="#FBBC05"
            ></path>
            <path
              d="M8.15982 3.18545C9.33802 3.18545 10.3853 3.59271 11.2216 4.37818L13.5125 2.0873C12.1234 0.792777 10.3199 0 8.15982 0C5.03257 0 2.33443 1.79636 1.01807 4.41455L3.67985 6.48001C4.31254 4.58908 6.07983 3.18545 8.15982 3.18545Z"
              fill="#EA4335"
            ></path>
          </svg>
          Continuar con Google
        </button>

        <Link 
          href="/register" 
          className="text-sm text-gray-500 transition duration-150 ease hover:text-black"
        >
          ¿No tienes una cuenta? Regístrate
        </Link>
      </form>
    </section>
  );
};

export default Signin;