"use client";

import Link from "next/link";
import React, { useState } from "react";
import { useRouter } from "next/navigation";
import axios from "axios";
import toast from "react-hot-toast";

interface LoginUser {
  email: string;
  password: string;
}

const Login = () => {
  const [user, setUser] = useState<LoginUser>({ email: "", password: "" });
  const [loading, setLoading] = useState(false);
  const router = useRouter();

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setUser({ ...user, [e.target.name]: e.target.value });
  };

  const handleLogin = async () => {
    setLoading(true);
    try {
      const res = await axios.post("/api/users/login", user);
      toast.success("Login successful!");
      router.push("/profile");
    } catch (err) {
      alert("Login failed. Please check your credentials.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="flex items-center justify-center min-h-screen bg-gradient-to-r from-indigo-500 to-purple-500">
      <div className="bg-white p-8 rounded-2xl shadow-2xl w-full max-w-md animate-slideIn">
        <h1 className="text-3xl font-bold text-center mb-6 text-indigo-700">Login</h1>

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
          className="w-full p-2 mb-4 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-indigo-400 text-black"
        />

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
          className="w-full p-2 mb-6 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-indigo-400 text-black"
        />

        <button
          onClick={handleLogin}
          disabled={loading}
          className={`w-full p-2 rounded-md transition duration-300 ${
            loading
              ? "bg-gray-400 cursor-not-allowed"
              : "bg-indigo-600 hover:bg-indigo-700 text-white"
          }`}
        >
          {loading ? "Logging in..." : "Login"}
        </button>

        <p className="text-center text-sm text-gray-600 mt-4">
          <Link href="/signup" className="text-indigo-700 font-semibold hover:underline">
            Sign Up
          </Link>
        </p>
      </div>
    </div>
  );
};

export default Login;
