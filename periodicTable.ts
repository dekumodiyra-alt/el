import data from "../assets/periodicData.json";
export type Element = { name: string; symbol: string; number: number };
export const elements: Element[] = data as Element[];
const elementMap = new Map(elements.map(e => [e.symbol.toUpperCase(), e]));
export function matchWordToElements(word: string): Element[] | null {
  const w = word.replace(/[^A-Za-z]/g, "").toUpperCase();
  const out: Element[] = [];
  let i = 0;
  while (i < w.length) {
    if (i + 1 < w.length) {
      const two = w.slice(i, i + 2);
      if (elementMap.has(two)) {
        out.push(elementMap.get(two)!);
        i += 2;
        continue;
      }
    }
    const one = w[i];
    if (elementMap.has(one)) {
      out.push(elementMap.get(one)!);
      i++;
      continue;
    }
    return null;
  }
  return out;
}