import "server-only";
import { prisma } from "@/lib/prisma";

export async function getLatestTopic() {
  return prisma.topic.findFirst({ orderBy: { createdAt: "desc" } });
}