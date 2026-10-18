import { logout } from "@/app/(auth)/actions";

export default function LogoutButton() {
  return (
    <form action={logout}>
      <button
        type="submit"
        className="rounded-md border px-3 py-1.5 text-sm hover:bg-foreground/5"
      >
        Log out
      </button>
    </form>
  );
}