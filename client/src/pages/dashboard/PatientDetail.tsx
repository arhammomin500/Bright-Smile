import { useState } from 'react';
import { useParams, Link, useNavigate } from 'react-router-dom';
import {
  Box,
  Card,
  Chip,
  Stack,
  Typography,
  Button,
  Tab,
  Tabs,
  Avatar,
  Divider,
} from '@mui/material';
import Grid from '@mui/material/Grid2';
import ArrowBackIcon from '@mui/icons-material/ArrowBack';
import { usePatientDetail } from '@/lib/dashboardQueries';
import { Loader, EmptyState } from '@/components/ui/States';
import { STATUS_META, formatDate, formatTime12h } from '@/lib/format';

export default function PatientDetail() {
  const { id } = useParams();
  const navigate = useNavigate();
  const { data: p, isLoading } = usePatientDetail(id);
  const [tab, setTab] = useState(0);

  if (isLoading) return <Loader label="Loading patient…" minHeight="60vh" />;
  if (!p) return <EmptyState title="Patient not found" action={<Button component={Link} to="/staff/patients">Back</Button>} />;

  const m = p.medicalProfile ?? {};

  return (
    <Box>
      <Button startIcon={<ArrowBackIcon />} onClick={() => navigate('/staff/patients')} sx={{ mb: 2 }}>
        Back to patients
      </Button>

      {/* Header */}
      <Card sx={{ p: { xs: 2.5, md: 3 }, mb: 2.5 }}>
        <Stack direction={{ xs: 'column', sm: 'row' }} spacing={2.5} alignItems={{ sm: 'center' }}>
          <Avatar sx={{ width: 72, height: 72, bgcolor: 'primary.main', fontSize: 26 }}>
            {p.firstName[0]}
            {p.lastName[0]}
          </Avatar>
          <Box sx={{ flex: 1 }}>
            <Typography variant="h5" sx={{ fontWeight: 800 }}>
              {p.fullName}
            </Typography>
            <Stack direction="row" spacing={1} flexWrap="wrap" useFlexGap sx={{ mt: 0.5 }}>
              <Chip label={p.patientCode} size="small" sx={{ fontFamily: 'monospace' }} />
              {p.gender && <Chip label={p.gender} size="small" variant="outlined" />}
              {p.bloodGroup && <Chip label={p.bloodGroup} size="small" color="error" variant="outlined" />}
              {p.dob && <Chip label={`DOB ${formatDate(p.dob)}`} size="small" variant="outlined" />}
            </Stack>
          </Box>
          <Stack spacing={0.5} sx={{ textAlign: { sm: 'right' } }}>
            <Typography variant="body2" color="text.secondary">
              {p.mobile}
            </Typography>
            {p.email && (
              <Typography variant="body2" color="text.secondary">
                {p.email}
              </Typography>
            )}
            {p.city && (
              <Typography variant="body2" color="text.secondary">
                {p.city}
              </Typography>
            )}
          </Stack>
        </Stack>
      </Card>

      <Card sx={{ p: { xs: 1.5, md: 2.5 } }}>
        <Tabs value={tab} onChange={(_, v) => setTab(v)} variant="scrollable" scrollButtons="auto" sx={{ mb: 2 }}>
          <Tab label="Medical Profile" sx={{ fontWeight: 700 }} />
          <Tab label={`Appointments (${p.appointments?.length ?? 0})`} sx={{ fontWeight: 700 }} />
          <Tab label={`Documents (${p.documents?.length ?? 0})`} sx={{ fontWeight: 700 }} />
          <Tab label="Billing" sx={{ fontWeight: 700 }} />
        </Tabs>

        {tab === 0 && (
          <Grid container spacing={2}>
            <MedField label="Medical History" value={m.medicalHistory} />
            <MedField label="Allergies" value={m.allergies} />
            <MedField label="Current Medications" value={m.currentMedications} />
            <MedField label="Dental History" value={m.dentalHistory} />
            <MedField label="Previous Treatments" value={m.previousTreatments} />
            <MedField label="Chronic Diseases" value={m.chronicDiseases} />
          </Grid>
        )}

        {tab === 1 && (
          <Stack spacing={1.25} divider={<Divider flexItem />}>
            {(p.appointments ?? []).length === 0 ? (
              <EmptyState title="No appointments yet" />
            ) : (
              p.appointments.map((a: any) => (
                <Stack key={a.id} direction="row" alignItems="center" spacing={2} component={Link} to={`/staff/appointments/${a.id}`} sx={{ textDecoration: 'none', color: 'inherit', py: 0.5 }}>
                  <Box sx={{ minWidth: 90 }}>
                    <Typography variant="body2" sx={{ fontWeight: 700 }}>
                      {formatDate(a.scheduledDate)}
                    </Typography>
                    <Typography variant="caption" color="text.secondary">
                      {formatTime12h(a.startTime)}
                    </Typography>
                  </Box>
                  <Box sx={{ flex: 1, minWidth: 0 }}>
                    <Typography variant="body2" sx={{ fontWeight: 600 }} noWrap>
                      {a.treatment?.name ?? 'Consultation'}
                    </Typography>
                    <Typography variant="caption" color="text.secondary">
                      {a.doctor?.fullName}
                    </Typography>
                  </Box>
                  <Chip size="small" label={STATUS_META[a.status as keyof typeof STATUS_META]?.label ?? a.status} color={STATUS_META[a.status as keyof typeof STATUS_META]?.color ?? 'default'} />
                </Stack>
              ))
            )}
          </Stack>
        )}

        {tab === 2 && (
          <Stack spacing={1}>
            {(p.documents ?? []).length === 0 ? (
              <EmptyState title="No documents" />
            ) : (
              p.documents.map((d: any) => (
                <Stack key={d.id} direction="row" alignItems="center" spacing={1.5} sx={{ p: 1.5, borderRadius: 2, bgcolor: 'rgba(31,111,235,0.05)' }}>
                  <Chip label={d.type} size="small" />
                  <Typography variant="body2" sx={{ flex: 1 }} noWrap>
                    {d.title}
                  </Typography>
                  <Button component="a" href={d.url} target="_blank" rel="noopener noreferrer" size="small">
                    Open
                  </Button>
                </Stack>
              ))
            )}
          </Stack>
        )}

        {tab === 3 && (
          <>
            {(p.invoices ?? []).length === 0 ? (
              <EmptyState title="No invoices" description="Billing records will appear here." />
            ) : (
              <Stack spacing={1.25} divider={<Divider flexItem />}>
                {p.invoices.map((inv: any) => (
                  <Stack key={inv.id} direction="row" justifyContent="space-between" alignItems="center">
                    <Box>
                      <Typography variant="body2" sx={{ fontWeight: 700 }}>
                        {inv.invoiceNo}
                      </Typography>
                      <Typography variant="caption" color="text.secondary">
                        {formatDate(inv.createdAt)}
                      </Typography>
                    </Box>
                    <Chip label={inv.status} size="small" color={inv.status === 'PAID' ? 'success' : 'warning'} />
                  </Stack>
                ))}
              </Stack>
            )}
          </>
        )}
      </Card>
    </Box>
  );
}

function MedField({ label, value }: { label: string; value?: string | null }) {
  return (
    <Grid size={{ xs: 12, sm: 6 }}>
      <Box sx={{ p: 2, borderRadius: 3, bgcolor: 'rgba(15,30,61,0.02)', border: '1px solid rgba(15,30,61,0.06)', height: '100%' }}>
        <Typography variant="caption" color="text.secondary" sx={{ fontWeight: 700, textTransform: 'uppercase', letterSpacing: 0.5 }}>
          {label}
        </Typography>
        <Typography variant="body2" sx={{ mt: 0.5 }}>
          {value || '—'}
        </Typography>
      </Box>
    </Grid>
  );
}
