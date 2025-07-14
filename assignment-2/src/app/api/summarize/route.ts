import { NextResponse } from "next/server";
import { scrapeBlog } from "@/lib/scrapeBlog";
import { saveToMongo } from "@/lib/saveToMongo";
import { saveToSupabase } from "@/lib/saveToSupabase";
import { translateToUrdu } from "@/lib/translate";

// Basic static summarizer (you can replace it with something better later)
function summarize(text: string): string {
  return text.split(". ").slice(0, 2).join(". ") + ".";
}

export async function POST(req: Request) {
  try {
    const { url } = await req.json();

    if (!url || typeof url !== "string") {
      return NextResponse.json(
        { error: "Invalid or missing URL" },
        { status: 400 }
      );
    }

    const content = await scrapeBlog(url);
    const summary = summarize(content);
    const urdu = translateToUrdu(summary);

    // Save data to databases
    await saveToMongo(url, content);
    await saveToSupabase(url, summary);

    return NextResponse.json({
      english: summary,
      urdu,
    });
  } catch (error) {
    const message = error instanceof Error ? error.message : "Unknown error";

    console.error("API Error:", message);
    return NextResponse.json(
      {
        error: "Something went wrong",
        details: message,
      },
      { status: 500 }
    );
  }
}
