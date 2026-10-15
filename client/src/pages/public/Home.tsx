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
import VerifiedOutlinedIcon from '@mui/icons-material/VerifiedOutlined';
import VerifiedUserOutlinedIcon from '@mui/icons-material/VerifiedUserOutlined';
import BiotechOutlinedIcon from '@mui/icons-material/BiotechOutlined';
import AccessTimeOutlinedIcon from '@mui/icons-material/AccessTimeOutlined';
import ChevronRightIcon from '@mui/icons-material/ChevronRight';
import CalendarMonthOutlinedIcon from '@mui/icons-material/CalendarMonthOutlined';
import PlayArrowRoundedIcon from '@mui/icons-material/PlayArrowRounded';
import CloseIcon from '@mui/icons-material/Close';
import PeopleAltOutlinedIcon from '@mui/icons-material/PeopleAltOutlined';
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
  { icon: <VerifiedUserOutlinedIcon />, title: 'Painless Treatments', sub: 'Comfortable & safe' },
  { icon: <BiotechOutlinedIcon />, title: 'Modern Equipment', sub: 'Advanced technology' },
  { icon: <AccessTimeOutlinedIcon />, title: 'Same-day Emergency', sub: 'Care when you need it' },
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

// Small outline tooth mark used in the hero doctor card (matches the brand logo)
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
      {/* ── Hero ── */}
      <Box sx={{ bgcolor: brand.mist, pt: { xs: '76px', md: '120px' }, pb: { xs: 4, md: 8 }, overflow: 'hidden' }}>
        <Container>
          <Grid container spacing={{ xs: 3, md: 6 }} alignItems="center">
            <Grid size={{ xs: 12, md: 6 }}>
              <MotionBox {...fadeUp(0.05)}>
                <Stack
                  direction="row"
                  spacing={1}
                  alignItems="center"
                  sx={{
                    display: 'inline-flex',
                    bgcolor: '#fff',
                    border: `1px solid ${brand.line}`,
                    borderRadius: 999,
                    px: 1.75,
                    py: 0.6,
                    mb: { xs: 1.75, md: 2.5 },
                  }}
                >
                  <VerifiedOutlinedIcon sx={{ fontSize: 16, color: brand.primary }} />
                  <Typography variant="caption" sx={{ fontWeight: 700, color: 'text.secondary' }}>
                    Trusted Dental Care for a Healthier Smile
                  </Typography>
                </Stack>
              </MotionBox>

              <MotionBox {...fadeUp(0.12)}>
                <Typography
                  component="h1"
                  sx={{
                    fontWeight: 800,
                    letterSpacing: '-0.03em',
                    lineHeight: 1.12,
                    fontSize: { xs: '2.05rem', sm: '2.9rem', md: '3.3rem' },
                    color: 'text.primary',
                    mb: { xs: 1.25, md: 2 },
                  }}
                >
                  Gentle care for
                  <br />
                  <Box component="span" sx={{ color: brand.primary }}>
                    brighter smiles
                  </Box>
                </Typography>
              </MotionBox>

              <MotionBox {...fadeUp(0.2)}>
                <Typography sx={{ color: 'text.secondary', maxWidth: 480, mb: { xs: 2.5, md: 3.5 }, fontSize: { xs: '0.95rem', md: '1.05rem' }, lineHeight: 1.6 }}>
                  Modern, painless dentistry in a calm, welcoming space. From routine check-ups to
                  complete smile makeovers — personal care from Dr. Afaque Khan at every visit.
                </Typography>
              </MotionBox>

              <MotionBox {...fadeUp(0.28)}>
                <Stack direction={{ xs: 'column', sm: 'row' }} spacing={{ xs: 1.25, sm: 1.75 }}>
                  <Button
                    component={Link}
                    to="/book-appointment"
                    variant="contained"
                    size="large"
                    endIcon={<ArrowForwardIcon />}
                    sx={{ py: { xs: 1.1, md: 1.25 } }}
                  >
                    Book Appointment
                  </Button>
                  <Button
                    variant="outlined"
                    size="large"
                    startIcon={<CallIcon />}
                    component="a"
                    href={CLINIC.phoneHref}
                    sx={{ py: { xs: 1, md: 1.25 } }}
                  >
                    Call Now
                  </Button>
                </Stack>
              </MotionBox>
            </Grid>

            {/* Doctor-led hero photo (reference design): portrait + experience badge + name card */}
            <Grid size={{ xs: 12, md: 6 }}>
              <MotionBox
                initial={{ opacity: 0, scale: 0.96 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ duration: 0.7, delay: 0.15 }}
                sx={{ position: 'relative', maxWidth: { xs: 480, md: 'none' }, mx: 'auto', pb: { xs: 0, md: 0 } }}
              >
                <Box
                  component="img"
                  src={IMG.doctorPortrait}
                  alt="Dr. Afaque Khan at BrightSmile Dental Clinic"
                  sx={{
                    width: '100%',
                    aspectRatio: { xs: '1/1', md: '7/8' },
                    objectFit: 'cover',
                    objectPosition: 'top',
                    borderRadius: '18px',
                    border: `1px solid ${brand.line}`,
                    boxShadow: hoverShadow,
                    display: 'block',
                  }}
                />
                {/* Experience badge */}
                <Card
                  sx={{
                    position: 'absolute',
                    right: { xs: 10, md: -16 },
                    bottom: { xs: 112, sm: 118 },
                    px: 1.75,
                    py: 1,
                    borderRadius: '12px',
                    boxShadow: hoverShadow,
                    display: 'flex',
                    alignItems: 'center',
                    gap: 1,
                  }}
                >
                  <Box sx={{ width: 34, height: 34, borderRadius: '50%', bgcolor: brand.cloud, color: brand.primary, display: 'grid', placeItems: 'center' }}>
                    <PeopleAltOutlinedIcon sx={{ fontSize: 18 }} />
                  </Box>
                  <Box sx={{ lineHeight: 1.2 }}>
                    <Typography sx={{ fontWeight: 800, fontSize: 14.5 }}>15+ Years</Typography>
                    <Typography variant="caption" color="text.secondary">
                      of trusted care
                    </Typography>
                  </Box>
                </Card>
                {/* Doctor name card */}
                <Card
                  sx={{
                    position: 'absolute',
                    left: { xs: 10, md: 14 },
                    right: { xs: 10, md: 14 },
                    bottom: { xs: 10, md: 14 },
                    px: { xs: 1.75, md: 2 },
                    py: 1.25,
                    borderRadius: '14px',
                    boxShadow: hoverShadow,
                    display: 'flex',
                    alignItems: 'center',
                    gap: 1.5,
                  }}
                >
                  <Box sx={{ width: 44, height: 44, borderRadius: '12px', bgcolor: brand.cloud, color: brand.primary, display: 'grid', placeItems: 'center', flexShrink: 0 }}>
                    <ToothMark />
                  </Box>
                  <Box sx={{ minWidth: 0, lineHeight: 1.3 }}>
                    <Typography sx={{ fontWeight: 800, fontSize: { xs: 15.5, md: 17 }, lineHeight: 1.3 }}>Dr. Afaque Khan</Typography>
                    <Typography variant="body2" color="text.secondary" sx={{ fontSize: { xs: 12, md: 13 }, lineHeight: 1.4 }}>
                      BDS, MDS
                    </Typography>
                    <Typography variant="body2" color="text.secondary" sx={{ fontSize: { xs: 12, md: 13 }, lineHeight: 1.4, whiteSpace: 'nowrap', overflow: 'hidden', textOverflow: 'ellipsis' }}>
                      Conservative Dentistry &amp; Endodontics
                    </Typography>
                  </Box>
                </Card>
              </MotionBox>
            </Grid>
          </Grid>
        </Container>
      </Box>

      {/* ── Trust strip (below hero, per reference design) ── */}
      <Box sx={{ bgcolor: '#fff', borderBottom: `1px solid ${brand.line}` }}>
        <Container sx={{ py: { xs: 3, md: 4 } }}>
          <Grid container>
            {TRUST.map((t, i) => (
              <Grid
                size={{ xs: 4 }}
                key={t.title}
                sx={{ borderLeft: i > 0 ? `1px solid ${brand.line}` : 'none', px: { xs: 1, sm: 2 } }}
              >
                <Stack alignItems="center" spacing={1} sx={{ textAlign: 'center' }}>
                  <Box
                    sx={{
                      width: { xs: 44, md: 52 },
                      height: { xs: 44, md: 52 },
                      borderRadius: '14px',
                      bgcolor: brand.cloud,
                      color: brand.primary,
                      display: 'grid',
                      placeItems: 'center',
                      '& svg': { fontSize: { xs: 21, md: 25 } },
                    }}
                  >
                    {t.icon}
                  </Box>
                  <Box>
                    <Typography sx={{ fontWeight: 700, fontSize: { xs: 13, md: 15.5 }, lineHeight: 1.25 }}>{t.title}</Typography>
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

      {/* ── Our Services (reference design: icon-list cards + booking CTA) ── */}
      <Container sx={{ py: { xs: 5, md: 8 } }}>
        <Reveal>
          <Typography sx={{ color: brand.primary, fontWeight: 700, letterSpacing: '0.18em', fontSize: 12.5, mb: 1 }}>
            + OUR SERVICES
          </Typography>
          <Typography
            component="h2"
            sx={{ fontWeight: 800, letterSpacing: '-0.02em', fontSize: { xs: '1.9rem', md: '2.4rem' }, lineHeight: 1.18, color: 'text.primary', mb: 1.25 }}
          >
            Complete Dental Care
            <br />
            Under One Roof
          </Typography>
          <Typography sx={{ color: 'text.secondary', maxWidth: 520, mb: 3.5 }}>
            From preventive care to advanced treatments, we're here for your healthy, confident smile.
          </Typography>
        </Reveal>

        <Grid container spacing={{ xs: 1.5, md: 2 }}>
          {featured.map((t, i) => (
            <Grid size={{ xs: 6, md: 4 }} key={t!.id}>
              <Reveal delayIndex={i % 6} sx={{ height: '100%' }}>
                <Card sx={{ height: '100%', transition: '.25s', '&:hover': { transform: 'translateY(-3px)', boxShadow: hoverShadow } }}>
                  <CardActionArea
                    component={Link}
                    to={`/treatments/${t!.slug}`}
                    sx={{ p: { xs: 1.75, md: 2.25 }, height: '100%', display: 'flex', alignItems: 'center', gap: { xs: 1.25, md: 1.75 }, justifyContent: 'flex-start' }}
                  >
                    <Box
                      sx={{
                        width: { xs: 40, md: 48 },
                        height: { xs: 40, md: 48 },
                        borderRadius: '12px',
                        bgcolor: brand.cloud,
                        color: brand.primary,
                        display: 'grid',
                        placeItems: 'center',
                        flexShrink: 0,
                        '& svg': { fontSize: { xs: 20, md: 24 } },
                      }}
                    >
                      <TreatmentIcon name={t!.icon} />
                    </Box>
                    <Box sx={{ minWidth: 0, flex: 1 }}>
                      <Typography sx={{ fontWeight: 700, fontSize: { xs: 13.5, md: 15.5 }, lineHeight: 1.25, mb: 0.25 }}>{t!.name}</Typography>
                      <Typography
                        variant="caption"
                        color="text.secondary"
                        sx={{ display: 'block', lineHeight: 1.35, overflow: 'hidden', textOverflow: 'ellipsis', whiteSpace: { md: 'nowrap' } }}
                      >
                        {t!.tagline}
                      </Typography>
                    </Box>
                    <ChevronRightIcon sx={{ color: brand.slate, fontSize: 20, flexShrink: 0, display: { xs: 'none', sm: 'block' } }} />
                  </CardActionArea>
                </Card>
              </Reveal>
            </Grid>
          ))}
        </Grid>

        <Reveal sx={{ mt: { xs: 2.5, md: 3.5 } }}>
          <Stack alignItems="center" spacing={1.25}>
            <Button
              component={Link}
              to="/book-appointment"
              variant="contained"
              size="large"
              fullWidth
              startIcon={<CalendarMonthOutlinedIcon />}
              endIcon={<ArrowForwardIcon />}
              sx={{ maxWidth: { sm: 420 }, py: 1.4 }}
            >
              Book Appointment
            </Button>
            <Button component={Link} to="/treatments" variant="text" size="small" sx={{ fontWeight: 700 }}>
              View all treatments
            </Button>
          </Stack>
        </Reveal>
      </Container>

      {/* ── Your Smile. Our Priority. ── */}
      <Box sx={{ bgcolor: brand.mist, borderBlock: `1px solid ${brand.line}` }}>
        <Container sx={{ py: { xs: 6, md: 9 } }}>
          <Grid container spacing={{ xs: 4, md: 7 }} alignItems="center">
            <Grid size={{ xs: 12, md: 6 }}>
              <Reveal>
                <Typography
                  component="h2"
                  sx={{ fontWeight: 800, letterSpacing: '-0.02em', fontSize: { xs: '1.8rem', md: '2.3rem' }, color: 'text.primary', mb: 1.75 }}
                >
                  Your Smile. Our Priority.
                </Typography>
                <Typography sx={{ color: 'text.secondary', mb: 3.5, maxWidth: 480 }}>
                  We combine expertise, modern technology, and a caring approach to give you the
                  best dental experience — every single visit.
                </Typography>
                <Stack direction={{ xs: 'column', sm: 'row' }} spacing={1.75}>
                  <Button component={Link} to="/book-appointment" variant="contained" size="large" endIcon={<ArrowForwardIcon />}>
                    Book Appointment
                  </Button>
                  <Button component={Link} to="/about" variant="outlined" size="large">
                    Know More
                  </Button>
                </Stack>
              </Reveal>
            </Grid>
            <Grid size={{ xs: 12, md: 6 }}>
              <Reveal delayIndex={1}>
                <Box sx={{ position: 'relative' }}>
                  <Box
                    component="img"
                    src={IMG.dentistPatient}
                    alt="Dentist caring for a patient"
                    sx={{
                      width: '100%',
                      aspectRatio: '16/10',
                      objectFit: 'cover',
                      borderRadius: '18px',
                      border: `1px solid ${brand.line}`,
                      boxShadow: softShadow,
                      display: 'block',
                    }}
                  />
                  {/* Watch Our Clinic Tour — plays the clinic's real footage */}
                  <Stack
                    direction="row"
                    spacing={1.25}
                    alignItems="center"
                    onClick={() => setTourOpen(true)}
                    sx={{
                      position: 'absolute',
                      inset: 0,
                      justifyContent: 'center',
                      cursor: 'pointer',
                      borderRadius: '18px',
                      bgcolor: 'rgba(16,33,61,0.25)',
                      transition: '.25s',
                      '&:hover': { bgcolor: 'rgba(16,33,61,0.4)' },
                    }}
                  >
                    <Box
                      sx={{
                        width: 56,
                        height: 56,
                        borderRadius: '50%',
                        bgcolor: '#fff',
                        color: brand.primary,
                        display: 'grid',
                        placeItems: 'center',
                        boxShadow: hoverShadow,
                      }}
                    >
                      <PlayArrowRoundedIcon sx={{ fontSize: 34 }} />
                    </Box>
                    <Typography sx={{ color: '#fff', fontWeight: 700, textShadow: '0 1px 8px rgba(16,33,61,0.6)' }}>
                      Watch Our Clinic Tour
                    </Typography>
                  </Stack>
                </Box>
              </Reveal>
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
