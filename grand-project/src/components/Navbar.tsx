
import Link from "next/link";
import { Button } from "@/components/ui/button";

export default function Navbar() {
  return (
    <nav className="flex items-center justify-between px-6 py-4 shadow-sm bg-white border-b border-gray-200">
      <h1 className="text-2xl font-bold text-black font-[family-name:var(--font-bold)]">
        RecipeFodge
      </h1>

      <div className="space-x-4">
        <Link href="/about" className="text-black hover:text-emerald-600 font-medium">
          About
        </Link>
        <Link href="/login">
          <Button variant="outline">Sign In</Button>
        </Link>
        <Link href="/signup">
          <Button className="bg-emerald-600 text-white hover:bg-emerald-700">Sign Up</Button>
        </Link>
      </div>
    </nav>
  );
}
