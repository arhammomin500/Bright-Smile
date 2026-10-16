import { Box, Typography } from '@mui/material';
import { Link } from 'react-router-dom';

// Brand lockup. The default (light backgrounds, e.g. the navbar) is the
// owner's official logo image — tooth mark, "Dr. Afaque Khan", BrightSmile
// wordmark, "Dental Clinic & Implant Centre" and tagline. The `light`
// variant (navy footer) keeps the drawn white lockup, since the logo image's
// dark parts would vanish on dark backgrounds.
export function Logo({ light = false, compact = false }: { light?: boolean; compact?: boolean }) {
  if (!light) {
    return (
      <Box component={Link} to="/" sx={{ display: 'inline-flex', alignItems: 'center', textDecoration: 'none' }}>
        <Box
          component="img"
          src="/images/logo-brightsmile.webp"
          alt="BrightSmile Dental Clinic & Implant Centre — Dr. Afaque Khan"
          sx={{ height: compact ? 40 : { xs: 46, md: 56 }, width: 'auto', display: 'block' }}
        />
      </Box>
    );
  }

  return (
    <Box component={Link} to="/" sx={{ display: 'inline-flex', alignItems: 'center', gap: 1.1, textDecoration: 'none' }}>
      {/* Mark */}
      <svg width="40" height="40" viewBox="0 0 44 44" fill="none" xmlns="http://www.w3.org/2000/svg" aria-hidden="true">
        <defs>
          <linearGradient id="bs-badge" x1="0" y1="0" x2="44" y2="44" gradientUnits="userSpaceOnUse">
            <stop stopColor="#2f7cf6" />
            <stop offset="1" stopColor="#0f56d4" />
          </linearGradient>
          <linearGradient id="bs-tooth" x1="22" y1="9" x2="22" y2="36" gradientUnits="userSpaceOnUse">
            <stop stopColor="#ffffff" />
            <stop offset="1" stopColor="#dcebff" />
          </linearGradient>
        </defs>
        {/* Rounded badge */}
        <rect x="1" y="1" width="42" height="42" rx="13" fill="url(#bs-badge)" />
        <rect x="1" y="1" width="42" height="42" rx="13" stroke="rgba(255,255,255,0.35)" strokeWidth="1" />
        {/* Tooth */}
        <path
          d="M22 12.1c-2.2-1.3-4.3-1.3-6-.5-2.5 1.1-3.8 3.5-3.8 6.4 0 2.6.7 5 1.3 7.3.5 1.9 1 3.9 1.5 5.6.3 1.2.9 2.3 2 2.3 1 0 1.4-1 1.7-2.3.3-1.1.6-2.4 1.2-3.1.4-.5 1-.8 2.1-.8s1.7.3 2.1.8c.6.7.9 2 1.2 3.1.3 1.3.7 2.3 1.7 2.3 1.1 0 1.7-1.1 2-2.3.5-1.7 1-3.7 1.5-5.6.6-2.3 1.3-4.7 1.3-7.3 0-2.9-1.3-5.3-3.8-6.4-1.7-.8-3.8-.8-6 .5Z"
          fill="url(#bs-tooth)"
        />
        {/* Shine on the tooth */}
        <path d="M16.6 15.2c-1.1.6-1.8 1.7-2 3" stroke="#9ec4ff" strokeWidth="1.6" strokeLinecap="round" fill="none" />
        {/* Sparkle */}
        <path d="M31.5 8.2l.8 2 2 .8-2 .8-.8 2-.8-2-2-.8 2-.8.8-2Z" fill="#7fe9e5" />
      </svg>

      {/* Wordmark — single line */}
      {!compact && (
        <Typography
          component="span"
          sx={{
            fontWeight: 800,
            fontSize: { xs: '1.25rem', md: '1.4rem' },
            letterSpacing: '-0.03em',
            lineHeight: 1,
            whiteSpace: 'nowrap',
            color: '#fff',
          }}
        >
          Bright
          <Box component="span" sx={{ color: '#a8e0ff' }}>
            Smile
          </Box>
        </Typography>
      )}
    </Box>
  );
}
