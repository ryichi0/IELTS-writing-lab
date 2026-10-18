import { logout } from "@/app/(auth)/actions";
import { LogOut } from "lucide-react";

export default function LogoutButton() {
  return (
    <form action={logout}>
      <button
        type="submit"
        title="Logout"
        className="rounded-full border border-gray-500 p-1.5 text-sm hover:bg-foreground/5 cursor-pointer"
      >
        <LogOut className="text-primary"/>
      </button>
    </form>
  );
}