'use client';

import BlogSummarizerForm from "@/components/BlogSummarizerForm";

export default function SummarizerPage() {
  const handleSummarize = (url: string) => {
    console.log("URL submitted:", url);
  };

  return (
    <main className="min-h-screen bg-[url('/background_sc2.png')] bg-cover bg-center bg-no-repeat flex flex-col items-center justify-center p-6">
      <h1 className="text-3xl font-bold text-white mb-6">Blog Summarizer Tool</h1>
      <BlogSummarizerForm onSubmit={handleSummarize} />
    </main>
  );
}
