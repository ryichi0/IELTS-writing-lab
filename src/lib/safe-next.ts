export function safeNext(n: string | null | undefined) {
  if (!n) return "/";
  if (!n.startsWith("/")) return "/";
  if (n.startsWith("//") || n.startsWith("/\\")) return "/";
  return n;
}