import { URL } from "node:url";
import { JSDOM } from "jsdom";
import { error } from "node:console";
import { ok } from "node:assert";

export function normalizeURL(url: string): string {
  const inputURL = new URL(url);

  let trimmedURL = inputURL.hostname + inputURL.pathname;

  if (trimmedURL.endsWith("/")) {
    trimmedURL = trimmedURL.slice(1, -1);
  }

  return trimmedURL;
}

export function getURLsFromHTML(html: string, baseURL: string): string[] {
  const urls: string[] = [];

  try {
    const dom = new JSDOM(html);
    const anchors =
      dom.window.document.querySelectorAll<HTMLAnchorElement>("a");
    if (!anchors) return urls;

    for (const anchor of anchors) {
      if (!anchor) continue;
      const href = anchor.getAttribute("href");
      if (!href) continue;
      try {
        const absoluteURL = new URL(href, baseURL);
        urls.push(absoluteURL.href);
      } catch (error) {
        console.warn("Invalid href", error);
      }
    }
  } catch (error) {
    console.error("Invalid parsing error", error);
  }

  return urls;
}

export async function getHTML(url: string) {
  console.log(`Crawling ${url}`);

  let res;

  try {
    res = await fetch(url);
  } catch (err) {
    console.error(`Error in network : ${err as Error}`);
  }

  if (res.status > 400) {
    console.error(`HTTP error ${res.status}`);
    return;
  }
  const contentType = res.headers.get("content-type");
  if (!contentType || !contentType.includes("text/html")) {
    console.error(`Invalid content type ${contentType}`);
    return;
  }

  console.log(await res.text());
}

export async function crawlPage(
  baseURL: string,
  currentURL: string = baseURL,
  pages: Record<string, number> = {},
) {}
