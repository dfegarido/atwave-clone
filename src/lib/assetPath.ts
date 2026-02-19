/**
 * Prepends the GitHub Pages basePath to any public asset URL.
 * next/image with unoptimized:true does NOT auto-apply basePath in static export,
 * so all /images/*, /videos/* etc. must be prefixed manually.
 *
 * Locally (dev) NEXT_PUBLIC_BASE_PATH is "" so paths remain unchanged.
 * On GitHub Pages it is "/atwave-clone" (or whatever the repo name is).
 */
export function assetPath(path: string): string {
  return `${process.env.NEXT_PUBLIC_BASE_PATH ?? ""}${path}`;
}
