import React from "react";

export default function LoginPage() {
  return (
    <div className="flex justify-center items-center h-full">
      <div className="w-1/3 h-2/3 border-2 border-blue-300 p-4 rounded-3xl bg-white px-20">
        <form className="flex flex-col space-y-6 mt-6">
          <div>
            <label htmlFor="email" className="block text-sm font-medium text-gray-700">
              Email
            </label>
            <input
              type="email"
              id="email"
              className="mt-1 block w-full px-4 py-2 border border-gray-300 rounded-xl shadow-sm focus:ring-blue-400 focus:border-blue-400"
              placeholder="you@example.com"
            />
          </div>

          <div>
            <label htmlFor="password" className="block text-sm font-medium text-gray-700">
              Parolă
            </label>
            <input
              type="password"
              id="password"
              className="mt-1 block w-full px-4 py-2 border border-gray-300 rounded-xl shadow-sm focus:ring-blue-400 focus:border-blue-400"
              placeholder="••••••••"
            />
          </div>

          <button
            type="submit"
            className="w-full mx-auto mb-4 bg-blue-400 text-white py-2 rounded-xl shadow-lg hover:bg-blue-200 hover:text-black transition cursor-pointer"
          >
            Autentificare
          </button>
          <button
            type="submit"
            className="w-full mx-auto bg-blue-400 text-white py-2 rounded-xl shadow-lg hover:bg-blue-200 hover:text-black transition cursor-pointer"
          >
            Creare cont
          </button>
          <p className="text-center text-gray-600 hover:underline cursor-pointer">Ti-ai uitat parola?</p>
        </form>
        
      </div>
    </div>
  );
}