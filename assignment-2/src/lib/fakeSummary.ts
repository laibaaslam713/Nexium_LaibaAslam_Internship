export function fakeSummary(text: string): string {
  return text.split('.').slice(0, 3).join('.') + '.';
}
