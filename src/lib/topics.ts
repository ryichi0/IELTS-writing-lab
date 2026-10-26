import "server-only";
import { prisma } from "@/lib/prisma";
import { generateTopicForDate } from "@/lib/topic-generator/generate";

export const todayKey = () => new Date().toISOString().slice(0, 10); // UTC

const toDbDate = (key: string) => new Date(`${key}T00:00:00.000Z`);

// تاپیک یک روز را برمی‌گرداند و اگر نبود می‌سازد
export async function ensureTopicForDate(key: string) {
  const publishDate = toDbDate(key);

  const existing = await prisma.topic.findUnique({ where: { publishDate } });
  if (existing) return existing;

  const generated = await generateTopicForDate(key);

  try {
    return await prisma.topic.create({
      data: {
        title: generated.title,
        description: generated.description,
        type: generated.type,
        publishDate,
        chartData: JSON.parse(JSON.stringify(generated.chartData)),
        source: generated.source,
        sourceUrl: generated.sourceUrl,
      },
    });
  } catch (e) {
    // درخواست هم‌زمان دیگری زودتر ساخته است
    if ((e as { code?: string }).code === "P2002") {
      const created = await prisma.topic.findUnique({ where: { publishDate } });
      if (created) return created;
    }
    throw e;
  }
}

export async function getTodayTopic() {
  try {
    return await ensureTopicForDate(todayKey());
  } catch (e) {
    console.error("Could not get today's topic:", e);
    // پشتیبان: آخرین تاپیک موجود
    return prisma.topic.findFirst({ orderBy: { createdAt: "desc" } });
  }
}

export async function getTopicById(id: string) {
  return prisma.topic.findUnique({ where: { id } });
}