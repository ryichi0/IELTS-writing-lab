import "server-only";
import { cache } from "react";
import { createClient } from "@/lib/supabase/server";

export const getCurrentUser = cache(async () => {
  const supabase = await createClient();
  const { data } = await supabase.auth.getClaims();
  const claims = data?.claims;
  if (!claims) return null;

  const email = (claims.email as string | undefined) ?? "";
  const meta = claims.user_metadata as { name?: string } | undefined;

  return {
    id: claims.sub,
    email,
    name: meta?.name ?? email.split("@")[0],
  };
});