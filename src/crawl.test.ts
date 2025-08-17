import { describe, expect, test } from "vitest";
import { normalizeURL, getURLsFromHTML } from "./crawl.ts";

describe("normalizeURL", () => {
  test("removing host name", () => {
    const input = "https://blog.boot.dev/path";

    const output = "blog.boot.dev/path";
    expect(normalizeURL(input)).toBe(output);
  });

  test("removing trailing slashes", () => {
    const input = "https://blog.boot.dev/path/";
    const output = "blog.boot.dev/path";

    expect(normalizeURL(input)).toBe(output);
  });
});

describe("getURLsFromHTML", () => {
  test("Url extraction", () => {
    const html = `
    <html>
  <body>
    <a href="https://blog.boot.dev"><span>Go to Boot.dev</span></a>
  </body>
</html>
`;
    const baseURL = "https://blog.boot.dev";
    const result = getURLsFromHTML(html, baseURL);

    expect(result).toEqual(["https://blog.boot.dev/"]);
  });
});
