import { useEffect, useRef, useState } from 'react';
import { useSearchParams } from 'react-router-dom';
import {
  Alert,
  Avatar,
  Box,
  Button,
  Container,
  Divider,
  Stack,
  TextField,
  Typography,
} from '@mui/material';
import Grid from '@mui/material/Grid2';
import WhatsAppIcon from '@mui/icons-material/WhatsApp';
import EmailOutlinedIcon from '@mui/icons-material/EmailOutlined';
import CallIcon from '@mui/icons-material/Call';
import ArrowBackIcon from '@mui/icons-material/ArrowBack';
import VerifiedIcon from '@mui/icons-material/Verified';
import CalendarMonthIcon from '@mui/icons-material/CalendarMonth';
import AccessTimeIcon from '@mui/icons-material/AccessTime';
import dayjs, { type Dayjs } from 'dayjs';

import { useDoctors } from '@/lib/queries';
import { CLINIC, whatsappLink, mailtoLink } from '@/lib/clinic';
import { formatTime12h } from '@/lib/format';
import { brand } from '@/theme/theme';
import { usePageMeta } from '@/lib/usePageMeta';
import { SlotPicker, getDaySlots, DAYS_AHEAD } from './SlotPicker';

// Honest frontend-only booking: the visitor picks a preferred day & time and
// sends the request themselves via WhatsApp, email, or a call. The website
// never claims the appointment is confirmed or stored.
export default function Booking() {
  usePageMeta(
    'Book an Appointment — Bright Smile Dental Clinic',
    'Request an appointment with Dr. Afaque Khan. Pick a preferred day and time and send your request on WhatsApp — the clinic confirms it personally.',
  );
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
  const [reviewing, setReviewing] = useState(false);
  const userPickedDay = useRef(false);

  // If today is closed / already over, start on the next day with hours.
  useEffect(() => {
    if (!doctor || userPickedDay.current || !date) return;
    if (getDaySlots(doctor, date).length === 0 && date.diff(dayjs(), 'day') < DAYS_AHEAD - 1) {
      setDate(date.add(1, 'day'));
    }
  }, [doctor, date]);

  const canReview = !!date && !!startTime && name.trim().length >= 2 && phone.trim().length >= 6;
  const summaryText = date && startTime ? `${date.format('ddd, MMM D')} · ${formatTime12h(startTime)}` : 'Select a time';

  const requestMessage =
    date && startTime
      ? `Hi Bright Smile 👋 I'd like to request an appointment.\n\n` +
        `Name: ${name.trim()}\nMobile: ${phone.trim()}\n` +
        `Preferred day: ${date.format('dddd, D MMMM YYYY')}\nPreferred time: ${formatTime12h(startTime)}\n\n` +
        `Please confirm my appointment. Thank you!`
      : '';

  if (reviewing && date && startTime) {
    return (
      <ReviewRequest
        doctorName={doctor?.fullName ?? 'Dr. Afaque Khan'}
        summary={`${date.format('dddd, D MMMM YYYY')} at ${formatTime12h(startTime)}`}
        name={name.trim()}
        phone={phone.trim()}
        message={requestMessage}
        onBack={() => setReviewing(false)}
      />
    );
  }

  return (
    <Box sx={{ bgcolor: brand.mist, minHeight: '100vh' }}>
      <Container maxWidth="sm" sx={{ pt: { xs: '86px', md: '132px' }, pb: { xs: 14, md: 8 } }}>
        {/* Doctor header — visible from the first moment */}
        <Stack direction="row" spacing={1.5} alignItems="center" sx={{ mb: 2.5 }}>
          <Avatar
            src={doctor?.photoUrl ?? undefined}
            alt={doctor?.fullName ?? 'Dr. Afaque Khan'}
            sx={{ width: 52, height: 52, border: '2px solid #fff', boxShadow: '0 4px 12px rgba(11,28,54,0.15)' }}
          />
          <Box sx={{ minWidth: 0, flex: 1 }}>
            <Stack direction="row" spacing={0.5} alignItems="center">
              <Typography component="h1" sx={{ fontWeight: 800, fontSize: '1.1rem' }} noWrap>
                {doctor?.fullName ?? 'Dr. Afaque Khan'}
              </Typography>
              <VerifiedIcon sx={{ fontSize: 17, color: brand.primary }} />
            </Stack>
            <Typography variant="caption" color="text.secondary" sx={{ fontWeight: 600 }}>
              {doctor?.specialization ?? 'General, Cosmetic & Implant Dentistry'} · {doctor?.experienceYears ?? 15}+ yrs
            </Typography>
          </Box>
        </Stack>

        <Stack spacing={2}>
          {/* Date + time */}
          <Box sx={{ bgcolor: '#fff', borderRadius: '16px', border: `1px solid ${brand.line}`, p: { xs: 2, md: 2.5 } }}>
            <SlotPicker
              doctor={doctor}
              date={date}
              onDateChange={(d) => {
                userPickedDay.current = true;
                setDate(d);
                setStartTime(undefined);
              }}
              startTime={startTime}
              onSlotChange={setStartTime}
            />
          </Box>

          {/* Name + mobile */}
          <Box sx={{ bgcolor: '#fff', borderRadius: '16px', border: `1px solid ${brand.line}`, p: { xs: 2, md: 2.5 } }}>
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

          {/* Desktop action (mobile uses the sticky bar) */}
          <Button
            variant="contained"
            size="large"
            disabled={!canReview}
            onClick={() => setReviewing(true)}
            sx={{ py: 1.5, fontSize: '1.02rem', display: { xs: 'none', md: 'inline-flex' } }}
          >
            Review request — {summaryText}
          </Button>
        </Stack>
      </Container>

      {/* Sticky bottom bar (mobile) */}
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
          <Button variant="contained" disabled={!canReview} onClick={() => setReviewing(true)} sx={{ px: 3.5, py: 1.4, fontSize: '1rem', flexShrink: 0 }}>
            Review
          </Button>
        </Stack>
      </Box>
    </Box>
  );
}

// Final step: show exactly what will be sent and let the visitor send it
// themselves. No fake confirmations, IDs, or availability.
function ReviewRequest({
  doctorName,
  summary,
  name,
  phone,
  message,
  onBack,
}: {
  doctorName: string;
  summary: string;
  name: string;
  phone: string;
  message: string;
  onBack: () => void;
}) {
  return (
    <Box sx={{ bgcolor: brand.mist, minHeight: '100vh' }}>
      <Container maxWidth="sm" sx={{ pt: { xs: '86px', md: '132px' }, pb: 8 }}>
        <Button startIcon={<ArrowBackIcon />} onClick={onBack} sx={{ mb: 2 }}>
          Edit request
        </Button>

        <Box sx={{ bgcolor: '#fff', borderRadius: '16px', border: `1px solid ${brand.line}`, p: { xs: 2.5, md: 3.5 } }}>
          <Typography component="h1" variant="h5" sx={{ fontWeight: 800, mb: 0.75 }}>
            Review your request
          </Typography>
          <Typography variant="body2" color="text.secondary" sx={{ mb: 2.5 }}>
            Send it with one tap — the clinic will reply to confirm your appointment.
          </Typography>

          <Stack spacing={1.25} sx={{ mb: 2.5 }}>
            <SummaryLine icon={<VerifiedIcon sx={{ fontSize: 18 }} />} label="Doctor" value={doctorName} />
            <SummaryLine icon={<CalendarMonthIcon sx={{ fontSize: 18 }} />} label="When" value={summary} />
            <SummaryLine icon={<AccessTimeIcon sx={{ fontSize: 18 }} />} label="Contact" value={`${name} · ${phone}`} />
          </Stack>

          <Divider sx={{ mb: 2.5 }} />

          <Stack spacing={1.25}>
            <Button
              variant="contained"
              size="large"
              startIcon={<WhatsAppIcon />}
              component="a"
              href={whatsappLink(message)}
              target="_blank"
              rel="noopener noreferrer"
              sx={{ py: 1.5, fontSize: '1.02rem', bgcolor: '#1da851', '&:hover': { bgcolor: '#178f44' } }}
            >
              Send on WhatsApp
            </Button>
            <Stack direction={{ xs: 'column', sm: 'row' }} spacing={1.25}>
              <Button
                variant="outlined"
                size="large"
                fullWidth
                startIcon={<EmailOutlinedIcon />}
                component="a"
                href={mailtoLink('Appointment request — Bright Smile', message)}
              >
                Send by Email
              </Button>
              <Button variant="outlined" size="large" fullWidth startIcon={<CallIcon />} component="a" href={CLINIC.phoneHref}>
                Call the Clinic
              </Button>
            </Stack>
          </Stack>

          <Alert severity="info" icon={false} sx={{ mt: 2.5, borderRadius: '10px', bgcolor: brand.cloud, color: 'text.secondary' }}>
            Your appointment is <b>not confirmed yet</b> — this website prepares the request and you send it directly
            to the clinic. The clinic will reply to confirm your exact time.
          </Alert>
        </Box>
      </Container>
    </Box>
  );
}

function SummaryLine({ icon, label, value }: { icon: React.ReactNode; label: string; value: string }) {
  return (
    <Stack direction="row" spacing={1.5} alignItems="center" sx={{ p: 1.25, borderRadius: '10px', bgcolor: brand.mist, border: `1px solid ${brand.line}` }}>
      <Box sx={{ color: brand.primary, display: 'grid', placeItems: 'center' }}>{icon}</Box>
      <Typography variant="caption" sx={{ color: 'text.secondary', fontWeight: 700, textTransform: 'uppercase', letterSpacing: 0.5, minWidth: 54 }}>
        {label}
      </Typography>
      <Typography variant="body2" sx={{ fontWeight: 700 }} noWrap>
        {value}
      </Typography>
    </Stack>
  );
}
