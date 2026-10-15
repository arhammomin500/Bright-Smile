import { Box, Button, Container, IconButton, Stack, Typography } from '@mui/material';
import CalendarMonthIcon from '@mui/icons-material/CalendarMonth';
import WhatsAppIcon from '@mui/icons-material/WhatsApp';
import { Link } from 'react-router-dom';
import { brand } from '@/theme/theme';
import { whatsappLink } from '@/lib/clinic';

// Blue appointment band shown above the footer on every page (per reference).
export function CtaBand() {
  return (
    <Box sx={{ bgcolor: brand.primary, py: { xs: 3, md: 3.5 } }}>
      <Container>
        <Stack
          direction={{ xs: 'column', md: 'row' }}
          spacing={{ xs: 2, md: 3 }}
          alignItems={{ xs: 'flex-start', md: 'center' }}
        >
          <Stack direction="row" spacing={1.75} alignItems="center" sx={{ flex: 1 }}>
            <Box
              sx={{
                width: 46,
                height: 46,
                borderRadius: '12px',
                bgcolor: 'rgba(255,255,255,0.16)',
                display: 'grid',
                placeItems: 'center',
                color: '#fff',
                flexShrink: 0,
              }}
            >
              <CalendarMonthIcon />
            </Box>
            <Box>
              <Typography sx={{ color: '#fff', fontWeight: 800, fontSize: { xs: '1.05rem', md: '1.2rem' }, lineHeight: 1.3 }}>
                Book Your Appointment Today
              </Typography>
              <Typography sx={{ color: 'rgba(255,255,255,0.85)', fontSize: 14 }}>
                It only takes a minute. Get the smile you deserve!
              </Typography>
            </Box>
          </Stack>
          <Stack direction="row" spacing={1.5} alignItems="center">
            <Button
              component={Link}
              to="/book-appointment"
              sx={{
                bgcolor: '#fff',
                color: brand.primary,
                px: 3.5,
                py: 1.2,
                fontWeight: 700,
                '&:hover': { bgcolor: brand.cloud },
              }}
            >
              Book Now
            </Button>
            <IconButton
              component="a"
              href={whatsappLink()}
              target="_blank"
              rel="noopener noreferrer"
              aria-label="Chat on WhatsApp"
              sx={{
                bgcolor: '#25D366',
                color: '#fff',
                width: 46,
                height: 46,
                '&:hover': { bgcolor: '#1ebe5b' },
              }}
            >
              <WhatsAppIcon />
            </IconButton>
          </Stack>
        </Stack>
      </Container>
    </Box>
  );
}
