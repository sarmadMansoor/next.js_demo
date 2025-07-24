// app/profile/[id]/page.tsx
"use client";

import { useParams } from "next/navigation";

export default function UserProfileClient() {
  const params = useParams();
  const id = params?.id;

  return (
    <div className="min-h-screen flex flex-col justify-center items-center text-center">
      <h1 className="text-3xl font-bold mb-4">User Profile Page</h1>
      <p className="text-lg text-gray-700">User ID: {id}</p>
    </div>
  );
}
