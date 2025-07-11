import axios from "axios";
import * as cheerio from "cheerio";
import { NextResponse } from "next/server";
import { fakeSummary } from "@/lib/fakeSummary";
import { translateToUrdu } from "@/lib/translateToUrdu";
import { saveToSupabase } from "@/lib/saveToSupabase";
import { saveToMongo } from "@/lib/saveToMongo";

export async function POST(req: Request) {
  const { url } = await req.json();

  try {
    const response = await axios.get(url);
    const $ = cheerio.load(response.data);
    const fullText = $("body").text().replace(/\s+/g, " ");

    const summary = fakeSummary(fullText);
    
    const summary_ur = await translateToUrdu(summary);


    // Save to Supabase
    await saveToSupabase(url, summary, summary_ur);

    // Save to MongoDB
    await saveToMongo(url, fullText);

    return NextResponse.json({ summary, summary_ur });
  } catch (error: any) {
    return NextResponse.json({ error: error.message }, { status: 500 });
  }
}
