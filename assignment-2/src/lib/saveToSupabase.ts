import { createClient } from "@supabase/supabase-js";

const supabaseUrl = process.env.SUPABASE_URL!;
const supabaseKey = process.env.SUPABASE_ANON_KEY!;
const supabase = createClient(supabaseUrl, supabaseKey);

export async function saveToSupabase(
  url: string,
  summary_en: string,
  summary_ur: string
) {
  const { error } = await supabase.from("summaries").insert([
    {
      url,
      summary_en,
      summary_ur,
    },
  ]);

  if (error) {
    console.error("Error saving to Supabase:", error.message);
    throw new Error("Supabase insertion failed");
  }
}
