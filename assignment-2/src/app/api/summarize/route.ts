import { NextResponse } from "next/server";
import { scrapeBlog } from "@/lib/scrapeBlog";
import { saveToMongo } from "@/lib/saveToMongo";
import { saveToSupabase } from "@/lib/saveToSupabase";
import { translateToUrdu } from "@/lib/translate";

export async function POST(req: Request) {
  try {
    const { url } = await req.json();

    const content = await scrapeBlog(url);

    const summary = content.split(". ").slice(0, 2).join(". ") + ".";

    const urdu = await translateToUrdu(summary);

    await saveToMongo(url, content);
    await saveToSupabase(url, urdu);

    return NextResponse.json({
      english: summary,
      urdu,
    });
  } catch (error) {
  const message = error instanceof Error ? error.message : "Unknown error";

  console.error("API Error:", error);
  return NextResponse.json(
    {
      error: "Something went wrong",
      details: message,
    },
    { status: 500 }
  );
}

}
