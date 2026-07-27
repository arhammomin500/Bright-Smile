import { useParams, Link, useNavigate } from 'react-router-dom';
import {
  Box,
  Card,
  Chip,
  Stack,
  Typography,
  Button,
  Divider,
  Avatar,
} from '@mui/material';
import Grid from '@mui/material/Grid2';
import ArrowBackIcon from '@mui/icons-material/ArrowBack';
import PersonIcon from '@mui/icons-material/Person';
import DescriptionIcon from '@mui/icons-material/Description';
import HistoryIcon from '@mui/icons-material/History';
import CircleIcon from '@mui/icons-material/Circle';
import LaunchIcon from '@mui/icons-material/Launch';
import { useAppointment } from '@/lib/dashboardQueries';
import { AppointmentActions } from '@/components/dashboard/AppointmentActions';
import { Loader, EmptyState } from '@/components/ui/States';
import { STATUS_META, formatDateLong, formatTime12h, formatDate } from '@/lib/format';

export default function AppointmentDetail() {
  const { id } = useParams();
  const navigate = useNavigate();
  const { data: appt, isLoading } = useAppointment(id);

  if (isLoading) return <Loader label="Loading appointment…" minHeight="60vh" />;
  if (!appt) return <EmptyState title="Appointment not found" action={<Button component={Link} to="/staff/appointments">Back to list</Button>} />;

  const meta = STATUS_META[appt.status];

  return (
    <Box>
      <Button startIcon={<ArrowBackIcon />} onClick={() => navigate('/staff/appointments')} sx={{ mb: 2 }}>
        Back to appointments
      </Button>

      <Grid container spacing={2.5}>
        {/* Main */}
        <Grid size={{ xs: 12, md: 8 }}>
          <Card sx={{ p: { xs: 2.5, md: 3 }, mb: 2.5 }}>
            <Stack direction={{ xs: 'column', sm: 'row' }} justifyContent="space-between" alignItems={{ sm: 'center' }} spacing={2} sx={{ mb: 3 }}>
              <Box>
                <Stack direction="row" spacing={1} alignItems="center">
                  <Typography variant="h5" sx={{ fontWeight: 800 }}>
                    {appt.appointmentCode}
                  </Typography>
                  {appt.isEmergency && <Chip label="Urgent" color="error" size="small" />}
                </Stack>
                <Typography color="text.secondary">Booked {formatDate(appt.createdAt)} · via {appt.source}</Typography>
              </Box>
              <Chip label={meta.label} color={meta.color} sx={{ fontWeight: 700, py: 2.2, px: 1 }} />
            </Stack>

            <Grid container spacing={2}>
              <Info label="Date" value={formatDateLong(appt.scheduledDate)} />
              <Info label="Time" value={`${formatTime12h(appt.startTime)} – ${formatTime12h(appt.endTime)}`} />
              <Info label="Doctor" value={appt.doctor?.fullName ?? '—'} />
              <Info label="Treatment" value={appt.treatment?.name ?? 'General consultation'} />
            </Grid>

            {appt.reason && (
              <Box sx={{ mt: 2 }}>
                <Typography variant="caption" color="text.secondary">
                  Reason for visit
                </Typography>
                <Typography>{appt.reason}</Typography>
              </Box>
            )}
            {appt.medicalNotes && (
              <Box sx={{ mt: 2 }}>
                <Typography variant="caption" color="text.secondary">
                  Medical notes
                </Typography>
                <Typography>{appt.medicalNotes}</Typography>
              </Box>
            )}

            <Divider sx={{ my: 3 }} />
            <Typography variant="subtitle1" sx={{ fontWeight: 700, mb: 1.5 }}>
              Actions
            </Typography>
            <AppointmentActions appointment={appt} size="medium" />
          </Card>

          {/* Documents */}
          {appt.documents && appt.documents.length > 0 && (
            <Card sx={{ p: { xs: 2.5, md: 3 }, mb: 2.5 }}>
              <Stack direction="row" spacing={1} alignItems="center" sx={{ mb: 2 }}>
                <DescriptionIcon color="primary" />
                <Typography variant="h6">Uploaded Reports</Typography>
              </Stack>
              <Stack spacing={1}>
                {appt.documents.map((d) => (
                  <Stack key={d.id} direction="row" alignItems="center" spacing={1.5} sx={{ p: 1.5, borderRadius: 2, bgcolor: 'rgba(31,111,235,0.05)' }}>
                    <DescriptionIcon fontSize="small" color="primary" />
                    <Typography variant="body2" sx={{ flex: 1 }} noWrap>
                      {d.title}
                    </Typography>
                    <Button component="a" href={d.filePath} target="_blank" rel="noopener noreferrer" size="small" endIcon={<LaunchIcon />}>
                      Open
                    </Button>
                  </Stack>
                ))}
              </Stack>
            </Card>
          )}
        </Grid>

        {/* Sidebar */}
        <Grid size={{ xs: 12, md: 4 }}>
          {/* Patient */}
          <Card sx={{ p: 3, mb: 2.5 }}>
            <Stack direction="row" spacing={1} alignItems="center" sx={{ mb: 2 }}>
              <PersonIcon color="primary" />
              <Typography variant="h6">Patient</Typography>
            </Stack>
            <Stack direction="row" spacing={2} alignItems="center" sx={{ mb: 2 }}>
              <Avatar sx={{ width: 52, height: 52, bgcolor: 'primary.main' }}>{appt.contactName[0]}</Avatar>
              <Box>
                <Typography sx={{ fontWeight: 700 }}>{appt.contactName}</Typography>
                <Typography variant="body2" color="text.secondary">
                  {appt.contactPhone}
                </Typography>
                {appt.contactEmail && (
                  <Typography variant="body2" color="text.secondary">
                    {appt.contactEmail}
                  </Typography>
                )}
              </Box>
            </Stack>
            {appt.patient && (
              <Button component={Link} to={`/staff/patients/${appt.patient.id}`} fullWidth variant="outlined" size="small">
                View Patient Record ({appt.patient.patientCode})
              </Button>
            )}
          </Card>

          {/* Status history */}
          <Card sx={{ p: 3 }}>
            <Stack direction="row" spacing={1} alignItems="center" sx={{ mb: 2 }}>
              <HistoryIcon color="primary" />
              <Typography variant="h6">Timeline</Typography>
            </Stack>
            <Stack spacing={0}>
              {(appt.statusHistory ?? []).map((h, i, arr) => (
                <Stack key={h.id} direction="row" spacing={1.5}>
                  <Stack alignItems="center">
                    <CircleIcon sx={{ fontSize: 12, color: i === 0 ? 'primary.main' : 'grey.400', mt: 0.5 }} />
                    {i < arr.length - 1 && <Box sx={{ width: 2, flex: 1, bgcolor: 'grey.200', my: 0.5 }} />}
                  </Stack>
                  <Box sx={{ pb: 2.5 }}>
                    <Typography variant="body2" sx={{ fontWeight: 700 }}>
                      {h.toStatus}
                    </Typography>
                    {h.note && (
                      <Typography variant="body2" color="text.secondary">
                        {h.note}
                      </Typography>
                    )}
                    <Typography variant="caption" color="text.disabled">
                      {formatDate(h.createdAt, { month: 'short', day: 'numeric', hour: 'numeric', minute: '2-digit' })}
                    </Typography>
                  </Box>
                </Stack>
              ))}
            </Stack>
          </Card>
        </Grid>
      </Grid>
    </Box>
  );
}

function Info({ label, value }: { label: string; value: string }) {
  return (
    <Grid size={{ xs: 6 }}>
      <Typography variant="caption" color="text.secondary">
        {label}
      </Typography>
      <Typography sx={{ fontWeight: 600 }}>{value}</Typography>
    </Grid>
  );
}
