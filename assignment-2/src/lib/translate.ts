
import { urduDictionary } from "@/lib/urduDictionary";


export function translateToUrdu(text: string): string {
  const words = text.toLowerCase().split(" ");
  const translated = words.map(word => urduDictionary[word] || word);
  return translated.join(" ");
}
