import * as cheerio from "cheerio";

export async function scrapeBlog(url: string): Promise<string> {
  const res = await fetch(url);
  const html = await res.text();
  const $ = cheerio.load(html);

  let text = "";
  $("p").each((_, el) => {
    text += $(el).text() + "\n";
  });

  return text;
}
