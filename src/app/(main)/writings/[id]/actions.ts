"use server";
import { redirect } from "next/navigation";
import { revalidatePath } from "next/cache";
import { prisma } from "@/lib/prisma";
import { getCurrentUser } from "@/lib/auth";
import { countWords } from "@/lib/writing-rules";

type State = { error?: string; success?: boolean } | undefined;

export async function updateWriting(_: State, formData: FormData): Promise<State> {
  const id = String(formData.get("id") ?? "");
  const content = String(formData.get("content") ?? "").trim();

  const user = await getCurrentUser();
  if (!user) redirect(`/login?next=${encodeURIComponent(`/writings/${id}`)}`);

  const existing = await prisma.writing.findFirst({ where: { id, userId: user.id } });
  if (!existing) return { error: "Writing not found." };

  const wordCount = countWords(content);
  
  try {
    await prisma.writing.update({
      where: { id },
      data: { content, wordCount, status: "SUBMITTED"},
    });
  } catch {
    return { error: "Could not save your changes. Please try again." };
  }

  revalidatePath("/writings");
  revalidatePath(`/writings/${id}`);
  return { success: true };
}

export async function deleteWriting(formData: FormData) {
  const id = String(formData.get("id") ?? "");
  const user = await getCurrentUser();
  if (!user) redirect("/login");

  await prisma.writing.deleteMany({ where: { id, userId: user.id } });

  revalidatePath("/writings");
  redirect("/writings");
}