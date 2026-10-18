"use client";
import Link from "next/link";
import { useActionState } from "react";
import { signup } from "../actions";
import { useState } from "react";
import { Eye, EyeOff } from "lucide-react";

export default function SignupForm({ next }: { next: string }) {
  const [state, action, pending] = useActionState(signup, undefined);
  const [isVisible, setIsVisible] = useState(false);
  const toggleVisibility = () => setIsVisible(prevState => !prevState);

  return (
    <form action={action} noValidate className="flex flex-col gap-4">
      {state?.error && (
        <p role="alert" className="rounded-md border border-red-300 bg-red-50 px-3 py-2 text-sm text-red-700">
          {state.error}
        </p>
      )}
      <input type="hidden" name="next" value={next} />

      <label htmlFor="">
        <p className="font-bold mb-2">Name</p>
        <input name="name" required placeholder="Name"
          className="w-full rounded-md border px-3 py-2" />
      </label>

      <label htmlFor="">
        <p className="font-bold mb-2">Email Address</p>
        <input name="email" type="email" required placeholder="Email"
          className="w-full rounded-md border px-3 py-2" />
      </label>

      <label htmlFor="">
        <p className="font-bold mb-2">Password</p>
        <div className="relative">
          <input name="password" type={isVisible ? "text" : "password"} aria-label="Password" required placeholder="Password"
            className="w-full rounded-md border px-3 py-2" />
          <button
            className="absolute inset-y-0 end-0 flex items-center z-20 px-2.5 cursor-pointer text-gray-400 rounded-e-md focus:outline-none focus-visible:text-primary hover:text-primary transition-colors"
            type="button"
            onClick={toggleVisibility}
            aria-label={isVisible ? "Hide password" : "Show password"}
            aria-pressed={isVisible}
            aria-controls="password"
          >
            {isVisible ? (
              <EyeOff size={20} aria-hidden="true" />
            ) : (
              <Eye size={20} aria-hidden="true" />
            )}
          </button>
        </div>
      </label>


      <button type="submit" disabled={pending}
        className="w-full cursor-pointer rounded-md bg-primary px-3 py-2 text-background disabled:opacity-50">
        {pending ? "Creating..." : "Sign up"}
      </button>

      <p className="text-sm">
        Already have an account?{" "}
        <Link href={`/login?next=${encodeURIComponent(next)}`} className="underline">
          Log in
        </Link>
      </p>
    </form>
  )
}