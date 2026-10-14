/** Shared site identity and navigation flags. */

export const SITE_NAME = "LCI International";
export const SITE_TAGLINE = "Lean Construction institutes";
export const SITE_DESCRIPTION =
  "Lean Construction institutes, working together across countries. A quarterly forum where national institutes share lessons and coordinate.";

/** Hide from primary nav until shared work is agreed and listed. */
export const SHOW_ACTIVITIES_IN_NAV = false;

export function pageTitle(page?: string): string {
  return page ? `${page} · ${SITE_NAME}` : SITE_NAME;
}
