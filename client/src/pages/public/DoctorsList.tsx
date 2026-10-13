import { Avatar, Box, Button, Card, CardContent, Chip, Container, Stack, Typography } from '@mui/material';
import Grid from '@mui/material/Grid2';
import { Link, Navigate } from 'react-router-dom';
import WorkHistoryIcon from '@mui/icons-material/WorkHistory';
import TranslateIcon from '@mui/icons-material/Translate';
import CalendarMonthIcon from '@mui/icons-material/CalendarMonth';
import PersonSearchIcon from '@mui/icons-material/PersonSearch';
import { PageHero } from '@/components/ui/PageHero';
import { Reveal } from '@/components/ui/Reveal';
import { Loader, ErrorState, EmptyState } from '@/components/ui/States';
import { useDoctors } from '@/lib/queries';
import { errorMessage } from '@/lib/api';
import { brand, gradients } from '@/theme/theme';
import type { Doctor } from '@/lib/types';
import { usePageMeta } from '@/lib/usePageMeta';

export default function DoctorsList() {
  usePageMeta('Our Doctor — Bright Smile Dental Clinic', 'Meet Dr. Afaque Khan — BDS, MDS, 15+ years of gentle, modern dentistry.');
  const { data: doctors, isLoading, isError, error, refetch } = useDoctors();

  // Single-doctor clinic: go straight to Dr. Afaque Khan's full profile.
  if (doctors?.length === 1) {
    return <Navigate to={`/doctors/${doctors[0].slug}`} replace />;
  }

  return (
    <Box>
      <PageHero
        title="Meet Your Doctor"
        subtitle="Gentle, precise, and truly personalised dental care from Dr. Afaque Khan."
        crumbs={[{ label: 'Our Doctor' }]}
      />

      <Container sx={{ py: { xs: 6, md: 10 } }}>
        {isLoading && <Loader label="Loading our specialists…" />}

        {isError && <ErrorState message={errorMessage(error)} onRetry={() => refetch()} />}

        {!isLoading && !isError && (!doctors || doctors.length === 0) && (
          <EmptyState
            icon={<PersonSearchIcon sx={{ fontSize: 56 }} />}
            title="No dentists to show yet"
            description="Our team profiles will be available here shortly."
          />
        )}

        {doctors && doctors.length > 0 && (
          <Grid container spacing={{ xs: 3, md: 4 }}>
            {doctors.map((doc, i) => (
              <Grid key={doc.id} size={{ xs: 12, sm: 6, md: 4 }}>
                <Reveal delayIndex={i % 3} sx={{ height: '100%' }}>
                  <DoctorCard doctor={doc} />
                </Reveal>
              </Grid>
            ))}
          </Grid>
        )}
      </Container>
    </Box>
  );
}

function DoctorCard({ doctor }: { doctor: Doctor }) {
  return (
    <Card
      sx={{
        height: '100%',
        display: 'flex',
        flexDirection: 'column',
        overflow: 'hidden',
        transition: 'transform .28s ease, box-shadow .28s ease',
        '&:hover': {
          transform: 'translateY(-6px)',
          boxShadow: `0 22px 48px ${brand.primary}22`,
        },
      }}
    >
      <Box
        sx={{
          position: 'relative',
          height: 280,
          background: gradients.soft,
        }}
      >
        {doctor.photoUrl ? (
          <Box
            component="img"
            src={doctor.photoUrl}
            alt={doctor.fullName}
            loading="lazy"
            sx={{ width: '100%', height: '100%', objectFit: 'cover', display: 'block' }}
          />
        ) : (
          <Box sx={{ display: 'grid', placeItems: 'center', height: '100%' }}>
            <Avatar sx={{ width: 96, height: 96, bgcolor: brand.primary, fontSize: 34, fontWeight: 700 }}>
              {doctor.firstName?.[0]}
              {doctor.lastName?.[0]}
            </Avatar>
          </Box>
        )}
        <Chip
          label={doctor.specialization}
          size="small"
          sx={{
            position: 'absolute',
            left: 14,
            bottom: 14,
            bgcolor: 'rgba(255,255,255,0.92)',
            color: brand.primary,
            fontWeight: 700,
            backdropFilter: 'blur(4px)',
          }}
        />
      </Box>

      <CardContent sx={{ p: 3, display: 'flex', flexDirection: 'column', flexGrow: 1 }}>
        <Typography variant="h6" sx={{ fontWeight: 800 }}>
          {doctor.fullName}
        </Typography>
        {doctor.title && (
          <Typography variant="body2" color="text.secondary" sx={{ mt: 0.25 }}>
            {doctor.title}
          </Typography>
        )}

        <Typography variant="body2" sx={{ mt: 1.5, color: 'text.secondary', fontWeight: 600 }}>
          {doctor.qualification}
        </Typography>

        <Stack direction="row" spacing={1} alignItems="center" sx={{ mt: 1.5, color: brand.slate }}>
          <WorkHistoryIcon fontSize="small" sx={{ color: brand.primary }} />
          <Typography variant="body2">{doctor.experienceYears}+ years experience</Typography>
        </Stack>

        {doctor.languages?.length > 0 && (
          <Stack direction="row" spacing={1} alignItems="flex-start" sx={{ mt: 1.5 }}>
            <TranslateIcon fontSize="small" sx={{ color: brand.primary, mt: 0.4 }} />
            <Box sx={{ display: 'flex', flexWrap: 'wrap', gap: 0.7 }}>
              {doctor.languages.map((lang) => (
                <Chip
                  key={lang}
                  label={lang}
                  size="small"
                  variant="outlined"
                  sx={{ borderColor: `${brand.primary}33`, color: brand.slate, fontWeight: 600 }}
                />
              ))}
            </Box>
          </Stack>
        )}

        <Stack direction="row" spacing={1.5} sx={{ mt: 'auto', pt: 3 }}>
          <Button component={Link} to={`/doctors/${doctor.slug}`} variant="outlined" fullWidth>
            View Profile
          </Button>
          <Button
            component={Link}
            to={`/book?doctor=${doctor.slug}`}
            variant="contained"
            fullWidth
            startIcon={<CalendarMonthIcon />}
          >
            Book
          </Button>
        </Stack>
      </CardContent>
    </Card>
  );
}
