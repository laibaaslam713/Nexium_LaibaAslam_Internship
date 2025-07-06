'use client';
import { useState } from "react";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { quotes } from "@/data/quotes";


type Quote = { topic: string; text: string };

export default function Home() {


  const [topic, setTopic] = useState("");
  const [result, setResult] = useState<Quote[]>([]);

  const handleSubmit = () => {
    const filtered = quotes
      .filter(q => q.topic.toLowerCase() === topic.toLowerCase())
      .slice(0, 3);
    setResult(filtered);
  };

  return (
    <main className="max-w-xl mx-auto p-6 space-y-6">
      <h1 className="text-2xl font-bold text-center">Quote Generator</h1>
      <Input
        className="w-full mx-auto block"
        placeholder="Enter topic"
        value={topic}
        onChange={(e) => setTopic(e.target.value)}
      />
      <Button className="mx-auto block w-full flex justify-center" onClick={handleSubmit}>Get Quotes</Button>

      <div className="space-y-4">
        {result.length === 0 && <p className="text-sm text-gray-500">No quotes found.</p>}
        {result.map((quote, index) => (
          <Card key={index}>
            <CardContent className="p-4">
              <p className="text-gray-700 italic">{quote.text}</p>
            </CardContent>
          </Card>
        ))}
      </div>
    </main>
  );
} 