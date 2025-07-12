"use client";

import { useState } from "react";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";

export default function Home() {
  const [url, setUrl] = useState("");
  const [result, setResult] = useState<{ english: string; urdu: string } | null>(null);
const handleSubmit = async () => {
  try {
    const res = await fetch("/api/summarize", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ url }),
    });

    if (!res.ok) {
      const err = await res.text();
      throw new Error(`API Error ${res.status}: ${err}`);
    }

    const data = await res.json();
    setResult(data);
  } catch (err) {
    console.error("Submission Error:", err);
    alert("Something went wrong. Check the console for details.");
  }
};

  return (
    <main className="p-6 max-w-xl mx-auto">
      <h1 className="text-2xl font-bold mb-4">Blog Summariser</h1>
      <div className="flex gap-2 mb-4">
        <Input
          placeholder="Enter blog URL"
          value={url}
          onChange={(e) => setUrl(e.target.value)}
        />
        <Button onClick={handleSubmit}>Summarize</Button>
      </div>

      {result && (
        <Card>
          <CardContent className="p-4 space-y-4">
            <div>
              <h2 className="font-semibold">English Summary</h2>
              <p>{result.english}</p>
            </div>
            <div>
              <h2 className="font-semibold">Urdu Summary</h2>
              <p>{result.urdu}</p>
            </div>
          </CardContent>
        </Card>
      )}
    </main>
  );
}
