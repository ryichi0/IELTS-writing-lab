import "server-only";
import { prisma } from "@/lib/prisma";
import { getCurrentUser } from "@/lib/auth";

export async function getUserWritings(limit?: number) {
  const user = await getCurrentUser();
  if (!user) return [];

  return prisma.writing.findMany({
    where: { userId: user.id },
    orderBy: { createdAt: "desc" },
    take: limit,
    include: { topic: { select: { id: true, title: true, type: true } } },
  });
}

export async function getSingleWriting(writingId: string) {
  const user = await getCurrentUser();

  if (!user) return null;

  return prisma.writing.findFirst({
    where: {
      id: writingId,
      userId: user.id,
    },
    include: {
      topic: true,
    },
  });
}