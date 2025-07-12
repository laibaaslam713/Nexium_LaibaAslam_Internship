import { createClient } from "@supabase/supabase-js";

const supabase = createClient(
  process.env.SUPABASE_URL!,
  process.env.SUPABASE_ANON_KEY!
);

export async function saveToSupabase(url: string, summary: string) {
  const { error } = await supabase.from("summaries").insert([{ url, summary }]);
  if (error) throw error;
}
