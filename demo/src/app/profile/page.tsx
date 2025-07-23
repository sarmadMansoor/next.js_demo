"use client";

import axios from "axios";
import toast from "react-hot-toast";
import { useRouter } from "next/navigation";
import { useState } from "react";

const UserProfile = () => {
  const router = useRouter();
  const [isLoggingOut, setIsLoggingOut] = useState(false);

  const logout = async () => {
    setIsLoggingOut(true);
    try {
      await axios.get("/api/users/logout");
      toast.success("Logout successful");
      router.push("/login");
    } catch (err: unknown) {
      if (err instanceof Error) {
        toast.error(`Logout failed: ${err.message}`);
      }
    } finally {
      setIsLoggingOut(false);
    }
  };

  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-gray-100 text-center p-4">
      <h1 className="text-3xl font-bold mb-4 text-gray-800">User Profile</h1>
      <button
        onClick={logout}
        disabled={isLoggingOut}
        className={`${
          isLoggingOut ? "bg-gray-400 cursor-not-allowed" : "bg-red-500 hover:bg-red-600"
        } text-white font-semibold py-2 px-6 rounded-xl shadow-lg transition duration-200`}
      >
        {isLoggingOut ? "Logging out..." : "Logout"}
      </button>
    </div>
  );
};

export default UserProfile;
