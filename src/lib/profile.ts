import "server-only";
import { cache } from "react";
import { prisma } from "@/lib/prisma";
import { getCurrentUser } from "@/lib/auth";

export const getCurrentProfile = cache(async () => {
  const user = await getCurrentUser();
  if (!user) return null;

  return prisma.user.findUnique({
    where: { id: user.id },
    select: { name: true, email: true, avatarUrl: true, targetScore: true, createdAt: true,
},
  });
});