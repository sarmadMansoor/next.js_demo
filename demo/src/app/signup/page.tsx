"use client";
import Link from "next/link";
import React, { useState } from "react";
import { useRouter } from "next/navigation";
import axios from "axios";

interface User {
  email: string;
  password: string;
  username: string;
}

const Signup = () => {
  const [user, setUser] = useState<User>({
    email: "",
    password: "",
    username: "",
  });

  const [loading, setLoading] = useState<boolean>(false);
  const [error, setError] = useState<string | null>(null);

  const router = useRouter();

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setUser({ ...user, [e.target.name]: e.target.value });
  };

  const handleSubmit = async () => {
    setLoading(true);
    setError(null);
    try {
      const response = await axios.post("/api/users/signup", user);
      console.log("Signup successful:", response.data);
      router.push("/login");
    } 
    catch (err: unknown) {
      if(err instanceof Error)
      {
        console.error("Signup error:", err);
      }
      
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="flex items-center justify-center min-h-screen bg-gradient-to-r from-indigo-500 to-purple-500">
      <div className="bg-white p-8 rounded-2xl shadow-2xl w-full max-w-md animate-slideIn">
        <h1 className="text-3xl font-bold text-center mb-6 text-indigo-700">
          Sign Up
        </h1>

        {/* Error Message */}
        {error && (
          <div className="bg-red-100 text-red-700 p-2 rounded-md mb-4 text-center">
            {error}
          </div>
        )}

        {/* Username */}
        <label className="block text-gray-700 font-medium mb-1" htmlFor="username">
          Username
        </label>
        <input
          type="text"
          id="username"
          name="username"
          value={user.username}
          onChange={handleChange}
          placeholder="Enter your username"
          className="w-full p-2 mb-4 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-indigo-400 text-black"
        />

        {/* Email */}
        <label className="block text-gray-700 font-medium mb-1" htmlFor="email">
          Email
        </label>
        <input
          type="email"
          id="email"
          name="email"
          value={user.email}
          onChange={handleChange}
          placeholder="Enter your email"
          className="w-full p-2 mb-4 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-indigo-400  text-black"
        />

        {/* Password */}
        <label className="block text-gray-700 font-medium mb-1" htmlFor="password">
          Password
        </label>
        <input
          type="password"
          id="password"
          name="password"
          value={user.password}
          onChange={handleChange}
          placeholder="Enter your password"
          className="w-full p-2 mb-6 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-indigo-400  text-black"
        />

        {/* Submit Button */}
        <button
          onClick={handleSubmit}
          disabled={loading}
          className="w-full bg-indigo-600 text-white p-2 rounded-md hover:bg-indigo-700 transition duration-300 disabled:opacity-60"
        >
          {loading ? "Signing Up..." : "Sign Up"}
        </button>

        <p className="text-center text-sm text-gray-600 mt-4">
          Already have an account?{" "}
          <Link href="/login" className="text-indigo-700 font-semibold hover:underline">
            Log In
          </Link>
        </p>
      </div>
    </div>
  );
};

export default Signup;
