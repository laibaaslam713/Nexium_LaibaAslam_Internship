"use client";

import { useState } from "react";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";

export default function SummarizerForm() {
  const [url, setUrl] = useState("");
  const [summary, setSummary] = useState("");
  const [urduSummary, setUrduSummary] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  async function handleSubmit() {
    setLoading(true);
    setError("");

    try {
      const response = await fetch("/api/summarize", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ url }),
      });

      const result = await response.json();

      if (!response.ok) {
        throw new Error(result.error || "Something went wrong");
      }

      setSummary(result.english);
      setUrduSummary(result.urdu);
    } catch (err: any) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  }

  return (
    <div
  className="min-h-screen bg-cover bg-center bg-no-repeat flex items-center justify-center"
  style={{ backgroundImage: "url('/background_sc.png')" }}
>
    <main className=" w-full max-w-3xl mx-auto p-10 rounded-2xl bg-white/5 backdrop-blur-xl border border-white/10 shadow-2xl text-white space-y-6">
      <h1 className="text-3xl font-bold text-center tracking-wide text-white">Blog Summarizer</h1>
      <Input
        placeholder="Enter blog URL"
        value={url}
        onChange={(e) => setUrl(e.target.value)}
        className="w-full px-4 py-2 rounded-full bg-black/30 border border-white/20 placeholder-white focus:outline-none focus:ring-2 focus:ring-white"
      />
      <Button className="w-full rounded-full py-2 bg-[#011463] hover:bg-white/20 border border-white/20 text-white font-semibold tracking-wide transition" onClick={handleSubmit} disabled={loading}>
        {loading ? "Processing..." : "Summarize & Translate"}
      </Button>

      {error && (
        <p className="text-red-500 mt-2">
          Error: {error}
        </p>
      )}

      {summary && (
            <Card className="border border-white/30 bg-black/30 backdrop-blur-md text-white shadow-md rounded-xl">

      <CardContent className="text-[#ffffff]">
        <div className="flex flex-col md:flex-row justify-between gap-6">
          {/* English Summary */}
          <div className="flex-1">
            <h2 className="font-bold text-lg mb-2 text-center md:text-left border-b border-white/20 md:border-none">English Summary</h2>
            <p>{summary}</p>
          </div>

          {/* Vertical Divider for desktop */}
          <div className="hidden md:block w-[1px] bg-white/30"></div>

          {/* Urdu Summary */}
          <div className="flex-1">
            <h2 className="font-bold text-lg mb-2 text-center md:text-right border-b border-white/20 md:border-none">Urdu Summary</h2>
            <p className="text-right">{urduSummary}</p>
          </div>
        </div>
      </CardContent>
    </Card>
      )}
    </main>
    </div>
  );
}