import { useState } from 'react';
import {
  Box,
  Button,
  Card,
  Chip,
  Stack,
  TextField,
  Typography,
  MenuItem,
  IconButton,
  Divider,
} from '@mui/material';
import Grid from '@mui/material/Grid2';
import DeleteOutlineIcon from '@mui/icons-material/DeleteOutline';
import AddIcon from '@mui/icons-material/Add';
import EventBusyIcon from '@mui/icons-material/EventBusy';
import BeachAccessIcon from '@mui/icons-material/BeachAccess';
import BlockIcon from '@mui/icons-material/Block';
import { useQueryClient } from '@tanstack/react-query';
import { useHolidays, useLeaves, useBlocks } from '@/lib/dashboardQueries';
import { useDoctors } from '@/lib/queries';
import { apiPost, apiDelete, errorMessage } from '@/lib/api';
import { useToast } from '@/components/feedback/ToastProvider';
import { Loader, EmptyState } from '@/components/ui/States';
import { formatDate } from '@/lib/format';

export default function SlotManagement() {
  return (
    <Box>
      <Typography variant="h4" sx={{ fontWeight: 800, mb: 0.5 }}>
        Slot Management
      </Typography>
      <Typography color="text.secondary" sx={{ mb: 3 }}>
        Control availability with holidays, doctor leave, and blocked time slots.
      </Typography>

      <Grid container spacing={2.5}>
        <Grid size={{ xs: 12, lg: 4 }}>
          <HolidaysCard />
        </Grid>
        <Grid size={{ xs: 12, lg: 4 }}>
          <LeavesCard />
        </Grid>
        <Grid size={{ xs: 12, lg: 4 }}>
          <BlocksCard />
        </Grid>
      </Grid>
    </Box>
  );
}

// ── Holidays ──────────────────────────────────────────────────────────
function HolidaysCard() {
  const toast = useToast();
  const qc = useQueryClient();
  const { data, isLoading } = useHolidays();
  const [date, setDate] = useState('');
  const [name, setName] = useState('');

  const add = async () => {
    try {
      await apiPost('/slots/holidays', { date, name });
      toast.success('Holiday added');
      setDate('');
      setName('');
      qc.invalidateQueries({ queryKey: ['holidays'] });
    } catch (e) {
      toast.error(errorMessage(e));
    }
  };
  const remove = async (id: number) => {
    await apiDelete(`/slots/holidays/${id}`);
    qc.invalidateQueries({ queryKey: ['holidays'] });
  };

  return (
    <Card sx={{ p: 3, height: '100%' }}>
      <Stack direction="row" spacing={1} alignItems="center" sx={{ mb: 2 }}>
        <EventBusyIcon color="primary" />
        <Typography variant="h6">Clinic Holidays</Typography>
      </Stack>
      <Stack spacing={1.5} sx={{ mb: 2 }}>
        <TextField size="small" type="date" label="Date" InputLabelProps={{ shrink: true }} value={date} onChange={(e) => setDate(e.target.value)} />
        <TextField size="small" label="Name" value={name} onChange={(e) => setName(e.target.value)} />
        <Button variant="contained" startIcon={<AddIcon />} onClick={add} disabled={!date || !name}>
          Add Holiday
        </Button>
      </Stack>
      <Divider sx={{ mb: 1.5 }} />
      {isLoading ? (
        <Loader minHeight={100} />
      ) : (data ?? []).length === 0 ? (
        <EmptyState title="No holidays" />
      ) : (
        <Stack spacing={1}>
          {data!.map((h: any) => (
            <Stack key={h.id} direction="row" alignItems="center" spacing={1} sx={{ p: 1, borderRadius: 2, bgcolor: 'rgba(15,30,61,0.03)' }}>
              <Box sx={{ flex: 1 }}>
                <Typography variant="body2" sx={{ fontWeight: 600 }}>
                  {h.name}
                </Typography>
                <Typography variant="caption" color="text.secondary">
                  {formatDate(h.date)}
                </Typography>
              </Box>
              <IconButton size="small" color="error" onClick={() => remove(h.id)}>
                <DeleteOutlineIcon fontSize="small" />
              </IconButton>
            </Stack>
          ))}
        </Stack>
      )}
    </Card>
  );
}

// ── Doctor leave ──────────────────────────────────────────────────────
function LeavesCard() {
  const toast = useToast();
  const qc = useQueryClient();
  const { data: doctors } = useDoctors();
  const { data, isLoading } = useLeaves();
  const [doctorId, setDoctorId] = useState<number | ''>('');
  const [startDate, setStartDate] = useState('');
  const [endDate, setEndDate] = useState('');

  const add = async () => {
    try {
      await apiPost('/slots/leaves', { doctorId, startDate, endDate });
      toast.success('Leave added');
      setStartDate('');
      setEndDate('');
      qc.invalidateQueries({ queryKey: ['leaves'] });
    } catch (e) {
      toast.error(errorMessage(e));
    }
  };
  const remove = async (id: number) => {
    await apiDelete(`/slots/leaves/${id}`);
    qc.invalidateQueries({ queryKey: ['leaves'] });
  };
  const doctorName = (id: number) => doctors?.find((d) => d.id === id)?.fullName ?? `Doctor #${id}`;

  return (
    <Card sx={{ p: 3, height: '100%' }}>
      <Stack direction="row" spacing={1} alignItems="center" sx={{ mb: 2 }}>
        <BeachAccessIcon color="primary" />
        <Typography variant="h6">Doctor Leave</Typography>
      </Stack>
      <Stack spacing={1.5} sx={{ mb: 2 }}>
        <TextField select size="small" label="Doctor" value={doctorId} onChange={(e) => setDoctorId(Number(e.target.value))}>
          {(doctors ?? []).map((d) => (
            <MenuItem key={d.id} value={d.id}>
              {d.fullName}
            </MenuItem>
          ))}
        </TextField>
        <TextField size="small" type="date" label="From" InputLabelProps={{ shrink: true }} value={startDate} onChange={(e) => setStartDate(e.target.value)} />
        <TextField size="small" type="date" label="To" InputLabelProps={{ shrink: true }} value={endDate} onChange={(e) => setEndDate(e.target.value)} />
        <Button variant="contained" startIcon={<AddIcon />} onClick={add} disabled={!doctorId || !startDate || !endDate}>
          Add Leave
        </Button>
      </Stack>
      <Divider sx={{ mb: 1.5 }} />
      {isLoading ? (
        <Loader minHeight={100} />
      ) : (data ?? []).length === 0 ? (
        <EmptyState title="No leave records" />
      ) : (
        <Stack spacing={1}>
          {data!.map((l: any) => (
            <Stack key={l.id} direction="row" alignItems="center" spacing={1} sx={{ p: 1, borderRadius: 2, bgcolor: 'rgba(15,30,61,0.03)' }}>
              <Box sx={{ flex: 1 }}>
                <Typography variant="body2" sx={{ fontWeight: 600 }}>
                  {doctorName(l.doctorId)}
                </Typography>
                <Typography variant="caption" color="text.secondary">
                  {formatDate(l.startDate)} → {formatDate(l.endDate)}
                </Typography>
              </Box>
              <IconButton size="small" color="error" onClick={() => remove(l.id)}>
                <DeleteOutlineIcon fontSize="small" />
              </IconButton>
            </Stack>
          ))}
        </Stack>
      )}
    </Card>
  );
}

// ── Slot blocks ───────────────────────────────────────────────────────
function BlocksCard() {
  const toast = useToast();
  const qc = useQueryClient();
  const { data: doctors } = useDoctors();
  const { data, isLoading } = useBlocks();
  const [doctorId, setDoctorId] = useState<number | ''>('');
  const [date, setDate] = useState('');
  const [startTime, setStartTime] = useState('');
  const [endTime, setEndTime] = useState('');
  const [reason, setReason] = useState('');

  const add = async () => {
    try {
      await apiPost('/slots/blocks', { doctorId: doctorId || null, date, startTime, endTime, reason: reason || undefined });
      toast.success('Time blocked');
      setDate('');
      setStartTime('');
      setEndTime('');
      setReason('');
      qc.invalidateQueries({ queryKey: ['blocks'] });
    } catch (e) {
      toast.error(errorMessage(e));
    }
  };
  const remove = async (id: number) => {
    await apiDelete(`/slots/blocks/${id}`);
    qc.invalidateQueries({ queryKey: ['blocks'] });
  };

  return (
    <Card sx={{ p: 3, height: '100%' }}>
      <Stack direction="row" spacing={1} alignItems="center" sx={{ mb: 2 }}>
        <BlockIcon color="primary" />
        <Typography variant="h6">Blocked Slots</Typography>
      </Stack>
      <Stack spacing={1.5} sx={{ mb: 2 }}>
        <TextField select size="small" label="Doctor (optional)" value={doctorId} onChange={(e) => setDoctorId(e.target.value ? Number(e.target.value) : '')}>
          <MenuItem value="">All doctors</MenuItem>
          {(doctors ?? []).map((d) => (
            <MenuItem key={d.id} value={d.id}>
              {d.fullName}
            </MenuItem>
          ))}
        </TextField>
        <TextField size="small" type="date" label="Date" InputLabelProps={{ shrink: true }} value={date} onChange={(e) => setDate(e.target.value)} />
        <Stack direction="row" spacing={1}>
          <TextField size="small" type="time" label="From" InputLabelProps={{ shrink: true }} value={startTime} onChange={(e) => setStartTime(e.target.value)} fullWidth />
          <TextField size="small" type="time" label="To" InputLabelProps={{ shrink: true }} value={endTime} onChange={(e) => setEndTime(e.target.value)} fullWidth />
        </Stack>
        <TextField size="small" label="Reason" value={reason} onChange={(e) => setReason(e.target.value)} />
        <Button variant="contained" startIcon={<AddIcon />} onClick={add} disabled={!date || !startTime || !endTime}>
          Block Time
        </Button>
      </Stack>
      <Divider sx={{ mb: 1.5 }} />
      {isLoading ? (
        <Loader minHeight={100} />
      ) : (data ?? []).length === 0 ? (
        <EmptyState title="No blocked slots" />
      ) : (
        <Stack spacing={1}>
          {data!.map((b: any) => (
            <Stack key={b.id} direction="row" alignItems="center" spacing={1} sx={{ p: 1, borderRadius: 2, bgcolor: 'rgba(15,30,61,0.03)' }}>
              <Box sx={{ flex: 1 }}>
                <Typography variant="body2" sx={{ fontWeight: 600 }}>
                  {formatDate(b.date)} · {b.startTime}–{b.endTime}
                </Typography>
                <Typography variant="caption" color="text.secondary">
                  {b.reason ?? 'Blocked'} {b.doctorId ? '' : '· all doctors'}
                </Typography>
              </Box>
              <IconButton size="small" color="error" onClick={() => remove(b.id)}>
                <DeleteOutlineIcon fontSize="small" />
              </IconButton>
            </Stack>
          ))}
        </Stack>
      )}
    </Card>
  );
}
