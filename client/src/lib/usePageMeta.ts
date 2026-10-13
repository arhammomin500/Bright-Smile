import { useEffect } from 'react';

const DEFAULT_TITLE = 'Bright Smile Dental Clinic — Gentle, Modern Dental Care';
const DEFAULT_DESCRIPTION =
  'Bright Smile Dental Clinic by Dr. Afaque Khan — gentle, painless, modern dentistry. Browse treatments and request an appointment online.';

// Static-site SEO helper: sets the document title and meta description for the
// current page (and restores the defaults on unmount).
export function usePageMeta(title?: string, description?: string) {
  useEffect(() => {
    document.title = title ?? DEFAULT_TITLE;
    const meta = document.querySelector<HTMLMetaElement>('meta[name="description"]');
    if (meta) meta.content = description ?? DEFAULT_DESCRIPTION;
    return () => {
      document.title = DEFAULT_TITLE;
      if (meta) meta.content = DEFAULT_DESCRIPTION;
    };
  }, [title, description]);
}
