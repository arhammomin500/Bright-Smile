import { Link } from 'react-router-dom';
import { Box, Card, Chip, Stack, Typography, Divider, Avatar, Button, Alert } from '@mui/material';
import Grid from '@mui/material/Grid2';
import EventNoteIcon from '@mui/icons-material/EventNote';
import DoneAllIcon from '@mui/icons-material/DoneAll';
import PendingActionsIcon from '@mui/icons-material/PendingActions';
import TrendingUpIcon from '@mui/icons-material/TrendingUp';
import { StatCard } from '@/components/dashboard/StatCard';
import { Loader, EmptyState } from '@/components/ui/States';
import { useAppointmentsList } from '@/lib/dashboardQueries';
import { useAuth } from '@/auth/AuthContext';
import { STATUS_META, formatDate, formatTime12h } from '@/lib/format';
import type { Appointment } from '@/lib/types';

// The doctor's personal view: only THEIR appointments (RBAC by data scope).
export default function DoctorDashboard() {
  const { user } = useAuth();
  const doctorId = user?.doctorId ?? undefined;

  const { data: today, isLoading: loadingToday } = useAppointmentsList({
    doctorId,
    scope: 'today',
    pageSize: 50,
  });
  const { data: upcoming, isLoading: loadingUpcoming } = useAppointmentsList({
    doctorId,
    scope: 'upcoming',
    pageSize: 50,
  });

  if (!doctorId) {
    return (
      <Alert severity="warning" sx={{ borderRadius: 3 }}>
        Your account isn't linked to a doctor profile yet. Please ask the administrator to link it.
      </Alert>
    );
  }

  if (loadingToday || loadingUpcoming) return <Loader label="Loading your day…" minHeight="60vh" />;

  const todays = (today?.data ?? []).slice().sort((a, b) => a.startTime.localeCompare(b.startTime));
  const upcomingList = (upcoming?.data ?? [])
    .filter((a) => ['PENDING', 'CONFIRMED', 'RESCHEDULED'].includes(a.status))
    .slice(0, 8);

  const completed = todays.filter((a) => a.status === 'COMPLETED').length;
  const pending = todays.filter((a) => a.status === 'PENDING').length;
  const active = todays.filter((a) => ['CONFIRMED', 'RESCHEDULED'].includes(a.status)).length;

  return (
    <Box>
      <Typography variant="h4" sx={{ fontWeight: 800 }}>
        Good day, Dr. {user?.lastName} 👋
      </Typography>
      <Typography color="text.secondary" sx={{ mb: 3 }}>
        Here's your schedule and what's ahead.
      </Typography>

      <Grid container spacing={2.5} sx={{ mb: 1 }}>
        <Grid size={{ xs: 6, md: 3 }}>
          <StatCard label="Today's Patients" value={todays.length} icon={<EventNoteIcon />} color="#1f6feb" />
        </Grid>
        <Grid size={{ xs: 6, md: 3 }}>
          <StatCard label="Remaining Today" value={active} icon={<PendingActionsIcon />} color="#d97706" />
        </Grid>
        <Grid size={{ xs: 6, md: 3 }}>
          <StatCard label="Completed Today" value={completed} icon={<DoneAllIcon />} color="#059669" />
        </Grid>
        <Grid size={{ xs: 6, md: 3 }}>
          <StatCard label="Upcoming (all)" value={upcoming?.meta.total ?? 0} icon={<TrendingUpIcon />} color="#7c3aed" hint={pending ? `${pending} pending approval` : undefined} />
        </Grid>
      </Grid>

      <Grid container spacing={2.5} sx={{ mt: 0.5 }}>
        <Grid size={{ xs: 12, lg: 7 }}>
          <Card sx={{ p: { xs: 2, md: 3 }, height: '100%' }}>
            <Stack direction="row" justifyContent="space-between" alignItems="center" sx={{ mb: 2 }}>
              <Typography variant="h6">Today's Schedule</Typography>
              <Chip label={`${todays.length} appointments`} size="small" />
            </Stack>
            {todays.length === 0 ? (
              <EmptyState title="Nothing scheduled today" description="Enjoy the breathing room." icon={<EventNoteIcon sx={{ fontSize: 48 }} />} />
            ) : (
              <Stack spacing={1.25}>
                {todays.map((a) => (
                  <ApptRow key={a.id} appt={a} showDate={false} />
                ))}
              </Stack>
            )}
          </Card>
        </Grid>

        <Grid size={{ xs: 12, lg: 5 }}>
          <Card sx={{ p: { xs: 2, md: 3 }, height: '100%' }}>
            <Stack direction="row" justifyContent="space-between" alignItems="center" sx={{ mb: 2 }}>
              <Typography variant="h6">Upcoming</Typography>
              <Button component={Link} to="/staff/appointments" size="small">
                View all
              </Button>
            </Stack>
            {upcomingList.length === 0 ? (
              <EmptyState title="No upcoming appointments" />
            ) : (
              <Stack spacing={1.25} divider={<Divider flexItem />}>
                {upcomingList.map((a) => (
                  <ApptRow key={a.id} appt={a} showDate />
                ))}
              </Stack>
            )}
          </Card>
        </Grid>
      </Grid>
    </Box>
  );
}

function ApptRow({ appt, showDate }: { appt: Appointment; showDate: boolean }) {
  const meta = STATUS_META[appt.status];
  return (
    <Stack
      direction="row"
      spacing={2}
      alignItems="center"
      component={Link}
      to={`/staff/appointments/${appt.id}`}
      sx={{ textDecoration: 'none', color: 'inherit', p: 1.25, borderRadius: 3, border: '1px solid rgba(15,30,61,0.06)', transition: '.2s', '&:hover': { borderColor: 'primary.main', bgcolor: 'rgba(31,111,235,0.03)' } }}
    >
      <Box sx={{ textAlign: 'center', minWidth: 72 }}>
        <Typography sx={{ fontWeight: 800, color: 'primary.main', lineHeight: 1.15 }}>{formatTime12h(appt.startTime)}</Typography>
        {showDate && (
          <Typography variant="caption" color="text.secondary">
            {formatDate(appt.scheduledDate, { month: 'short', day: 'numeric' })}
          </Typography>
        )}
      </Box>
      <Divider orientation="vertical" flexItem />
      <Avatar sx={{ width: 36, height: 36, bgcolor: 'secondary.main', fontSize: 14 }}>{appt.contactName[0]}</Avatar>
      <Box sx={{ flex: 1, minWidth: 0 }}>
        <Typography component="div" sx={{ fontWeight: 700, display: 'flex', alignItems: 'center', gap: 0.75, minWidth: 0 }} noWrap>
          {appt.contactName}
          {appt.isEmergency && <Chip label="Urgent" color="error" size="small" sx={{ height: 18 }} />}
        </Typography>
        <Typography variant="caption" color="text.secondary" noWrap>
          {appt.treatment?.name ?? 'Consultation'}
        </Typography>
      </Box>
      <Chip label={meta.label} color={meta.color} size="small" />
    </Stack>
  );
}
