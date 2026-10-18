import "server-only";
import { cache } from "react";
import { createClient } from "@/lib/supabase/server";

export const getCurrentUser = cache(async () => {
  const supabase = await createClient();
  const { data: { user } } = await supabase.auth.getUser();
  if (!user) return null;

  return {
    id: user.id,
    email: user.email!,
    name: (user.user_metadata?.name as string | undefined) ?? user.email!.split("@")[0],
  };
});