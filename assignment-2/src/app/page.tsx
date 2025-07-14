
"use client";
import { useRouter } from "next/navigation";
import { Button } from "@/components/ui/button";

export default function Home() {
  const router = useRouter();

  return (
    <div className="grid grid-rows-[20px_1fr_20px] items-center justify-items-center min-h-screen p-8 pb-20 gap-16 sm:p-20 font-[family-name:var(--font-geist-sans)] bg-[url('/background.jpg')] bg-cover bg-center bg-no-repeat">
      <main className="flex flex-col gap-[32px] row-start-2 items-center sm:text-center">
        <h1 className="text-3xl font-bold text-center sm:text-center text-white">Blog Summariser</h1>
        <p className="text-lg text-center sm:text-center text-white">
          This is a simple blog summarizer application.<br/> you can paste a blog URL, and it will generate<br/> a summary of the blog content.
        </p>
      <Button className="bg-white text-blue-950 font-bold"onClick={() => router.push("/summarize")}>
        Get Started
      </Button>
    </main>
    </div>
  );
}

