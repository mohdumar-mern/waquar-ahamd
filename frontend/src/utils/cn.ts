// Minimal className merge utility (avoids clsx dependency for simple use)
export function cn(...classes: (string | undefined | null | false)[]): string {
  return classes.filter(Boolean).join(" ");
}
