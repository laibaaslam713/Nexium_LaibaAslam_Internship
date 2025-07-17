// components/Navbar.tsx

import Link from "next/link";
import { Button } from "@/components/ui/button";

export default function Navbar() {
  return (
    <nav className="flex items-center justify-between px-6 py-4 shadow-sm bg-white border-b border-gray-200">
      <Link href="/" className="text-2xl font-bold text-emerald-600">
        🍳 RecipeAI
      </Link>

      <div className="space-x-4">
        <Link href="/about" className="text-gray-600 hover:text-emerald-600 font-medium">
          About
        </Link>
        <Link href="/login">
          <Button variant="outline">Login</Button>
        </Link>
        <Link href="/signup">
          <Button className="bg-emerald-600 text-white hover:bg-emerald-700">Sign Up</Button>
        </Link>
      </div>
    </nav>
  );
}
