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
import MedicalServicesOutlinedIcon from '@mui/icons-material/MedicalServicesOutlined';
import BiotechOutlinedIcon from '@mui/icons-material/BiotechOutlined';
import SentimentSatisfiedAltIcon from '@mui/icons-material/SentimentSatisfiedAlt';
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

const TRUST = [
  { icon: <MedicalServicesOutlinedIcon />, title: 'Expert Dentist', sub: '15+ Years Experience' },
  { icon: <BiotechOutlinedIcon />, title: 'Modern Equipment', sub: 'Advanced Technology' },
  { icon: <SentimentSatisfiedAltIcon />, title: 'Comfortable Care', sub: 'Safe & Painless Treatment' },
];

// Featured treatments strip (slugs match data/treatments.ts)
const FEATURED_SLUGS = [
  'general-dentistry',
  'root-canal-treatment',
  'dental-implants',
  'teeth-whitening',
  'invisible-aligners',
  'smile-makeover',
];

export default function Home() {
  usePageMeta();
  const { data: treatments } = useTreatments();
  const featured = FEATURED_SLUGS.map((slug) => treatments?.find((t) => t.slug === slug)).filter(Boolean);
  const [tourOpen, setTourOpen] = useState(false);

  return (
    <Box>
      {/* ── Hero ── */}
      <Box sx={{ bgcolor: brand.mist, pt: { xs: '86px', md: '120px' }, pb: { xs: 5, md: 8 }, overflow: 'hidden' }}>
        <Container>
          <Grid container spacing={{ xs: 4, md: 6 }} alignItems="center">
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
                    mb: 2.5,
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
                    fontSize: { xs: '2.3rem', sm: '2.9rem', md: '3.3rem' },
                    color: 'text.primary',
                    mb: 2,
                  }}
                >
                  Gentle care for{' '}
                  <Box component="span" sx={{ color: brand.primary }}>
                    brighter smiles
                  </Box>
                </Typography>
              </MotionBox>

              <MotionBox {...fadeUp(0.2)}>
                <Typography sx={{ color: 'text.secondary', maxWidth: 480, mb: 3.5, fontSize: { xs: '1rem', md: '1.05rem' } }}>
                  Modern, painless dentistry in a calm, welcoming space. From routine check-ups to
                  complete smile makeovers — personal care from Dr. Afaque Khan at every visit.
                </Typography>
              </MotionBox>

              <MotionBox {...fadeUp(0.28)}>
                <Stack direction={{ xs: 'column', sm: 'row' }} spacing={1.75} sx={{ mb: 4 }}>
                  <Button component={Link} to="/book-appointment" variant="contained" size="large" endIcon={<ArrowForwardIcon />}>
                    Book Appointment
                  </Button>
                  <Button variant="outlined" size="large" startIcon={<CallIcon />} component="a" href={CLINIC.phoneHref}>
                    Call Now
                  </Button>
                </Stack>
              </MotionBox>

              <MotionBox {...fadeUp(0.36)}>
                <Grid container spacing={2}>
                  {TRUST.map((t) => (
                    <Grid size={{ xs: 12, sm: 4 }} key={t.title}>
                      <Stack direction="row" spacing={1.25} alignItems="center">
                        <Box
                          sx={{
                            width: 40,
                            height: 40,
                            borderRadius: '10px',
                            bgcolor: brand.cloud,
                            color: brand.primary,
                            display: 'grid',
                            placeItems: 'center',
                            flexShrink: 0,
                            '& svg': { fontSize: 20 },
                          }}
                        >
                          {t.icon}
                        </Box>
                        <Box>
                          <Typography sx={{ fontWeight: 700, fontSize: 14, lineHeight: 1.25 }}>{t.title}</Typography>
                          <Typography variant="caption" color="text.secondary">
                            {t.sub}
                          </Typography>
                        </Box>
                      </Stack>
                    </Grid>
                  ))}
                </Grid>
              </MotionBox>
            </Grid>

            <Grid size={{ xs: 12, md: 6 }}>
              <MotionBox
                initial={{ opacity: 0, scale: 0.96 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ duration: 0.7, delay: 0.15 }}
                sx={{ position: 'relative' }}
              >
                <Box
                  component="img"
                  src={IMG.heroClinic}
                  alt="Modern dental treatment room at BrightSmile Dental Clinic"
                  sx={{
                    width: '100%',
                    aspectRatio: { xs: '4/3', md: '7/6' },
                    objectFit: 'cover',
                    borderRadius: '18px',
                    border: `1px solid ${brand.line}`,
                    boxShadow: hoverShadow,
                    display: 'block',
                  }}
                />
                <Card
                  sx={{
                    position: 'absolute',
                    bottom: 18,
                    right: { xs: 10, md: -16 },
                    px: 2,
                    py: 1.25,
                    borderRadius: '12px',
                    boxShadow: hoverShadow,
                    display: 'flex',
                    alignItems: 'center',
                    gap: 1.25,
                  }}
                >
                  <Box sx={{ width: 38, height: 38, borderRadius: '10px', bgcolor: brand.cloud, color: brand.primary, display: 'grid', placeItems: 'center' }}>
                    <PeopleAltOutlinedIcon sx={{ fontSize: 20 }} />
                  </Box>
                  <Box sx={{ lineHeight: 1.2 }}>
                    <Typography sx={{ fontWeight: 800, fontSize: 15 }}>15,000+</Typography>
                    <Typography variant="caption" color="text.secondary">
                      Happy Patients
                    </Typography>
                  </Box>
                </Card>
              </MotionBox>
            </Grid>
          </Grid>
        </Container>
      </Box>

      {/* ── Featured treatments strip ── */}
      <Container sx={{ py: { xs: 5, md: 7 } }}>
        <Grid container spacing={2}>
          {featured.map((t, i) => (
            <Grid size={{ xs: 6, sm: 4, md: 2 }} key={t!.id}>
              <Reveal delayIndex={i % 6}>
                <Card sx={{ height: '100%', transition: '.25s', '&:hover': { transform: 'translateY(-4px)', boxShadow: hoverShadow } }}>
                  <CardActionArea component={Link} to={`/treatments/${t!.slug}`} sx={{ p: 2, height: '100%' }}>
                    <Box
                      sx={{
                        width: 42,
                        height: 42,
                        borderRadius: '10px',
                        bgcolor: brand.cloud,
                        color: brand.primary,
                        display: 'grid',
                        placeItems: 'center',
                        mb: 1.25,
                      }}
                    >
                      <TreatmentIcon name={t!.icon} />
                    </Box>
                    <Typography sx={{ fontWeight: 700, fontSize: 14.5, lineHeight: 1.3, mb: 0.5 }}>{t!.name}</Typography>
                    <Typography
                      variant="caption"
                      color="text.secondary"
                      sx={{
                        display: '-webkit-box',
                        WebkitLineClamp: 2,
                        WebkitBoxOrient: 'vertical',
                        overflow: 'hidden',
                        lineHeight: 1.45,
                      }}
                    >
                      {t!.shortDesc.split('.')[0]}.
                    </Typography>
                  </CardActionArea>
                </Card>
              </Reveal>
            </Grid>
          ))}
        </Grid>
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
