import { useEffect, useRef, useState } from 'react';
import { useSearchParams, useNavigate } from 'react-router-dom';
import {
  Avatar,
  Box,
  Button,
  Container,
  Rating,
  Stack,
  TextField,
  Typography,
  CircularProgress,
} from '@mui/material';
import Grid from '@mui/material/Grid2';
import EventAvailableIcon from '@mui/icons-material/EventAvailable';
import VerifiedIcon from '@mui/icons-material/Verified';
import dayjs, { type Dayjs } from 'dayjs';

import { useToast } from '@/components/feedback/ToastProvider';
import { apiPost, errorMessage } from '@/lib/api';
import { useDoctors, useAvailability } from '@/lib/queries';
import { formatTime12h } from '@/lib/format';
import { brand } from '@/theme/theme';
import type { Appointment } from '@/lib/types';
import { SlotPicker, DAYS_AHEAD } from './SlotPicker';
import { BookingSuccess } from './BookingSuccess';

// The fastest possible booking: one mobile-first column —
// date → time → name → mobile → sticky Confirm. Target: under 30 seconds.
export default function Booking() {
  const toast = useToast();
  const navigate = useNavigate();
  const [params] = useSearchParams();

  const { data: doctors } = useDoctors();
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
  // Once the visitor taps a day themselves, stop auto-advancing.
  const userPickedDay = useRef(false);

  const dateStr = date ? date.format('YYYY-MM-DD') : undefined;
  const { data: availability, isLoading: loadingSlots } = useAvailability(dateStr);

  // Show the next day with open slots by default — zero effort for the visitor.
  useEffect(() => {
    if (!availability || userPickedDay.current || !date) return;
    const hasOpen = availability.isWorkingDay && availability.slots.some((s) => s.available);
    if (!hasOpen && date.diff(dayjs(), 'day') < DAYS_AHEAD - 1) {
      setDate(date.add(1, 'day'));
    }
  }, [availability]); // eslint-disable-line react-hooks/exhaustive-deps

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

  const summaryText = date && startTime ? `${date.format('ddd, MMM D')} · ${formatTime12h(startTime)}` : 'Select a time slot';

  return (
    <Box sx={{ bgcolor: brand.mist, minHeight: '100vh' }}>
      {/* pb clears the sticky mobile bar */}
      <Container maxWidth="sm" sx={{ pt: { xs: '86px', md: '132px' }, pb: { xs: 14, md: 8 } }}>
        {/* Compact header — doctor stays visible from the very first moment */}
        <Stack direction="row" spacing={1.5} alignItems="center" sx={{ mb: 2.5 }}>
          <Avatar src={doctor?.photoUrl ?? undefined} sx={{ width: 52, height: 52, border: `2px solid #fff`, boxShadow: '0 4px 12px rgba(11,28,54,0.15)' }} />
          <Box sx={{ minWidth: 0, flex: 1 }}>
            <Stack direction="row" spacing={0.5} alignItems="center">
              <Typography sx={{ fontWeight: 800, fontSize: '1.1rem' }} noWrap>
                {doctor?.fullName ?? 'Dr. Afaque Khan'}
              </Typography>
              <VerifiedIcon sx={{ fontSize: 17, color: brand.primary }} />
            </Stack>
            <Stack direction="row" spacing={0.75} alignItems="center">
              <Rating value={5} readOnly size="small" />
              <Typography variant="caption" color="text.secondary" sx={{ fontWeight: 600 }}>
                4.9 · 15+ yrs
              </Typography>
            </Stack>
          </Box>
        </Stack>

        {submitting ? (
          <Box sx={{ display: 'grid', placeItems: 'center', py: 10, gap: 2 }}>
            <CircularProgress />
            <Typography color="text.secondary">Securing your slot…</Typography>
          </Box>
        ) : (
          <Stack spacing={2}>
            {/* Date + time */}
            <Box sx={{ bgcolor: '#fff', borderRadius: '20px', border: `1px solid ${brand.line}`, p: { xs: 2, md: 2.5 } }}>
              <SlotPicker
                doctor={doctor}
                date={date}
                onDateChange={(d) => {
                  userPickedDay.current = true;
                  setDate(d);
                  setStartTime(undefined);
                }}
                availability={availability}
                loadingSlots={loadingSlots}
                startTime={startTime}
                onSlotChange={setStartTime}
              />
            </Box>

            {/* Name + mobile */}
            <Box sx={{ bgcolor: '#fff', borderRadius: '20px', border: `1px solid ${brand.line}`, p: { xs: 2, md: 2.5 } }}>
              <Typography sx={{ fontWeight: 800, mb: 1.5, fontSize: '1rem' }}>Your details</Typography>
              <Grid container spacing={1.5}>
                <Grid size={{ xs: 12, sm: 6 }}>
                  <TextField label="Name" fullWidth value={name} onChange={(e) => setName(e.target.value)} autoComplete="name" />
                </Grid>
                <Grid size={{ xs: 12, sm: 6 }}>
                  <TextField label="Mobile number" fullWidth type="tel" value={phone} onChange={(e) => setPhone(e.target.value)} autoComplete="tel" />
                </Grid>
              </Grid>
            </Box>

            {/* Desktop confirm (mobile uses the sticky bar) */}
            <Button
              variant="contained"
              size="large"
              startIcon={<EventAvailableIcon />}
              disabled={!canSubmit}
              onClick={submit}
              sx={{ py: 1.5, fontSize: '1.05rem', display: { xs: 'none', md: 'inline-flex' } }}
            >
              Confirm Booking — {summaryText}
            </Button>
          </Stack>
        )}
      </Container>

      {/* ── Sticky bottom confirm bar (mobile) ── */}
      {!submitting && (
        <Box
          sx={{
            position: 'fixed',
            left: 0,
            right: 0,
            bottom: 0,
            zIndex: 1200,
            display: { xs: 'block', md: 'none' },
            bgcolor: 'rgba(255,255,255,0.97)',
            backdropFilter: 'blur(12px)',
            borderTop: `1px solid ${brand.line}`,
            px: 2,
            pt: 1.25,
            pb: 'calc(10px + env(safe-area-inset-bottom))',
            boxShadow: '0 -8px 24px rgba(11,28,54,0.08)',
          }}
        >
          <Stack direction="row" spacing={1.5} alignItems="center">
            <Box sx={{ flex: 1, minWidth: 0 }}>
              <Typography variant="caption" sx={{ color: 'text.secondary', fontWeight: 600, lineHeight: 1.2, display: 'block' }}>
                {doctor?.fullName ?? 'Dr. Afaque Khan'}
              </Typography>
              <Typography sx={{ fontWeight: 800, fontSize: '0.98rem' }} noWrap>
                {summaryText}
              </Typography>
            </Box>
            <Button
              variant="contained"
              disabled={!canSubmit}
              onClick={submit}
              sx={{ px: 3.5, py: 1.4, fontSize: '1rem', flexShrink: 0 }}
            >
              Confirm
            </Button>
          </Stack>
        </Box>
      )}
    </Box>
  );
}
