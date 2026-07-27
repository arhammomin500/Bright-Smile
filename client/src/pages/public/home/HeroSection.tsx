import { useState } from 'react';
import {
  Box,
  Button,
  Card,
  Container,
  MenuItem,
  Stack,
  TextField,
  Typography,
  Rating,
} from '@mui/material';
import Grid from '@mui/material/Grid2';
import { Link, useNavigate } from 'react-router-dom';
import { motion } from 'framer-motion';
import dayjs from 'dayjs';
import ArrowOutwardIcon from '@mui/icons-material/ArrowOutward';
import SearchIcon from '@mui/icons-material/Search';
import VerifiedOutlinedIcon from '@mui/icons-material/VerifiedOutlined';
import MedicalServicesOutlinedIcon from '@mui/icons-material/MedicalServicesOutlined';
import LocalHospitalOutlinedIcon from '@mui/icons-material/LocalHospitalOutlined';
import { brand, hoverShadow } from '@/theme/theme';


const MotionBox = motion.create(Box);

// The clinic's own hero footage, served from client/public/videos/.
const HERO_VIDEO = '/videos/hero-clinic.mp4';
const HERO_POSTER = 'https://picsum.photos/seed/brightclinic/1600/900';

// Height of the fixed header (top strip + nav) the hero must clear.
const NAV_OFFSET = { xs: '64px', md: '108px' };

const fadeUp = (delay: number) => ({
  initial: { opacity: 0, y: 30 },
  animate: { opacity: 1, y: 0 },
  transition: { duration: 0.7, delay, ease: [0.22, 1, 0.36, 1] as const },
});

export function HeroSection() {
  return (
    <>
      {/* ── Full-bleed video hero ── */}
      <Box
        sx={{
          position: 'relative',
          mt: NAV_OFFSET,
          height: { xs: 'min(78vh, 620px)', md: 'min(82vh, 700px)' },
          minHeight: { xs: 460, md: 540 },
          overflow: 'hidden',
        }}
      >
        <HeroVideo />

        {/* Subtle blue-dark overlay for readability (stronger on the text side) */}
        <Box
          sx={{
            position: 'absolute',
            inset: 0,
            background:
              'linear-gradient(90deg, rgba(7,25,55,0.66) 0%, rgba(7,25,55,0.38) 46%, rgba(7,25,55,0.12) 75%, rgba(7,25,55,0.05) 100%)',
          }}
        />

        {/* Content on top of the video */}
        <Container sx={{ position: 'relative', height: '100%', display: 'flex', alignItems: 'center' }}>
          <Box sx={{ maxWidth: 640, pb: { xs: 8, md: 10 } }}>
            <MotionBox {...fadeUp(0.05)}>
              <Stack
                direction="row"
                spacing={1}
                alignItems="center"
                sx={{
                  display: 'inline-flex',
                  bgcolor: 'rgba(255,255,255,0.14)',
                  backdropFilter: 'blur(8px)',
                  border: '1px solid rgba(255,255,255,0.25)',
                  borderRadius: 999,
                  px: 1.75,
                  py: 0.6,
                  mb: 3,
                }}
              >
                <Rating value={5} readOnly size="small" sx={{ '& .MuiRating-iconFilled': { color: '#ffd66b' } }} />
                <Typography variant="body2" sx={{ color: '#fff', fontWeight: 700 }}>
                  4.9/5 · 2,000+ reviews
                </Typography>
              </Stack>
            </MotionBox>

            <MotionBox {...fadeUp(0.15)}>
              <Typography
                variant="h1"
                sx={{
                  color: '#fff',
                  fontSize: { xs: '2.6rem', sm: '3.4rem', md: '4.1rem' },
                  textShadow: '0 2px 24px rgba(7,25,55,0.35)',
                  mb: 2.5,
                }}
              >
                Gentle care for
                <br />
                brighter smiles
              </Typography>
            </MotionBox>

            <MotionBox {...fadeUp(0.28)}>
              <Typography
                sx={{
                  color: 'rgba(255,255,255,0.92)',
                  fontSize: { xs: '1.05rem', md: '1.2rem' },
                  maxWidth: 480,
                  mb: 4.5,
                  textShadow: '0 1px 12px rgba(7,25,55,0.3)',
                }}
              >
                Modern, painless dentistry by Dr. Afaque Khan in a calm, welcoming space — trusted
                by more than 15,000 patients over 15 years.
              </Typography>
            </MotionBox>

            <MotionBox {...fadeUp(0.42)}>
              <Stack direction={{ xs: 'column', sm: 'row' }} spacing={2}>
                {/* Reference-style pill: white with a circular arrow */}
                <Button
                  component={Link}
                  to="/book"
                  size="large"
                  sx={{
                    bgcolor: '#fff',
                    color: brand.ink,
                    pl: 3.5,
                    pr: 1.25,
                    py: 1,
                    fontSize: '1rem',
                    boxShadow: '0 14px 34px rgba(7,25,55,0.35)',
                    '&:hover': { bgcolor: '#f2f7ff', transform: 'translateY(-2px)' },
                  }}
                  endIcon={
                    <Box
                      sx={{
                        width: 38,
                        height: 38,
                        ml: 1,
                        borderRadius: '50%',
                        bgcolor: brand.primary,
                        color: '#fff',
                        display: 'grid',
                        placeItems: 'center',
                      }}
                    >
                      <ArrowOutwardIcon sx={{ fontSize: 19 }} />
                    </Box>
                  }
                >
                  Book Appointment
                </Button>
                <Button
                  component={Link}
                  to="/contact"
                  size="large"
                  variant="outlined"
                  sx={{
                    color: '#fff',
                    borderColor: 'rgba(255,255,255,0.55)',
                    '&:hover': { borderColor: '#fff', bgcolor: 'rgba(255,255,255,0.1)' },
                  }}
                >
                  Contact Us
                </Button>
              </Stack>
            </MotionBox>

            {/* Slim trust row */}
            <MotionBox {...fadeUp(0.56)}>
              <Stack direction="row" spacing={3} flexWrap="wrap" useFlexGap sx={{ mt: 4.5 }}>
                {[
                  { icon: <MedicalServicesOutlinedIcon sx={{ fontSize: 18 }} />, label: 'Experienced Specialists' },
                  { icon: <VerifiedOutlinedIcon sx={{ fontSize: 18 }} />, label: 'Modern Equipment' },
                  { icon: <LocalHospitalOutlinedIcon sx={{ fontSize: 18 }} />, label: '24/7 Emergency' },
                ].map((b) => (
                  <Stack key={b.label} direction="row" spacing={1} alignItems="center" sx={{ color: 'rgba(255,255,255,0.9)' }}>
                    {b.icon}
                    <Typography variant="body2" sx={{ fontWeight: 600 }}>
                      {b.label}
                    </Typography>
                  </Stack>
                ))}
              </Stack>
            </MotionBox>
          </Box>
        </Container>
      </Box>

      {/* ── Floating quick-booking bar, straddling the hero's bottom edge ── */}
      <Container sx={{ position: 'relative', zIndex: 2, mt: { xs: -4.5, md: -5.5 } }}>
        <QuickBookingWidget />
      </Container>
    </>
  );
}

// Full-cover looping muted video with graceful poster fallback.
// The ref/onCanPlay nudge force-sets `muted` and starts playback — React doesn't
// render the muted attribute into the DOM, which browsers require for autoplay.
function HeroVideo() {
  const [failed, setFailed] = useState(false);
  const startPlayback = (el: HTMLVideoElement | null) => {
    if (!el) return;
    el.muted = true;
    el.play().catch(() => {
      /* autoplay blocked — poster remains visible */
    });
  };

  if (failed) {
    return (
      <Box
        component="img"
        src={HERO_POSTER}
        alt="Bright Smile Dental Clinic"
        sx={{ position: 'absolute', inset: 0, width: '100%', height: '100%', objectFit: 'cover' }}
      />
    );
  }
  return (
    <Box
      component="video"
      ref={startPlayback}
      src={HERO_VIDEO}
      poster={HERO_POSTER}
      autoPlay
      muted
      loop
      playsInline
      onCanPlay={(e: React.SyntheticEvent<HTMLVideoElement>) => startPlayback(e.currentTarget)}
      onError={() => setFailed(true)}
      sx={{ position: 'absolute', inset: 0, width: '100%', height: '100%', objectFit: 'cover' }}
    />
  );
}

// One-tap "find a slot" bar: pick a day, jump straight into the slot picker.
function QuickBookingWidget() {
  const navigate = useNavigate();
  const [date, setDate] = useState(dayjs().add(1, 'day').format('YYYY-MM-DD'));

  return (
    <MotionBox
      initial={{ opacity: 0, y: 26 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.7, delay: 0.65, ease: [0.22, 1, 0.36, 1] }}
    >
      <Card sx={{ p: { xs: 2, md: 2.5 }, borderRadius: 5, boxShadow: hoverShadow, maxWidth: 640, mx: 'auto' }}>
        <Grid container spacing={1.5} alignItems="center">
          <Grid size={{ xs: 12, sm: 7 }}>
            <TextField
              type="date"
              fullWidth
              size="small"
              label="Preferred date"
              InputLabelProps={{ shrink: true }}
              inputProps={{ min: dayjs().format('YYYY-MM-DD') }}
              value={date}
              onChange={(e) => setDate(e.target.value)}
            />
          </Grid>
          <Grid size={{ xs: 12, sm: 5 }}>
            <Button
              fullWidth
              variant="contained"
              size="large"
              startIcon={<SearchIcon />}
              onClick={() => navigate(`/book${date ? `?date=${date}` : ''}`)}
              sx={{ py: 1.15 }}
            >
              Find a Slot
            </Button>
          </Grid>
        </Grid>
      </Card>
    </MotionBox>
  );
}
