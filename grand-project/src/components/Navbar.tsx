"use client";

import Link from "next/link";
import { useEffect, useState, useRef } from "react";
import { supabase } from "@/lib/supabase";
import { FaUserCircle } from "react-icons/fa";
import { Button } from "./ui/button";
import { User } from "@supabase/supabase-js";


export default function Navbar() {

  const [user, setUser] = useState<User | null>(null);
  const [isDropdownOpen, setDropdownOpen] = useState(false);
  const dropdownRef = useRef(null);

  // Load user on page mount
  useEffect(() => {
    const loadUser = async () => {
      const { data, error } = await supabase.auth.getUser();
      setUser(data?.user || null);
    };

    loadUser();

    // Subscribe to auth changes
    const { data: authListener } = supabase.auth.onAuthStateChange((_event, session) => {
      setUser(session?.user || null);
    });

    return () => {
      authListener.subscription.unsubscribe();
    };
  }, []);

  const toggleDropdown = () => setDropdownOpen((prev) => !prev);

  const handleSignOut = async () => {
    await supabase.auth.signOut();
    setUser(null);
    setDropdownOpen(false);
  };

  return (
    <nav className="fixed top-0 left-0 w-full z-50 text-white px-8 py-6 flex items-center justify-between bg-transparent">
      <div>
        <Link href="/" className="ml-10 font-extrabold text-3xl text-fuchsia-950 hover:text-fuchsia-950 transition">
          🥄Spoonify
        </Link>
      </div>

      <div className="flex items-center space-x-6 relative mr-10">
        <Link href="/about" className="text-white hover:text-fuchsia-950 font-medium transition">
          About
        </Link>

        {user ? (
          <div className="relative" ref={dropdownRef}>
            <FaUserCircle
              size={28}
              className="cursor-pointer text-white hover:text-fuchsia-500"
              onClick={toggleDropdown}
            />
            {isDropdownOpen && (
              <div className="absolute right-0 mt-2 w-64 bg-white rounded-md shadow-lg z-10 text-left">
                <div className="px-4 py-2 text-sm text-gray-800 border-b border-gray-200">
                  <span className="text-gray-500">Signed in as</span>
                  <div className="font-medium text-fuchsia-950 truncate">
                    {user.email}
                  </div>
                </div>
                <button
                  onClick={handleSignOut}
                  className="block w-full px-4 py-2 text-sm text-left text-fuchsia-950 hover:bg-gray-100"
                >
                  Sign Out
                </button>
              </div>
            )}
          </div>
        ) : (
          <Link href="/login">
            <Button className="border-2 border-white bg-transparent hover:border-fuchsia-950 hover:text-fuchsia-950 text-white transition">
              Sign In
            </Button>
          </Link>
        )}
      </div>
    </nav>
  );
}
