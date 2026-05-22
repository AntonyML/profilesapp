// Browser stub for node:url built-in
export function fileURLToPath(url: string | URL): string {
  const u = typeof url === 'string' ? new URL(url) : url;
  return decodeURIComponent(u.pathname);
}

export function pathToFileURL(path: string): URL {
  return new URL('file://' + path);
}

export function format(urlObject: URL | string): string {
  return typeof urlObject === 'string' ? urlObject : urlObject.href;
}

export const URL = globalThis.URL;
export const URLSearchParams = globalThis.URLSearchParams;

export default { fileURLToPath, pathToFileURL, format, URL, URLSearchParams };
