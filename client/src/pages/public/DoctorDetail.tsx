import { Avatar, Box, Button, Card, CardContent, Chip, Container, Divider, Stack, Typography } from '@mui/material';
import Grid from '@mui/material/Grid2';
import { Link, useParams } from 'react-router-dom';
import CalendarMonthIcon from '@mui/icons-material/CalendarMonth';
import WorkHistoryIcon from '@mui/icons-material/WorkHistory';
import TranslateIcon from '@mui/icons-material/Translate';
import SchoolIcon from '@mui/icons-material/School';
import PaidIcon from '@mui/icons-material/Paid';
import AccessTimeIcon from '@mui/icons-material/AccessTime';
import CheckCircleIcon from '@mui/icons-material/CheckCircle';
import FreeBreakfastIcon from '@mui/icons-material/FreeBreakfast';
import { PageHero } from '@/components/ui/PageHero';
import { Reveal } from '@/components/ui/Reveal';
import { SectionHeading } from '@/components/ui/SectionHeading';
import { Loader, ErrorState, EmptyState } from '@/components/ui/States';
import { useDoctor } from '@/lib/queries';
import { errorMessage } from '@/lib/api';
import { formatPriceRange, formatTime12h, WEEKDAYS } from '@/lib/format';
import { brand, gradients } from '@/theme/theme';
import type { Doctor } from '@/lib/types';

type ScheduleRow = {
  dayOfWeek: number;
  isWorking: boolean;
  startTime: string;
  endTime: string;
  breakStart?: string | null;
  breakEnd?: string | null;
};

function buildSchedule(doctor: Doctor): ScheduleRow[] {
  if (doctor.schedules && doctor.schedules.length > 0) {
    return [...doctor.schedules].sort((a, b) => a.dayOfWeek - b.dayOfWeek);
  }
  // Derive from availableDays when explicit schedules are missing.
  const available = new Set(doctor.availableDays ?? []);
  return WEEKDAYS.map((_, day) => ({
    dayOfWeek: day,
    isWorking: available.has(day),
    startTime: doctor.consultStart,
    endTime: doctor.consultEnd,
    breakStart: null,
    breakEnd: null,
  }));
}

export default function DoctorDetail() {
  const { slug } = useParams();
  const { data: doctor, isLoading, isError, error, refetch } = useDoctor(slug);

  if (isLoading) {
    return (
      <Box>
        <PageHero title="Doctor Profile" crumbs={[{ label: 'Doctors', to: '/doctors' }, { label: 'Profile' }]} />
        <Container sx={{ py: { xs: 6, md: 10 } }}>
          <Loader label="Loading profile…" />
        </Container>
      </Box>
    );
  }

  if (isError || !doctor) {
    return (
      <Box>
        <PageHero title="Doctor Profile" crumbs={[{ label: 'Doctors', to: '/doctors' }, { label: 'Profile' }]} />
        <Container sx={{ py: { xs: 6, md: 10 } }}>
          {isError ? (
            <ErrorState message={errorMessage(error)} onRetry={() => refetch()} />
          ) : (
            <EmptyState
              title="Doctor not found"
              description="This profile may have moved."
              action={
                <Button component={Link} to="/doctors" variant="contained">
                  Back to all doctors
                </Button>
              }
            />
          )}
        </Container>
      </Box>
    );
  }

  const schedule = buildSchedule(doctor);

  return (
    <Box>
      <PageHero
        title={doctor.fullName}
        subtitle={doctor.title ?? doctor.specialization}
        crumbs={[{ label: 'Doctors', to: '/doctors' }, { label: doctor.fullName }]}
      />

      <Container sx={{ py: { xs: 6, md: 10 } }}>
        <Grid container spacing={{ xs: 4, md: 6 }}>
          {/* Left: photo + quick book */}
          <Grid size={{ xs: 12, md: 5 }}>
            <Reveal sx={{ position: { md: 'sticky' }, top: { md: 100 } }}>
              <Card sx={{ overflow: 'hidden' }}>
                <Box sx={{ height: { xs: 340, md: 440 }, background: gradients.soft }}>
                  {doctor.photoUrl ? (
                    <Box
                      component="img"
                      src={doctor.photoUrl}
                      alt={doctor.fullName}
                      sx={{ width: '100%', height: '100%', objectFit: 'cover', display: 'block' }}
                    />
                  ) : (
                    <Box sx={{ display: 'grid', placeItems: 'center', height: '100%' }}>
                      <Avatar sx={{ width: 120, height: 120, bgcolor: brand.primary, fontSize: 44, fontWeight: 700 }}>
                        {doctor.firstName?.[0]}
                        {doctor.lastName?.[0]}
                      </Avatar>
                    </Box>
                  )}
                </Box>
                <CardContent sx={{ p: 3 }}>
                  <Button
                    component={Link}
                    to={`/book?doctor=${doctor.slug}`}
                    variant="contained"
                    size="large"
                    fullWidth
                    startIcon={<CalendarMonthIcon />}
                  >
                    Book Appointment with {doctor.firstName}
                  </Button>
                </CardContent>
              </Card>
            </Reveal>
          </Grid>

          {/* Right: details */}
          <Grid size={{ xs: 12, md: 7 }}>
            <Reveal>
              <Chip
                label={doctor.specialization}
                sx={{ bgcolor: `${brand.primary}14`, color: brand.primary, fontWeight: 700, mb: 1.5 }}
              />
              <Typography variant="h3" sx={{ fontWeight: 800 }}>
                {doctor.fullName}
              </Typography>
              {doctor.title && (
                <Typography variant="h6" color="text.secondary" sx={{ fontWeight: 600, mt: 0.5 }}>
                  {doctor.title}
                </Typography>
              )}

              <Grid container spacing={2} sx={{ mt: 2 }}>
                <FactCard
                  icon={<SchoolIcon />}
                  label="Qualification"
                  value={doctor.qualification}
                />
                <FactCard
                  icon={<WorkHistoryIcon />}
                  label="Experience"
                  value={`${doctor.experienceYears}+ years`}
                />
                <FactCard
                  icon={<PaidIcon />}
                  label="Consultation Fee"
                  value={formatPriceRange(doctor.consultFeeMin, doctor.consultFeeMax)}
                />
                <FactCard
                  icon={<AccessTimeIcon />}
                  label="Consultation Hours"
                  value={`${formatTime12h(doctor.consultStart)} – ${formatTime12h(doctor.consultEnd)}`}
                />
              </Grid>

              {doctor.languages?.length > 0 && (
                <Stack direction="row" spacing={1} alignItems="center" flexWrap="wrap" useFlexGap sx={{ mt: 3 }}>
                  <TranslateIcon fontSize="small" sx={{ color: brand.primary }} />
                  <Typography variant="body2" sx={{ fontWeight: 700, mr: 0.5 }}>
                    Speaks:
                  </Typography>
                  {doctor.languages.map((lang) => (
                    <Chip
                      key={lang}
                      label={lang}
                      size="small"
                      variant="outlined"
                      sx={{ borderColor: `${brand.primary}33`, color: brand.slate, fontWeight: 600 }}
                    />
                  ))}
                </Stack>
              )}

              <Divider sx={{ my: 3.5 }} />

              <Typography variant="h5" sx={{ fontWeight: 800, mb: 1.5 }}>
                About {doctor.firstName}
              </Typography>
              {doctor.bio
                .split(/\n\n+/)
                .filter(Boolean)
                .map((para, i) => (
                  <Typography key={i} variant="body1" color="text.secondary" sx={{ mb: 1.5 }}>
                    {para}
                  </Typography>
                ))}
            </Reveal>
          </Grid>
        </Grid>

        {/* Availability */}
        <Box sx={{ mt: { xs: 7, md: 10 } }}>
          <SectionHeading
            eyebrow="Schedule"
            title="Available Days & Hours"
            subtitle={`Plan your visit around ${doctor.firstName}'s weekly availability.`}
            align="left"
          />
          <Grid container spacing={2}>
            {schedule.map((row, i) => (
              <Grid key={row.dayOfWeek} size={{ xs: 12, sm: 6, md: 4 }}>
                <Reveal delayIndex={i % 3}>
                  <ScheduleCard row={row} />
                </Reveal>
              </Grid>
            ))}
          </Grid>
        </Box>

        {/* Bottom CTA */}
        <Reveal sx={{ mt: { xs: 7, md: 10 } }}>
          <Box
            sx={{
              background: gradients.primary,
              borderRadius: 5,
              p: { xs: 4, md: 6 },
              textAlign: 'center',
              color: '#fff',
            }}
          >
            <Typography variant="h4" sx={{ fontWeight: 800 }}>
              Ready to visit {doctor.fullName}?
            </Typography>
            <Typography sx={{ mt: 1.5, mb: 3, color: 'rgba(255,255,255,0.9)', maxWidth: 560, mx: 'auto' }}>
              Book a consultation today and take the first step towards a healthier, brighter smile.
            </Typography>
            <Button
              component={Link}
              to={`/book?doctor=${doctor.slug}`}
              size="large"
              startIcon={<CalendarMonthIcon />}
              sx={{ bgcolor: '#fff', color: brand.primary, '&:hover': { bgcolor: '#fff', transform: 'translateY(-2px)' } }}
            >
              Book Appointment with {doctor.firstName}
            </Button>
          </Box>
        </Reveal>
      </Container>
    </Box>
  );
}

function FactCard({ icon, label, value }: { icon: React.ReactNode; label: string; value: string }) {
  return (
    <Grid size={{ xs: 12, sm: 6 }}>
      <Stack
        direction="row"
        spacing={1.5}
        alignItems="flex-start"
        sx={{ p: 2, borderRadius: 3, bgcolor: brand.mist, height: '100%' }}
      >
        <Box
          sx={{
            display: 'grid',
            placeItems: 'center',
            width: 40,
            height: 40,
            borderRadius: 2,
            background: gradients.primary,
            color: '#fff',
            flexShrink: 0,
          }}
        >
          {icon}
        </Box>
        <Box>
          <Typography variant="caption" sx={{ color: brand.slate, fontWeight: 700, textTransform: 'uppercase', letterSpacing: 0.4 }}>
            {label}
          </Typography>
          <Typography variant="body2" sx={{ fontWeight: 700, color: 'text.primary' }}>
            {value}
          </Typography>
        </Box>
      </Stack>
    </Grid>
  );
}

function ScheduleCard({ row }: { row: ScheduleRow }) {
  const working = row.isWorking;
  return (
    <Card
      sx={{
        p: 2.5,
        height: '100%',
        opacity: working ? 1 : 0.55,
        bgcolor: working ? '#fff' : brand.mist,
        borderColor: working ? `${brand.primary}22` : undefined,
      }}
    >
      <Stack direction="row" alignItems="center" justifyContent="space-between">
        <Typography sx={{ fontWeight: 800 }}>{WEEKDAYS[row.dayOfWeek]}</Typography>
        {working ? (
          <CheckCircleIcon fontSize="small" sx={{ color: brand.success }} />
        ) : (
          <Chip label="Closed" size="small" sx={{ bgcolor: '#e2e8f0', color: brand.slate, fontWeight: 700 }} />
        )}
      </Stack>
      {working && (
        <>
          <Stack direction="row" spacing={1} alignItems="center" sx={{ mt: 1.5, color: brand.slate }}>
            <AccessTimeIcon fontSize="small" sx={{ color: brand.primary }} />
            <Typography variant="body2" sx={{ fontWeight: 600 }}>
              {formatTime12h(row.startTime)} – {formatTime12h(row.endTime)}
            </Typography>
          </Stack>
          {row.breakStart && row.breakEnd && (
            <Stack direction="row" spacing={1} alignItems="center" sx={{ mt: 0.75, color: brand.slate }}>
              <FreeBreakfastIcon fontSize="small" sx={{ color: brand.warning }} />
              <Typography variant="body2">
                Break {formatTime12h(row.breakStart)} – {formatTime12h(row.breakEnd)}
              </Typography>
            </Stack>
          )}
        </>
      )}
    </Card>
  );
}
