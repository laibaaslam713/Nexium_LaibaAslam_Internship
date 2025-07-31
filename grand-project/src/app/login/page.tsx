"use client";

import { useState, Suspense } from "react";
import { useSearchParams, useRouter } from "next/navigation";
import { supabase } from "@/lib/supabase";

function LoginForm() {
  const [email, setEmail] = useState("");
  const searchParams = useSearchParams();
  const router = useRouter();

  const redirectTo = searchParams.get("redirect") || "/";

  const handleLogin = async () => {
    const { error } = await supabase.auth.signInWithOtp({ email });

    if (error) {
      alert("Login failed: " + error.message);
    } else {
      alert("Magic link sent to your email.");
      setTimeout(() => {
        router.push(redirectTo);
      }, 1000);
    }
  };

  return (
    <div className="w-screen h-screen bg-[linear-gradient(to_right,_#BB9CBE,_#7D4E67)] flex items-center justify-center px-4 absolute left-0 inset-0">
      <div className="max-w-md w-full backdrop-blur-sm bg-black/20 p-8 rounded-2xl shadow-2xl">
        <h1 className="text-3xl font-extrabold text-white text-center mb-6 drop-shadow">
          Login to <span className="text-fuchsia-950">RecipeFodge</span>
        </h1>

        <input
          type="email"
          className="w-full p-4 mb-4 rounded-xl bg-transparent text-white placeholder-white border border-white focus:outline-none focus:ring-2 focus:ring-white transition duration-300"
          placeholder="Enter your email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
        />

        <button
          onClick={handleLogin}
          className="w-full bg-fuchsia-950 hover:bg-red-700 text-white px-6 py-3 rounded-xl font-semibold shadow-md transition duration-300"
        >
          Send Magic Link
        </button>
      </div>
    </div>
  );
}

export default function LoginPage() {
  return (
    <Suspense fallback={<div className="text-white text-center">Loading login...</div>}>
      <LoginForm />
    </Suspense>
  );
}
