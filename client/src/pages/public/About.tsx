import { Box, Card, Container, Stack, Typography } from '@mui/material';
import Grid from '@mui/material/Grid2';
import CheckCircleIcon from '@mui/icons-material/CheckCircle';
import WorkspacePremiumOutlinedIcon from '@mui/icons-material/WorkspacePremiumOutlined';
import PeopleAltOutlinedIcon from '@mui/icons-material/PeopleAltOutlined';
import HealthAndSafetyOutlinedIcon from '@mui/icons-material/HealthAndSafetyOutlined';
import BiotechOutlinedIcon from '@mui/icons-material/BiotechOutlined';
import FavoriteBorderIcon from '@mui/icons-material/FavoriteBorder';
import { brand, softShadow } from '@/theme/theme';
import { IMG } from '@/data/images';
import { Reveal } from '@/components/ui/Reveal';
import { usePageMeta } from '@/lib/usePageMeta';

// Stats supplied by the client's approved reference design.
const STATS = [
  { icon: <WorkspacePremiumOutlinedIcon />, value: '5+', label: 'Years of Experience' },
  { icon: <PeopleAltOutlinedIcon />, value: '10K+', label: 'Happy Patients' },
  { icon: <HealthAndSafetyOutlinedIcon />, value: '100%', label: 'Safe & Hygienic' },
  { icon: <BiotechOutlinedIcon />, value: 'Modern', label: 'Technology' },
];

const WHY = [
  'Experienced and caring dental team',
  'Advanced digital technology',
  'Personalised treatment plans',
  'Transparent pricing',
  'Comfortable and relaxing environment',
];

export default function About() {
  usePageMeta(
    'About Us — BrightSmile Dental Clinic',
    'Your trusted dental care partner in Bhiwandi. Learn about BrightSmile Dental Clinic and our patient-first approach.',
  );
  return (
    <Box>
      {/* ── Banner with overlay ── */}
      <Box sx={{ position: 'relative', mt: { xs: '62px', md: '72px' }, overflow: 'hidden' }}>
        <Box
          component="img"
          src={IMG.clinicReception}
          alt="BrightSmile Dental Clinic"
          sx={{ width: '100%', height: { xs: 320, md: 420 }, objectFit: 'cover', display: 'block' }}
        />
        <Box sx={{ position: 'absolute', inset: 0, background: 'linear-gradient(90deg, rgba(16,33,61,0.82) 0%, rgba(16,33,61,0.5) 55%, rgba(16,33,61,0.2) 100%)' }} />
        <Container sx={{ position: 'absolute', inset: 0, display: 'flex', alignItems: 'center', left: 0, right: 0 }}>
          <Box sx={{ maxWidth: 560 }}>
            <Typography sx={{ color: '#7fb1ff', fontWeight: 700, letterSpacing: '0.2em', fontSize: 12.5, mb: 1 }}>
              + ABOUT US
            </Typography>
            <Typography component="h1" sx={{ color: '#fff', fontWeight: 800, letterSpacing: '-0.02em', fontSize: { xs: '1.9rem', md: '2.6rem' }, lineHeight: 1.2, mb: 1.5 }}>
              Your Trusted Dental Care Partner in Bhiwandi
            </Typography>
            <Typography sx={{ color: 'rgba(255,255,255,0.85)', fontSize: { xs: '0.95rem', md: '1.02rem' } }}>
              At BrightSmile, we believe a healthy smile leads to a happier, more confident you. Our
              clinic combines advanced technology, expert care, and a warm, friendly environment to
              make your dental journey comfortable and stress-free.
            </Typography>
          </Box>
        </Container>
      </Box>

      {/* ── Stats row ── */}
      <Container sx={{ py: { xs: 4, md: 5.5 } }}>
        <Grid container spacing={2}>
          {STATS.map((s, i) => (
            <Grid size={{ xs: 6, md: 3 }} key={s.label}>
              <Reveal delayIndex={i}>
                <Card sx={{ p: 2.25, display: 'flex', alignItems: 'center', gap: 1.5, height: '100%' }}>
                  <Box sx={{ width: 44, height: 44, borderRadius: '11px', bgcolor: brand.cloud, color: brand.primary, display: 'grid', placeItems: 'center', flexShrink: 0 }}>
                    {s.icon}
                  </Box>
                  <Box sx={{ minWidth: 0 }}>
                    <Typography sx={{ fontWeight: 800, fontSize: '1.15rem', lineHeight: 1.2 }}>{s.value}</Typography>
                    <Typography variant="caption" color="text.secondary" sx={{ lineHeight: 1.3, display: 'block' }}>
                      {s.label}
                    </Typography>
                  </Box>
                </Card>
              </Reveal>
            </Grid>
          ))}
        </Grid>
      </Container>

      {/* ── Why Choose BrightSmile? ── */}
      <Container sx={{ pb: { xs: 6, md: 9 } }}>
        <Grid container spacing={{ xs: 4, md: 7 }} alignItems="center">
          <Grid size={{ xs: 12, md: 6 }}>
            <Reveal>
              <Box
                component="img"
                src={IMG.clinicInterior}
                alt="Inside the BrightSmile clinic"
                sx={{
                  width: '100%',
                  aspectRatio: '4/3',
                  objectFit: 'cover',
                  borderRadius: '18px',
                  border: `1px solid ${brand.line}`,
                  boxShadow: softShadow,
                  display: 'block',
                }}
              />
            </Reveal>
          </Grid>
          <Grid size={{ xs: 12, md: 6 }}>
            <Reveal delayIndex={1}>
              <Typography component="h2" sx={{ fontWeight: 800, letterSpacing: '-0.02em', fontSize: { xs: '1.7rem', md: '2.1rem' }, color: 'text.primary', mb: 2.5 }}>
                Why Choose BrightSmile?
              </Typography>
              <Stack spacing={1.75}>
                {WHY.map((w) => (
                  <Stack key={w} direction="row" spacing={1.5} alignItems="center">
                    <CheckCircleIcon sx={{ color: brand.primary, fontSize: 22 }} />
                    <Typography sx={{ fontWeight: 600 }}>{w}</Typography>
                  </Stack>
                ))}
              </Stack>
            </Reveal>
          </Grid>
        </Grid>
      </Container>

      {/* ── Mission ── */}
      <Container sx={{ pb: { xs: 7, md: 10 } }}>
        <Reveal>
          <Card sx={{ p: { xs: 3, md: 4.5 }, bgcolor: brand.mist, border: `1px solid ${brand.line}`, boxShadow: 'none' }}>
            <Stack direction={{ xs: 'column', sm: 'row' }} spacing={2.5} alignItems={{ sm: 'center' }}>
              <Box sx={{ width: 54, height: 54, borderRadius: '14px', bgcolor: brand.primary, color: '#fff', display: 'grid', placeItems: 'center', flexShrink: 0 }}>
                <FavoriteBorderIcon />
              </Box>
              <Box>
                <Typography sx={{ fontWeight: 600, fontSize: { xs: '1.02rem', md: '1.12rem' }, color: 'text.primary', mb: 1 }}>
                  "Our mission is to provide gentle, high-quality dental care that helps every
                  patient smile with confidence."
                </Typography>
                <Typography sx={{ fontWeight: 700, color: brand.primary }}>Dr. Afaque Khan</Typography>
                <Typography variant="caption" color="text.secondary">
                  Founder & Principal Dentist
                </Typography>
              </Box>
            </Stack>
          </Card>
        </Reveal>
      </Container>
    </Box>
  );
}
