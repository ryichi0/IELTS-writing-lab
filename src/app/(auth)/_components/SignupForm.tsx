"use client";
import Link from "next/link";
import { useActionState } from "react";
import { signup } from "../actions";

export default function SignupForm({ next }: { next: string }) {
  const [state, action, pending] = useActionState(signup, undefined);

  return (
    <form action={action} className="w-full max-w-sm space-y-4">
      <h1 className="text-2xl font-semibold">Create account</h1>
      <input type="hidden" name="next" value={next} />

      <input name="name" required placeholder="Name"
        className="w-full rounded-md border px-3 py-2" />
      <input name="email" type="email" required placeholder="Email"
        className="w-full rounded-md border px-3 py-2" />
      <input name="password" type="password" required minLength={8} placeholder="Password (min 8)"
        className="w-full rounded-md border px-3 py-2" />

      {state?.error && <p className="text-sm text-red-600">{state.error}</p>}

      <button type="submit" disabled={pending}
        className="w-full rounded-md bg-foreground px-3 py-2 text-background disabled:opacity-50">
        {pending ? "Creating..." : "Sign up"}
      </button>

      <p className="text-sm">
        Already have an account?{" "}
        <Link href={`/login?next=${encodeURIComponent(next)}`} className="underline">
          Log in
        </Link>
      </p>
    </form>
  );
}