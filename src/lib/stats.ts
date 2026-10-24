import "server-only";
import { cache } from "react";
import { prisma } from "@/lib/prisma";
import { getCurrentUser } from "@/lib/auth";

const DAY_MS = 24 * 60 * 60 * 1000;
const dayKey = (d: Date) => d.toISOString().slice(0, 10); // مثل 2026-10-24 (UTC)

function calcStreak(dates: Date[]) {
  const days = new Set(dates.map(dayKey));
  const today = new Date();

  // اگر امروز هنوز ننوشته، زنجیره از دیروز حساب می‌شود
  let cursor = days.has(dayKey(today)) ? today : new Date(today.getTime() - DAY_MS);

  let streak = 0;
  while (days.has(dayKey(cursor))) {
    streak++;
    cursor = new Date(cursor.getTime() - DAY_MS);
  }
  return streak;
}

export const getProfileStats = cache(async () => {
  const user = await getCurrentUser();
  if (!user) return null;

  const [totals, recent] = await Promise.all([
    prisma.writing.aggregate({
      where: { userId: user.id },
      _count: { _all: true },
      _sum: { wordCount: true },
    }),
    // فقط تاریخ‌ها، برای محاسبه‌ی streak
    prisma.writing.findMany({
      where: { userId: user.id },
      select: { createdAt: true },
      orderBy: { createdAt: "desc" },
      take: 400,
    }),
  ]);

  return {
    attempts: totals._count._all,
    totalWords: totals._sum.wordCount ?? 0,
    streak: calcStreak(recent.map((w) => w.createdAt)),
  };
});