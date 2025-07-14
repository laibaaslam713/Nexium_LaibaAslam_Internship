export function summarize(text: string): string {
  const sentences = text.split(".").slice(0, 2).join(".") + ".";
  return sentences;
}
