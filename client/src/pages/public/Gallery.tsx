import { useMemo, useState } from 'react';
import {
  Box,
  Card,
  Container,
  Dialog,
  DialogContent,
  IconButton,
  Stack,
  Tab,
  Tabs,
  Typography,
  useMediaQuery,
} from '@mui/material';
import Grid from '@mui/material/Grid2';
import { alpha, useTheme } from '@mui/material/styles';
import CloseRoundedIcon from '@mui/icons-material/CloseRounded';
import PlayArrowRoundedIcon from '@mui/icons-material/PlayArrowRounded';
import PhotoLibraryOutlinedIcon from '@mui/icons-material/PhotoLibraryOutlined';
import CompareArrowsRoundedIcon from '@mui/icons-material/CompareArrowsRounded';

import { PageHero } from '@/components/ui/PageHero';
import { Reveal } from '@/components/ui/Reveal';
import { Loader, EmptyState, ErrorState } from '@/components/ui/States';
import { useGallery } from '@/lib/queries';
import { errorMessage } from '@/lib/api';
import { brand, gradients } from '@/theme/theme';
import type { GalleryItem } from '@/lib/types';

const FILTERS: { value: string; label: string; match: (t: string) => boolean }[] = [
  { value: 'ALL', label: 'All', match: () => true },
  { value: 'CLINIC', label: 'Clinic', match: (t) => t === 'PHOTO' || t === 'ROOM' },
  { value: 'EQUIPMENT', label: 'Equipment', match: (t) => t === 'EQUIPMENT' },
  { value: 'BEFORE_AFTER', label: 'Before & After', match: (t) => t === 'BEFORE_AFTER' },
  { value: 'VIDEO', label: 'Video', match: (t) => t === 'VIDEO' },
];

export default function Gallery() {
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down('sm'));
  const { data, isLoading, isError, error, refetch } = useGallery();

  const [filter, setFilter] = useState('ALL');
  const [lightbox, setLightbox] = useState<{ url: string; title: string } | null>(null);
  const [video, setVideo] = useState<{ url: string; title: string } | null>(null);

  const active = FILTERS.find((f) => f.value === filter) ?? FILTERS[0];
  const items = useMemo(() => (data ?? []).filter((i) => active.match(i.type)), [data, active]);

  return (
    <Box>
      <PageHero
        title="Our Gallery"
        subtitle="Step inside our clinic, explore our technology, and see the smile transformations we're proud of."
        crumbs={[{ label: 'Gallery' }]}
      />

      <Container sx={{ py: { xs: 5, md: 8 } }}>
        {/* Filter tabs */}
        <Box sx={{ display: 'flex', justifyContent: 'center', mb: { xs: 4, md: 6 } }}>
          <Tabs
            value={filter}
            onChange={(_, v) => setFilter(v)}
            variant={isMobile ? 'scrollable' : 'standard'}
            scrollButtons="auto"
            allowScrollButtonsMobile
            sx={{
              bgcolor: alpha(brand.primary, 0.06),
              borderRadius: 999,
              p: 0.75,
              minHeight: 0,
              '& .MuiTabs-indicator': { display: 'none' },
              '& .MuiTab-root': {
                minHeight: 0,
                py: 1,
                px: 2.5,
                borderRadius: 999,
                fontWeight: 700,
                textTransform: 'none',
                color: 'text.secondary',
              },
              '& .Mui-selected': {
                color: '#fff !important',
                background: gradients.primary,
                boxShadow: `0 8px 20px ${alpha(brand.primary, 0.35)}`,
              },
            }}
          >
            {FILTERS.map((f) => (
              <Tab key={f.value} value={f.value} label={f.label} />
            ))}
          </Tabs>
        </Box>

        {isLoading ? (
          <Loader label="Loading gallery…" />
        ) : isError ? (
          <ErrorState message={errorMessage(error)} onRetry={() => refetch()} />
        ) : items.length === 0 ? (
          <EmptyState
            title="Nothing here yet"
            description="There are no items in this category right now. Try another filter."
            icon={<PhotoLibraryOutlinedIcon sx={{ fontSize: 56 }} />}
          />
        ) : (
          <Grid container spacing={{ xs: 2, md: 3 }}>
            {items.map((item, i) => (
              <GalleryTile
                key={item.id}
                item={item}
                index={i}
                onOpenImage={(url, title) => setLightbox({ url, title })}
                onOpenVideo={(url, title) => setVideo({ url, title })}
              />
            ))}
          </Grid>
        )}
      </Container>

      {/* Image lightbox */}
      <Dialog open={!!lightbox} onClose={() => setLightbox(null)} maxWidth="lg" fullWidth>
        <DialogContent sx={{ p: 0, position: 'relative', bgcolor: brand.ink }}>
          <IconButton
            onClick={() => setLightbox(null)}
            sx={{ position: 'absolute', top: 12, right: 12, color: '#fff', bgcolor: 'rgba(0,0,0,0.4)', zIndex: 2, '&:hover': { bgcolor: 'rgba(0,0,0,0.65)' } }}
          >
            <CloseRoundedIcon />
          </IconButton>
          {lightbox && (
            <Box
              component="img"
              src={lightbox.url}
              alt={lightbox.title}
              sx={{ width: '100%', maxHeight: '85vh', objectFit: 'contain', display: 'block' }}
            />
          )}
          {lightbox?.title && (
            <Typography sx={{ position: 'absolute', bottom: 0, left: 0, right: 0, p: 2, color: '#fff', background: 'linear-gradient(transparent, rgba(0,0,0,0.75))', fontWeight: 600 }}>
              {lightbox.title}
            </Typography>
          )}
        </DialogContent>
      </Dialog>

      {/* Video dialog */}
      <Dialog open={!!video} onClose={() => setVideo(null)} maxWidth="md" fullWidth>
        <DialogContent sx={{ p: 0, position: 'relative', bgcolor: '#000' }}>
          <IconButton
            onClick={() => setVideo(null)}
            sx={{ position: 'absolute', top: 12, right: 12, color: '#fff', bgcolor: 'rgba(0,0,0,0.4)', zIndex: 2, '&:hover': { bgcolor: 'rgba(0,0,0,0.65)' } }}
          >
            <CloseRoundedIcon />
          </IconButton>
          {video && (
            <Box component="video" controls autoPlay src={video.url} sx={{ width: '100%', maxHeight: '85vh', display: 'block' }} />
          )}
        </DialogContent>
      </Dialog>
    </Box>
  );
}

function GalleryTile({
  item,
  index,
  onOpenImage,
  onOpenVideo,
}: {
  item: GalleryItem;
  index: number;
  onOpenImage: (url: string, title: string) => void;
  onOpenVideo: (url: string, title: string) => void;
}) {
  // ── Before / After ──────────────────────────────────────────────
  if (item.type === 'BEFORE_AFTER') {
    return (
      <Grid size={{ xs: 12, md: 6 }}>
        <Reveal delayIndex={index % 3}>
          <Card sx={{ overflow: 'hidden', height: '100%' }}>
            <Stack direction="row">
              {[
                { label: 'Before', url: item.beforeUrl },
                { label: 'After', url: item.afterUrl },
              ].map((side) => (
                <Box key={side.label} sx={{ position: 'relative', flex: 1 }}>
                  <Box
                    component="img"
                    src={side.url ?? undefined}
                    alt={`${item.title} — ${side.label}`}
                    sx={{ width: '100%', height: { xs: 200, sm: 260 }, objectFit: 'cover', display: 'block' }}
                  />
                  <Typography
                    sx={{
                      position: 'absolute',
                      top: 12,
                      left: 12,
                      px: 1.5,
                      py: 0.5,
                      borderRadius: 999,
                      fontSize: 12,
                      fontWeight: 700,
                      color: '#fff',
                      bgcolor: side.label === 'After' ? brand.primary : alpha(brand.ink, 0.7),
                    }}
                  >
                    {side.label}
                  </Typography>
                </Box>
              ))}
            </Stack>
            <Stack direction="row" spacing={1} alignItems="center" sx={{ p: 2 }}>
              <CompareArrowsRoundedIcon sx={{ color: brand.primary }} />
              <Typography variant="subtitle1" sx={{ fontWeight: 700 }}>
                {item.title}
              </Typography>
            </Stack>
          </Card>
        </Reveal>
      </Grid>
    );
  }

  // ── Video ───────────────────────────────────────────────────────
  if (item.type === 'VIDEO') {
    return (
      <Grid size={{ xs: 12, sm: 6, md: 4 }}>
        <Reveal delayIndex={index % 3}>
          <Card
            onClick={() => item.videoUrl && onOpenVideo(item.videoUrl, item.title)}
            sx={{
              position: 'relative',
              overflow: 'hidden',
              cursor: 'pointer',
              transition: 'transform .28s ease, box-shadow .28s ease',
              '&:hover': { transform: 'translateY(-6px)', boxShadow: `0 22px 44px ${alpha(brand.ink, 0.16)}` },
              '&:hover .g-thumb': { transform: 'scale(1.06)' },
            }}
          >
            <Box sx={{ position: 'relative', overflow: 'hidden' }}>
              <Box
                className="g-thumb"
                component="img"
                src={item.imageUrl ?? undefined}
                alt={item.title}
                sx={{ width: '100%', height: 240, objectFit: 'cover', display: 'block', transition: 'transform .4s ease' }}
              />
              <Box sx={{ position: 'absolute', inset: 0, bgcolor: 'rgba(15,30,61,0.28)', display: 'grid', placeItems: 'center' }}>
                <Box
                  sx={{
                    width: 64,
                    height: 64,
                    borderRadius: '50%',
                    display: 'grid',
                    placeItems: 'center',
                    background: gradients.primary,
                    color: '#fff',
                    boxShadow: `0 10px 26px ${alpha(brand.primary, 0.5)}`,
                  }}
                >
                  <PlayArrowRoundedIcon sx={{ fontSize: 38 }} />
                </Box>
              </Box>
            </Box>
            <Typography variant="subtitle1" sx={{ fontWeight: 700, p: 2 }}>
              {item.title}
            </Typography>
          </Card>
        </Reveal>
      </Grid>
    );
  }

  // ── Photo / Room / Equipment ────────────────────────────────────
  const heights = [260, 300, 240];
  return (
    <Grid size={{ xs: 12, sm: 6, md: 4 }}>
      <Reveal delayIndex={index % 3}>
        <Box
          onClick={() => item.imageUrl && onOpenImage(item.imageUrl, item.title)}
          sx={{
            position: 'relative',
            borderRadius: 4,
            overflow: 'hidden',
            cursor: 'pointer',
            boxShadow: `0 8px 26px ${alpha(brand.ink, 0.08)}`,
            '&:hover .g-img': { transform: 'scale(1.08)' },
            '&:hover .g-overlay': { opacity: 1 },
          }}
        >
          <Box
            className="g-img"
            component="img"
            src={item.imageUrl ?? undefined}
            alt={item.title}
            sx={{
              width: '100%',
              height: { xs: 240, md: heights[index % heights.length] },
              objectFit: 'cover',
              display: 'block',
              transition: 'transform .5s ease',
            }}
          />
          <Box
            className="g-overlay"
            sx={{
              position: 'absolute',
              inset: 0,
              display: 'flex',
              alignItems: 'flex-end',
              p: 2,
              opacity: 0,
              transition: 'opacity .3s ease',
              background: 'linear-gradient(transparent 40%, rgba(15,30,61,0.82))',
            }}
          >
            <Box>
              {item.category && (
                <Typography sx={{ color: alpha('#ffffff', 0.8), fontSize: 12, fontWeight: 700, textTransform: 'uppercase', letterSpacing: 0.5 }}>
                  {item.category}
                </Typography>
              )}
              <Typography sx={{ color: '#fff', fontWeight: 700, fontSize: '1.05rem' }}>{item.title}</Typography>
            </Box>
          </Box>
        </Box>
      </Reveal>
    </Grid>
  );
}
