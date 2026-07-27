import { useEffect } from 'react';

// Injects <meta name="robots" content="noindex, nofollow"> while a staff-portal
// page is mounted, so search engines never index internal screens.
// (Deliberately NOT paired with a robots.txt entry — that would advertise the URL.)
export function useNoIndex() {
  useEffect(() => {
    const meta = document.createElement('meta');
    meta.name = 'robots';
    meta.content = 'noindex, nofollow';
    document.head.appendChild(meta);
    return () => {
      document.head.removeChild(meta);
    };
  }, []);
}
