import { COUNTRIES, INDICATORS, type ChartKind } from "./indicators";

export type ChartData = {
  unit: string;
  categories: string[];
  series: { name: string; values: number[] }[];
};

export type GeneratedTopic = {
  title: string;
  description: string;
  type: ChartKind;
  chartData: ChartData;
  source: string;
  sourceUrl: string;
};

const FIRST_YEAR = 1995;

// ---------- عدد تصادفی قطعی از روی تاریخ ----------
function hashString(s: string) {
  let h = 1779033703 ^ s.length;
  for (let i = 0; i < s.length; i++) {
    h = Math.imul(h ^ s.charCodeAt(i), 3432918353);
    h = (h << 13) | (h >>> 19);
  }
  return h >>> 0;
}

function makeRng(seed: number) {
  let a = seed;
  return () => {
    a |= 0;
    a = (a + 0x6d2b79f5) | 0;
    let t = Math.imul(a ^ (a >>> 15), 1 | a);
    t = (t + Math.imul(t ^ (t >>> 7), 61 | t)) ^ t;
    return ((t ^ (t >>> 14)) >>> 0) / 4294967296;
  };
}

function pick<T>(arr: T[], rng: () => number) {
  return arr[Math.floor(rng() * arr.length)];
}

function sample<T>(arr: T[], n: number, rng: () => number) {
  const copy = [...arr];
  for (let i = copy.length - 1; i > 0; i--) {
    const j = Math.floor(rng() * (i + 1));
    [copy[i], copy[j]] = [copy[j], copy[i]];
  }
  return copy.slice(0, n);
}

// n سال با فاصله‌ی تقریباً مساوی از بین سال‌های موجود
function spread(years: number[], n: number) {
  if (years.length <= n) return years;
  const out: number[] = [];
  for (let i = 0; i < n; i++) {
    out.push(years[Math.round((i * (years.length - 1)) / (n - 1))]);
  }
  return [...new Set(out)];
}

// ---------- گرفتن داده از World Bank ----------
type WbRow = { countryiso3code: string; date: string; value: number | null };

async function fetchIndicator(code: string, isoCodes: string[], lastYear: number) {
  const url =
    `https://api.worldbank.org/v2/country/${isoCodes.join(";")}` +
    `/indicator/${code}?format=json&date=${FIRST_YEAR}:${lastYear}&per_page=1000`;

  const res = await fetch(url, { cache: "no-store" });
  if (!res.ok) throw new Error(`World Bank request failed (${res.status})`);

  const json = (await res.json()) as [unknown, WbRow[] | null];
  const rows = json[1] ?? [];

  // کشور ← سال ← مقدار
  const table: Record<string, Record<number, number>> = {};
  for (const r of rows) {
    if (r.value === null || r.value === undefined) continue;
    (table[r.countryiso3code] ??= {})[Number(r.date)] = r.value;
  }
  return { table, url };
}

function round(n: number) {
  return Math.abs(n) >= 100 ? Math.round(n) : Math.round(n * 10) / 10;
}

// ---------- ساخت تاپیک ----------
export async function generateTopicForDate(dateKey: string): Promise<GeneratedTopic> {
  const rng = makeRng(hashString(dateKey));
  const lastYear = new Date(dateKey).getUTCFullYear() - 1;

  const indicator = pick(INDICATORS, rng);
  const kind = pick(indicator.kinds, rng);

  // چند بار ترکیب‌های مختلف کشور را امتحان کن
  for (let attempt = 0; attempt < 6; attempt++) {
    const countryCount = kind === "LINE_GRAPH" ? 3 : 4;
    const isoCodes = sample(Object.keys(COUNTRIES), countryCount, rng);

    const { table, url } = await fetchIndicator(indicator.code, isoCodes, lastYear);

    // سال‌هایی که همه‌ی کشورها مقدار دارند
    const commonYears = Object.keys(table[isoCodes[0]] ?? {})
      .map(Number)
      .filter((y) => isoCodes.every((c) => table[c]?.[y] !== undefined))
      .sort((a, b) => a - b);

    const yearsNeeded = kind === "LINE_GRAPH" ? 6 : 3;
    if (commonYears.length < yearsNeeded + 2) continue;

    const years = spread(commonYears, yearsNeeded);
    if (years.length < 3) continue;

    const names = isoCodes.map((c) => COUNTRIES[c]);
    const nameList =
      names.slice(0, -1).join(", ") + " and " + names[names.length - 1];
    const period = `${years[0]} and ${years[years.length - 1]}`;

    const chartData: ChartData = {
      unit: indicator.unit,
      categories: years.map(String),
      series: isoCodes.map((c, i) => ({
        name: names[i].replace(/^the /, ""),
        values: years.map((y) => round(table[c][y])),
      })),
    };

    const noun =
      kind === "BAR_CHART" ? "bar chart" : kind === "LINE_GRAPH" ? "line graph" : "table";
    const subject = indicator.subject;
    const subjectCap = subject.charAt(0).toUpperCase() + subject.slice(1);

    return {
      title: `${subjectCap} in ${nameList}`,
      description:
        `The ${noun} below shows ${subject} in ${nameList} ` +
        `between ${period}. ` +
        `Summarise the information by selecting and reporting the main features, ` +
        `and make comparisons where relevant.`,
      type: kind,
      chartData,
      source: "World Bank (CC BY 4.0)",
      sourceUrl: url,
    };
  }

  throw new Error(`Could not build a topic for ${dateKey} from ${indicator.code}`);
}