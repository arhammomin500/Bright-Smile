import { useState } from 'react';
import { useSearchParams, useNavigate } from 'react-router-dom';
import {
  Avatar,
  Box,
  Button,
  Card,
  Container,
  Divider,
  Rating,
  Stack,
  TextField,
  Typography,
  CircularProgress,
} from '@mui/material';
import Grid from '@mui/material/Grid2';
import EventAvailableIcon from '@mui/icons-material/EventAvailable';
import CalendarMonthIcon from '@mui/icons-material/CalendarMonth';
import AccessTimeIcon from '@mui/icons-material/AccessTime';
import VerifiedIcon from '@mui/icons-material/Verified';
import { motion } from 'framer-motion';
import dayjs, { type Dayjs } from 'dayjs';

import { PageHero } from '@/components/ui/PageHero';
import { useToast } from '@/components/feedback/ToastProvider';
import { apiPost, errorMessage } from '@/lib/api';
import { useDoctors, useAvailability } from '@/lib/queries';
import { formatTime12h } from '@/lib/format';
import { brand, softShadow } from '@/theme/theme';
import type { Appointment } from '@/lib/types';
import { SlotPicker } from './SlotPicker';
import { BookingSuccess } from './BookingSuccess';

const MotionBox = motion.create(Box);

// Ultra-simple booking: pick a time, leave a name and number — done.
export default function Booking() {
  const toast = useToast();
  const navigate = useNavigate();
  const [params] = useSearchParams();

  const { data: doctors } = useDoctors();
  // The clinic's sole doctor — powers the day strip and the summary card.
  const doctor = doctors?.[0];

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
        subtitle="Pick a time, leave your name and number — done in under a minute."
        crumbs={[{ label: 'Book Appointment' }]}
      />
      <Container sx={{ py: { xs: 4, md: 6 } }}>
        {submitting ? (
          <Box sx={{ display: 'grid', placeItems: 'center', py: 10, gap: 2 }}>
            <CircularProgress />
            <Typography color="text.secondary">Securing your slot…</Typography>
          </Box>
        ) : (
          <Grid container spacing={{ xs: 3, md: 4 }}>
            {/* ── Left: pick day & time ── */}
            <Grid size={{ xs: 12, md: 7.5 }}>
              <MotionBox initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.5 }}>
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
              </MotionBox>
            </Grid>

            {/* ── Right: summary + your details ── */}
            <Grid size={{ xs: 12, md: 4.5 }}>
              <MotionBox
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: 0.12 }}
                sx={{ position: { md: 'sticky' }, top: { md: 124 } }}
              >
                <Card sx={{ p: { xs: 2.5, md: 3 }, boxShadow: softShadow }}>
                  {/* Doctor header */}
                  <Stack direction="row" spacing={1.75} alignItems="center" sx={{ mb: 2.5 }}>
                    <Avatar src={doctor?.photoUrl ?? undefined} sx={{ width: 54, height: 54 }} />
                    <Box sx={{ minWidth: 0 }}>
                      <Stack direction="row" spacing={0.5} alignItems="center">
                        <Typography sx={{ fontWeight: 800 }} noWrap>
                          {doctor?.fullName ?? 'Dr. Afaque Khan'}
                        </Typography>
                        <VerifiedIcon sx={{ fontSize: 17, color: brand.primary }} />
                      </Stack>
                      <Rating value={5} readOnly size="small" />
                    </Box>
                  </Stack>

                  {/* Selected day & time */}
                  <Stack spacing={1.25} sx={{ mb: 2.5 }}>
                    <SummaryRow
                      icon={<CalendarMonthIcon sx={{ fontSize: 19 }} />}
                      label="Day"
                      value={date ? date.format('ddd, MMM D, YYYY') : 'Not selected'}
                      active={!!date}
                    />
                    <SummaryRow
                      icon={<AccessTimeIcon sx={{ fontSize: 19 }} />}
                      label="Time"
                      value={startTime ? formatTime12h(startTime) : 'Pick a time slot'}
                      active={!!startTime}
                    />
                  </Stack>

                  <Divider sx={{ mb: 2.5 }} />

                  {/* Details */}
                  <Typography sx={{ fontWeight: 800, mb: 1.5, fontSize: '1.02rem' }}>
                    Your details
                  </Typography>
                  <Stack spacing={1.75}>
                    <TextField label="Full name" fullWidth value={name} onChange={(e) => setName(e.target.value)} />
                    <TextField label="Mobile number" fullWidth type="tel" value={phone} onChange={(e) => setPhone(e.target.value)} />
                    <Button
                      variant="contained"
                      size="large"
                      startIcon={<EventAvailableIcon />}
                      disabled={!canSubmit}
                      onClick={submit}
                      sx={{ py: 1.4, fontSize: '1.02rem' }}
                    >
                      Confirm Booking
                    </Button>
                  </Stack>

                  <Typography variant="caption" sx={{ display: 'block', mt: 2, color: 'text.secondary', textAlign: 'center' }}>
                    Free rescheduling · Our reception will confirm your visit
                  </Typography>
                </Card>
              </MotionBox>
            </Grid>
          </Grid>
        )}
      </Container>
    </>
  );
}

function SummaryRow({ icon, label, value, active }: { icon: React.ReactNode; label: string; value: string; active: boolean }) {
  return (
    <Stack
      direction="row"
      spacing={1.5}
      alignItems="center"
      sx={{
        p: 1.25,
        borderRadius: '12px',
        bgcolor: active ? brand.mist : '#fff',
        border: `1.5px ${active ? 'solid' : 'dashed'} ${active ? 'rgba(31,111,235,0.35)' : brand.line}`,
        transition: 'all .2s ease',
      }}
    >
      <Box sx={{ color: active ? brand.primary : 'text.disabled', display: 'grid', placeItems: 'center' }}>{icon}</Box>
      <Typography variant="caption" sx={{ color: 'text.secondary', fontWeight: 700, textTransform: 'uppercase', letterSpacing: 0.5, minWidth: 34 }}>
        {label}
      </Typography>
      <Typography variant="body2" sx={{ fontWeight: 700, color: active ? 'text.primary' : 'text.disabled' }}>
        {value}
      </Typography>
    </Stack>
  );
}
