import { Box, Avatar, Button, Card, CardContent, Container, Rating, Stack, Typography } from '@mui/material';
import Grid from '@mui/material/Grid2';
import ArrowForwardIcon from '@mui/icons-material/ArrowForward';
import { brand, softShadow, hoverShadow } from '@/theme/theme';
import { IMG } from '@/data/images';
import { useTestimonials } from '@/lib/queries';
import { CLINIC, whatsappLink } from '@/lib/clinic';
import { Reveal } from '@/components/ui/Reveal';
import { usePageMeta } from '@/lib/usePageMeta';

export default function Reviews() {
  usePageMeta(
    'Patient Reviews — BrightSmile Dental Clinic',
    'Real stories, real smiles — what patients say about their experience at BrightSmile Dental Clinic.',
  );
  const { data: testimonials } = useTestimonials();

  return (
    <Box>
      {/* ── Page hero ── */}
      <Box sx={{ bgcolor: brand.mist, pt: { xs: '86px', md: '116px' }, pb: { xs: 4, md: 6 }, borderBottom: `1px solid ${brand.line}` }}>
        <Container>
          <Grid container spacing={{ xs: 3, md: 6 }} alignItems="center">
            <Grid size={{ xs: 12, md: 7 }}>
              <Typography sx={{ color: brand.primary, fontWeight: 700, letterSpacing: '0.2em', fontSize: 12.5, mb: 1 }}>
                + PATIENT REVIEWS
              </Typography>
              <Typography component="h1" sx={{ fontWeight: 800, letterSpacing: '-0.025em', fontSize: { xs: '1.9rem', md: '2.6rem' }, lineHeight: 1.18, color: 'text.primary', mb: 1.5 }}>
                Real Stories. Real Smiles.
              </Typography>
              <Typography sx={{ color: 'text.secondary', maxWidth: 520, mb: 2 }}>
                We are grateful for the trust our patients place in us. Here are some of their
                experiences at BrightSmile, straight from our Google reviews.
              </Typography>
              <Stack direction="row" spacing={1.25} alignItems="center" flexWrap="wrap" useFlexGap>
                <Stack direction="row" spacing={0.75} alignItems="center" sx={{ bgcolor: '#fff', border: `1px solid ${brand.line}`, borderRadius: 999, px: 1.75, py: 0.6 }}>
                  <Rating value={5} readOnly size="small" />
                  <Typography sx={{ fontWeight: 800, fontSize: 14 }}>{CLINIC.googleRating}</Typography>
                  <Typography variant="caption" color="text.secondary">
                    · {CLINIC.googleReviewCount} Google reviews
                  </Typography>
                </Stack>
                <Button
                  size="small"
                  variant="text"
                  component="a"
                  href={CLINIC.mapsUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  sx={{ fontWeight: 700 }}
                >
                  See all on Google
                </Button>
              </Stack>
            </Grid>
            <Grid size={{ xs: 12, md: 5 }} sx={{ display: { xs: 'none', md: 'block' } }}>
              <Box
                component="img"
                src={IMG.happyPatient}
                alt="A bright, healthy smile"
                sx={{ width: '100%', aspectRatio: '16/9', objectFit: 'cover', borderRadius: '16px', boxShadow: softShadow, display: 'block' }}
              />
            </Grid>
          </Grid>
        </Container>
      </Box>

      {/* ── Review cards ── */}
      <Container sx={{ py: { xs: 5, md: 8 } }}>
        <Grid container spacing={2.5}>
          {(testimonials ?? []).map((t, i) => (
            <Grid size={{ xs: 12, sm: 6, md: 4 }} key={t.id}>
              <Reveal delayIndex={i % 3}>
                <Card sx={{ height: '100%', transition: '.25s', '&:hover': { transform: 'translateY(-4px)', boxShadow: hoverShadow } }}>
                  <CardContent sx={{ p: 2.75, display: 'flex', flexDirection: 'column', height: '100%' }}>
                    <Rating value={t.rating} readOnly size="small" sx={{ mb: 1.5 }} />
                    <Typography variant="body2" sx={{ color: 'text.secondary', mb: 2.5, flex: 1 }}>
                      "{t.content}"
                    </Typography>
                    <Stack direction="row" spacing={1.5} alignItems="center">
                      <Avatar src={t.avatarUrl ?? undefined} alt={t.patientName} sx={{ width: 42, height: 42 }} />
                      <Box sx={{ minWidth: 0 }}>
                        <Typography sx={{ fontWeight: 700, fontSize: 14.5, lineHeight: 1.3 }} noWrap>
                          {t.patientName}
                        </Typography>
                        <Typography variant="caption" color="text.secondary" noWrap sx={{ display: 'block' }}>
                          {[t.treatment, t.location].filter(Boolean).join(' · ')}
                        </Typography>
                      </Box>
                    </Stack>
                  </CardContent>
                </Card>
              </Reveal>
            </Grid>
          ))}
        </Grid>

        <Stack alignItems="center" sx={{ mt: { xs: 4, md: 5 } }}>
          <Stack direction={{ xs: 'column', sm: 'row' }} spacing={1.5}>
            <Button
              variant="contained"
              size="large"
              endIcon={<ArrowForwardIcon />}
              component="a"
              href={CLINIC.writeReviewUrl}
              target="_blank"
              rel="noopener noreferrer"
            >
              Review Us on Google
            </Button>
            <Button
              variant="outlined"
              size="large"
              component="a"
              href={whatsappLink('Hi Bright Smile 👋 I would love to share my experience.')}
              target="_blank"
              rel="noopener noreferrer"
            >
              Share on WhatsApp
            </Button>
          </Stack>
        </Stack>
      </Container>
    </Box>
  );
}
