  "use client";

  import Navbar from "@/components/Navbar";
  // import Link from "next/link";
  import { useSession, signIn } from "next-auth/react";
  import { useRouter } from "next/navigation";

  export default function LandingPage() {
    const { data: session } = useSession();
    const router = useRouter();

    const handleGetStarted = () => {
      if (session) {
        router.push("/generate");
      } else {
        signIn("google", { callbackUrl: "/generate" });
      }
    };

    return (
      <>
        {/* <Navbar /> */}
        <div className="grid grid-rows-[20px_1fr_20px] items-center justify-items-center h-screen p-8 pb-20 gap-16 sm:p-20 bg-[url('/landing_page.jpg')] bg-cover bg-center bg-no-repeat">
            <main className="flex flex-col gap-[32px] row-start-2 items-center sm:text-center">
              <h1 className="text-7xl font-bold text-white mb-4 font-[family-name:var(--font-roz)]">
                Simple Recipes,<br /> Delicious Results
              </h1>
              <button
      onClick={handleGetStarted}
      className="inline-block px-6 py-3 rounded-xl bg-emerald-600 text-white text-lg font-medium hover:bg-emerald-700 transition"
    >
      Get Started
    </button>
            </main>
          </div>
      </>
    );
  }
