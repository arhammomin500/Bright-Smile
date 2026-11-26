import { ButtonBase, Typography, useScrollTrigger } from '@mui/material';
import EventAvailableOutlinedIcon from '@mui/icons-material/EventAvailableOutlined';
import { Link, useLocation } from 'react-router-dom';
import { brand } from '@/theme/theme';

// Compact floating "Book Appointment" pill on phones. It stays hidden while
// the homepage hero (which has its own CTA) is on screen, then slides up.
// Hidden on the booking page and on larger screens.
export function MobileBookingBar() {
  const location = useLocation();
  const isHome = location.pathname === '/';
  const threshold = isHome && typeof window !== 'undefined' ? Math.round(window.innerHeight * 0.75) : 160;
  const visible = useScrollTrigger({ disableHysteresis: true, threshold });

  if (location.pathname.startsWith('/book-appointment')) return null;

  return (
    <ButtonBase
      component={Link}
      to="/book-appointment"
      aria-label="Book an appointment"
      sx={{
        position: 'fixed',
        left: '50%',
        bottom: 'calc(16px + env(safe-area-inset-bottom))',
        zIndex: 1200,
        display: { xs: 'inline-flex', md: 'none' },
        alignItems: 'center',
        gap: 1,
        height: 50,
        px: 3,
        borderRadius: 999,
        background: `linear-gradient(135deg, ${brand.primary} 0%, ${brand.primaryDark} 100%)`,
        color: '#fff',
        boxShadow: '0 12px 28px rgba(33,108,243,0.45), 0 2px 6px rgba(16,33,61,0.2)',
        transform: visible ? 'translate(-50%, 0)' : 'translate(-50%, 120px)',
        opacity: visible ? 1 : 0,
        pointerEvents: visible ? 'auto' : 'none',
        transition: 'transform .35s cubic-bezier(.22,1,.36,1), opacity .25s ease',
        '&:active': { transform: 'translate(-50%, 0) scale(0.97)' },
      }}
    >
      <EventAvailableOutlinedIcon sx={{ fontSize: 20 }} />
      <Typography sx={{ fontWeight: 800, fontSize: 15, whiteSpace: 'nowrap' }}>Book Appointment</Typography>
    </ButtonBase>
  );
}
