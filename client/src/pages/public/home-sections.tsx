import {
  Accordion,
  AccordionDetails,
  AccordionSummary,
  Avatar,
  Box,
  Button,
  Card,
  CardContent,
  Chip,
  Container,
  Rating,
  Stack,
  Typography,
} from '@mui/material';
import Grid from '@mui/material/Grid2';
import { Link } from 'react-router-dom';
import ArrowForwardIcon from '@mui/icons-material/ArrowForward';
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';
import WorkspacePremiumOutlinedIcon from '@mui/icons-material/WorkspacePremiumOutlined';
import BiotechOutlinedIcon from '@mui/icons-material/BiotechOutlined';
import CameraAltOutlinedIcon from '@mui/icons-material/CameraAltOutlined';
import PrecisionManufacturingOutlinedIcon from '@mui/icons-material/PrecisionManufacturingOutlined';
import BoltOutlinedIcon from '@mui/icons-material/BoltOutlined';
import ScienceOutlinedIcon from '@mui/icons-material/ScienceOutlined';
import MonitorHeartOutlinedIcon from '@mui/icons-material/MonitorHeartOutlined';
import CallIcon from '@mui/icons-material/Call';
import AccessTimeIcon from '@mui/icons-material/AccessTime';
import PlaceIcon from '@mui/icons-material/Place';
import { brand, hoverShadow } from '@/theme/theme';
import { CLINIC } from '@/lib/clinic';
import { IMG } from '@/data/images';
import { useDoctors, useTestimonials, useFaqs } from '@/lib/queries';
import { Reveal } from '@/components/ui/Reveal';

function Eyebrow({ children }: { children: string }) {
  return (
    <Typography sx={{ color: brand.primary, fontWeight: 700, letterSpacing: '0.2em', fontSize: 12.5, mb: 1 }}>
      + {children}
    </Typography>
  );
}
function Heading({ children }: { children: string }) {
  return (
    <Typography component="h2" sx={{ fontWeight: 800, letterSpacing: '-0.02em', fontSize: { xs: '1.7rem', md: '2.1rem' }, color: 'text.primary', mb: 1.25 }}>
      {children}
    </Typography>
  );
}

// ── Technology ──────────────────────────────────────────────────────────
const TECH = [
  { icon: <BiotechOutlinedIcon />, title: '3D Digital Imaging', text: 'Precise, low-radiation diagnostics for confident planning.' },
  { icon: <CameraAltOutlinedIcon />, title: 'Digital Oral Scanner', text: 'Clean digital impressions — no gagging, no delays.' },
  { icon: <PrecisionManufacturingOutlinedIcon />, title: 'CAD/CAM Restorations', text: 'Computer-designed crowns and veneers with a perfect fit.' },
  { icon: <BoltOutlinedIcon />, title: 'Laser Dentistry', text: 'Minimally invasive treatments with faster healing.' },
  { icon: <ScienceOutlinedIcon />, title: 'Sterilisation First', text: 'Hospital-grade hygiene protocols on every visit.' },
  { icon: <MonitorHeartOutlinedIcon />, title: 'Digital Treatment Plans', text: 'See your expected results before treatment begins.' },
];

export function TechnologySection() {
  return (
    <Container sx={{ py: { xs: 6, md: 9 } }}>
      <Box sx={{ textAlign: 'center', maxWidth: 640, mx: 'auto', mb: { xs: 3.5, md: 5 } }}>
        <Eyebrow>LATEST TECHNOLOGY</Eyebrow>
        <Heading>Advanced Tools, Gentler Care</Heading>
        <Typography color="text.secondary">
          We invest in modern dental technology so your treatment is faster, more precise, and far
          more comfortable.
        </Typography>
      </Box>
      <Grid container spacing={2}>
        {TECH.map((t, i) => (
          <Grid size={{ xs: 12, sm: 6, md: 4 }} key={t.title}>
            <Reveal delayIndex={i % 3}>
              <Card sx={{ height: '100%', transition: '.25s', '&:hover': { transform: 'translateY(-4px)', boxShadow: hoverShadow } }}>
                <CardContent sx={{ p: 2.75 }}>
                  <Box sx={{ width: 44, height: 44, borderRadius: '11px', bgcolor: brand.cloud, color: brand.primary, display: 'grid', placeItems: 'center', mb: 1.5 }}>
                    {t.icon}
                  </Box>
                  <Typography sx={{ fontWeight: 800, mb: 0.5 }}>{t.title}</Typography>
                  <Typography variant="body2" color="text.secondary">
                    {t.text}
                  </Typography>
                </CardContent>
              </Card>
            </Reveal>
          </Grid>
        ))}
      </Grid>
    </Container>
  );
}

// ── Doctor profile preview ──────────────────────────────────────────────
export function DoctorSection() {
  const { data: doctors } = useDoctors();
  const doctor = doctors?.[0];
  return (
    <Box sx={{ bgcolor: brand.mist, borderBlock: `1px solid ${brand.line}` }}>
      <Container sx={{ py: { xs: 6, md: 9 } }}>
        <Grid container spacing={{ xs: 4, md: 7 }} alignItems="center">
          <Grid size={{ xs: 12, md: 5 }}>
            <Reveal>
              <Box sx={{ position: 'relative', maxWidth: 460, mx: { xs: 'auto', md: 0 } }}>
                <Box
                  component="img"
                  src={IMG.doctorPortrait}
                  alt={doctor?.fullName ?? 'Dr. Afaque Khan'}
                  sx={{
                    width: '100%',
                    aspectRatio: '7/8',
                    objectFit: 'cover',
                    objectPosition: 'top',
                    borderRadius: '18px',
                    border: `1px solid ${brand.line}`,
                    boxShadow: hoverShadow,
                    display: 'block',
                  }}
                />
                <Card sx={{ position: 'absolute', bottom: 14, right: 14, px: 2, py: 1, borderRadius: '12px', boxShadow: hoverShadow, display: 'flex', alignItems: 'center', gap: 1 }}>
                  <WorkspacePremiumOutlinedIcon sx={{ color: brand.primary, fontSize: 20 }} />
                  <Box sx={{ lineHeight: 1.15 }}>
                    <Typography sx={{ fontWeight: 800, fontSize: 14 }}>{doctor?.experienceYears ?? 15}+ Years</Typography>
                    <Typography variant="caption" color="text.secondary">
                      Experience
                    </Typography>
                  </Box>
                </Card>
              </Box>
            </Reveal>
          </Grid>
          <Grid size={{ xs: 12, md: 7 }}>
            <Reveal delayIndex={1}>
              <Eyebrow>MEET YOUR DOCTOR</Eyebrow>
              <Heading>{doctor?.fullName ?? 'Dr. Afaque Khan'}</Heading>
              <Typography sx={{ color: brand.primary, fontWeight: 700, mb: 1.75 }}>
                {doctor?.qualification ?? 'BDS — Dental Surgeon (Reg. No. A-47915)'}
              </Typography>
              <Typography color="text.secondary" sx={{ mb: 2.5, maxWidth: 520 }}>
                The founder and principal dentist of BrightSmile. With over 5 years of experience
                across general, cosmetic, and implant dentistry, Dr. Khan is known for gentle,
                painless treatment and honest, patient-first advice.
              </Typography>
              <Stack direction="row" spacing={1} flexWrap="wrap" useFlexGap sx={{ mb: 3.5 }}>
                {['General Dentistry', 'Cosmetic Dentistry', 'Implants', 'Endodontics'].map((s) => (
                  <Chip key={s} label={s} sx={{ bgcolor: brand.cloud, color: brand.primary, fontWeight: 700, borderRadius: '8px' }} />
                ))}
              </Stack>
              <Button component={Link} to="/dentist" variant="contained" size="large" endIcon={<ArrowForwardIcon />}>
                View Full Profile
              </Button>
            </Reveal>
          </Grid>
        </Grid>
      </Container>
    </Box>
  );
}

// ── Patient reviews — featured review + photo (reference design) ────────
export function TestimonialsSection() {
  const { data: testimonials } = useTestimonials();
  const featured = (testimonials ?? [])[0];
  if (!featured) return null;
  return (
    <Container sx={{ py: { xs: 6, md: 9 } }}>
      <Grid container spacing={{ xs: 4, md: 7 }} alignItems="center">
        <Grid size={{ xs: 12, md: 6.5 }}>
          <Reveal>
            <Eyebrow>PATIENT REVIEWS</Eyebrow>
            <Heading>Real Stories. Real Smiles.</Heading>
            <Rating value={featured.rating} readOnly size="small" sx={{ mb: 1.5 }} />
            <Typography sx={{ color: 'text.secondary', fontStyle: 'italic', mb: 2.5, maxWidth: 520 }}>
              "{featured.content}"
            </Typography>
            <Stack direction="row" spacing={1.5} alignItems="center" sx={{ mb: 3 }}>
              <Avatar src={featured.avatarUrl ?? undefined} alt={featured.patientName} sx={{ width: 44, height: 44 }} />
              <Box sx={{ minWidth: 0 }}>
                <Typography sx={{ fontWeight: 800, fontSize: 14.5 }} noWrap>
                  {featured.patientName}
                </Typography>
                <Typography variant="caption" color="text.secondary" noWrap sx={{ display: 'block' }}>
                  {featured.location} · {featured.treatment}
                </Typography>
              </Box>
            </Stack>
            <Button component={Link} to="/reviews" variant="outlined" endIcon={<ArrowForwardIcon />}>
              Read More Reviews
            </Button>
          </Reveal>
        </Grid>
        <Grid size={{ xs: 12, md: 5.5 }}>
          <Reveal delayIndex={1}>
            <Box sx={{ position: 'relative', maxWidth: 440, mx: 'auto' }}>
              <Box
                component="img"
                src={IMG.happyPatient}
                alt="Happy patient with a bright smile"
                sx={{
                  width: '100%',
                  aspectRatio: '1/1',
                  objectFit: 'cover',
                  borderRadius: '48% 52% 46% 54% / 58% 54% 46% 42%',
                  border: `1px solid ${brand.line}`,
                  display: 'block',
                }}
              />
              <Typography
                sx={{
                  position: 'absolute',
                  top: { xs: -6, md: 2 },
                  right: { xs: 0, md: -10 },
                  fontFamily: 'cursive',
                  color: brand.primary,
                  fontSize: { xs: 15, md: 17 },
                  lineHeight: 1.3,
                  transform: 'rotate(6deg)',
                  textAlign: 'center',
                  maxWidth: 140,
                }}
              >
                Because you deserve a great smile
              </Typography>
            </Box>
          </Reveal>
        </Grid>
      </Grid>
    </Container>
  );
}

// ── FAQ ────────────────────────────────────────────────────────────────
export function FaqSection() {
  const { data: faqs } = useFaqs();
  const items = (faqs ?? []).slice(0, 5);
  return (
    <Box sx={{ bgcolor: brand.mist, borderBlock: `1px solid ${brand.line}` }}>
      <Container maxWidth="md" sx={{ py: { xs: 6, md: 9 } }}>
        <Box sx={{ textAlign: 'center', mb: { xs: 3.5, md: 5 } }}>
          <Eyebrow>FAQ</Eyebrow>
          <Heading>Frequently Asked Questions</Heading>
        </Box>
        {items.map((f) => (
          <Accordion key={f.id} disableGutters sx={{ mb: 1.25, borderRadius: '12px !important', overflow: 'hidden', bgcolor: '#fff' }}>
            <AccordionSummary expandIcon={<ExpandMoreIcon sx={{ color: brand.primary }} />} sx={{ px: 2.5, '& .MuiAccordionSummary-content': { fontWeight: 700 } }}>
              {f.question}
            </AccordionSummary>
            <AccordionDetails sx={{ px: 2.5, pb: 2.25, color: 'text.secondary' }}>{f.answer}</AccordionDetails>
          </Accordion>
        ))}
      </Container>
    </Box>
  );
}

// ── Contact / hours strip ───────────────────────────────────────────────
export function ContactStrip() {
  const items = [
    { icon: <CallIcon />, title: CLINIC.phone, sub: 'Call or WhatsApp us', href: CLINIC.phoneHref },
    { icon: <AccessTimeIcon />, title: 'Mon–Sat', sub: '10 AM – 2:30 PM & 6 – 10:30 PM · Sun by appointment' },
    { icon: <PlaceIcon />, title: CLINIC.addressShort, sub: 'Easy to reach, parking nearby', href: `https://www.google.com/maps?q=${encodeURIComponent(CLINIC.mapQuery)}` },
  ];
  return (
    <Container sx={{ py: { xs: 5, md: 7 } }}>
      <Grid container spacing={2}>
        {items.map((it) => (
          <Grid size={{ xs: 12, md: 4 }} key={it.sub}>
            <Card
              component={it.href ? 'a' : 'div'}
              {...(it.href ? { href: it.href, target: it.href.startsWith('http') ? '_blank' : undefined, rel: 'noopener noreferrer' } : {})}
              sx={{ p: 2.25, display: 'flex', alignItems: 'center', gap: 1.5, height: '100%', textDecoration: 'none', color: 'inherit', transition: '.2s', '&:hover': { boxShadow: hoverShadow } }}
            >
              <Box sx={{ width: 44, height: 44, borderRadius: '11px', bgcolor: brand.cloud, color: brand.primary, display: 'grid', placeItems: 'center', flexShrink: 0 }}>
                {it.icon}
              </Box>
              <Box sx={{ minWidth: 0 }}>
                <Typography sx={{ fontWeight: 800, fontSize: 15, lineHeight: 1.3 }} noWrap>
                  {it.title}
                </Typography>
                <Typography variant="caption" color="text.secondary">
                  {it.sub}
                </Typography>
              </Box>
            </Card>
          </Grid>
        ))}
      </Grid>
    </Container>
  );
}
