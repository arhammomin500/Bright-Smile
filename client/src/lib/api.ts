// Frontend-only site: there is no API. This module remains only for the
// shared errorMessage() helper used by page-level error states.
export function errorMessage(e: unknown, fallback = 'Something went wrong. Please try again.'): string {
  if (e instanceof Error && e.message) return e.message;
  return fallback;
}
