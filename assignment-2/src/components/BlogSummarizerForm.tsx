'use client';

import { useState } from "react";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";

export default function BlogSummarizerForm() {
  const [url, setUrl] = useState("");
  const [summary, setSummary] = useState("");
  const [urduSummary, setUrduSummary] = useState("");

  const handleSubmit = async () => {
    if (!url.trim()) {
      alert("Please enter a blog URL");
      return;
    }

    const res = await fetch("/api/scrape", {
      method: "POST",
      body: JSON.stringify({ url }),
    });

    const data = await res.json();
    setSummary(data.summary);
    setUrduSummary(data.summary_ur);
    setUrl("");
  };

  return (
    <main className="max-w-2xl mx-auto mt-10 space-y-6">
      {/* Input Form */}
      <Card className="w-full shadow-lg">
        <CardContent className="p-6 flex flex-col gap-4 bg-white/80 backdrop-blur-md rounded-md">
          <h2 className="text-xl font-semibold text-center">Blog Summarizer</h2>
          <Input
            placeholder="Enter blog URL..."
            value={url}
            onChange={(e) => setUrl(e.target.value)}
          />
          <Button
            onClick={handleSubmit}
            className="bg-[#011463] hover:bg-[#000e4f] text-white"
          >
            Summarize
          </Button>
        </CardContent>
      </Card>

      {/* Result Card */}
      {summary && (
        <Card>
          <CardContent className="p-6 space-y-4">
            <div>
              <h2 className="font-bold text-lg">English Summary</h2>
              <p>{summary}</p>
            </div>
            <div>
              <h2 className="font-bold text-lg mt-4">Urdu Summary</h2>
              <p>{urduSummary}</p>
            </div>
          </CardContent>
        </Card>
      )}
    </main>
  );
}
