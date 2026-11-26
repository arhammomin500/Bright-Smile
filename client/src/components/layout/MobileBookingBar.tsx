import { ButtonBase, Typography } from '@mui/material';
import CalendarMonthIcon from '@mui/icons-material/CalendarMonth';
import { Link, useLocation } from 'react-router-dom';
import { brand } from '@/theme/theme';

// Fixed bottom booking bar on phones — flat, flush, solid blue, like the
// owner's reference site. Hidden on the booking page and larger screens.
export function MobileBookingBar() {
  const location = useLocation();
  if (location.pathname.startsWith('/book-appointment')) return null;

  return (
    <ButtonBase
      component={Link}
      to="/book-appointment"
      sx={{
        position: 'fixed',
        left: 0,
        right: 0,
        bottom: 0,
        zIndex: 1200,
        display: { xs: 'flex', md: 'none' },
        alignItems: 'center',
        justifyContent: 'center',
        gap: 1,
        bgcolor: brand.primary,
        color: '#fff',
        pt: 1.4,
        pb: 'calc(11px + env(safe-area-inset-bottom))',
        boxShadow: '0 -6px 20px rgba(16,33,61,0.18)',
        '&:active': { bgcolor: brand.primaryDark },
      }}
    >
      <CalendarMonthIcon sx={{ fontSize: 19 }} />
      <Typography sx={{ fontWeight: 800, fontSize: 15, letterSpacing: '0.01em' }}>
        Book Your Appointment
      </Typography>
    </ButtonBase>
  );
}
