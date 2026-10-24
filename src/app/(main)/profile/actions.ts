"use server";
import { redirect } from "next/navigation";
import { revalidatePath } from "next/cache";
import { prisma } from "@/lib/prisma";
import { getCurrentUser } from "@/lib/auth";
import { createClient } from "@/lib/supabase/server";
import { AVATAR_EXTENSIONS, validateAvatar } from "@/lib/avatar-rules";

type State = { error?: string; success?: boolean } | undefined;

export async function updateProfile(_: State, formData: FormData): Promise<State> {
  const user = await getCurrentUser();
  if (!user) redirect("/login?next=/profile");

  const name = String(formData.get("name") ?? "").trim();
  const targetRaw = String(formData.get("targetScore") ?? "");
  const avatar = formData.get("avatar");

  if (name.length < 2 || name.length > 50) {
    return { error: "Name must be between 2 and 50 characters." };
  }

  let targetScore: number | null = null;
  if (targetRaw !== "") {
    targetScore = Number(targetRaw);
    const valid =
      Number.isFinite(targetScore) &&
      targetScore >= 1 &&
      targetScore <= 9 &&
      (targetScore * 2) % 1 === 0; // فقط مضرب ۰.۵
    if (!valid) return { error: "Choose a valid target band score." };
  }

  const supabase = await createClient();

  // آپلود عکس (اختیاری)
  let newAvatarUrl: string | undefined;
  let newAvatarPath: string | undefined;

  if (avatar instanceof File && avatar.size > 0) {
    const avatarError = validateAvatar(avatar);
    if (avatarError) return { error: avatarError };

    const ext = AVATAR_EXTENSIONS[avatar.type];
    newAvatarPath = `${user.id}/${Date.now()}.${ext}`;

    const { error } = await supabase.storage
      .from("avatars")
      .upload(newAvatarPath, avatar, { contentType: avatar.type });
    if (error) return { error: "Could not upload your photo. Please try again." };

    newAvatarUrl = supabase.storage.from("avatars").getPublicUrl(newAvatarPath).data.publicUrl;
  }

  const previous = await prisma.user.findUnique({
    where: { id: user.id },
    select: { avatarUrl: true },
  });

  try {
    await prisma.user.update({
      where: { id: user.id },
      data: {
        name,
        targetScore,
        ...(newAvatarUrl ? { avatarUrl: newAvatarUrl } : {}),
      },
    });
  } catch {
    // اگر ذخیره شکست خورد، عکس تازه‌آپلودشده را پاک کن
    if (newAvatarPath) await supabase.storage.from("avatars").remove([newAvatarPath]);
    return { error: "Could not save your profile. Please try again." };
  }

  // نام در نوبار از متادیتای Supabase خوانده می‌شود، پس آن را هم به‌روز کن
  await supabase.auth.updateUser({ data: { name } });

  // عکس قبلی را پاک کن (اگر شکست خورد مهم نیست)
  if (newAvatarUrl && previous?.avatarUrl) {
    const oldPath = previous.avatarUrl.split("/avatars/")[1];
    if (oldPath) await supabase.storage.from("avatars").remove([oldPath]);
  }

  revalidatePath("/", "layout");
  return { success: true };
}