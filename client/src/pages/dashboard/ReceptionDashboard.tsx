import { Box, Card, Chip, Stack, Typography, Button, Avatar, Divider } from '@mui/material';
import Grid from '@mui/material/Grid2';
import { Link } from 'react-router-dom';
import EventNoteIcon from '@mui/icons-material/EventNote';
import PendingActionsIcon from '@mui/icons-material/PendingActions';
import GroupAddIcon from '@mui/icons-material/GroupAdd';
import PeopleIcon from '@mui/icons-material/People';
import TrendingUpIcon from '@mui/icons-material/TrendingUp';
import ArrowForwardIcon from '@mui/icons-material/ArrowForward';
import { PieChart } from '@mui/x-charts/PieChart';
import { BarChart } from '@mui/x-charts/BarChart';
import { StatCard } from '@/components/dashboard/StatCard';
import { Loader, EmptyState } from '@/components/ui/States';
import { useDashboard } from '@/lib/dashboardQueries';
import { STATUS_META, formatTime12h } from '@/lib/format';
import { useAuth } from '@/auth/AuthContext';
import type { Appointment } from '@/lib/types';

export default function ReceptionDashboard() {
  const { data, isLoading } = useDashboard();
  const { user } = useAuth();

  if (isLoading || !data) return <Loader label="Loading dashboard…" minHeight="60vh" />;

  const t = data.today;
  const statusData = [
    { id: 0, value: t.confirmed, label: 'Confirmed', color: '#16a34a' },
    { id: 1, value: t.pending, label: 'Pending', color: '#d97706' },
    { id: 2, value: t.completed, label: 'Completed', color: '#059669' },
    { id: 3, value: t.cancelled, label: 'Cancelled', color: '#dc2626' },
    { id: 4, value: t.noShow, label: 'No Show', color: '#64748b' },
  ].filter((s) => s.value > 0);

  // Group recent bookings by weekday label for a small trend bar chart.
  const byDay = new Map<string, number>();
  data.recentBookings.forEach((b) => {
    const d = new Date(b.scheduledDate + 'T00:00:00').toLocaleDateString('en-US', { weekday: 'short' });
    byDay.set(d, (byDay.get(d) ?? 0) + 1);
  });
  const trendLabels = [...byDay.keys()];
  const trendValues = [...byDay.values()];

  return (
    <Box>
      <Stack direction={{ xs: 'column', sm: 'row' }} justifyContent="space-between" alignItems={{ sm: 'center' }} spacing={2} sx={{ mb: 3 }}>
        <Box>
          <Typography variant="h4" sx={{ fontWeight: 800 }}>
            Good day, {user?.firstName} 👋
          </Typography>
          <Typography color="text.secondary">Here's what's happening at the clinic today.</Typography>
        </Box>
        <Button component={Link} to="/staff/appointments" variant="contained" endIcon={<ArrowForwardIcon />}>
          Manage Appointments
        </Button>
      </Stack>

      {/* Stat cards */}
      <Grid container spacing={2.5} sx={{ mb: 1 }}>
        <Grid size={{ xs: 6, md: 3 }}>
          <StatCard label="Today's Appointments" value={t.total} icon={<EventNoteIcon />} color="#1f6feb" />
        </Grid>
        <Grid size={{ xs: 6, md: 3 }}>
          <StatCard label="Pending Approvals" value={data.pendingApprovals} icon={<PendingActionsIcon />} color="#d97706" hint="Awaiting confirmation" />
        </Grid>
        <Grid size={{ xs: 6, md: 3 }}>
          <StatCard label="Upcoming (7 days)" value={data.upcomingWeek} icon={<TrendingUpIcon />} color="#059669" />
        </Grid>
        <Grid size={{ xs: 6, md: 3 }}>
          <StatCard label="New Patients (month)" value={data.newPatientsThisMonth} icon={<GroupAddIcon />} color="#7c3aed" hint={`${data.totalPatients} total`} />
        </Grid>
      </Grid>

      <Grid container spacing={2.5} sx={{ mt: 0.5 }}>
        {/* Today's board */}
        <Grid size={{ xs: 12, lg: 8 }}>
          <Card sx={{ p: { xs: 2, md: 3 }, height: '100%' }}>
            <Stack direction="row" justifyContent="space-between" alignItems="center" sx={{ mb: 2 }}>
              <Typography variant="h6">Today's Schedule</Typography>
              <Chip label={`${data.todaysBoard.length} appointments`} size="small" />
            </Stack>
            {data.todaysBoard.length === 0 ? (
              <EmptyState title="No appointments today" description="Enjoy the calm — or add a walk-in." icon={<EventNoteIcon sx={{ fontSize: 48 }} />} />
            ) : (
              <Stack spacing={1.25}>
                {data.todaysBoard.map((a) => (
                  <BoardRow key={a.id} appt={a} />
                ))}
              </Stack>
            )}
          </Card>
        </Grid>

        {/* Charts */}
        <Grid size={{ xs: 12, lg: 4 }}>
          <Stack spacing={2.5}>
            <Card sx={{ p: 3 }}>
              <Typography variant="h6" sx={{ mb: 1 }}>
                Today by Status
              </Typography>
              {statusData.length ? (
                <PieChart
                  series={[{ data: statusData, innerRadius: 45, paddingAngle: 2, cornerRadius: 4 }]}
                  height={220}
                  slotProps={{ legend: { direction: 'row', position: { vertical: 'bottom', horizontal: 'middle' }, padding: 0 } }}
                />
              ) : (
                <EmptyState title="No data yet" />
              )}
            </Card>
            <Card sx={{ p: 3 }}>
              <Typography variant="h6" sx={{ mb: 1 }}>
                Recent Booking Trend
              </Typography>
              {trendValues.length ? (
                <BarChart
                  xAxis={[{ scaleType: 'band', data: trendLabels }]}
                  series={[{ data: trendValues, color: '#1f6feb' }]}
                  height={200}
                />
              ) : (
                <EmptyState title="No recent bookings" />
              )}
            </Card>
          </Stack>
        </Grid>
      </Grid>

      {/* Recent bookings */}
      <Card sx={{ p: { xs: 2, md: 3 }, mt: 2.5 }}>
        <Typography variant="h6" sx={{ mb: 2 }}>
          Latest Requests
        </Typography>
        <Stack spacing={1.25} divider={<Divider flexItem />}>
          {data.recentBookings.slice(0, 6).map((a) => (
            <Stack key={a.id} direction="row" alignItems="center" spacing={2} component={Link} to={`/staff/appointments/${a.id}`} sx={{ textDecoration: 'none', color: 'inherit', py: 0.5 }}>
              <Avatar sx={{ bgcolor: 'primary.main', width: 38, height: 38, fontSize: 14 }}>{a.contactName[0]}</Avatar>
              <Box sx={{ flex: 1, minWidth: 0 }}>
                <Typography sx={{ fontWeight: 600 }} noWrap>
                  {a.contactName}
                </Typography>
                <Typography variant="caption" color="text.secondary" noWrap>
                  {a.appointmentCode} · {a.treatment?.name ?? 'Consultation'}
                </Typography>
              </Box>
              <Chip label={STATUS_META[a.status].label} color={STATUS_META[a.status].color} size="small" />
            </Stack>
          ))}
        </Stack>
      </Card>
    </Box>
  );
}

function BoardRow({ appt }: { appt: Appointment }) {
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
      <Box sx={{ textAlign: 'center', minWidth: 68 }}>
        <Typography sx={{ fontWeight: 800, color: 'primary.main', lineHeight: 1 }}>{formatTime12h(appt.startTime)}</Typography>
      </Box>
      <Divider orientation="vertical" flexItem />
      <Box sx={{ flex: 1, minWidth: 0 }}>
        <Typography component="div" sx={{ fontWeight: 700, display: 'flex', alignItems: 'center', gap: 0.75, minWidth: 0 }} noWrap>
          {appt.contactName} {appt.isEmergency && <Chip label="Urgent" color="error" size="small" sx={{ height: 18 }} />}
        </Typography>
        <Typography variant="caption" color="text.secondary" noWrap>
          {appt.treatment?.name ?? 'Consultation'} · {appt.doctor?.fullName}
        </Typography>
      </Box>
      <Chip label={meta.label} color={meta.color} size="small" />
    </Stack>
  );
}
