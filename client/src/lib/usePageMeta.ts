import { useEffect } from 'react';

const DEFAULT_TITLE = 'Bright Smile Dental Clinic — Gentle, Modern Dental Care';
const DEFAULT_DESCRIPTION =
  'Bright Smile Dental Clinic by Dr. Afaque Khan — gentle, painless, modern dentistry. Browse treatments and request an appointment online.';

const SITE_URL = 'https://brightsmiledent.in';

// Static-site SEO helper: sets the document title, meta description, and
// canonical URL for the current page (and restores the defaults on unmount).
export function usePageMeta(title?: string, description?: string) {
  useEffect(() => {
    document.title = title ?? DEFAULT_TITLE;
    const meta = document.querySelector<HTMLMetaElement>('meta[name="description"]');
    if (meta) meta.content = description ?? DEFAULT_DESCRIPTION;
    const canonical = document.querySelector<HTMLLinkElement>('link[rel="canonical"]');
    if (canonical) canonical.href = `${SITE_URL}${window.location.pathname === '/' ? '/' : window.location.pathname}`;
    return () => {
      document.title = DEFAULT_TITLE;
      if (meta) meta.content = DEFAULT_DESCRIPTION;
      if (canonical) canonical.href = `${SITE_URL}/`;
    };
  }, [title, description]);
}
