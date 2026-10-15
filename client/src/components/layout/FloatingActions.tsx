import { useEffect, useState } from 'react';
import { Box, Fab, Tooltip, Zoom, useScrollTrigger } from '@mui/material';
import WhatsAppIcon from '@mui/icons-material/WhatsApp';
import KeyboardArrowUpIcon from '@mui/icons-material/KeyboardArrowUp';
import { useLocation } from 'react-router-dom';
import { whatsappLink } from '@/lib/clinic';

// Floating WhatsApp + scroll-to-top. Lifted above the fixed mobile booking
// bar so the two never overlap; hidden on the booking page (it has its own
// WhatsApp action).
export function FloatingActions() {
  const location = useLocation();
  const [showTop, setShowTop] = useState(false);
  const scrolled = useScrollTrigger({ disableHysteresis: true, threshold: 400 });

  useEffect(() => setShowTop(scrolled), [scrolled]);

  if (location.pathname.startsWith('/book-appointment')) return null;

  return (
    <Box
      sx={{
        position: 'fixed',
        right: { xs: 14, md: 24 },
        // Clear the mobile booking bar (~64px + safe area) on phones.
        bottom: { xs: 'calc(76px + env(safe-area-inset-bottom))', md: 28 },
        zIndex: 1250,
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
    </Box>
  );
}
