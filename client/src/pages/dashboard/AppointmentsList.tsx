import { useState } from 'react';
import { Link } from 'react-router-dom';
import {
  Box,
  Card,
  Chip,
  Stack,
  Tab,
  Tabs,
  TextField,
  Typography,
  MenuItem,
  InputAdornment,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Pagination,
  IconButton,
  useMediaQuery,
  useTheme,
  Avatar,
  Button,
} from '@mui/material';
import Grid from '@mui/material/Grid2';
import SearchIcon from '@mui/icons-material/Search';
import VisibilityIcon from '@mui/icons-material/Visibility';
import { useAppointmentsList, type AppointmentsQuery } from '@/lib/dashboardQueries';
import { APPOINTMENT_STATUSES } from '@/lib/constants';
import { STATUS_META, formatDate, formatTime12h } from '@/lib/format';
import { AppointmentActions } from '@/components/dashboard/AppointmentActions';
import { Loader, EmptyState } from '@/components/ui/States';
import type { Appointment, AppointmentStatus } from '@/lib/types';

const SCOPES: { label: string; value: NonNullable<AppointmentsQuery['scope']> }[] = [
  { label: 'All', value: 'all' },
  { label: 'Today', value: 'today' },
  { label: 'Upcoming', value: 'upcoming' },
  { label: 'Past', value: 'past' },
];

export default function AppointmentsList() {
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down('md'));

  const [scope, setScope] = useState<NonNullable<AppointmentsQuery['scope']>>('all');
  const [status, setStatus] = useState<AppointmentStatus | ''>('');
  const [search, setSearch] = useState('');
  const [page, setPage] = useState(1);

  const { data, isLoading } = useAppointmentsList({
    scope,
    status: status || undefined,
    search: search || undefined,
    page,
    pageSize: 15,
  });

  const resetPage = () => setPage(1);

  return (
    <Box>
      <Typography variant="h4" sx={{ fontWeight: 800, mb: 0.5 }}>
        Appointments
      </Typography>
      <Typography color="text.secondary" sx={{ mb: 3 }}>
        Review, approve, and manage all clinic appointments.
      </Typography>

      <Card sx={{ p: { xs: 2, md: 2.5 }, mb: 2.5 }}>
        <Tabs
          value={scope}
          onChange={(_, v) => { setScope(v); resetPage(); }}
          variant="scrollable"
          scrollButtons="auto"
          sx={{ mb: 2, minHeight: 40 }}
        >
          {SCOPES.map((s) => (
            <Tab key={s.value} label={s.label} value={s.value} sx={{ minHeight: 40, fontWeight: 700 }} />
          ))}
        </Tabs>
        <Grid container spacing={1.5}>
          <Grid size={{ xs: 12, md: 8 }}>
            <TextField
              fullWidth
              size="small"
              placeholder="Search name, mobile, or appointment ID"
              value={search}
              onChange={(e) => { setSearch(e.target.value); resetPage(); }}
              InputProps={{ startAdornment: (<InputAdornment position="start"><SearchIcon fontSize="small" /></InputAdornment>) }}
            />
          </Grid>
          <Grid size={{ xs: 12, md: 4 }}>
            <TextField select fullWidth size="small" label="Status" value={status} onChange={(e) => { setStatus(e.target.value as AppointmentStatus | ''); resetPage(); }}>
              <MenuItem value="">All statuses</MenuItem>
              {APPOINTMENT_STATUSES.map((s) => (
                <MenuItem key={s} value={s}>
                  {STATUS_META[s].label}
                </MenuItem>
              ))}
            </TextField>
          </Grid>
        </Grid>
      </Card>

      <Card sx={{ p: { xs: 1.5, md: 2 } }}>
        {isLoading ? (
          <Loader />
        ) : !data || data.data.length === 0 ? (
          <EmptyState title="No appointments found" description="Try adjusting your filters." />
        ) : isMobile ? (
          <Stack spacing={1.5}>
            {data.data.map((a) => (
              <MobileCard key={a.id} appt={a} />
            ))}
          </Stack>
        ) : (
          <TableContainer>
            <Table>
              <TableHead>
                <TableRow>
                  <TableCell>Patient</TableCell>
                  <TableCell>Code</TableCell>
                  <TableCell>Date & Time</TableCell>
                  <TableCell>Doctor</TableCell>
                  <TableCell>Status</TableCell>
                  <TableCell align="right">Actions</TableCell>
                </TableRow>
              </TableHead>
              <TableBody>
                {data.data.map((a) => (
                  <TableRow key={a.id} hover>
                    <TableCell>
                      <Stack direction="row" spacing={1.5} alignItems="center">
                        <Avatar sx={{ width: 34, height: 34, bgcolor: 'primary.main', fontSize: 13 }}>{a.contactName[0]}</Avatar>
                        <Box>
                          <Typography variant="body2" sx={{ fontWeight: 700 }}>
                            {a.contactName}
                          </Typography>
                          <Typography variant="caption" color="text.secondary">
                            {a.contactPhone}
                          </Typography>
                        </Box>
                      </Stack>
                    </TableCell>
                    <TableCell>
                      <Typography variant="caption" sx={{ fontFamily: 'monospace' }}>
                        {a.appointmentCode}
                      </Typography>
                    </TableCell>
                    <TableCell>
                      <Typography variant="body2">{formatDate(a.scheduledDate)}</Typography>
                      <Typography variant="caption" color="text.secondary">
                        {formatTime12h(a.startTime)}
                      </Typography>
                    </TableCell>
                    <TableCell>
                      <Typography variant="body2">{a.doctor?.fullName}</Typography>
                    </TableCell>
                    <TableCell>
                      <Chip size="small" label={STATUS_META[a.status].label} color={STATUS_META[a.status].color} />
                    </TableCell>
                    <TableCell align="right">
                      <IconButton component={Link} to={`/staff/appointments/${a.id}`} size="small" color="primary">
                        <VisibilityIcon fontSize="small" />
                      </IconButton>
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </TableContainer>
        )}

        {data && data.meta.totalPages > 1 && (
          <Stack alignItems="center" sx={{ mt: 2 }}>
            <Pagination count={data.meta.totalPages} page={page} onChange={(_, p) => setPage(p)} color="primary" />
          </Stack>
        )}
      </Card>
    </Box>
  );
}

function MobileCard({ appt }: { appt: Appointment }) {
  return (
    <Card variant="outlined" sx={{ p: 2 }}>
      <Stack direction="row" justifyContent="space-between" alignItems="flex-start" sx={{ mb: 1 }}>
        <Box>
          <Typography sx={{ fontWeight: 700 }}>{appt.contactName}</Typography>
          <Typography variant="caption" color="text.secondary">
            {appt.appointmentCode}
          </Typography>
        </Box>
        <Chip size="small" label={STATUS_META[appt.status].label} color={STATUS_META[appt.status].color} />
      </Stack>
      <Typography variant="body2" color="text.secondary" sx={{ mb: 1.5 }}>
        {formatDate(appt.scheduledDate)} · {formatTime12h(appt.startTime)} · {appt.doctor?.fullName}
      </Typography>
      <Stack direction="row" spacing={1} sx={{ mb: 1.5 }}>
        <Button component={Link} to={`/staff/appointments/${appt.id}`} size="small" variant="outlined" startIcon={<VisibilityIcon />}>
          Details
        </Button>
      </Stack>
      <AppointmentActions appointment={appt} />
    </Card>
  );
}
