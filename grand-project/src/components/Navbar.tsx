"use client";
import Link from "next/link";

export default function Navbar() {
  return (
    <nav className="bg-white border-b p-4 flex justify-between">
      <Link href="/" className="font-bold text-lg">Recipe Fodge</Link>
      <div className="flex gap-4">
        <Link href="/about">About</Link>
        <Link href="/login">Login</Link>
      </div>
    </nav>
  );
}
