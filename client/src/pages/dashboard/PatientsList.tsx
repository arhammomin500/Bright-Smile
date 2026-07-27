import { useState } from 'react';
import { Link } from 'react-router-dom';
import {
  Box,
  Button,
  Card,
  Stack,
  TextField,
  Typography,
  InputAdornment,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Pagination,
  Avatar,
  Chip,
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  MenuItem,
  IconButton,
} from '@mui/material';
import Grid from '@mui/material/Grid2';
import SearchIcon from '@mui/icons-material/Search';
import PersonAddIcon from '@mui/icons-material/PersonAdd';
import VisibilityIcon from '@mui/icons-material/Visibility';
import { usePatients, useCreatePatient, type PatientRow } from '@/lib/dashboardQueries';
import { Loader, EmptyState } from '@/components/ui/States';
import { useToast } from '@/components/feedback/ToastProvider';
import { errorMessage } from '@/lib/api';
import { formatDate } from '@/lib/format';
import { GENDERS, BLOOD_GROUPS } from '@/lib/constants';

export default function PatientsList() {
  const [search, setSearch] = useState('');
  const [page, setPage] = useState(1);
  const [open, setOpen] = useState(false);
  const { data, isLoading } = usePatients(search, page);

  return (
    <Box>
      <Stack direction={{ xs: 'column', sm: 'row' }} justifyContent="space-between" alignItems={{ sm: 'center' }} spacing={2} sx={{ mb: 3 }}>
        <Box>
          <Typography variant="h4" sx={{ fontWeight: 800 }}>
            Patients
          </Typography>
          <Typography color="text.secondary">Search and manage patient records.</Typography>
        </Box>
        <Button variant="contained" startIcon={<PersonAddIcon />} onClick={() => setOpen(true)}>
          Register Patient
        </Button>
      </Stack>

      <Card sx={{ p: { xs: 1.5, md: 2.5 } }}>
        <TextField
          fullWidth
          size="small"
          placeholder="Search by name, mobile, email, or patient ID"
          value={search}
          onChange={(e) => { setSearch(e.target.value); setPage(1); }}
          InputProps={{ startAdornment: (<InputAdornment position="start"><SearchIcon fontSize="small" /></InputAdornment>) }}
          sx={{ mb: 2 }}
        />
        {isLoading ? (
          <Loader />
        ) : !data || data.data.length === 0 ? (
          <EmptyState title="No patients found" />
        ) : (
          <TableContainer>
            <Table>
              <TableHead>
                <TableRow>
                  <TableCell>Patient</TableCell>
                  <TableCell>Patient ID</TableCell>
                  <TableCell>Mobile</TableCell>
                  <TableCell>City</TableCell>
                  <TableCell>Registered</TableCell>
                  <TableCell align="right" />
                </TableRow>
              </TableHead>
              <TableBody>
                {data.data.map((p: PatientRow) => (
                  <TableRow key={p.id} hover>
                    <TableCell>
                      <Stack direction="row" spacing={1.5} alignItems="center">
                        <Avatar sx={{ width: 34, height: 34, bgcolor: 'secondary.main', fontSize: 13 }}>{p.firstName[0]}{p.lastName[0]}</Avatar>
                        <Box>
                          <Typography variant="body2" sx={{ fontWeight: 700 }}>
                            {p.fullName}
                          </Typography>
                          {p.gender && <Chip label={p.gender} size="small" variant="outlined" sx={{ height: 18, fontSize: 10 }} />}
                        </Box>
                      </Stack>
                    </TableCell>
                    <TableCell>
                      <Typography variant="caption" sx={{ fontFamily: 'monospace' }}>
                        {p.patientCode}
                      </Typography>
                    </TableCell>
                    <TableCell>{p.mobile}</TableCell>
                    <TableCell>{p.city ?? '—'}</TableCell>
                    <TableCell>{formatDate(p.createdAt)}</TableCell>
                    <TableCell align="right">
                      <IconButton component={Link} to={`/staff/patients/${p.id}`} size="small" color="primary">
                        <VisibilityIcon fontSize="small" />
                      </IconButton>
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </TableContainer>
        )}
        {data && data.meta && data.meta.totalPages > 1 && (
          <Stack alignItems="center" sx={{ mt: 2 }}>
            <Pagination count={data.meta.totalPages} page={page} onChange={(_, p) => setPage(p)} color="primary" />
          </Stack>
        )}
      </Card>

      <RegisterPatientDialog open={open} onClose={() => setOpen(false)} />
    </Box>
  );
}

function RegisterPatientDialog({ open, onClose }: { open: boolean; onClose: () => void }) {
  const toast = useToast();
  const create = useCreatePatient();
  const [form, setForm] = useState({ firstName: '', lastName: '', mobile: '', email: '', dob: '', gender: '', bloodGroup: '', city: '', address: '' });
  const set = (k: string, v: string) => setForm((f) => ({ ...f, [k]: v }));

  const submit = () => {
    create.mutate(
      {
        ...form,
        email: form.email || undefined,
        dob: form.dob || undefined,
        gender: form.gender || undefined,
        bloodGroup: form.bloodGroup || undefined,
      },
      {
        onSuccess: () => {
          toast.success('Patient registered');
          setForm({ firstName: '', lastName: '', mobile: '', email: '', dob: '', gender: '', bloodGroup: '', city: '', address: '' });
          onClose();
        },
        onError: (e) => toast.error(errorMessage(e)),
      },
    );
  };

  const valid = form.firstName && form.lastName && form.mobile.length >= 6;

  return (
    <Dialog open={open} onClose={onClose} maxWidth="sm" fullWidth PaperProps={{ sx: { borderRadius: 4 } }}>
      <DialogTitle sx={{ fontWeight: 700 }}>Register New Patient</DialogTitle>
      <DialogContent>
        <Grid container spacing={2} sx={{ mt: 0 }}>
          <Grid size={6}><TextField label="First name" fullWidth value={form.firstName} onChange={(e) => set('firstName', e.target.value)} required /></Grid>
          <Grid size={6}><TextField label="Last name" fullWidth value={form.lastName} onChange={(e) => set('lastName', e.target.value)} required /></Grid>
          <Grid size={6}><TextField label="Mobile" fullWidth value={form.mobile} onChange={(e) => set('mobile', e.target.value)} required /></Grid>
          <Grid size={6}><TextField label="Email" fullWidth value={form.email} onChange={(e) => set('email', e.target.value)} /></Grid>
          <Grid size={6}><TextField label="Date of birth" type="date" InputLabelProps={{ shrink: true }} fullWidth value={form.dob} onChange={(e) => set('dob', e.target.value)} /></Grid>
          <Grid size={3}>
            <TextField select label="Gender" fullWidth value={form.gender} onChange={(e) => set('gender', e.target.value)}>
              <MenuItem value="">—</MenuItem>
              {GENDERS.map((g) => <MenuItem key={g} value={g}>{g}</MenuItem>)}
            </TextField>
          </Grid>
          <Grid size={3}>
            <TextField select label="Blood" fullWidth value={form.bloodGroup} onChange={(e) => set('bloodGroup', e.target.value)}>
              <MenuItem value="">—</MenuItem>
              {BLOOD_GROUPS.map((g) => <MenuItem key={g} value={g}>{g}</MenuItem>)}
            </TextField>
          </Grid>
          <Grid size={6}><TextField label="City" fullWidth value={form.city} onChange={(e) => set('city', e.target.value)} /></Grid>
          <Grid size={6}><TextField label="Address" fullWidth value={form.address} onChange={(e) => set('address', e.target.value)} /></Grid>
        </Grid>
      </DialogContent>
      <DialogActions sx={{ px: 3, pb: 2 }}>
        <Button onClick={onClose}>Cancel</Button>
        <Button variant="contained" onClick={submit} disabled={!valid || create.isPending}>
          Register
        </Button>
      </DialogActions>
    </Dialog>
  );
}
