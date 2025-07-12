import axios from "axios";
import * as cheerio from "cheerio";

export async function scrapeBlog(url: string): Promise<string> {
  const { data } = await axios.get(url);
  const $ = cheerio.load(data);

  const paragraphs = $("p")
    .map((_, el) => $(el).text())
    .get()
    .join(" ");

  return paragraphs.slice(0, 1500) || "No content found.";
}

