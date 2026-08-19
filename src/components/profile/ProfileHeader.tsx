"use client";

import Link from "next/link";
import { useAuth } from "@/src/context/AuthContext";

export default function ProfileHeader() {
  const { user } = useAuth();

  return (
    <div className="flex justify-between items-center">
      <div className="text-sm">
        <Link href="/" className="text-gray-600">Home</Link>
        <span className="mx-3 text-black">/</span>
        <span>My Account</span>
      </div>

      <p className="text-sm">
        Welcome!{" "}
        <span className="text-primary">
          {user?.full_name}
        </span>
      </p>
    </div>
  );
}