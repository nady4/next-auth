"use client";
import { signOut } from "next-auth/react";

function DashboardPage() {
  return (
    <section className="h-[calc(100vh-7rem)] flex flex-col justify-center items-center">
      <h1 className="text-white text-5xl mb-4">Dashboard</h1>
      <button
        className="p-3 bg-blue-600 text-white rounded-lg hover:bg-blue-500 active:bg-blue-700"
        onClick={() => signOut()}
      >
        Logout
      </button>
    </section>
  );
}

export default DashboardPage;
