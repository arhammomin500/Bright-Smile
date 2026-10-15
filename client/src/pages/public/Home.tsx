import { useState } from 'react';
import {
  Box,
  Button,
  Card,
  CardActionArea,
  Container,
  Dialog,
  IconButton,
  Stack,
  Typography,
} from '@mui/material';
import Grid from '@mui/material/Grid2';
import { Link } from 'react-router-dom';
import ArrowForwardIcon from '@mui/icons-material/ArrowForward';
import CallIcon from '@mui/icons-material/Call';
import CalendarMonthOutlinedIcon from '@mui/icons-material/CalendarMonthOutlined';
import VerifiedOutlinedIcon from '@mui/icons-material/VerifiedOutlined';
import VerifiedUserOutlinedIcon from '@mui/icons-material/VerifiedUserOutlined';
import PeopleAltOutlinedIcon from '@mui/icons-material/PeopleAltOutlined';
import FavoriteBorderOutlinedIcon from '@mui/icons-material/FavoriteBorderOutlined';
import PersonOutlineOutlinedIcon from '@mui/icons-material/PersonOutlineOutlined';
import StarRoundedIcon from '@mui/icons-material/StarRounded';
import PlayArrowRoundedIcon from '@mui/icons-material/PlayArrowRounded';
import CloseIcon from '@mui/icons-material/Close';
import { motion } from 'framer-motion';

import { brand, softShadow, hoverShadow } from '@/theme/theme';
import { CLINIC } from '@/lib/clinic';
import { IMG } from '@/data/images';
import { useTreatments } from '@/lib/queries';
import { TreatmentIcon } from '@/components/ui/TreatmentIcon';
import { Reveal } from '@/components/ui/Reveal';
import { usePageMeta } from '@/lib/usePageMeta';
import { TechnologySection, DoctorSection, TestimonialsSection, FaqSection, ContactStrip } from './home-sections';

const MotionBox = motion.create(Box);

const fadeUp = (delay: number) => ({
  initial: { opacity: 0, y: 24 },
  animate: { opacity: 1, y: 0 },
  transition: { duration: 0.6, delay, ease: [0.22, 1, 0.36, 1] as const },
});

// Trust strip directly below the hero (reference design)
const TRUST = [
  { icon: <VerifiedUserOutlinedIcon />, title: '15+ Years', sub: 'of trusted care' },
  { icon: <PeopleAltOutlinedIcon />, title: 'Thousands', sub: 'of happy patients' },
  { icon: <FavoriteBorderOutlinedIcon />, title: 'Personalized', sub: 'care for you' },
];

// About-us feature grid (reference design)
const ABOUT_FEATURES = [
  { icon: <ToothMark />, title: 'Advanced Technology', sub: 'For accurate & comfortable treatment' },
  { icon: <PersonOutlineOutlinedIcon />, title: 'Personalized Care', sub: 'Every smile is unique' },
  { icon: <VerifiedUserOutlinedIcon />, title: 'Safe & Hygienic', sub: 'Clean, modern clinic' },
  { icon: <StarRoundedIcon />, title: 'Trusted by Many', sub: 'Thousands of happy smiles' },
];

// Featured services (slugs match data/treatments.ts) with the reference design's short taglines
const FEATURED: { slug: string; tagline: string }[] = [
  { slug: 'general-dentistry', tagline: 'Cleanings & check-ups' },
  { slug: 'root-canal-treatment', tagline: 'Save your natural tooth' },
  { slug: 'dental-implants', tagline: 'Lasting smile solution' },
  { slug: 'teeth-whitening', tagline: 'Brighter, whiter smile' },
  { slug: 'invisible-aligners', tagline: 'Discreet teeth straightening' },
  { slug: 'smile-makeover', tagline: 'Your complete transformation' },
];

// Small tooth mark (matches the brand logo) used as a feature icon
function ToothMark() {
  return (
    <svg width="22" height="22" viewBox="0 0 44 44" fill="none" xmlns="http://www.w3.org/2000/svg" aria-hidden="true">
      <path
        d="M22 12.1c-2.2-1.3-4.3-1.3-6-.5-2.5 1.1-3.8 3.5-3.8 6.4 0 2.6.7 5 1.3 7.3.5 1.9 1 3.9 1.5 5.6.3 1.2.9 2.3 2 2.3 1 0 1.4-1 1.7-2.3.3-1.1.6-2.4 1.2-3.1.4-.5 1-.8 2.1-.8s1.7.3 2.1.8c.6.7.9 2 1.2 3.1.3 1.3.7 2.3 1.7 2.3 1.1 0 1.7-1.1 2-2.3.5-1.7 1-3.7 1.5-5.6.6-2.3 1.3-4.7 1.3-7.3 0-2.9-1.3-5.3-3.8-6.4-1.7-.8-3.8-.8-6 .5Z"
        fill="currentColor"
      />
    </svg>
  );
}

export default function Home() {
  usePageMeta();
  const { data: treatments } = useTreatments();
  const featured = FEATURED.map((f) => {
    const t = treatments?.find((x) => x.slug === f.slug);
    return t ? { ...t, tagline: f.tagline } : null;
  }).filter(Boolean);
  const [tourOpen, setTourOpen] = useState(false);

  return (
    <Box>
      {/* ── Hero: full-screen, one continuous background (reference design) ──
          The clinic photo is the hero background under a light-blue wash; the
          doctor is anchored to the hero's bottom with his name integrated on a
          soft gradient — no cards, borders, or floating boxes. */}
      <Box
        component="section"
        sx={{
          position: 'relative',
          overflow: 'hidden',
          display: 'flex',
          flexDirection: 'column',
          pt: { xs: '62px', md: '88px' },
          // Fill the first phone screen minus the fixed booking bar; cap it on desktop.
          minHeight: { xs: 'calc(100svh - 56px)', md: 'min(100svh, 860px)' },
        }}
      >
        {/* Background: clinic photo under a light brand wash */}
        <Box aria-hidden sx={{ position: 'absolute', inset: 0 }}>
          <Box
            component="img"
            src={IMG.heroClinic}
            alt=""
            sx={{ width: '100%', height: '100%', objectFit: 'cover', objectPosition: 'center', display: 'block' }}
          />
          <Box
            sx={{
              position: 'absolute',
              inset: 0,
              background: 'linear-gradient(180deg, rgba(243,247,255,0.96) 0%, rgba(236,244,255,0.9) 45%, rgba(226,238,255,0.84) 100%)',
            }}
          />
        </Box>

        <Container
          sx={{
            position: 'relative',
            zIndex: 1,
            flex: 1,
            display: 'flex',
            flexDirection: { xs: 'column', md: 'row' },
            alignItems: { xs: 'stretch', md: 'flex-end' },
            gap: { md: 4 },
          }}
        >
          {/* Text + actions */}
          <Box
            sx={{
              flex: { md: '1 1 55%' },
              alignSelf: { md: 'center' },
              textAlign: { xs: 'center', md: 'left' },
              pt: { xs: 3.5, sm: 5, md: 0 },
              pb: { md: 10 },
            }}
          >
            <MotionBox {...fadeUp(0.05)}>
              <Stack
                direction="row"
                spacing={1}
                alignItems="center"
                sx={{
                  display: 'inline-flex',
                  bgcolor: 'rgba(255,255,255,0.9)',
                  border: `1px solid ${brand.line}`,
                  borderRadius: 999,
                  px: 2,
                  py: 0.7,
                  mb: { xs: 2, md: 2.5 },
                }}
              >
                <VerifiedOutlinedIcon sx={{ fontSize: 15, color: brand.primary }} />
                <Typography sx={{ fontWeight: 700, color: brand.primary, fontSize: { xs: 10.5, md: 12 }, letterSpacing: '0.12em' }}>
                  TRUSTED DENTAL CARE FOR A HEALTHIER SMILE
                </Typography>
              </Stack>
            </MotionBox>

            <MotionBox {...fadeUp(0.14)}>
              <Typography
                component="h1"
                sx={{
                  fontWeight: 800,
                  letterSpacing: '-0.03em',
                  lineHeight: 1.12,
                  fontSize: { xs: '2.1rem', sm: '2.7rem', md: '3.4rem' },
                  color: 'text.primary',
                  mb: { xs: 1.5, md: 2 },
                }}
              >
                Gentle care for
                <br />
                <Box component="span" sx={{ color: brand.primary }}>
                  brighter smiles
                </Box>
              </Typography>
            </MotionBox>

            <MotionBox {...fadeUp(0.22)}>
              <Typography
                sx={{
                  color: 'text.secondary',
                  maxWidth: { xs: 420, md: 470 },
                  mx: { xs: 'auto', md: 0 },
                  mb: { xs: 3, md: 3.5 },
                  fontSize: { xs: '0.95rem', md: '1.05rem' },
                  lineHeight: 1.6,
                }}
              >
                Modern, painless dentistry in a calm, welcoming space. From routine check-ups to
                complete smile makeovers — personal care from Dr. Afaque Khan at every visit.
              </Typography>
            </MotionBox>

            <MotionBox {...fadeUp(0.3)}>
              <Stack
                direction={{ xs: 'column', md: 'row' }}
                spacing={{ xs: 1.25, md: 1.75 }}
                alignItems={{ xs: 'center', md: 'flex-start' }}
                sx={{ width: '100%', maxWidth: { xs: 360, md: 'none' }, mx: { xs: 'auto', md: 0 } }}
              >
                <Button
                  component={Link}
                  to="/book-appointment"
                  variant="contained"
                  size="large"
                  fullWidth
                  startIcon={<CalendarMonthOutlinedIcon />}
                  endIcon={<ArrowForwardIcon />}
                  sx={{ py: 1.3, fontSize: 15, maxWidth: { md: 280 } }}
                >
                  Book Appointment
                </Button>
                <Button
                  variant="outlined"
                  size="large"
                  fullWidth
                  startIcon={<CallIcon />}
                  component="a"
                  href={CLINIC.phoneHref}
                  sx={{ py: 1.15, fontSize: 15, bgcolor: 'rgba(255,255,255,0.92)', maxWidth: { md: 200 } }}
                >
                  Call Now
                </Button>
              </Stack>
            </MotionBox>
          </Box>

          {/* Doctor — anchored to the hero's bottom, blended into the background */}
          <Box
            sx={{
              flex: { md: '1 1 45%' },
              mt: { xs: 'auto' },
              pt: { xs: 3, md: 0 },
              display: 'flex',
              justifyContent: { xs: 'center', md: 'flex-end' },
              alignItems: 'flex-end',
            }}
          >
            <MotionBox
              initial={{ opacity: 0, y: 26 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.25, ease: [0.22, 1, 0.36, 1] }}
              sx={{ position: 'relative', lineHeight: 0 }}
            >
              <Box
                component="img"
                src={IMG.doctorPortrait}
                alt="Dr. Afaque Khan at BrightSmile Dental Clinic"
                sx={{
                  height: { xs: 'clamp(230px, 34svh, 340px)', md: 'clamp(420px, 58vh, 560px)' },
                  aspectRatio: '4/5',
                  maxWidth: '100%',
                  objectFit: 'cover',
                  objectPosition: 'center top',
                  borderRadius: '26px 26px 0 0',
                  display: 'block',
                }}
              />
              {/* Name + verified degree, integrated on a soft gradient */}
              <Box
                sx={{
                  position: 'absolute',
                  left: 0,
                  right: 0,
                  bottom: 0,
                  pt: 6,
                  pb: 1.5,
                  px: 2,
                  textAlign: 'center',
                  background: 'linear-gradient(180deg, rgba(255,255,255,0) 0%, rgba(240,246,255,0.96) 62%)',
                }}
              >
                <Typography sx={{ fontWeight: 800, fontSize: { xs: 15.5, md: 18 }, lineHeight: 1.3, color: 'text.primary' }}>
                  Dr. Afaque Khan
                </Typography>
                <Typography sx={{ color: 'text.secondary', fontSize: { xs: 12, md: 13.5 }, lineHeight: 1.4 }}>
                  BDS, MDS — Conservative Dentistry &amp; Endodontics
                </Typography>
              </Box>
            </MotionBox>
          </Box>
        </Container>
      </Box>

      {/* ── Trust strip (reference design) ── */}
      <Box sx={{ bgcolor: '#fff', borderBottom: `1px solid ${brand.line}` }}>
        <Container sx={{ py: { xs: 2.5, md: 3.5 } }}>
          <Grid container>
            {TRUST.map((t, i) => (
              <Grid
                size={{ xs: 4 }}
                key={t.title}
                sx={{ borderLeft: i > 0 ? `1px solid ${brand.line}` : 'none', px: { xs: 1, sm: 2 } }}
              >
                <Stack
                  direction={{ xs: 'column', sm: 'row' }}
                  alignItems="center"
                  justifyContent={{ sm: 'center' }}
                  spacing={{ xs: 0.75, sm: 1.5 }}
                  sx={{ textAlign: { xs: 'center', sm: 'left' } }}
                >
                  <Box
                    sx={{
                      width: { xs: 40, md: 50 },
                      height: { xs: 40, md: 50 },
                      borderRadius: '50%',
                      bgcolor: brand.cloud,
                      color: brand.primary,
                      display: 'grid',
                      placeItems: 'center',
                      flexShrink: 0,
                      '& svg': { fontSize: { xs: 20, md: 24 } },
                    }}
                  >
                    {t.icon}
                  </Box>
                  <Box>
                    <Typography sx={{ fontWeight: 800, fontSize: { xs: 13, md: 16 }, lineHeight: 1.25 }}>{t.title}</Typography>
                    <Typography variant="caption" color="text.secondary" sx={{ fontSize: { xs: 11, md: 12.5 }, lineHeight: 1.3, display: 'block' }}>
                      {t.sub}
                    </Typography>
                  </Box>
                </Stack>
              </Grid>
            ))}
          </Grid>
        </Container>
      </Box>

      {/* ── About us (reference design) ── */}
      <Container sx={{ py: { xs: 5, md: 8 } }}>
        <Grid container spacing={{ xs: 3.5, md: 7 }} alignItems="center">
          <Grid size={{ xs: 12, md: 5.5 }}>
            <Reveal>
              <Box sx={{ position: 'relative' }}>
                <Box
                  component="img"
                  src={IMG.heroClinic}
                  alt="Modern treatment room at BrightSmile Dental Clinic"
                  sx={{
                    width: '100%',
                    aspectRatio: '4/3',
                    objectFit: 'cover',
                    borderRadius: '24px',
                    border: `1px solid ${brand.line}`,
                    boxShadow: softShadow,
                    display: 'block',
                  }}
                />
                {/* Watch the clinic tour video */}
                <Stack
                  direction="row"
                  spacing={1}
                  alignItems="center"
                  onClick={() => setTourOpen(true)}
                  sx={{
                    position: 'absolute',
                    left: 14,
                    bottom: 14,
                    bgcolor: 'rgba(255,255,255,0.95)',
                    borderRadius: 999,
                    pl: 0.75,
                    pr: 1.75,
                    py: 0.75,
                    cursor: 'pointer',
                    boxShadow: hoverShadow,
                    transition: '.2s',
                    '&:hover': { bgcolor: '#fff', transform: 'translateY(-2px)' },
                  }}
                >
                  <Box sx={{ width: 32, height: 32, borderRadius: '50%', bgcolor: brand.primary, color: '#fff', display: 'grid', placeItems: 'center' }}>
                    <PlayArrowRoundedIcon sx={{ fontSize: 22 }} />
                  </Box>
                  <Typography sx={{ fontWeight: 700, fontSize: 13.5 }}>Watch Clinic Tour</Typography>
                </Stack>
              </Box>
            </Reveal>
          </Grid>
          <Grid size={{ xs: 12, md: 6.5 }}>
            <Reveal delayIndex={1}>
              <Typography sx={{ color: brand.primary, fontWeight: 700, letterSpacing: '0.18em', fontSize: 12.5, mb: 1 }}>
                + ABOUT US
              </Typography>
              <Typography
                component="h2"
                sx={{ fontWeight: 800, letterSpacing: '-0.02em', fontSize: { xs: '1.8rem', md: '2.3rem' }, lineHeight: 1.15, color: 'text.primary', mb: 1.5 }}
              >
                Your Smile.
                <br />
                Our Priority.
              </Typography>
              <Typography sx={{ color: 'text.secondary', mb: 3, maxWidth: 480 }}>
                We combine expertise, modern technology, and a caring approach to give you the best
                dental experience — every single visit.
              </Typography>
              <Grid container spacing={{ xs: 2, md: 2.5 }}>
                {ABOUT_FEATURES.map((f) => (
                  <Grid size={{ xs: 12, sm: 6 }} key={f.title}>
                    <Stack direction="row" spacing={1.5} alignItems="flex-start">
                      <Box
                        sx={{
                          width: 44,
                          height: 44,
                          borderRadius: '50%',
                          bgcolor: brand.cloud,
                          color: brand.primary,
                          display: 'grid',
                          placeItems: 'center',
                          flexShrink: 0,
                          '& svg': { fontSize: 22 },
                        }}
                      >
                        {f.icon}
                      </Box>
                      <Box>
                        <Typography sx={{ fontWeight: 800, fontSize: 15, lineHeight: 1.3 }}>{f.title}</Typography>
                        <Typography variant="body2" color="text.secondary" sx={{ fontSize: 13, lineHeight: 1.4 }}>
                          {f.sub}
                        </Typography>
                      </Box>
                    </Stack>
                  </Grid>
                ))}
              </Grid>
            </Reveal>
          </Grid>
        </Grid>
      </Container>

      {/* ── Our services (reference design: heading left, service grid right) ── */}
      <Box sx={{ bgcolor: brand.mist, borderBlock: `1px solid ${brand.line}` }}>
        <Container sx={{ py: { xs: 5, md: 8 } }}>
          <Grid container spacing={{ xs: 3.5, md: 6 }} alignItems="center">
            <Grid size={{ xs: 12, md: 5 }}>
              <Reveal>
                <Typography sx={{ color: brand.primary, fontWeight: 700, letterSpacing: '0.18em', fontSize: 12.5, mb: 1 }}>
                  + OUR SERVICES
                </Typography>
                <Typography
                  component="h2"
                  sx={{ fontWeight: 800, letterSpacing: '-0.02em', fontSize: { xs: '1.8rem', md: '2.3rem' }, lineHeight: 1.16, color: 'text.primary', mb: 1.25 }}
                >
                  Complete Dental Care Under One Roof
                </Typography>
                <Typography sx={{ color: 'text.secondary', maxWidth: 420, mb: 3 }}>
                  From preventive care to advanced treatments, we're here for your healthy, confident smile.
                </Typography>
                <Button component={Link} to="/treatments" variant="outlined" size="large" endIcon={<ArrowForwardIcon />} sx={{ bgcolor: '#fff' }}>
                  View All Services
                </Button>
              </Reveal>
            </Grid>
            <Grid size={{ xs: 12, md: 7 }}>
              <Grid container spacing={{ xs: 1.5, md: 2 }}>
                {featured.map((t, i) => (
                  <Grid size={{ xs: 6 }} key={t!.id}>
                    <Reveal delayIndex={i % 6} sx={{ height: '100%' }}>
                      <Card sx={{ height: '100%', transition: '.25s', '&:hover': { transform: 'translateY(-3px)', boxShadow: hoverShadow } }}>
                        <CardActionArea
                          component={Link}
                          to={`/treatments/${t!.slug}`}
                          sx={{ p: { xs: 1.75, md: 2 }, height: '100%', display: 'flex', alignItems: 'center', gap: { xs: 1.25, md: 1.5 }, justifyContent: 'flex-start' }}
                        >
                          <Box
                            sx={{
                              width: { xs: 40, md: 46 },
                              height: { xs: 40, md: 46 },
                              borderRadius: '12px',
                              bgcolor: brand.cloud,
                              color: brand.primary,
                              display: 'grid',
                              placeItems: 'center',
                              flexShrink: 0,
                              '& svg': { fontSize: { xs: 20, md: 23 } },
                            }}
                          >
                            <TreatmentIcon name={t!.icon} />
                          </Box>
                          <Box sx={{ minWidth: 0, flex: 1 }}>
                            <Typography sx={{ fontWeight: 700, fontSize: { xs: 13.5, md: 14.5 }, lineHeight: 1.25, mb: 0.25 }}>{t!.name}</Typography>
                            <Typography variant="caption" color="text.secondary" sx={{ display: 'block', lineHeight: 1.35 }}>
                              {t!.tagline}
                            </Typography>
                          </Box>
                        </CardActionArea>
                      </Card>
                    </Reveal>
                  </Grid>
                ))}
              </Grid>
            </Grid>
          </Grid>
        </Container>
      </Box>

      <TechnologySection />
      <DoctorSection />
      <TestimonialsSection />
      <FaqSection />
      <ContactStrip />

      {/* Clinic tour video dialog */}
      <Dialog open={tourOpen} onClose={() => setTourOpen(false)} maxWidth="md" fullWidth PaperProps={{ sx: { bgcolor: '#000', borderRadius: '14px', position: 'relative' } }}>
        <IconButton
          onClick={() => setTourOpen(false)}
          aria-label="Close video"
          sx={{ position: 'absolute', top: 8, right: 8, zIndex: 1, color: '#fff', bgcolor: 'rgba(0,0,0,0.4)' }}
        >
          <CloseIcon />
        </IconButton>
        {tourOpen && (
          <Box component="video" src="/videos/hero-clinic.mp4" autoPlay controls playsInline sx={{ width: '100%', display: 'block' }} />
        )}
      </Dialog>
    </Box>
  );
}
