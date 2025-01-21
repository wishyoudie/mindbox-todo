import { updateURL, getFromSearchParams } from "../lib/url";

describe("URL utilities", () => {
  let pushStateSpy: jest.SpyInstance;
  const originalLocation = window.location;

  beforeEach(() => {
    delete (window as Partial<Window>).location;
    window.location = {
      ...originalLocation,
      href: "http://localhost/",
      search: "",
    };

    pushStateSpy = jest.spyOn(window.history, "pushState").mockImplementation();
  });

  afterEach(() => {
    window.location = originalLocation;
    pushStateSpy.mockRestore();
  });

  describe("updateURL", () => {
    it("adds a new query parameter", () => {
      updateURL("filter", "completed");

      expect(pushStateSpy).toHaveBeenCalled();
      const [, , url] = pushStateSpy.mock.calls[0];
      const parsedUrl = new URL(url);
      expect(parsedUrl.searchParams.get("filter")).toBe("completed");
    });

    it("updates an existing query parameter", () => {
      window.location.search = "?filter=all";
      updateURL("filter", "completed");

      expect(pushStateSpy).toHaveBeenCalled();
      const [, , url] = pushStateSpy.mock.calls[0];
      const parsedUrl = new URL(url);
      expect(parsedUrl.searchParams.get("filter")).toBe("completed");
    });

    it("removes a query parameter when value is undefined", () => {
      window.location.search = "?filter=all";
      updateURL("filter", undefined);

      expect(pushStateSpy).toHaveBeenCalled();
      const [, , url] = pushStateSpy.mock.calls[0];
      const parsedUrl = new URL(url);
      expect(parsedUrl.searchParams.has("filter")).toBe(false);
    });
  });

  describe("getFromSearchParams", () => {
    it("returns null when parameter does not exist", () => {
      window.location.search = "";
      expect(getFromSearchParams("filter")).toBeNull();
    });

    it("returns the value when parameter exists", () => {
      window.location.search = "?filter=completed";
      expect(getFromSearchParams("filter")).toBe("completed");
    });

    it("handles multiple parameters correctly", () => {
      window.location.search = "?filter=completed&sort=asc";
      expect(getFromSearchParams("filter")).toBe("completed");
      expect(getFromSearchParams("sort")).toBe("asc");
    });
  });
});
