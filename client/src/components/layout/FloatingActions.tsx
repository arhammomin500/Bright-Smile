import { useEffect, useState } from 'react';
import { Box, Fab, Tooltip, Zoom, useScrollTrigger } from '@mui/material';
import WhatsAppIcon from '@mui/icons-material/WhatsApp';
import KeyboardArrowUpIcon from '@mui/icons-material/KeyboardArrowUp';
import CalendarMonthIcon from '@mui/icons-material/CalendarMonth';
import { useNavigate, useLocation } from 'react-router-dom';
import { whatsappLink } from '@/lib/clinic';

// Floating WhatsApp, sticky "Book" (mobile), and scroll-to-top buttons.
export function FloatingActions() {
  const navigate = useNavigate();
  const location = useLocation();
  const [showTop, setShowTop] = useState(false);
  const scrolled = useScrollTrigger({ disableHysteresis: true, threshold: 400 });

  useEffect(() => setShowTop(scrolled), [scrolled]);

  // The booking page has its own sticky confirm bar — keep it distraction-free.
  if (location.pathname.startsWith('/book')) return null;

  return (
    <Box
      sx={{
        position: 'fixed',
        right: { xs: 14, md: 24 },
        bottom: { xs: 16, md: 28 },
        zIndex: 1300,
        display: 'flex',
        flexDirection: 'column',
        gap: 1.5,
        alignItems: 'center',
      }}
    >
      <Zoom in={showTop}>
        <Fab
          size="small"
          aria-label="Scroll to top"
          onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })}
          sx={{ bgcolor: 'white', color: 'primary.main', boxShadow: 4, '&:hover': { bgcolor: 'grey.100' } }}
        >
          <KeyboardArrowUpIcon />
        </Fab>
      </Zoom>

      <Tooltip title="Chat on WhatsApp" placement="left" arrow>
        <Fab
          component="a"
          href={whatsappLink()}
          target="_blank"
          rel="noopener noreferrer"
          aria-label="Chat on WhatsApp"
          sx={{
            bgcolor: '#25D366',
            color: '#fff',
            boxShadow: '0 10px 24px rgba(37,211,102,0.5)',
            '&:hover': { bgcolor: '#1ebe5b' },
          }}
        >
          <WhatsAppIcon />
        </Fab>
      </Tooltip>

      {/* Sticky book button — prominent on mobile */}
      <Tooltip title="Book Appointment" placement="left" arrow>
        <Fab
          color="primary"
          aria-label="Book appointment"
          onClick={() => navigate('/book')}
          sx={{ display: { xs: 'inline-flex', md: 'none' } }}
        >
          <CalendarMonthIcon />
        </Fab>
      </Tooltip>
    </Box>
  );
}
