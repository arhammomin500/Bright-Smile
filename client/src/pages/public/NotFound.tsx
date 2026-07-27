import { Box, Button, Container, Stack, Typography } from '@mui/material';
import { Link } from 'react-router-dom';
import HomeIcon from '@mui/icons-material/Home';
import CalendarMonthIcon from '@mui/icons-material/CalendarMonth';
import { gradients } from '@/theme/theme';

export default function NotFound() {
  return (
    <Box sx={{ minHeight: '80vh', display: 'grid', placeItems: 'center', pt: 10, pb: 6 }}>
      <Container maxWidth="sm" sx={{ textAlign: 'center' }}>
        <Typography sx={{ fontSize: { xs: '6rem', md: '9rem' }, fontWeight: 900, lineHeight: 1, background: gradients.primary, WebkitBackgroundClip: 'text', WebkitTextFillColor: 'transparent' }}>
          404
        </Typography>
        <Typography variant="h4" sx={{ mb: 1.5 }}>
          Page not found
        </Typography>
        <Typography color="text.secondary" sx={{ mb: 4 }}>
          The page you're looking for doesn't exist or has moved. Let's get you back on track.
        </Typography>
        <Stack direction={{ xs: 'column', sm: 'row' }} spacing={2} justifyContent="center">
          <Button component={Link} to="/" variant="contained" size="large" startIcon={<HomeIcon />}>
            Back to Home
          </Button>
          <Button component={Link} to="/book" variant="outlined" size="large" startIcon={<CalendarMonthIcon />}>
            Book Appointment
          </Button>
        </Stack>
      </Container>
    </Box>
  );
}
