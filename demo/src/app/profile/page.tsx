"use client";

import axios from "axios";
import toast from "react-hot-toast";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";

interface UserData {
  id: string;
  email: string;
}

const UserProfile = () => {
  const router = useRouter();
  const [isLoggingOut, setIsLoggingOut] = useState(false);
  const [user, setUser] = useState<UserData | null>(null);

  const logout = async () => {
    setIsLoggingOut(true);
    try {
      await axios.get("/api/users/logout", { withCredentials: true });
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

  const getUserData = async () => {
    try {
      const response = await axios.get("/api/users/me", { withCredentials: true });
      setUser(response.data.data);
    } catch (error) {
      console.error("Error fetching user data:", error);
      toast.error("Failed to fetch user data");
    }
  };

  useEffect(() => {
    getUserData();
  }, []);

  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-gray-100 text-center p-4">
      <h1 className="text-3xl font-bold mb-4 text-gray-800">User Profile</h1>

      {user ? (
        <div className="mb-6">
          <p className="text-lg text-gray-600">Email: {user.email}</p>
        </div>
      ) : (
        <p className="text-gray-500 mb-6">Loading user data...</p>
      )}

      {user && (
        <Link
          href={`/profile/${user.id}`}
          className="bg-blue-500 hover:bg-blue-600 text-white font-semibold py-2 px-6 rounded-xl shadow-md mb-4 transition duration-200"
        >
          View Full Profile
        </Link>
      )}

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
