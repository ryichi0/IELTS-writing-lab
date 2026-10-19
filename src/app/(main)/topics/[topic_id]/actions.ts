"use server";
import { redirect } from "next/navigation";
import { revalidatePath } from "next/cache";
import { prisma } from "@/lib/prisma";
import { getCurrentUser } from "@/lib/auth";

type State = { error?: string } | undefined;

const MIN_WORDS = 150; 
const MAX_CHARS = 5000;

export async function saveWriting(_: State, formData: FormData): Promise<State> {
  const topicId = String(formData.get("topicId") ?? "");
  console.log("topicId received:", JSON.stringify(topicId));
  const content = String(formData.get("content") ?? "").trim();

  const user = await getCurrentUser();
  if (!user) redirect(`/login?next=${encodeURIComponent(`/topics/${topicId}`)}`);

  const wordCount = content.split(/\s+/).filter(Boolean).length;
  if (wordCount < MIN_WORDS) {
    return { error: `Write at least ${MIN_WORDS} words. You have ${wordCount}.` };
  }
  if (content.length > MAX_CHARS) {
    return { error: "Your text is too long." };
  }
  
  const topic = await prisma.topic.findUnique({ where: { id: topicId } });
  if (!topic) return { error: "This topic no longer exists." };
  
  try {
    await prisma.writing.create({
      data: {
        content,
        wordCount,
        status: "SUBMITTED",
        userId: user.id,
        topicId: topic.id,
      },
    });
  } catch {
    return { error: "Could not save your writing. Please try again." };
  }

  revalidatePath("/writings");
  redirect("/writings");
}

