/** Prefix public asset paths with Vite `base` (e.g. `/Portfolio/` on GitHub Pages). */
export function asset(path) {
  const normalized = String(path).replace(/^\//, '')
  return `${import.meta.env.BASE_URL}${normalized}`
}
