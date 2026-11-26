import { Box, Button, Card, CardContent, Container, Stack, Typography } from '@mui/material';
import Grid from '@mui/material/Grid2';
import { Link } from 'react-router-dom';
import ArrowForwardIcon from '@mui/icons-material/ArrowForward';
import TipsAndUpdatesOutlinedIcon from '@mui/icons-material/TipsAndUpdatesOutlined';
import { brand, softShadow, hoverShadow } from '@/theme/theme';
import { IMG } from '@/data/images';
import { useTreatments } from '@/lib/queries';
import { Reveal } from '@/components/ui/Reveal';
import { usePageMeta } from '@/lib/usePageMeta';

// Each treatment carries its own photo in the data; fall back in rotation.
const FEATURED_ORDER = [
  'dental-implants',
  'root-canal-treatment',
  'braces-and-aligners',
  'cosmetic-dentistry',
  'teeth-cleaning-gum-care',
  'pediatric-dentistry',
];
const FALLBACKS = [IMG.dentistPatient, IMG.heroClinic, IMG.xray, IMG.clinicReception];

export default function TreatmentsList() {
  usePageMeta(
    'Treatments — BrightSmile Dental Clinic',
    'Comprehensive dental care for every smile: general dentistry, root canal, implants, whitening, aligners, smile makeovers and more.',
  );
  const { data: treatments } = useTreatments();
  const featuredOrder = FEATURED_ORDER;
  const sorted = [...(treatments ?? [])].sort((a, b) => {
    const ai = featuredOrder.indexOf(a.slug);
    const bi = featuredOrder.indexOf(b.slug);
    return (ai === -1 ? 99 : ai) - (bi === -1 ? 99 : bi);
  });

  return (
    <Box>
      {/* ── Page hero ── */}
      <Box sx={{ bgcolor: brand.mist, pt: { xs: '86px', md: '116px' }, pb: { xs: 4, md: 6 }, borderBottom: `1px solid ${brand.line}` }}>
        <Container>
          <Grid container spacing={{ xs: 3, md: 6 }} alignItems="center">
            <Grid size={{ xs: 12, md: 7 }}>
              <Typography sx={{ color: brand.primary, fontWeight: 700, letterSpacing: '0.2em', fontSize: 12.5, mb: 1 }}>
                + OUR TREATMENTS
              </Typography>
              <Typography component="h1" sx={{ fontWeight: 800, letterSpacing: '-0.025em', fontSize: { xs: '1.9rem', md: '2.6rem' }, lineHeight: 1.18, color: 'text.primary', mb: 1.5 }}>
                Comprehensive Dental Care for Every Smile
              </Typography>
              <Typography sx={{ color: 'text.secondary', maxWidth: 520 }}>
                We offer a wide range of dental treatments to keep your teeth healthy, your smile
                bright, and your confidence high.
              </Typography>
            </Grid>
            <Grid size={{ xs: 12, md: 5 }} sx={{ display: { xs: 'none', md: 'block' } }}>
              <Box
                component="img"
                src={IMG.dentistExam}
                alt="Dental examination"
                sx={{ width: '100%', aspectRatio: '16/9', objectFit: 'cover', borderRadius: '16px', boxShadow: softShadow, display: 'block' }}
              />
            </Grid>
          </Grid>
        </Container>
      </Box>

      {/* ── Treatment cards ── */}
      <Container sx={{ py: { xs: 5, md: 8 } }}>
        <Grid container spacing={2.5}>
          {sorted.map((t, i) => (
            <Grid size={{ xs: 12, sm: 6, md: 4 }} key={t.id}>
              <Reveal delayIndex={i % 3}>
                <Card sx={{ height: '100%', overflow: 'hidden', transition: '.25s', '&:hover': { transform: 'translateY(-5px)', boxShadow: hoverShadow } }}>
                  <Box
                    component="img"
                    src={t.imageUrl ?? FALLBACKS[i % FALLBACKS.length]}
                    alt={t.name}
                    loading="lazy"
                    sx={{ width: '100%', aspectRatio: '16/9', objectFit: 'cover', display: 'block' }}
                  />
                  <CardContent sx={{ p: 2.5 }}>
                    <Typography sx={{ fontWeight: 800, fontSize: '1.08rem', mb: 0.75 }}>{t.name}</Typography>
                    <Typography variant="body2" color="text.secondary" sx={{ mb: 1.5, minHeight: 42 }}>
                      {t.shortDesc}
                    </Typography>
                    <Button component={Link} to={`/treatments/${t.slug}`} endIcon={<ArrowForwardIcon sx={{ fontSize: 16 }} />} sx={{ px: 0, fontWeight: 700 }}>
                      Learn More
                    </Button>
                  </CardContent>
                </Card>
              </Reveal>
            </Grid>
          ))}
        </Grid>

        {/* ── Consultation band ── */}
        <Reveal sx={{ mt: { xs: 4, md: 6 } }}>
          <Card sx={{ p: { xs: 2.5, md: 3 }, bgcolor: brand.cloud, border: `1px solid ${brand.line}`, boxShadow: 'none' }}>
            <Stack direction={{ xs: 'column', md: 'row' }} spacing={2} alignItems={{ md: 'center' }}>
              <Stack direction="row" spacing={1.75} alignItems="center" sx={{ flex: 1 }}>
                <Box sx={{ width: 44, height: 44, borderRadius: '11px', bgcolor: '#fff', color: brand.primary, display: 'grid', placeItems: 'center', flexShrink: 0 }}>
                  <TipsAndUpdatesOutlinedIcon />
                </Box>
                <Box>
                  <Typography sx={{ fontWeight: 800 }}>Not sure which treatment is right for you?</Typography>
                  <Typography variant="body2" color="text.secondary">
                    Book a consultation with our expert dentist.
                  </Typography>
                </Box>
              </Stack>
              <Button component={Link} to="/book-appointment" variant="contained" endIcon={<ArrowForwardIcon />} sx={{ flexShrink: 0 }}>
                Book Appointment
              </Button>
            </Stack>
          </Card>
        </Reveal>
      </Container>
    </Box>
  );
}
