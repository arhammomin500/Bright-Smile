import { useMemo, useState } from 'react';
import {
  Avatar,
  Box,
  Card,
  CardContent,
  Chip,
  Container,
  Dialog,
  DialogContent,
  IconButton,
  Rating,
  Stack,
  Typography,
} from '@mui/material';
import Grid from '@mui/material/Grid2';
import { alpha } from '@mui/material/styles';
import CloseRoundedIcon from '@mui/icons-material/CloseRounded';
import PlayArrowRoundedIcon from '@mui/icons-material/PlayArrowRounded';
import FormatQuoteRoundedIcon from '@mui/icons-material/FormatQuoteRounded';
import StarRoundedIcon from '@mui/icons-material/StarRounded';
import GoogleIcon from '@mui/icons-material/Google';
import VideocamRoundedIcon from '@mui/icons-material/VideocamRounded';
import RateReviewOutlinedIcon from '@mui/icons-material/RateReviewOutlined';

import { PageHero } from '@/components/ui/PageHero';
import { Reveal } from '@/components/ui/Reveal';
import { Loader, EmptyState, ErrorState } from '@/components/ui/States';
import { useTestimonials } from '@/lib/queries';
import { errorMessage } from '@/lib/api';
import { brand, gradients } from '@/theme/theme';
import type { Testimonial } from '@/lib/types';

export default function Testimonials() {
  const { data, isLoading, isError, error, refetch } = useTestimonials();
  const [video, setVideo] = useState<{ url: string; name: string } | null>(null);

  const avgRating = useMemo(() => {
    if (!data || data.length === 0) return 0;
    return data.reduce((sum, t) => sum + (t.rating || 0), 0) / data.length;
  }, [data]);

  return (
    <Box>
      <PageHero
        title="Patient Stories & Reviews"
        subtitle="Real words from real patients. Discover why thousands trust us with their smiles."
        crumbs={[{ label: 'Testimonials' }]}
      />

      {/* ── Overall rating strip ─────────────────────────────────── */}
      {!isLoading && !isError && data && data.length > 0 && (
        <Box sx={{ background: gradients.hero, color: '#fff', py: { xs: 5, md: 6 } }}>
          <Container>
            <Reveal>
              <Stack
                direction={{ xs: 'column', sm: 'row' }}
                spacing={{ xs: 2, sm: 4 }}
                alignItems="center"
                justifyContent="center"
                divider={<Box sx={{ width: { xs: 60, sm: 1 }, height: { xs: 1, sm: 56 }, bgcolor: 'rgba(255,255,255,0.25)' }} />}
              >
                <Stack alignItems="center" spacing={0.5}>
                  <Typography sx={{ fontWeight: 800, fontSize: { xs: '2.6rem', md: '3.2rem' }, lineHeight: 1 }}>
                    {avgRating.toFixed(1)} <Box component="span" sx={{ fontSize: '1.4rem', opacity: 0.75 }}>/ 5</Box>
                  </Typography>
                  <Rating
                    value={avgRating}
                    precision={0.1}
                    readOnly
                    icon={<StarRoundedIcon fontSize="inherit" />}
                    emptyIcon={<StarRoundedIcon fontSize="inherit" sx={{ color: 'rgba(255,255,255,0.3)' }} />}
                    sx={{ color: '#ffd54f', fontSize: '1.8rem' }}
                  />
                </Stack>
                <Typography sx={{ textAlign: 'center', fontSize: { xs: '1.05rem', md: '1.25rem' }, fontWeight: 600, maxWidth: 420 }}>
                  Rated excellent by <strong>2,000+</strong> verified patients across Google &amp; in-clinic reviews.
                </Typography>
              </Stack>
            </Reveal>
          </Container>
        </Box>
      )}

      {/* ── Testimonials grid ────────────────────────────────────── */}
      <Container sx={{ py: { xs: 6, md: 9 } }}>
        {isLoading ? (
          <Loader label="Loading reviews…" />
        ) : isError ? (
          <ErrorState message={errorMessage(error)} onRetry={() => refetch()} />
        ) : !data || data.length === 0 ? (
          <EmptyState
            title="No reviews yet"
            description="Be the first to share your experience with us."
            icon={<RateReviewOutlinedIcon sx={{ fontSize: 56 }} />}
          />
        ) : (
          <Box sx={{ columnGap: { xs: 0, sm: 3 }, columnCount: { xs: 1, sm: 2, lg: 3 } }}>
            {data.map((t, i) => (
              <Box key={t.id} sx={{ breakInside: 'avoid', mb: 3 }}>
                <Reveal delayIndex={i % 3}>
                  <TestimonialCard testimonial={t} onPlay={(url, name) => setVideo({ url, name })} />
                </Reveal>
              </Box>
            ))}
          </Box>
        )}
      </Container>

      {/* Video dialog */}
      <Dialog open={!!video} onClose={() => setVideo(null)} maxWidth="md" fullWidth>
        <DialogContent sx={{ p: 0, position: 'relative', bgcolor: '#000' }}>
          <IconButton
            onClick={() => setVideo(null)}
            sx={{ position: 'absolute', top: 12, right: 12, color: '#fff', bgcolor: 'rgba(0,0,0,0.4)', zIndex: 2, '&:hover': { bgcolor: 'rgba(0,0,0,0.65)' } }}
          >
            <CloseRoundedIcon />
          </IconButton>
          {video && <Box component="video" controls autoPlay src={video.url} sx={{ width: '100%', maxHeight: '85vh', display: 'block' }} />}
        </DialogContent>
      </Dialog>
    </Box>
  );
}

function TestimonialCard({ testimonial: t, onPlay }: { testimonial: Testimonial; onPlay: (url: string, name: string) => void }) {
  const isGoogle = (t.source ?? '').toUpperCase().includes('GOOGLE');
  const hasVideo = !!t.videoUrl;

  return (
    <Card
      sx={{
        transition: 'transform .28s ease, box-shadow .28s ease',
        '&:hover': { transform: 'translateY(-6px)', boxShadow: `0 22px 44px ${alpha(brand.ink, 0.14)}` },
      }}
    >
      <CardContent sx={{ p: { xs: 3, md: 3.5 } }}>
        <Stack direction="row" justifyContent="space-between" alignItems="flex-start" sx={{ mb: 1.5 }}>
          <FormatQuoteRoundedIcon sx={{ fontSize: 44, color: alpha(brand.primary, 0.18) }} />
          {isGoogle ? (
            <Chip icon={<GoogleIcon sx={{ fontSize: 16 }} />} label="Google" size="small" sx={{ bgcolor: alpha(brand.primary, 0.08), color: brand.slate, fontWeight: 600 }} />
          ) : hasVideo ? (
            <Chip icon={<VideocamRoundedIcon sx={{ fontSize: 16 }} />} label="Video" size="small" sx={{ bgcolor: alpha(brand.accent, 0.12), color: brand.primaryDark, fontWeight: 600 }} />
          ) : null}
        </Stack>

        <Rating value={t.rating} precision={0.5} readOnly size="small" sx={{ color: '#f5a623', mb: 1.5 }} />

        {t.title && (
          <Typography variant="subtitle1" sx={{ fontWeight: 700, mb: 1 }}>
            {t.title}
          </Typography>
        )}
        <Typography color="text.secondary" sx={{ mb: 2.5 }}>
          "{t.content}"
        </Typography>

        {hasVideo && (
          <Box
            onClick={() => onPlay(t.videoUrl as string, t.patientName)}
            sx={{
              display: 'inline-flex',
              alignItems: 'center',
              gap: 1,
              mb: 2.5,
              px: 2,
              py: 1,
              borderRadius: 999,
              cursor: 'pointer',
              color: brand.primary,
              bgcolor: alpha(brand.primary, 0.08),
              fontWeight: 700,
              fontSize: 14,
              transition: 'background .2s ease',
              '&:hover': { bgcolor: alpha(brand.primary, 0.16) },
            }}
          >
            <PlayArrowRoundedIcon fontSize="small" /> Watch video
          </Box>
        )}

        <Stack direction="row" spacing={1.5} alignItems="center">
          <Avatar
            src={t.avatarUrl ?? undefined}
            alt={t.patientName}
            sx={{ width: 48, height: 48, bgcolor: alpha(brand.primary, 0.12), color: brand.primary, fontWeight: 700 }}
          >
            {t.patientName.charAt(0)}
          </Avatar>
          <Box sx={{ minWidth: 0 }}>
            <Typography sx={{ fontWeight: 700 }} noWrap>
              {t.patientName}
            </Typography>
            <Typography variant="body2" color="text.secondary" noWrap>
              {t.location ?? 'Verified patient'}
            </Typography>
          </Box>
        </Stack>

        {t.treatment && (
          <Chip
            label={t.treatment}
            size="small"
            sx={{ mt: 2, bgcolor: alpha(brand.accent, 0.1), color: brand.primaryDark, fontWeight: 600 }}
          />
        )}
      </CardContent>
    </Card>
  );
}
