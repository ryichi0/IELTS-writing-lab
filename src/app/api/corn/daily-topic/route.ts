import { NextResponse } from "next/server";
import { ensureTopicForDate, todayKey } from "@/lib/topics";

export async function GET(request: Request) {
  const secret = process.env.CRON_SECRET;
  const auth = request.headers.get("authorization");

  if (!secret || auth !== `Bearer ${secret}`) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }

  const today = todayKey();
  const tomorrow = new Date(Date.now() + 24 * 60 * 60 * 1000)
    .toISOString()
    .slice(0, 10);

  const results: Record<string, string> = {};
  for (const key of [today, tomorrow]) {
    try {
      const topic = await ensureTopicForDate(key);
      results[key] = topic.title;
    } catch (e) {
      results[key] = `FAILED: ${(e as Error).message}`;
    }
  }

  return NextResponse.json(results);
}