import { Box, Button, Card, Container, Stack, Typography, Divider, Chip } from '@mui/material';
import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import CheckCircleIcon from '@mui/icons-material/CheckCircle';
import ContentCopyIcon from '@mui/icons-material/ContentCopy';
import HomeIcon from '@mui/icons-material/Home';
import { brand, gradients } from '@/theme/theme';
import { formatDateLong, formatTime12h } from '@/lib/format';
import { CLINIC } from '@/lib/clinic';
import { useToast } from '@/components/feedback/ToastProvider';
import type { Appointment } from '@/lib/types';

export function BookingSuccess({ appointment, onDone }: { appointment: Appointment; onDone: () => void }) {
  const toast = useToast();
  const copy = () => {
    navigator.clipboard?.writeText(appointment.appointmentCode);
    toast.success('Appointment ID copied');
  };

  return (
    <Box sx={{ background: gradients.soft, minHeight: '90vh', pt: { xs: 12, md: 16 }, pb: 8 }}>
      <Container maxWidth="sm">
        <Box component={motion.div} initial={{ opacity: 0, scale: 0.9 }} animate={{ opacity: 1, scale: 1 }} transition={{ duration: 0.5 }}>
          <Card sx={{ p: { xs: 3, md: 5 }, textAlign: 'center', overflow: 'visible' }}>
            <Box
              component={motion.div}
              initial={{ scale: 0 }}
              animate={{ scale: 1 }}
              transition={{ delay: 0.2, type: 'spring', stiffness: 200 }}
              sx={{ width: 88, height: 88, borderRadius: '50%', background: gradients.primary, display: 'grid', placeItems: 'center', mx: 'auto', mb: 3, boxShadow: '0 16px 34px rgba(31,111,235,0.4)' }}
            >
              <CheckCircleIcon sx={{ fontSize: 52, color: '#fff' }} />
            </Box>

            <Typography variant="h4" sx={{ mb: 1 }}>
              Appointment Requested!
            </Typography>
            <Typography color="text.secondary" sx={{ mb: 3 }}>
              Thank you, {appointment.contactName.split(' ')[0]}. Our reception team will confirm your booking shortly
              {appointment.contactEmail ? ' and email you the details' : ''}.
            </Typography>

            <Box sx={{ bgcolor: 'rgba(31,111,235,0.06)', borderRadius: 3, p: 2, mb: 3 }}>
              <Typography variant="caption" color="text.secondary" sx={{ textTransform: 'uppercase', letterSpacing: 1 }}>
                Your Appointment ID
              </Typography>
              <Stack direction="row" spacing={1} justifyContent="center" alignItems="center" sx={{ mt: 0.5 }}>
                <Typography variant="h5" sx={{ fontWeight: 800, color: brand.primary, letterSpacing: 1 }}>
                  {appointment.appointmentCode}
                </Typography>
                <Button size="small" onClick={copy} startIcon={<ContentCopyIcon fontSize="small" />}>
                  Copy
                </Button>
              </Stack>
            </Box>

            <Stack spacing={1.5} sx={{ textAlign: 'left', mb: 3 }} divider={<Divider flexItem />}>
              <Row label="Status" value={<Chip label="Pending confirmation" color="warning" size="small" />} />
              <Row label="Doctor" value={appointment.doctor?.fullName ?? '—'} />
              <Row label="Treatment" value={appointment.treatment?.name ?? 'General consultation'} />
              <Row label="Date" value={formatDateLong(appointment.scheduledDate)} />
              <Row label="Time" value={formatTime12h(appointment.startTime)} />
            </Stack>

            <Typography variant="body2" color="text.secondary" sx={{ mb: 3 }}>
              Need to make changes? Call us at <b>{CLINIC.phone}</b>.
            </Typography>

            <Stack direction={{ xs: 'column', sm: 'row' }} spacing={1.5} justifyContent="center">
              <Button component={Link} to={`/booking/${appointment.appointmentCode}`} variant="outlined">
                Track My Booking
              </Button>
              <Button onClick={onDone} variant="contained" startIcon={<HomeIcon />}>
                Back to Home
              </Button>
            </Stack>
          </Card>
        </Box>
      </Container>
    </Box>
  );
}

function Row({ label, value }: { label: string; value: React.ReactNode }) {
  return (
    <Stack direction="row" justifyContent="space-between" alignItems="center" spacing={2}>
      <Typography color="text.secondary" variant="body2">
        {label}
      </Typography>
      <Typography sx={{ fontWeight: 600, textAlign: 'right' }} component="div">
        {value}
      </Typography>
    </Stack>
  );
}
