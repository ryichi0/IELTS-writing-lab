import { getUserWritings } from "@/lib/writings";
import WritingsView from "./_components/WritingsView";

export default async function WritingsPage() {
  const writings = await getUserWritings();
  return <WritingsView writings={writings} />;
}