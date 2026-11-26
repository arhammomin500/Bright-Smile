import { useMemo, useState } from 'react';
import {
  Box,
  Button,
  Card,
  CardActionArea,
  Chip,
  Container,
  Stack,
  TextField,
  Typography,
} from '@mui/material';
import Grid from '@mui/material/Grid2';
import { Link, useNavigate } from 'react-router-dom';
import { alpha } from '@mui/material/styles';
import ArrowOutwardRoundedIcon from '@mui/icons-material/ArrowOutwardRounded';
import StarRoundedIcon from '@mui/icons-material/StarRounded';
import ReviewsOutlinedIcon from '@mui/icons-material/ReviewsOutlined';
import WorkspacePremiumOutlinedIcon from '@mui/icons-material/WorkspacePremiumOutlined';
import MedicalServicesOutlinedIcon from '@mui/icons-material/MedicalServicesOutlined';
import EventAvailableOutlinedIcon from '@mui/icons-material/EventAvailableOutlined';
import TranslateOutlinedIcon from '@mui/icons-material/TranslateOutlined';
import SpaOutlinedIcon from '@mui/icons-material/SpaOutlined';
import SanitizerOutlinedIcon from '@mui/icons-material/SanitizerOutlined';
import BiotechOutlinedIcon from '@mui/icons-material/BiotechOutlined';
import ChildCareOutlinedIcon from '@mui/icons-material/ChildCareOutlined';
import HandshakeOutlinedIcon from '@mui/icons-material/HandshakeOutlined';
import HealingOutlinedIcon from '@mui/icons-material/HealingOutlined';
import PlaceOutlinedIcon from '@mui/icons-material/PlaceOutlined';
import CallIcon from '@mui/icons-material/Call';
import AccessTimeIcon from '@mui/icons-material/AccessTime';
import WhatsAppIcon from '@mui/icons-material/WhatsApp';
import dayjs from 'dayjs';

import { brand, gradients, softShadow, hoverShadow } from '@/theme/theme';
import { CLINIC, whatsappLink } from '@/lib/clinic';
import { IMG } from '@/data/images';
import { useTreatments, useDoctors } from '@/lib/queries';
import { getDaySlots } from '@/pages/booking/slots';
import { formatTime12h } from '@/lib/format';
import { TreatmentIcon } from '@/components/ui/TreatmentIcon';
import { Reveal } from '@/components/ui/Reveal';
import { usePageMeta } from '@/lib/usePageMeta';
import { TestimonialsSection, FaqSection } from './home-sections';

// ── Section helpers (reference design: "+ EYEBROW" + colored heading) ────
function Eyebrow({ children, light }: { children: string; light?: boolean }) {
  return (
    <Typography sx={{ color: light ? '#fff' : brand.primary, fontWeight: 700, letterSpacing: '0.22em', fontSize: 12.5, mb: 1 }}>
      + {children}
    </Typography>
  );
}

// Honest clinic highlights — every number is real and verifiable.
const HIGHLIGHTS = [
  { icon: <StarRoundedIcon />, value: '5.0★', label: 'Google Rating' },
  { icon: <ReviewsOutlinedIcon />, value: '32+', label: 'Google Reviews' },
  { icon: <WorkspacePremiumOutlinedIcon />, value: '5+', label: 'Years of Experience' },
  { icon: <MedicalServicesOutlinedIcon />, value: '12', label: 'Treatments Offered' },
  { icon: <EventAvailableOutlinedIcon />, value: '6', label: 'Days Open a Week' },
  { icon: <TranslateOutlinedIcon />, value: '3', label: 'Languages Spoken' },
];

// Unique features — honest claims only.
const FEATURES_LEFT = [
  { icon: <SpaOutlinedIcon />, title: 'Painless-First Approach', text: 'Gentle techniques and clear communication at every step.' },
  { icon: <SanitizerOutlinedIcon />, title: 'Strict Sterilisation', text: 'Instruments sterilised and surfaces disinfected for every patient.' },
  { icon: <BiotechOutlinedIcon />, title: 'Modern Equipment', text: 'A newly built clinic with up-to-date dental equipment.' },
];
const FEATURES_RIGHT = [
  { icon: <HealingOutlinedIcon />, title: 'Implant Expertise', text: 'Dr. Khan is a dental surgeon and implantologist.' },
  { icon: <ChildCareOutlinedIcon />, title: 'Kid-Friendly Care', text: 'Patient, friendly handling for our youngest visitors.' },
  { icon: <HandshakeOutlinedIcon />, title: 'Honest Advice', text: 'Only the treatment you need — explained before we begin.' },
];

// Small tooth mark (matches the brand logo) used in the features visual.
function ToothMark({ size = 22 }: { size?: number }) {
  return (
    <svg width={size} height={size} viewBox="0 0 44 44" fill="none" xmlns="http://www.w3.org/2000/svg" aria-hidden="true">
      <path
        d="M22 12.1c-2.2-1.3-4.3-1.3-6-.5-2.5 1.1-3.8 3.5-3.8 6.4 0 2.6.7 5 1.3 7.3.5 1.9 1 3.9 1.5 5.6.3 1.2.9 2.3 2 2.3 1 0 1.4-1 1.7-2.3.3-1.1.6-2.4 1.2-3.1.4-.5 1-.8 2.1-.8s1.7.3 2.1.8c.6.7.9 2 1.2 3.1.3 1.3.7 2.3 1.7 2.3 1.1 0 1.7-1.1 2-2.3.5-1.7 1-3.7 1.5-5.6.6-2.3 1.3-4.7 1.3-7.3 0-2.9-1.3-5.3-3.8-6.4-1.7-.8-3.8-.8-6 .5Z"
        fill="currentColor"
      />
    </svg>
  );
}

// White pill button with a circular arrow icon (reference design).
function PillButton({ label, to, href }: { label: string; to?: string; href?: string }) {
  const linkProps = to ? { component: Link, to } : { component: 'a' as const, href };
  return (
    <Button
      {...linkProps}
      sx={{
        bgcolor: '#fff',
        color: brand.ink,
        pl: 3,
        pr: 1,
        py: 0.9,
        fontWeight: 700,
        fontSize: 15,
        boxShadow: softShadow,
        '&:hover': { bgcolor: '#fff', boxShadow: hoverShadow, transform: 'translateY(-1px)' },
      }}
      endIcon={
        <Box
          sx={{
            width: 36,
            height: 36,
            ml: 1,
            borderRadius: '50%',
            bgcolor: brand.primary,
            color: '#fff',
            display: 'grid',
            placeItems: 'center',
          }}
        >
          <ArrowOutwardRoundedIcon sx={{ fontSize: 19 }} />
        </Box>
      }
    >
      {label}
    </Button>
  );
}

export default function Home() {
  usePageMeta();
  const navigate = useNavigate();
  const { data: treatments } = useTreatments();
  const { data: doctors } = useDoctors();
  const doctor = doctors?.[0];

  // ── Appointment request (honest booking: published hours only) ─────────
  const [reqName, setReqName] = useState('');
  const [reqDate, setReqDate] = useState(dayjs().add(1, 'day').format('YYYY-MM-DD'));
  const [reqTime, setReqTime] = useState('');
  const reqSlots = useMemo(
    () => (doctor && reqDate ? getDaySlots(doctor, dayjs(reqDate)) : []),
    [doctor, reqDate],
  );
  const waMessage = useMemo(() => {
    const parts = [
      `Hi Bright Smile 👋 I'd like to request an appointment.`,
      reqName ? `Name: ${reqName}` : '',
      reqDate ? `Preferred day: ${dayjs(reqDate).format('ddd, D MMM YYYY')}` : '',
      reqTime ? `Preferred time: ${formatTime12h(reqTime)}` : '',
    ].filter(Boolean);
    return parts.join('\n');
  }, [reqName, reqDate, reqTime]);

  return (
    <Box sx={{ overflowX: 'hidden' }}>
      {/* ═══ 1 · HERO — full-screen looping video, big headline (reference) ═══ */}
      <Box
        sx={{
          position: 'relative',
          mt: { xs: '62px', md: '72px' },
          height: { xs: 'calc(100svh - 62px)', md: 'calc(100svh - 72px)' },
          minHeight: { xs: 520, md: 560 },
          display: 'flex',
          alignItems: 'flex-end',
          overflow: 'hidden',
        }}
      >
        <Box
          component="video"
          src="/videos/hero-clinic.mp4"
          autoPlay
          muted
          loop
          playsInline
          preload="auto"
          poster={IMG.clinicTreatmentRoom}
          aria-hidden="true"
          sx={{ position: 'absolute', inset: 0, width: '100%', height: '100%', objectFit: 'cover' }}
        />
        <Box
          sx={{
            position: 'absolute',
            inset: 0,
            background: 'linear-gradient(180deg, rgba(10,27,51,0.5) 0%, rgba(10,27,51,0.56) 45%, rgba(10,27,51,0.88) 100%)',
          }}
        />
        <Container sx={{ position: 'relative', pb: { xs: '118px', md: 10 } }}>
          <Reveal>
            <Box
              sx={{
                display: 'inline-flex',
                alignItems: 'center',
                gap: 0.8,
                bgcolor: 'rgba(255,255,255,0.14)',
                border: '1px solid rgba(255,255,255,0.3)',
                backdropFilter: 'blur(6px)',
                borderRadius: 999,
                px: 1.75,
                py: 0.6,
                mb: 2,
              }}
            >
              <Box sx={{ color: '#7fd1ff', fontSize: 13, lineHeight: 1 }}>✦</Box>
              <Typography sx={{ color: '#fff', fontWeight: 700, fontSize: 12.5, letterSpacing: '0.06em' }}>
                Trusted Dental Care in Bhiwandi
              </Typography>
            </Box>
            <Typography
              component="h1"
              sx={{
                color: '#fff',
                fontWeight: 800,
                letterSpacing: '-0.025em',
                lineHeight: 1.08,
                fontSize: { xs: '2.5rem', sm: '3.2rem', md: '3.8rem' },
                maxWidth: 640,
                mb: 1.75,
                textShadow: '0 2px 18px rgba(10,27,51,0.45)',
              }}
            >
              Gentle Ways in Dental Care
            </Typography>
            <Typography
              sx={{
                color: 'rgba(255,255,255,0.88)',
                fontSize: { xs: 15, md: 17 },
                maxWidth: 460,
                mb: 3,
                lineHeight: 1.6,
              }}
            >
              Modern, painless dentistry by Dr. Afaque Khan — Dental Surgeon &amp; Implantologist,
              Millat Nagar, Bhiwandi.
            </Typography>
            <Stack direction="row" spacing={1.5} alignItems="center" flexWrap="wrap" useFlexGap sx={{ mb: 2.25 }}>
              <Button
                component={Link}
                to="/book-appointment"
                variant="contained"
                size="large"
                endIcon={<ArrowOutwardRoundedIcon sx={{ fontSize: 19 }} />}
                sx={{ px: { xs: 2.25, md: 3.25 }, fontSize: { xs: 14.5, md: 16 }, whiteSpace: 'nowrap', boxShadow: '0 10px 26px rgba(10,27,51,0.4)' }}
              >
                Book Appointment
              </Button>
              <Button
                component="a"
                href={CLINIC.phoneHref}
                size="large"
                startIcon={<CallIcon sx={{ fontSize: 19 }} />}
                sx={{
                  color: '#fff',
                  px: { xs: 2.25, md: 3 },
                  fontSize: { xs: 14.5, md: 16 },
                  whiteSpace: 'nowrap',
                  bgcolor: 'rgba(255,255,255,0.12)',
                  border: '1px solid rgba(255,255,255,0.45)',
                  backdropFilter: 'blur(6px)',
                  '&:hover': { bgcolor: 'rgba(255,255,255,0.22)' },
                }}
              >
                Call Now
              </Button>
            </Stack>
            <Stack direction="row" spacing={0.9} alignItems="center">
              <StarRoundedIcon sx={{ color: '#FFC93C', fontSize: 19 }} />
              <Typography sx={{ color: '#fff', fontWeight: 800, fontSize: 14 }}>
                {CLINIC.googleRating}
              </Typography>
              <Typography sx={{ color: 'rgba(255,255,255,0.8)', fontSize: 13.5, fontWeight: 600 }}>
                on Google · {CLINIC.googleReviewCount} patient reviews
              </Typography>
            </Stack>
          </Reveal>
        </Container>
      </Box>

      {/* ═══ 2 · ABOUT — doctor photo + intro (reference) ═══ */}
      <Box sx={{ bgcolor: brand.mist }}>
        <Container sx={{ py: { xs: 6, md: 9 } }}>
          <Grid container spacing={{ xs: 4, md: 7 }} alignItems="center">
            <Grid size={{ xs: 12, md: 5 }}>
              <Reveal>
                <Box sx={{ position: 'relative', maxWidth: 430, mx: 'auto' }}>
                  <Box
                    component="img"
                    src={IMG.doctorPortrait}
                    alt="Dr. Afaque Khan at Bright Smile Dental Clinic"
                    sx={{
                      width: '100%',
                      aspectRatio: '4/4.6',
                      objectFit: 'cover',
                      objectPosition: 'top',
                      borderRadius: '24px',
                      border: `1px solid ${brand.line}`,
                      boxShadow: softShadow,
                      display: 'block',
                    }}
                  />
                  <Box sx={{ position: 'absolute', top: -10, left: -10, color: brand.primary, fontSize: 26 }}>✦</Box>
                  <Box sx={{ position: 'absolute', bottom: 18, right: -8, color: brand.primaryLight, fontSize: 18 }}>✦</Box>
                </Box>
              </Reveal>
            </Grid>
            <Grid size={{ xs: 12, md: 7 }}>
              <Reveal delayIndex={1}>
                <Eyebrow>ABOUT US</Eyebrow>
                <Typography
                  component="h2"
                  sx={{ color: brand.primary, fontWeight: 800, letterSpacing: '-0.02em', fontSize: { xs: '1.85rem', md: '2.4rem' }, lineHeight: 1.18, mb: 1.75 }}
                >
                  Bright Smile — Dental Clinic &amp; Implant Centre in Bhiwandi
                </Typography>
                <Typography sx={{ fontWeight: 800, color: 'text.primary', mb: 1.5 }}>
                  Gentle, Painless and Honest Dental Care in Millat Nagar
                </Typography>
                <Typography sx={{ color: 'text.secondary', mb: 3 }}>
                  {doctor?.fullName ?? 'Dr. Afaque Khan'} ({doctor?.qualification ?? 'BDS (MUHS) — Dental Surgeon (Reg. No. A-47915)'})
                  leads Bright Smile Dental Clinic &amp; Implant Centre. We cover the full range of
                  general and cosmetic dentistry — from{' '}
                  <Box component={Link} to="/treatments/root-canal-treatment" sx={{ color: brand.primary, fontWeight: 700, textDecoration: 'none' }}>
                    root canal treatments
                  </Box>{' '}
                  and{' '}
                  <Box component={Link} to="/treatments/dental-implants" sx={{ color: brand.primary, fontWeight: 700, textDecoration: 'none' }}>
                    dental implants
                  </Box>{' '}
                  to crowns, braces and teeth whitening — with gentle handling and advice you can
                  trust, in English, Hindi and Marathi.
                </Typography>
                <PillButton label="Read More About Us" to="/about" />
              </Reveal>
            </Grid>
          </Grid>
        </Container>
      </Box>

      {/* ═══ 3 · CLINIC HIGHLIGHTS — blue gradient stat cards (reference) ═══ */}
      <Box sx={{ background: gradients.sky, py: { xs: 6, md: 8 } }}>
        <Container>
          <Box sx={{ textAlign: 'center', mb: { xs: 3.5, md: 5 } }}>
            <Eyebrow light>CLINIC HIGHLIGHTS</Eyebrow>
            <Typography component="h2" sx={{ color: '#fff', fontWeight: 800, letterSpacing: '-0.02em', fontSize: { xs: '1.7rem', md: '2.2rem' } }}>
              Why Choose Bright Smile in Bhiwandi
            </Typography>
          </Box>
          <Grid container spacing={{ xs: 1.75, md: 2.5 }}>
            {HIGHLIGHTS.map((h, i) => (
              <Grid size={{ xs: 6, sm: 4, md: 2 }} key={h.label}>
                <Reveal delayIndex={i % 3}>
                  <Box
                    sx={{
                      height: '100%',
                      bgcolor: 'rgba(255,255,255,0.12)',
                      border: '1px solid rgba(255,255,255,0.28)',
                      borderRadius: '18px',
                      p: { xs: 2, md: 2.5 },
                      textAlign: 'center',
                      backdropFilter: 'blur(4px)',
                    }}
                  >
                    <Box
                      sx={{
                        width: 46,
                        height: 46,
                        mx: 'auto',
                        mb: 1.25,
                        borderRadius: '14px',
                        bgcolor: '#fff',
                        color: brand.primary,
                        display: 'grid',
                        placeItems: 'center',
                        '& svg': { fontSize: 26 },
                      }}
                    >
                      {h.icon}
                    </Box>
                    <Typography sx={{ color: '#fff', fontWeight: 800, fontSize: { xs: '1.35rem', md: '1.5rem' }, lineHeight: 1.2 }}>
                      {h.value}
                    </Typography>
                    <Typography sx={{ color: 'rgba(255,255,255,0.85)', fontSize: 13, fontWeight: 600, lineHeight: 1.35 }}>
                      {h.label}
                    </Typography>
                  </Box>
                </Reveal>
              </Grid>
            ))}
          </Grid>
        </Container>
      </Box>

      {/* ═══ 4 · REAL STORIES — scrolling Google reviews ═══ */}
      <TestimonialsSection />

      {/* ═══ 5 · OUR SERVICES — all 12 treatments (reference) ═══ */}
      <Box sx={{ bgcolor: brand.mist, borderBlock: `1px solid ${brand.line}` }}>
        <Container sx={{ py: { xs: 6, md: 9 } }}>
          <Box sx={{ textAlign: 'center', maxWidth: 620, mx: 'auto', mb: { xs: 3.5, md: 5 } }}>
            <Eyebrow>OUR SERVICES</Eyebrow>
            <Typography component="h2" sx={{ color: brand.primary, fontWeight: 800, letterSpacing: '-0.02em', fontSize: { xs: '1.7rem', md: '2.2rem' }, mb: 1.25 }}>
              High Quality Services for You
            </Typography>
            <Typography sx={{ color: 'text.secondary' }}>
              Explore the full range of dental care at Bright Smile — from routine cleaning to
              implants and smile makeovers.
            </Typography>
          </Box>
          <Grid container spacing={{ xs: 1.75, md: 2.5 }}>
            {(treatments ?? []).map((t, i) => (
              <Grid size={{ xs: 6, sm: 4, md: 3 }} key={t.id}>
                <Reveal delayIndex={i % 4}>
                  <Card sx={{ height: '100%', transition: '.25s', '&:hover': { transform: 'translateY(-4px)', boxShadow: hoverShadow } }}>
                    <CardActionArea
                      onClick={() => navigate(`/treatments/${t.slug}`)}
                      sx={{ height: '100%', p: { xs: 2, md: 2.5 }, display: 'flex', flexDirection: 'column', alignItems: 'flex-start' }}
                    >
                      <Box sx={{ color: brand.primary, mb: 1.25, '& svg': { fontSize: 34 } }}>
                        <TreatmentIcon name={t.icon} />
                      </Box>
                      <Typography sx={{ color: brand.primary, fontWeight: 800, fontSize: { xs: 14.5, md: 16 }, lineHeight: 1.3, mb: 0.75 }}>
                        {t.name}
                      </Typography>
                      <Typography
                        variant="body2"
                        sx={{
                          color: 'text.secondary',
                          fontSize: { xs: 12.5, md: 13.5 },
                          mb: 1.5,
                          flex: 1,
                          display: '-webkit-box',
                          WebkitLineClamp: 3,
                          WebkitBoxOrient: 'vertical',
                          overflow: 'hidden',
                        }}
                      >
                        {t.shortDesc}
                      </Typography>
                      <Chip
                        label="Learn More"
                        size="small"
                        sx={{ bgcolor: '#fff', border: `1px solid ${brand.line}`, fontWeight: 700, color: 'text.primary' }}
                      />
                    </CardActionArea>
                  </Card>
                </Reveal>
              </Grid>
            ))}
          </Grid>
        </Container>
      </Box>

      {/* ═══ 6 · VISIT CLINIC — photo banner with overlay (reference) ═══ */}
      <Container sx={{ py: { xs: 5, md: 8 } }}>
        <Reveal>
          <Box
            sx={{
              position: 'relative',
              borderRadius: '26px',
              overflow: 'hidden',
              minHeight: { xs: 300, md: 360 },
              display: 'grid',
              placeItems: 'center',
              textAlign: 'center',
              backgroundImage: `linear-gradient(rgba(16,49,110,0.62), rgba(16,49,110,0.62)), url(${IMG.clinicEntrance})`,
              backgroundSize: 'cover',
              backgroundPosition: 'center 40%',
              p: 3,
            }}
          >
            <Box>
              <Eyebrow light>VISIT CLINIC</Eyebrow>
              <Typography component="h2" sx={{ color: '#fff', fontWeight: 800, letterSpacing: '-0.02em', fontSize: { xs: '1.65rem', md: '2.3rem' }, maxWidth: 560, mx: 'auto', mb: 3 }}>
                Comprehensive Dental Care for All Ages
              </Typography>
              <PillButton label="Contact Us" to="/contact" />
            </Box>
          </Box>
        </Reveal>
      </Container>

      {/* ═══ 7 · UNIQUE FEATURES — around the tooth mark (reference) ═══ */}
      <Container sx={{ pb: { xs: 6, md: 9 } }}>
        <Box sx={{ textAlign: 'center', maxWidth: 640, mx: 'auto', mb: { xs: 3.5, md: 5 } }}>
          <Eyebrow>WHY CHOOSE US</Eyebrow>
          <Typography component="h2" sx={{ color: brand.primary, fontWeight: 800, letterSpacing: '-0.02em', fontSize: { xs: '1.7rem', md: '2.2rem' }, mb: 1.25 }}>
            Unique Dental Features at Bright Smile
          </Typography>
          <Typography sx={{ color: 'text.secondary' }}>
            A newly built clinic with careful hygiene, gentle handling and honest, patient-first
            advice.
          </Typography>
        </Box>
        <Grid container spacing={{ xs: 3, md: 4 }} alignItems="center">
          <Grid size={{ xs: 12, md: 4 }} order={{ xs: 2, md: 1 }}>
            <Stack spacing={3}>
              {FEATURES_LEFT.map((f) => (
                <FeatureRow key={f.title} {...f} />
              ))}
            </Stack>
          </Grid>
          <Grid size={{ xs: 12, md: 4 }} order={{ xs: 1, md: 2 }}>
            <Box
              sx={{
                width: { xs: 190, md: 250 },
                height: { xs: 190, md: 250 },
                mx: 'auto',
                borderRadius: '50%',
                bgcolor: brand.cloud,
                border: `1px dashed ${alpha(brand.primary, 0.35)}`,
                display: 'grid',
                placeItems: 'center',
                color: brand.primary,
              }}
            >
              <ToothMark size={130} />
            </Box>
          </Grid>
          <Grid size={{ xs: 12, md: 4 }} order={{ xs: 3, md: 3 }}>
            <Stack spacing={3}>
              {FEATURES_RIGHT.map((f) => (
                <FeatureRow key={f.title} {...f} />
              ))}
            </Stack>
          </Grid>
        </Grid>
      </Container>

      {/* ═══ 8 · FAQ ═══ */}
      <FaqSection />

      {/* ═══ 9 · MAP + GET IN TOUCH (reference) ═══ */}
      <Container sx={{ py: { xs: 6, md: 9 } }}>
        <Box sx={{ mb: { xs: 3, md: 4 } }}>
          <Eyebrow>CONTACT NOW</Eyebrow>
          <Typography component="h2" sx={{ color: brand.primary, fontWeight: 800, letterSpacing: '-0.02em', fontSize: { xs: '1.7rem', md: '2.2rem' } }}>
            Get In Touch
          </Typography>
        </Box>
        <Grid container spacing={{ xs: 3, md: 5 }}>
          <Grid size={{ xs: 12, md: 6.5 }}>
            <Box
              component="iframe"
              title="Bright Smile Dental Clinic on Google Maps"
              src={`https://maps.google.com/maps?q=${encodeURIComponent('Dr Afaque Bright Smile Dental Clinic Millat Nagar Bhiwandi')}&output=embed`}
              sx={{ width: '100%', height: { xs: 280, md: 400 }, border: 0, borderRadius: '20px', boxShadow: softShadow, display: 'block' }}
              loading="lazy"
              referrerPolicy="no-referrer-when-downgrade"
            />
          </Grid>
          <Grid size={{ xs: 12, md: 5.5 }}>
            <Card sx={{ p: { xs: 2.5, md: 3 } }}>
              <Typography sx={{ fontWeight: 800, fontSize: 17, mb: 0.5, color: brand.primary }}>
                Millat Nagar, Bhiwandi
              </Typography>
              <Stack spacing={1.75} sx={{ mt: 1.5 }}>
                <InfoRow icon={<PlaceOutlinedIcon />} text={CLINIC.address} />
                <InfoRow icon={<CallIcon />} text={CLINIC.phone} href={CLINIC.phoneHref} />
                <InfoRow icon={<AccessTimeIcon />} text="Mon–Sat: 10 AM – 2:30 PM & 6 – 10:30 PM · Sun: by appointment" />
              </Stack>
              <Stack direction={{ xs: 'column', sm: 'row' }} spacing={1.25} sx={{ mt: 2.5 }}>
                <Button
                  variant="contained"
                  component="a"
                  href={CLINIC.mapsUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  Get Directions
                </Button>
                <Button variant="outlined" component="a" href={CLINIC.phoneHref} startIcon={<CallIcon />}>
                  Call Now
                </Button>
              </Stack>
            </Card>
          </Grid>
        </Grid>
      </Container>

      {/* ═══ 10 · APPOINTMENT REQUEST (honest booking) ═══ */}
      <Box sx={{ bgcolor: brand.mist, borderTop: `1px solid ${brand.line}` }}>
        <Container maxWidth="md" sx={{ py: { xs: 6, md: 8 } }}>
          <Card sx={{ p: { xs: 2.5, md: 4 } }}>
            <Typography sx={{ color: brand.primary, fontWeight: 700, letterSpacing: '0.22em', fontSize: 12.5, mb: 1 }}>
              APPOINTMENT REQUEST
            </Typography>
            <Typography component="h2" sx={{ fontWeight: 800, letterSpacing: '-0.02em', fontSize: { xs: '1.6rem', md: '2rem' }, mb: 1 }}>
              Request Your Visit
            </Typography>
            <Typography sx={{ color: 'text.secondary', mb: 3 }}>
              Pick a day and time that suits you — we'll open WhatsApp with your request and the
              clinic will personally confirm your appointment.
            </Typography>
            <Grid container spacing={2}>
              <Grid size={{ xs: 12, sm: 6 }}>
                <TextField
                  label="Your Name"
                  fullWidth
                  value={reqName}
                  onChange={(e) => setReqName(e.target.value)}
                />
              </Grid>
              <Grid size={{ xs: 12, sm: 6 }}>
                <TextField
                  label="Preferred Day"
                  type="date"
                  fullWidth
                  value={reqDate}
                  onChange={(e) => { setReqDate(e.target.value); setReqTime(''); }}
                  slotProps={{ inputLabel: { shrink: true }, htmlInput: { min: dayjs().format('YYYY-MM-DD') } }}
                />
              </Grid>
            </Grid>
            <Box sx={{ mt: 2.5 }}>
              <Typography variant="caption" sx={{ fontWeight: 700, color: 'text.secondary', display: 'block', mb: 1 }}>
                {reqSlots.length > 0
                  ? 'Preferred time (from the clinic\'s published hours)'
                  : 'No published hours that day — Sundays are by appointment. Send the request and the clinic will suggest a time.'}
              </Typography>
              <Box sx={{ display: 'flex', flexWrap: 'wrap', gap: 1 }}>
                {reqSlots.slice(0, 10).map((s) => (
                  <Chip
                    key={s}
                    label={formatTime12h(s)}
                    onClick={() => setReqTime(reqTime === s ? '' : s)}
                    sx={{
                      fontWeight: 700,
                      bgcolor: reqTime === s ? brand.primary : '#fff',
                      color: reqTime === s ? '#fff' : 'text.primary',
                      border: `1px solid ${reqTime === s ? brand.primary : brand.line}`,
                      '&:hover': { bgcolor: reqTime === s ? brand.primaryDark : brand.cloud },
                    }}
                  />
                ))}
              </Box>
            </Box>
            <Stack direction={{ xs: 'column', sm: 'row' }} spacing={1.5} sx={{ mt: 3 }}>
              <Button
                variant="contained"
                size="large"
                startIcon={<WhatsAppIcon />}
                component="a"
                href={whatsappLink(waMessage)}
                target="_blank"
                rel="noopener noreferrer"
              >
                Send Request on WhatsApp
              </Button>
              <Button variant="outlined" size="large" component={Link} to="/book-appointment">
                Full Booking Page
              </Button>
            </Stack>
            <Typography variant="caption" sx={{ display: 'block', mt: 2, color: 'text.secondary' }}>
              This is a request, not a confirmed slot — the clinic personally confirms every
              appointment. The site itself stores and sends nothing.
            </Typography>
          </Card>
        </Container>
      </Box>
    </Box>
  );
}

function FeatureRow({ icon, title, text }: { icon: React.ReactNode; title: string; text: string }) {
  return (
    <Stack direction="row" spacing={1.75} alignItems="flex-start">
      <Box
        sx={{
          width: 46,
          height: 46,
          borderRadius: '14px',
          bgcolor: brand.cloud,
          color: brand.primary,
          display: 'grid',
          placeItems: 'center',
          flexShrink: 0,
          '& svg': { fontSize: 24 },
        }}
      >
        {icon}
      </Box>
      <Box>
        <Typography sx={{ color: brand.primary, fontWeight: 800, fontSize: 15.5, mb: 0.25 }}>{title}</Typography>
        <Typography variant="body2" sx={{ color: 'text.secondary' }}>
          {text}
        </Typography>
      </Box>
    </Stack>
  );
}

function InfoRow({ icon, text, href }: { icon: React.ReactNode; text: string; href?: string }) {
  const body = (
    <Stack direction="row" spacing={1.25} alignItems="flex-start">
      <Box sx={{ color: brand.primary, mt: 0.25, '& svg': { fontSize: 19 } }}>{icon}</Box>
      <Typography variant="body2" sx={{ color: 'text.secondary' }}>
        {text}
      </Typography>
    </Stack>
  );
  return href ? (
    <Box component="a" href={href} sx={{ textDecoration: 'none' }}>
      {body}
    </Box>
  ) : (
    body
  );
}
