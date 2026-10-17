"use client";
import Link from "next/link";
import { useActionState } from "react";
import { login } from "../actions";


export default function LoginForm({ next }: { next: string }) {
  const [state, action, pending] = useActionState(login, undefined);

  return (
    <form action={action} className="w-full max-w-sm space-y-4">
      <h1 className="text-2xl font-semibold">Log in</h1>
      <input type="hidden" name="next" value={next} />

      <input name="email" type="email" required placeholder="Email"
        className="w-full rounded-md border px-3 py-2" />
      <input name="password" type="password" required placeholder="Password"
        className="w-full rounded-md border px-3 py-2" />

      {state?.error && <p className="text-sm text-red-600">{state.error}</p>}

      <button type="submit" disabled={pending}
        className="w-full rounded-md bg-foreground px-3 py-2 text-background disabled:opacity-50">
        {pending ? "Logging in..." : "Log in"}
      </button>

      <p className="text-sm">
        No account?{" "}
        <Link href={`/sign-up?next=${encodeURIComponent(next)}`} className="underline">
          Sign up
        </Link>
      </p>
    </form>
  );
}