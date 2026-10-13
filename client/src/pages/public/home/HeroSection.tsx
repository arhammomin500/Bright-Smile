import { useState } from 'react';
import { Box, Button, Container, Stack, Typography } from '@mui/material';
import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import ArrowOutwardIcon from '@mui/icons-material/ArrowOutward';
import VerifiedOutlinedIcon from '@mui/icons-material/VerifiedOutlined';
import MedicalServicesOutlinedIcon from '@mui/icons-material/MedicalServicesOutlined';
import LocalHospitalOutlinedIcon from '@mui/icons-material/LocalHospitalOutlined';
import { brand } from '@/theme/theme';


const MotionBox = motion.create(Box);

// The clinic's own hero footage, served from client/public/videos/.
const HERO_VIDEO = '/videos/hero-clinic.mp4';
const HERO_POSTER = 'https://images.unsplash.com/photo-1606811841689-23dfddce3e95?w=1600&q=75&auto=format&fit=crop';

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
                  borderRadius: '10px',
                  px: 1.75,
                  py: 0.75,
                  mb: 3,
                }}
              >
                <VerifiedOutlinedIcon sx={{ fontSize: 17, color: '#7fe9e5' }} />
                <Typography variant="body2" sx={{ color: '#fff', fontWeight: 700 }}>
                  Dr. Afaque Khan · BDS, MDS · 15+ years
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
                Modern, painless dentistry in a calm, welcoming space. From routine check-ups to
                complete smile makeovers — personal care from Dr. Afaque Khan at every visit.
              </Typography>
            </MotionBox>

            <MotionBox {...fadeUp(0.42)}>
              <Stack direction={{ xs: 'column', sm: 'row' }} spacing={2}>
                <Button
                  component={Link}
                  to="/book"
                  size="large"
                  endIcon={<ArrowOutwardIcon sx={{ fontSize: 19 }} />}
                  sx={{
                    bgcolor: '#fff',
                    color: brand.ink,
                    px: 3.5,
                    py: 1.4,
                    fontSize: '1rem',
                    boxShadow: '0 12px 30px rgba(7,25,55,0.35)',
                    '&:hover': { bgcolor: '#f2f7ff', transform: 'translateY(-2px)' },
                  }}
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
                  { icon: <MedicalServicesOutlinedIcon sx={{ fontSize: 18 }} />, label: 'Painless Treatments' },
                  { icon: <VerifiedOutlinedIcon sx={{ fontSize: 18 }} />, label: 'Modern Equipment' },
                  { icon: <LocalHospitalOutlinedIcon sx={{ fontSize: 18 }} />, label: 'Same-day Emergency Care' },
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
