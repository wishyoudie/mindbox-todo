export function updateURL(key: string, query?: string) {
  const url = new URL(window.location.href);
  if (query) {
    url.searchParams.set(key, query);
  } else {
    url.searchParams.delete(key);
  }
  window.history.pushState({}, "", url);
}

export function getFromSearchParams(key: string) {
  const urlParams = new URLSearchParams(window.location.search);
  return urlParams.get(key);
}
