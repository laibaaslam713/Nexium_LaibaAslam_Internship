import Navbar from "@/components/Navbar";
import Link from "next/link";

export default function LandingPage() {
  return (
    <>
      <Navbar />
      <div className="grid grid-rows-[20px_1fr_20px] items-center justify-items-center min-h-screen p-8 pb-20 gap-16 sm:p-20 bg-[url('/landing_page.jpg')] bg-cover bg-center bg-no-repeat">

        <main className="flex flex-col gap-[32px] row-start-2 items-center sm:text-center">
          <h1 className="text-7xl font-bold text-white mb-4 font-[family-name:var(--font-roz)]">Simple Recipes,<br/> Delicious Results</h1>
          {/* <p className="text-lg text-gray-200 mb-6">
            Enter your ingredients. Let AI create mouth-watering recipes for you — with steps,
            cook time, and even images!
          </p> */}
          <Link
            href="/generate"
            className="inline-block px-6 py-3 rounded-xl bg-emerald-600 text-white text-lg font-medium hover:bg-emerald-700 transition"
          >
            Get Started
          </Link>
        </main>
      </div>
    </>
  );
}
