"use server";
import { redirect } from "next/navigation";
import { createClient } from "@/lib/supabase/server";
import { safeNext } from "@/lib/safe-next";

type State = { error?: string; message?: string } | undefined;

const get = (fd: FormData, key: string) => String(fd.get(key) ?? "").trim();

export async function login(_: State, formData: FormData): Promise<State> {
  const email = get(formData, "email");
  const password = get(formData, "password");

  if (!email || !password) return { error: "Enter your email and password." };

  const supabase = await createClient();
  const { error } = await supabase.auth.signInWithPassword({ email, password });
  if (error) return { error: "Incorrect email or password." };

  redirect(safeNext(get(formData, "next")));
}

export async function signup(_: State, formData: FormData): Promise<State> {
  const name = get(formData, "name");
  const email = get(formData, "email");
  const password = String(formData.get("password") ?? "");

  if (name.length < 2) return { error: "Name must be at least 2 characters." };
  if (!/^\S+@\S+\.\S+$/.test(email)) return { error: "Enter a valid email address." };
  if (password.length < 8) return { error: "Password must be at least 8 characters." };

  const supabase = await createClient();
  const { data, error } = await supabase.auth.signUp({
    email,
    password,
    options: { data: { name } },
  });

  if (error) {
    return { error: error.code === "user_already_exists"
      ? "An account with this email already exists."
      : "Something went wrong. Please try again." };
  }


  if (data.user?.identities?.length === 0) {
    return { error: "An account with this email already exists." };
  }


  if (!data.session) {
    return { message: "Account created. Check your email to confirm it, then log in." };
  }

  redirect(safeNext(get(formData, "next")));
}

export async function logout() {
  const supabase = await createClient();
  await supabase.auth.signOut();
  redirect("/dashboard");
}