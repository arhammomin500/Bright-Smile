import { useState } from 'react';
import { useSearchParams, useNavigate } from 'react-router-dom';
import { Box, Button, Card, Container, Stack, TextField, Typography, CircularProgress } from '@mui/material';
import Grid from '@mui/material/Grid2';
import EventAvailableIcon from '@mui/icons-material/EventAvailable';
import dayjs, { type Dayjs } from 'dayjs';

import { PageHero } from '@/components/ui/PageHero';
import { useToast } from '@/components/feedback/ToastProvider';
import { apiPost, errorMessage } from '@/lib/api';
import { useDoctors, useAvailability } from '@/lib/queries';
import { formatTime12h } from '@/lib/format';
import { brand } from '@/theme/theme';
import type { Appointment } from '@/lib/types';
import { SlotPicker } from './SlotPicker';
import { BookingSuccess } from './BookingSuccess';

// Ultra-simple booking: pick a time, leave a name and number — done.
export default function Booking() {
  const toast = useToast();
  const navigate = useNavigate();
  const [params] = useSearchParams();

  const { data: doctors } = useDoctors();
  // The clinic's sole doctor — provides working days for the day strip.
  const doctor = doctors?.[0];

  // Pre-fill the date when arriving from the homepage quick-booking widget.
  const [date, setDate] = useState<Dayjs | null>(() => {
    const d = params.get('date');
    return d && dayjs(d).isValid() && !dayjs(d).isBefore(dayjs(), 'day') ? dayjs(d) : dayjs();
  });
  const [startTime, setStartTime] = useState<string | undefined>();
  const [name, setName] = useState('');
  const [phone, setPhone] = useState('');
  const [submitting, setSubmitting] = useState(false);
  const [result, setResult] = useState<Appointment | null>(null);

  const dateStr = date ? date.format('YYYY-MM-DD') : undefined;
  const { data: availability, isLoading: loadingSlots } = useAvailability(dateStr);

  const canSubmit = !!date && !!startTime && name.trim().length >= 2 && phone.trim().length >= 6;

  const submit = async () => {
    if (!canSubmit || !dateStr || !startTime) return;
    setSubmitting(true);
    try {
      const [firstName, ...rest] = name.trim().split(/\s+/);
      const res = await apiPost<{ appointmentCode: string; appointment: Appointment }>('/appointments', {
        date: dateStr,
        startTime,
        patient: { firstName, lastName: rest.join(' '), phone: phone.trim() },
      });
      setResult(res.appointment);
      toast.success('Appointment requested successfully!');
    } catch (e) {
      toast.error(errorMessage(e, 'Could not book the appointment.'));
      // If the slot was just taken, clear it so a fresh one can be picked.
      setStartTime(undefined);
    } finally {
      setSubmitting(false);
    }
  };

  if (result) {
    return <BookingSuccess appointment={result} onDone={() => navigate('/')} />;
  }

  return (
    <>
      <PageHero
        title="Book Your Appointment"
        subtitle="Pick a time with Dr. Afaque Khan and leave your name and number — that's it."
        crumbs={[{ label: 'Book Appointment' }]}
      />
      <Container sx={{ py: { xs: 4, md: 6 } }} maxWidth="md">
        {submitting ? (
          <Box sx={{ display: 'grid', placeItems: 'center', py: 8, gap: 2 }}>
            <CircularProgress />
            <Typography color="text.secondary">Securing your slot…</Typography>
          </Box>
        ) : (
          <Stack spacing={3}>
            {/* 1 · When */}
            <Card sx={{ p: { xs: 2.5, md: 3.5 } }}>
              <SlotPicker
                doctor={doctor}
                date={date}
                onDateChange={(d) => {
                  setDate(d);
                  setStartTime(undefined);
                }}
                availability={availability}
                loadingSlots={loadingSlots}
                startTime={startTime}
                onSlotChange={setStartTime}
              />
            </Card>

            {/* 2 · Who */}
            <Card sx={{ p: { xs: 2.5, md: 3.5 } }}>
              <Typography variant="subtitle1" sx={{ fontWeight: 700, mb: 2 }}>
                Your details
              </Typography>
              <Grid container spacing={2}>
                <Grid size={{ xs: 12, sm: 6 }}>
                  <TextField label="Full name" required fullWidth value={name} onChange={(e) => setName(e.target.value)} />
                </Grid>
                <Grid size={{ xs: 12, sm: 6 }}>
                  <TextField label="Mobile number" required fullWidth value={phone} onChange={(e) => setPhone(e.target.value)} />
                </Grid>
              </Grid>
            </Card>

            {/* Confirm */}
            <Box sx={{ textAlign: 'center' }}>
              {date && startTime && (
                <Typography variant="body2" sx={{ mb: 1.5, color: 'text.secondary' }}>
                  Booking <b style={{ color: brand.primary }}>{date.format('dddd, MMM D')}</b> at{' '}
                  <b style={{ color: brand.primary }}>{formatTime12h(startTime)}</b> with Dr. Afaque Khan
                </Typography>
              )}
              <Button
                variant="contained"
                size="large"
                startIcon={<EventAvailableIcon />}
                disabled={!canSubmit}
                onClick={submit}
                sx={{ px: 6, py: 1.5, fontSize: '1.05rem' }}
              >
                Confirm Booking
              </Button>
            </Box>
          </Stack>
        )}
      </Container>
    </>
  );
}
