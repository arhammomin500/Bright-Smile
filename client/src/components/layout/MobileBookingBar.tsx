import { Box, Button } from '@mui/material';
import CalendarMonthIcon from '@mui/icons-material/CalendarMonth';
import { Link, useLocation } from 'react-router-dom';

// Fixed bottom "Book Appointment" action on phones (hidden on the booking
// page itself and on larger screens). Respects the mobile safe area.
export function MobileBookingBar() {
  const location = useLocation();
  if (location.pathname.startsWith('/book-appointment')) return null;

  return (
    <Box
      sx={{
        position: 'fixed',
        left: 0,
        right: 0,
        bottom: 0,
        zIndex: 1200,
        display: { xs: 'block', md: 'none' },
        bgcolor: 'rgba(255,255,255,0.97)',
        backdropFilter: 'blur(10px)',
        borderTop: '1px solid #DFE8F7',
        px: 2,
        pt: 0.75,
        pb: 'calc(6px + env(safe-area-inset-bottom))',
        boxShadow: '0 -6px 20px rgba(16,33,61,0.1)',
      }}
    >
      <Button
        component={Link}
        to="/book-appointment"
        variant="contained"
        fullWidth
        startIcon={<CalendarMonthIcon />}
        sx={{ py: 1, fontSize: '0.95rem' }}
      >
        Book Appointment
      </Button>
    </Box>
  );
}
