import { useMemo, useState } from 'react';
import { useSearchParams } from 'react-router-dom';
import {
  Alert,
  Box,
  Button,
  Card,
  Container,
  Divider,
  InputAdornment,
  MenuItem,
  Stack,
  Step,
  StepLabel,
  Stepper,
  TextField,
  Typography,
} from '@mui/material';
import Grid from '@mui/material/Grid2';
import ArrowForwardIcon from '@mui/icons-material/ArrowForward';
import ArrowBackIcon from '@mui/icons-material/ArrowBack';
import WhatsAppIcon from '@mui/icons-material/WhatsApp';
import EmailOutlinedIcon from '@mui/icons-material/EmailOutlined';
import CallIcon from '@mui/icons-material/Call';
import BoltOutlinedIcon from '@mui/icons-material/BoltOutlined';
import MarkChatReadOutlinedIcon from '@mui/icons-material/MarkChatReadOutlined';
import VerifiedUserOutlinedIcon from '@mui/icons-material/VerifiedUserOutlined';
import dayjs from 'dayjs';

import { brand, softShadow } from '@/theme/theme';
import { IMG } from '@/data/images';
import { CLINIC, whatsappLink, mailtoLink } from '@/lib/clinic';
import { useDoctors, useTreatments } from '@/lib/queries';
import { getDaySlots } from './slots';
import { formatTime12h } from '@/lib/format';
import { usePageMeta } from '@/lib/usePageMeta';

const STEPS = ['Details', 'Date & Time', 'Confirm'];

const TRUST = [
  { icon: <BoltOutlinedIcon />, title: 'Quick & Easy', sub: 'Just a few steps' },
  { icon: <MarkChatReadOutlinedIcon />, title: 'Get Confirmation', sub: 'Via WhatsApp / Call' },
  { icon: <VerifiedUserOutlinedIcon />, title: 'Safe & Secure', sub: 'Your data stays with you' },
];

// Three-step appointment request (per the client's reference design). The
// request is sent by the visitor via WhatsApp/email/call — this static site
// never stores data or claims the appointment is confirmed.
export default function Booking() {
  usePageMeta(
    'Book Your Appointment — BrightSmile Dental Clinic',
    'Request an appointment at BrightSmile Dental Clinic in a few quick steps — confirmed personally by the clinic via WhatsApp or call.',
  );
  const [params] = useSearchParams();
  const { data: treatments } = useTreatments();
  const { data: doctors } = useDoctors();
  const doctor = doctors?.[0];

  const [step, setStep] = useState(0);
  const [name, setName] = useState('');
  const [phone, setPhone] = useState('');
  const [treatment, setTreatment] = useState(() => params.get('treatment') ?? '');
  // Date/time may arrive preselected from the homepage appointment quick-pick.
  const [date, setDate] = useState(() => {
    const d = params.get('date');
    return d && dayjs(d).isValid() && !dayjs(d).isBefore(dayjs(), 'day') ? d : '';
  });
  const [time, setTime] = useState(() => params.get('time') ?? '');
  const [touched, setTouched] = useState(false);

  const today = dayjs().format('YYYY-MM-DD');
  const maxDate = dayjs().add(60, 'day').format('YYYY-MM-DD');

  // Valid time options for the chosen date, from the clinic's weekly hours.
  const timeOptions = useMemo(() => {
    if (!date || !dayjs(date).isValid()) return [];
    return getDaySlots(doctor, dayjs(date));
  }, [doctor, date]);

  const nameOk = name.trim().length >= 2;
  const phoneOk = /^[+\d][\d\s()-]{7,16}$/.test(phone.trim());
  const dateObj = dayjs(date);
  const dateOk = !!date && dateObj.isValid() && !dateObj.isBefore(dayjs(), 'day');
  const dayOpen = dateOk && timeOptions.length > 0;
  const timeOk = !!time && timeOptions.includes(time);

  const detailsValid = nameOk && phoneOk;
  const dateTimeValid = dateOk && dayOpen && timeOk;

  const treatmentName = treatments?.find((t) => t.slug === treatment)?.name;
  const message =
    `Hi Bright Smile 👋 I'd like to request an appointment.\n\n` +
    `Name: ${name.trim()}\nMobile: ${phone.trim()}\n` +
    (treatmentName ? `Treatment: ${treatmentName}\n` : '') +
    `Preferred day: ${dateObj.isValid() ? dateObj.format('dddd, D MMMM YYYY') : ''}\n` +
    `Preferred time: ${time ? formatTime12h(time) : ''}\n\n` +
    `Please confirm my appointment. Thank you!`;

  const next = () => {
    setTouched(true);
    if (step === 0 && !detailsValid) return;
    if (step === 1 && !dateTimeValid) return;
    setTouched(false);
    setStep((s) => s + 1);
  };

  return (
    <Box sx={{ bgcolor: brand.mist, minHeight: '100vh' }}>
      <Container sx={{ pt: { xs: '86px', md: '116px' }, pb: { xs: 6, md: 9 } }}>
        <Grid container spacing={{ xs: 3, md: 4 }} alignItems="stretch">
          {/* ── Left: photo + reassurance ── */}
          <Grid size={{ xs: 12, md: 5 }}>
            <Box sx={{ position: { md: 'sticky' }, top: { md: 100 } }}>
              <Box sx={{ position: 'relative', borderRadius: '18px', overflow: 'hidden', boxShadow: softShadow, mb: 2.5 }}>
                <Box
                  component="img"
                  src={IMG.dentistPatient}
                  alt="Gentle dental care at BrightSmile"
                  sx={{ width: '100%', height: { xs: 220, md: 320 }, objectFit: 'cover', display: 'block' }}
                />
                <Box sx={{ position: 'absolute', inset: 0, background: 'linear-gradient(180deg, rgba(16,33,61,0.05) 30%, rgba(16,33,61,0.75) 100%)' }} />
                <Box sx={{ position: 'absolute', left: 20, right: 20, bottom: 18 }}>
                  <Typography component="h1" sx={{ color: '#fff', fontWeight: 800, fontSize: { xs: '1.5rem', md: '1.9rem' }, lineHeight: 1.2 }}>
                    Book Your Appointment
                  </Typography>
                  <Typography sx={{ color: 'rgba(255,255,255,0.85)', fontSize: 14, mt: 0.5 }}>
                    Fill in the details and our team will confirm your appointment shortly.
                  </Typography>
                </Box>
              </Box>

              <Grid container spacing={1.5}>
                {TRUST.map((t) => (
                  <Grid size={{ xs: 12, sm: 4, md: 12 }} key={t.title}>
                    <Card sx={{ p: 1.75, display: 'flex', alignItems: 'center', gap: 1.5, boxShadow: 'none', border: `1px solid ${brand.line}` }}>
                      <Box sx={{ width: 38, height: 38, borderRadius: '10px', bgcolor: brand.cloud, color: brand.primary, display: 'grid', placeItems: 'center', flexShrink: 0, '& svg': { fontSize: 20 } }}>
                        {t.icon}
                      </Box>
                      <Box>
                        <Typography sx={{ fontWeight: 700, fontSize: 14, lineHeight: 1.25 }}>{t.title}</Typography>
                        <Typography variant="caption" color="text.secondary">
                          {t.sub}
                        </Typography>
                      </Box>
                    </Card>
                  </Grid>
                ))}
              </Grid>
            </Box>
          </Grid>

          {/* ── Right: stepper form ── */}
          <Grid size={{ xs: 12, md: 7 }}>
            <Card sx={{ p: { xs: 2.5, md: 4 } }}>
              <Stepper activeStep={step} alternativeLabel sx={{ mb: { xs: 3, md: 4 } }}>
                {STEPS.map((label) => (
                  <Step key={label}>
                    <StepLabel>{label}</StepLabel>
                  </Step>
                ))}
              </Stepper>

              {/* Step 1 — Details */}
              {step === 0 && (
                <Stack spacing={2.25}>
                  <TextField
                    label="Full Name"
                    required
                    fullWidth
                    value={name}
                    onChange={(e) => setName(e.target.value)}
                    autoComplete="name"
                    error={touched && !nameOk}
                    helperText={touched && !nameOk ? 'Please enter your name' : ' '}
                  />
                  <TextField
                    label="Phone Number"
                    required
                    fullWidth
                    type="tel"
                    value={phone}
                    onChange={(e) => setPhone(e.target.value)}
                    autoComplete="tel"
                    placeholder="98765 43210"
                    InputProps={{ startAdornment: <InputAdornment position="start">+91</InputAdornment> }}
                    error={touched && !phoneOk}
                    helperText={touched && !phoneOk ? 'Please enter a valid mobile number' : ' '}
                  />
                  <TextField select label="Select Treatment (optional)" fullWidth value={treatment} onChange={(e) => setTreatment(e.target.value)}>
                    <MenuItem value="">General consultation</MenuItem>
                    {(treatments ?? []).map((t) => (
                      <MenuItem key={t.id} value={t.slug}>
                        {t.name}
                      </MenuItem>
                    ))}
                  </TextField>
                  <Button variant="contained" size="large" endIcon={<ArrowForwardIcon />} onClick={next} sx={{ py: 1.3 }}>
                    Proceed to Next
                  </Button>
                </Stack>
              )}

              {/* Step 2 — Date & Time */}
              {step === 1 && (
                <Stack spacing={2.25}>
                  <TextField
                    label="Preferred Date"
                    required
                    fullWidth
                    type="date"
                    value={date}
                    onChange={(e) => {
                      setDate(e.target.value);
                      setTime('');
                    }}
                    InputLabelProps={{ shrink: true }}
                    inputProps={{ min: today, max: maxDate }}
                    error={touched && (!dateOk || !dayOpen)}
                    helperText={
                      touched && !dateOk
                        ? 'Please pick a date from today onwards'
                        : date && dateOk && !dayOpen
                          ? 'The clinic is closed on Sundays — please pick another day'
                          : ' '
                    }
                  />
                  <TextField
                    select
                    label="Preferred Time"
                    required
                    fullWidth
                    value={time}
                    onChange={(e) => setTime(e.target.value)}
                    disabled={!dayOpen}
                    error={touched && dayOpen && !timeOk}
                    helperText={touched && dayOpen && !timeOk ? 'Please select a time' : "Times shown are the clinic's usual hours"}
                  >
                    {timeOptions.map((t) => (
                      <MenuItem key={t} value={t}>
                        {formatTime12h(t)}
                      </MenuItem>
                    ))}
                  </TextField>
                  <Stack direction="row" spacing={1.5}>
                    <Button size="large" startIcon={<ArrowBackIcon />} onClick={() => setStep(0)}>
                      Back
                    </Button>
                    <Button variant="contained" size="large" endIcon={<ArrowForwardIcon />} onClick={next} sx={{ flex: 1, py: 1.3 }}>
                      Proceed to Next
                    </Button>
                  </Stack>
                </Stack>
              )}

              {/* Step 3 — Confirm & send */}
              {step === 2 && (
                <Stack spacing={2}>
                  <Typography sx={{ fontWeight: 800, fontSize: '1.15rem' }}>Review your request</Typography>
                  <Card sx={{ p: 2.25, bgcolor: brand.mist, boxShadow: 'none', border: `1px solid ${brand.line}` }}>
                    <Stack spacing={1}>
                      <Row label="Name" value={name.trim()} />
                      <Row label="Mobile" value={`+91 ${phone.trim()}`} />
                      <Row label="Treatment" value={treatmentName ?? 'General consultation'} />
                      <Row label="Day" value={dateObj.isValid() ? dateObj.format('dddd, D MMMM YYYY') : ''} />
                      <Row label="Time" value={time ? formatTime12h(time) : ''} />
                      <Row label="Dentist" value={doctor?.fullName ?? 'Dr. Afaque Khan'} />
                    </Stack>
                  </Card>

                  <Button
                    variant="contained"
                    size="large"
                    startIcon={<WhatsAppIcon />}
                    component="a"
                    href={whatsappLink(message)}
                    target="_blank"
                    rel="noopener noreferrer"
                    sx={{ py: 1.4, bgcolor: '#1da851', '&:hover': { bgcolor: '#178f44' } }}
                  >
                    Send Request on WhatsApp
                  </Button>
                  <Stack direction={{ xs: 'column', sm: 'row' }} spacing={1.5}>
                    <Button variant="outlined" size="large" fullWidth startIcon={<EmailOutlinedIcon />} component="a" href={mailtoLink('Appointment request — BrightSmile', message)}>
                      Send by Email
                    </Button>
                    <Button variant="outlined" size="large" fullWidth startIcon={<CallIcon />} component="a" href={CLINIC.phoneHref}>
                      Call the Clinic
                    </Button>
                  </Stack>

                  <Alert severity="info" icon={false} sx={{ borderRadius: '10px', bgcolor: brand.cloud, color: 'text.secondary' }}>
                    Your appointment is <b>not confirmed yet</b> — sending the request opens your own
                    WhatsApp or email app, and the clinic will reply to confirm your exact time.
                  </Alert>

                  <Button startIcon={<ArrowBackIcon />} onClick={() => setStep(1)} sx={{ alignSelf: 'flex-start' }}>
                    Back
                  </Button>
                </Stack>
              )}

              {step < 2 && (
                <>
                  <Divider sx={{ my: 3 }} />
                  <Stack direction="row" spacing={1.25} alignItems="center" justifyContent="center">
                    <Typography variant="body2" color="text.secondary">
                      Or book directly on WhatsApp —
                    </Typography>
                    <Button
                      size="small"
                      startIcon={<WhatsAppIcon />}
                      component="a"
                      href={whatsappLink()}
                      target="_blank"
                      rel="noopener noreferrer"
                      sx={{ color: '#1da851', fontWeight: 700 }}
                    >
                      Chat on WhatsApp
                    </Button>
                  </Stack>
                </>
              )}
            </Card>
          </Grid>
        </Grid>
      </Container>
    </Box>
  );
}

function Row({ label, value }: { label: string; value: string }) {
  return (
    <Stack direction="row" justifyContent="space-between" spacing={2}>
      <Typography variant="body2" color="text.secondary">
        {label}
      </Typography>
      <Typography variant="body2" sx={{ fontWeight: 700, textAlign: 'right' }}>
        {value}
      </Typography>
    </Stack>
  );
}
