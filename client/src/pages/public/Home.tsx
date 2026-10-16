import { useMemo, useState } from 'react';
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
import CalendarMonthOutlinedIcon from '@mui/icons-material/CalendarMonthOutlined';
import EditCalendarOutlinedIcon from '@mui/icons-material/EditCalendarOutlined';
import VerifiedUserOutlinedIcon from '@mui/icons-material/VerifiedUserOutlined';
import PersonOutlineOutlinedIcon from '@mui/icons-material/PersonOutlineOutlined';
import StarRoundedIcon from '@mui/icons-material/StarRounded';
import BusinessCenterOutlinedIcon from '@mui/icons-material/BusinessCenterOutlined';
import TranslateOutlinedIcon from '@mui/icons-material/TranslateOutlined';
import AccessTimeOutlinedIcon from '@mui/icons-material/AccessTimeOutlined';
import WhatsAppIcon from '@mui/icons-material/WhatsApp';
import PlayArrowRoundedIcon from '@mui/icons-material/PlayArrowRounded';
import CloseIcon from '@mui/icons-material/Close';
import { motion } from 'framer-motion';
import dayjs from 'dayjs';

import { brand, softShadow, hoverShadow } from '@/theme/theme';
import { whatsappLink } from '@/lib/clinic';
import { IMG } from '@/data/images';
import { useTreatments, useDoctors } from '@/lib/queries';
import { getDaySlots } from '@/pages/booking/slots';
import { formatTime12h } from '@/lib/format';
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

// Doctor-information tiles (reference design) — facts from data/doctor.ts
const INFO_TILES = [
  { icon: <BusinessCenterOutlinedIcon />, title: '5+ Years', caption: 'Experience' },
  { icon: <TranslateOutlinedIcon />, title: 'English · Hindi · Marathi', caption: 'Languages' },
  { icon: <AccessTimeOutlinedIcon />, title: '10–2:30 · 6–10:30', caption: 'Mon–Sat Hours' },
];

// About-us feature grid (reference design)
const ABOUT_FEATURES = [
  { icon: <ToothMark />, title: 'Advanced Technology', sub: 'For accurate & comfortable treatment' },
  { icon: <PersonOutlineOutlinedIcon />, title: 'Personalized Care', sub: 'Every smile is unique' },
  { icon: <VerifiedUserOutlinedIcon />, title: 'Safe & Hygienic', sub: 'Clean, modern clinic' },
  { icon: <StarRoundedIcon />, title: 'Trusted by Many', sub: 'Thousands of happy smiles' },
];

// Featured services (slugs match data/treatments.ts) with short taglines
const FEATURED: { slug: string; tagline: string }[] = [
  { slug: 'dental-implants', tagline: 'Lasting smile solution' },
  { slug: 'root-canal-treatment', tagline: 'Save your natural tooth' },
  { slug: 'braces-and-aligners', tagline: 'Straighten your smile' },
  { slug: 'cosmetic-dentistry', tagline: 'Whitening & smile makeovers' },
  { slug: 'teeth-cleaning-gum-care', tagline: 'Healthy gums, fresh breath' },
  { slug: 'pediatric-dentistry', tagline: 'Gentle care for kids' },
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
  const { data: doctors } = useDoctors();
  const doctor = doctors?.[0];
  const featured = FEATURED.map((f) => {
    const t = treatments?.find((x) => x.slug === f.slug);
    return t ? { ...t, tagline: f.tagline } : null;
  }).filter(Boolean);
  const [tourOpen, setTourOpen] = useState(false);

  // Appointment quick-pick: the next day with published hours, and its times.
  const quickDay = useMemo(() => {
    for (let i = 0; i < 8; i++) {
      const d = dayjs().add(i, 'day');
      if (getDaySlots(doctor, d).length > 0) return d;
    }
    return null;
  }, [doctor]);
  const quickSlots = useMemo(() => (quickDay ? getDaySlots(doctor, quickDay).slice(0, 8) : []), [doctor, quickDay]);
  const [quickTime, setQuickTime] = useState('');

  return (
    <Box>
      {/* ── Hero (owner's reference design, blue theme): soft gradient, badge
          chip, highlighted headline, doctor cutout right with handwritten note,
          doctor name row, single Book Appointment CTA ── */}
      <Box
        component="section"
        sx={{
          position: 'relative',
          overflow: 'hidden',
          pt: { xs: '62px', md: '88px' },
          background: `linear-gradient(180deg, ${brand.mist} 0%, ${brand.cloud} 100%)`,
        }}
      >
        {/* Decorative circle behind the doctor */}
        <Box
          aria-hidden
          sx={{
            position: 'absolute',
            borderRadius: '50%',
            bgcolor: 'rgba(33,108,243,0.07)',
            width: { xs: 280, md: 540 },
            height: { xs: 280, md: 540 },
            right: { xs: -80, md: '13%' },
            top: { xs: 100, md: 120 },
          }}
        />

        <Container sx={{ position: 'relative' }}>
          {/* Doctor cutout — right side, feet on the hero's bottom edge */}
          <MotionBox
            initial={{ opacity: 0, x: 30 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.9, delay: 0.25, ease: [0.22, 1, 0.36, 1] }}
            sx={{
              position: 'absolute',
              right: { xs: 4, sm: 20, md: '15%' },
              bottom: 0,
              top: { xs: 34, sm: 24, md: 16 },
              zIndex: 1,
              display: 'flex',
              alignItems: 'flex-end',
              justifyContent: 'flex-end',
              lineHeight: 0,
              pointerEvents: 'none',
            }}
          >
            <Box
              component="img"
              src={IMG.doctorCutout}
              alt="Dr. Afaque Khan at BrightSmile Dental Clinic"
              sx={{
                height: '100%',
                width: 'auto',
                maxWidth: { xs: '62vw', md: '42vw' },
                objectFit: 'contain',
                objectPosition: 'bottom right',
                display: 'block',
                filter: 'drop-shadow(0 16px 36px rgba(16,33,61,0.16))',
              }}
            />
          </MotionBox>

          {/* Handwritten note beside his head (reference design) */}
          <MotionBox {...fadeUp(0.55)} sx={{ position: 'absolute', top: { xs: 4, md: 48 }, right: { xs: 4, md: '9%' }, zIndex: 2, pointerEvents: 'none' }}>
            <Typography
              sx={{
                fontFamily: 'cursive',
                color: brand.primary,
                fontSize: { xs: 13, md: 17 },
                lineHeight: 1.45,
                textAlign: 'center',
                transform: 'rotate(-6deg)',
                maxWidth: { xs: 84, md: 112 },
              }}
            >
              Healthy Smiles Happy Lives
            </Typography>
          </MotionBox>

          {/* Text column */}
          <Box sx={{ position: 'relative', zIndex: 2, py: { xs: 3.5, sm: 4.5, md: 8 }, width: { xs: '62%', sm: '56%', md: '52%' } }}>
            <MotionBox {...fadeUp(0.05)}>
              <Box
                sx={{
                  display: 'inline-flex',
                  bgcolor: brand.cloud,
                  border: `1px solid ${brand.line}`,
                  color: brand.primary,
                  fontWeight: 700,
                  fontSize: { xs: 12, md: 13.5 },
                  borderRadius: 999,
                  px: 1.75,
                  py: 0.6,
                  mb: { xs: 1.75, md: 2.25 },
                }}
              >
                Trusted Dental Care
              </Box>
            </MotionBox>

            <MotionBox {...fadeUp(0.14)}>
              <Typography
                component="h1"
                sx={{
                  fontWeight: 800,
                  letterSpacing: '-0.03em',
                  lineHeight: 1.16,
                  fontSize: { xs: '1.8rem', sm: '2.5rem', md: '3.2rem' },
                  color: 'text.primary',
                  mb: { xs: 1.25, md: 1.75 },
                }}
              >
                Healthy Smiles
                <br />
                <Box component="span" sx={{ color: brand.primary }}>
                  for a Brighter Tomorrow
                </Box>
              </Typography>
            </MotionBox>

            <MotionBox {...fadeUp(0.22)}>
              <Typography
                sx={{
                  color: brand.slate,
                  maxWidth: { xs: 205, sm: 330, md: 420 },
                  mb: { xs: 2, md: 3 },
                  fontSize: { xs: '0.92rem', md: '1.05rem' },
                  lineHeight: 1.6,
                }}
              >
                Modern dental care with personalized treatment. Your smile, our priority.
              </Typography>
            </MotionBox>

            <MotionBox {...fadeUp(0.3)}>
              <Stack direction="row" spacing={1.25} alignItems="center" sx={{ mb: { xs: 2.25, md: 3 } }}>
                <Box sx={{ width: 40, height: 40, borderRadius: '12px', bgcolor: '#fff', border: `1px solid ${brand.line}`, color: brand.primary, display: 'grid', placeItems: 'center', flexShrink: 0 }}>
                  <ToothMark />
                </Box>
                <Box sx={{ lineHeight: 1.25 }}>
                  <Typography sx={{ fontWeight: 800, fontSize: { xs: 14.5, md: 16 } }}>Dr. Afaque Khan</Typography>
                  <Typography variant="caption" sx={{ color: brand.slate, fontSize: { xs: 12, md: 13 } }}>
                    BDS (MUHS) · Reg. No. A-47915
                  </Typography>
                </Box>
              </Stack>
            </MotionBox>

            <MotionBox {...fadeUp(0.38)}>
              <Button
                component={Link}
                to="/book-appointment"
                variant="contained"
                startIcon={<CalendarMonthOutlinedIcon sx={{ fontSize: '18px !important' }} />}
                endIcon={<ArrowForwardIcon sx={{ fontSize: '18px !important' }} />}
                sx={{ py: { xs: 1, md: 1.2 }, px: 2, fontSize: { xs: 13.5, md: 15 }, whiteSpace: 'nowrap' }}
              >
                Book Appointment
              </Button>
            </MotionBox>
          </Box>
        </Container>
      </Box>

      {/* ── Doctor information + appointment quick-pick (reference design) ── */}
      <Container sx={{ py: { xs: 3, md: 6 } }}>
        <Grid container spacing={{ xs: 2.5, md: 3 }} alignItems="stretch">
          <Grid size={{ xs: 12, md: 5 }}>
            <Reveal sx={{ height: '100%' }}>
              <Card sx={{ p: { xs: 2.5, md: 3 }, borderRadius: '22px', height: '100%' }}>
                <Typography component="h2" sx={{ fontWeight: 800, fontSize: { xs: '1.25rem', md: '1.4rem' }, mb: 2 }}>
                  Doctor Information
                </Typography>
                <Grid container spacing={1.5}>
                  {INFO_TILES.map((t) => (
                    <Grid size={{ xs: 4 }} key={t.caption}>
                      <Box sx={{ bgcolor: brand.mist, border: `1px solid ${brand.line}`, borderRadius: '16px', p: { xs: 1.5, md: 2 }, textAlign: 'center', height: '100%' }}>
                        <Box sx={{ width: 44, height: 44, borderRadius: '50%', bgcolor: brand.cloud, color: brand.primary, display: 'grid', placeItems: 'center', mx: 'auto', mb: 1, '& svg': { fontSize: 21 } }}>
                          {t.icon}
                        </Box>
                        <Typography sx={{ fontWeight: 800, fontSize: { xs: 12.5, md: 14 }, lineHeight: 1.3 }}>{t.title}</Typography>
                        <Typography variant="caption" sx={{ color: brand.slate, fontSize: { xs: 11, md: 12 } }}>
                          {t.caption}
                        </Typography>
                      </Box>
                    </Grid>
                  ))}
                </Grid>
              </Card>
            </Reveal>
          </Grid>

          <Grid size={{ xs: 12, md: 7 }}>
            <Reveal delayIndex={1} sx={{ height: '100%' }}>
              <Card sx={{ p: { xs: 2.5, md: 3 }, borderRadius: '22px', height: '100%', display: 'flex', flexDirection: 'column' }}>
                <Typography component="h2" sx={{ fontWeight: 800, fontSize: { xs: '1.25rem', md: '1.4rem' }, mb: 2 }}>
                  Appointment
                </Typography>
                {quickDay && (
                  <Box sx={{ bgcolor: brand.mist, border: `1px solid ${brand.line}`, borderRadius: '16px', p: { xs: 1.75, md: 2 }, mb: 1.5 }}>
                    <Stack direction="row" alignItems="center" justifyContent="space-between" sx={{ mb: 1.5 }}>
                      <Stack direction="row" spacing={1} alignItems="center">
                        <CalendarMonthOutlinedIcon sx={{ color: brand.primary, fontSize: 20 }} />
                        <Typography sx={{ fontWeight: 700, fontSize: { xs: 14, md: 15 } }}>{quickDay.format('D MMMM, dddd')}</Typography>
                      </Stack>
                      <IconButton component={Link} to="/book-appointment" size="small" aria-label="Choose another date" sx={{ color: brand.primary }}>
                        <EditCalendarOutlinedIcon sx={{ fontSize: 20 }} />
                      </IconButton>
                    </Stack>
                    <Box sx={{ display: 'flex', flexWrap: 'wrap', gap: 1 }}>
                      {quickSlots.map((t) => (
                        <Button
                          key={t}
                          size="small"
                          variant={quickTime === t ? 'contained' : 'outlined'}
                          onClick={() => setQuickTime(quickTime === t ? '' : t)}
                          sx={{ borderRadius: 999, px: 1.75, py: 0.5, fontSize: 13, ...(quickTime !== t && { bgcolor: '#fff' }) }}
                        >
                          {formatTime12h(t)}
                        </Button>
                      ))}
                    </Box>
                  </Box>
                )}
                <Typography variant="caption" sx={{ color: brand.slate, mb: 1.75, display: 'block' }}>
                  Pick a preferred time from our weekly hours — the clinic personally confirms every appointment.
                </Typography>
                <Stack direction="row" spacing={1.25} alignItems="center" sx={{ mt: 'auto' }}>
                  <IconButton
                    component="a"
                    href={whatsappLink()}
                    target="_blank"
                    rel="noopener noreferrer"
                    aria-label="Chat on WhatsApp"
                    sx={{ bgcolor: brand.cloud, color: brand.primary, width: 46, height: 46, borderRadius: '14px', '&:hover': { bgcolor: brand.line } }}
                  >
                    <WhatsAppIcon />
                  </IconButton>
                  <Button
                    component={Link}
                    to={`/book-appointment${quickDay ? `?date=${quickDay.format('YYYY-MM-DD')}${quickTime ? `&time=${quickTime}` : ''}` : ''}`}
                    variant="contained"
                    fullWidth
                    startIcon={<CalendarMonthOutlinedIcon />}
                    sx={{ py: 1.1 }}
                  >
                    Book Appointment
                  </Button>
                </Stack>
              </Card>
            </Reveal>
          </Grid>
        </Grid>
      </Container>

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
