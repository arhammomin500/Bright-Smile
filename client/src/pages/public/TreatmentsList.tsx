import { useMemo, useState } from 'react';
import {
  Box,
  Button,
  Card,
  CardActionArea,
  CardContent,
  Chip,
  Container,
  Stack,
  ToggleButton,
  ToggleButtonGroup,
  Typography,
} from '@mui/material';
import Grid from '@mui/material/Grid2';
import { Link } from 'react-router-dom';
import ArrowForwardIcon from '@mui/icons-material/ArrowForward';
import ScheduleIcon from '@mui/icons-material/Schedule';
import { PageHero } from '@/components/ui/PageHero';
import { Reveal } from '@/components/ui/Reveal';
import { Loader, ErrorState, EmptyState } from '@/components/ui/States';
import { TreatmentIcon } from '@/components/ui/TreatmentIcon';
import { useTreatments } from '@/lib/queries';
import { errorMessage } from '@/lib/api';
import { formatPriceRange } from '@/lib/format';
import { brand, gradients } from '@/theme/theme';
import type { Treatment } from '@/lib/types';

const ALL = 'All';

export default function TreatmentsList() {
  const { data: treatments, isLoading, isError, error, refetch } = useTreatments();
  const [category, setCategory] = useState<string>(ALL);

  const categories = useMemo(() => {
    if (!treatments) return [ALL];
    return [ALL, ...Array.from(new Set(treatments.map((t) => t.category)))];
  }, [treatments]);

  const filtered = useMemo(() => {
    if (!treatments) return [];
    return category === ALL ? treatments : treatments.filter((t) => t.category === category);
  }, [treatments, category]);

  return (
    <Box>
      <PageHero
        title="Our Dental Treatments"
        subtitle="From routine care to full smile makeovers — explore our comprehensive range of advanced, comfortable treatments."
        crumbs={[{ label: 'Treatments' }]}
      />

      <Container sx={{ py: { xs: 6, md: 10 } }}>
        {isLoading && <Loader label="Loading treatments…" />}

        {isError && <ErrorState message={errorMessage(error)} onRetry={() => refetch()} />}

        {!isLoading && !isError && treatments && treatments.length > 0 && (
          <>
            <Box sx={{ display: 'flex', justifyContent: 'center', mb: { xs: 4, md: 6 } }}>
              <ToggleButtonGroup
                value={category}
                exclusive
                onChange={(_, val) => val && setCategory(val)}
                aria-label="Filter treatments by category"
                sx={{
                  flexWrap: 'wrap',
                  gap: 1,
                  justifyContent: 'center',
                  '& .MuiToggleButton-root': {
                    border: `1px solid ${brand.primary}26`,
                    borderRadius: 999,
                    px: 2.5,
                    py: 0.75,
                    textTransform: 'none',
                    fontWeight: 700,
                    color: brand.slate,
                  },
                  '& .MuiToggleButton-root.Mui-selected': {
                    color: '#fff',
                    background: gradients.primary,
                    borderColor: 'transparent',
                    '&:hover': { background: gradients.primary },
                  },
                }}
              >
                {categories.map((cat) => (
                  <ToggleButton key={cat} value={cat} disableRipple>
                    {cat}
                  </ToggleButton>
                ))}
              </ToggleButtonGroup>
            </Box>

            {filtered.length === 0 ? (
              <EmptyState title="No treatments in this category" description="Try selecting a different category." />
            ) : (
              <Grid container spacing={{ xs: 3, md: 4 }}>
                {filtered.map((t, i) => (
                  <Grid key={t.id} size={{ xs: 12, sm: 6, md: 4 }}>
                    <Reveal delayIndex={i % 3} sx={{ height: '100%' }}>
                      <TreatmentCard treatment={t} />
                    </Reveal>
                  </Grid>
                ))}
              </Grid>
            )}
          </>
        )}

        {!isLoading && !isError && (!treatments || treatments.length === 0) && (
          <EmptyState title="No treatments available yet" description="Please check back soon." />
        )}
      </Container>
    </Box>
  );
}

function TreatmentCard({ treatment }: { treatment: Treatment }) {
  return (
    <Card
      sx={{
        height: '100%',
        transition: 'transform .28s ease, box-shadow .28s ease',
        '&:hover': {
          transform: 'translateY(-6px)',
          boxShadow: `0 22px 48px ${brand.primary}22`,
        },
      }}
    >
      <CardActionArea
        component={Link}
        to={`/treatments/${treatment.slug}`}
        sx={{ height: '100%', display: 'flex', flexDirection: 'column', alignItems: 'stretch' }}
      >
        <CardContent sx={{ p: 3, display: 'flex', flexDirection: 'column', flexGrow: 1, width: '100%' }}>
          <Stack direction="row" alignItems="center" spacing={2}>
            <Box
              sx={{
                width: 64,
                height: 64,
                borderRadius: '50%',
                background: gradients.accent,
                color: '#fff',
                display: 'grid',
                placeItems: 'center',
                flexShrink: 0,
                boxShadow: `0 10px 24px ${brand.primary}33`,
              }}
            >
              <TreatmentIcon name={treatment.icon ?? undefined} sx={{ fontSize: 30 }} />
            </Box>
            <Chip
              label={treatment.category}
              size="small"
              sx={{ bgcolor: `${brand.primary}12`, color: brand.primary, fontWeight: 700 }}
            />
          </Stack>

          <Typography variant="h6" sx={{ fontWeight: 800, mt: 2.5 }}>
            {treatment.name}
          </Typography>
          <Typography variant="body2" color="text.secondary" sx={{ mt: 1 }}>
            {treatment.shortDesc}
          </Typography>

          <Stack
            direction="row"
            spacing={2}
            alignItems="center"
            justifyContent="space-between"
            sx={{ mt: 2.5, pt: 2, borderTop: `1px solid ${brand.primary}14` }}
          >
            <Typography sx={{ fontWeight: 800, color: brand.primary }}>
              {formatPriceRange(treatment.priceMin, treatment.priceMax)}
            </Typography>
            <Stack direction="row" spacing={0.5} alignItems="center" sx={{ color: brand.slate }}>
              <ScheduleIcon fontSize="small" />
              <Typography variant="body2" sx={{ fontWeight: 600 }}>
                ~{treatment.durationMin} min
              </Typography>
            </Stack>
          </Stack>

          <Button
            component="span"
            endIcon={<ArrowForwardIcon />}
            sx={{ mt: 2, alignSelf: 'flex-start', px: 0, color: brand.primary, '&:hover': { background: 'transparent' } }}
          >
            Learn more
          </Button>
        </CardContent>
      </CardActionArea>
    </Card>
  );
}
