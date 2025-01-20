import { getFromSearchParams, updateURL } from "./lib/url";
import { isFilter } from "./types";

export function getInitialFilter() {
  const urlFilter = getFromSearchParams("filter");
  if (!urlFilter) {
    return "all";
  }

  if (isFilter(urlFilter)) {
    return urlFilter;
  } else {
    updateURL("filter", "");
    return "all";
  }
}
