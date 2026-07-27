import { useState } from 'react';
import {
  Button,
  Dialog,
  DialogActions,
  DialogContent,
  DialogTitle,
  MenuItem,
  Stack,
  TextField,
  Typography,
  Box,
} from '@mui/material';
import Grid from '@mui/material/Grid2';
import CheckIcon from '@mui/icons-material/Check';
import CloseIcon from '@mui/icons-material/Close';
import EventRepeatIcon from '@mui/icons-material/EventRepeat';
import PersonSearchIcon from '@mui/icons-material/PersonSearch';
import DoneAllIcon from '@mui/icons-material/DoneAll';
import { DateCalendar } from '@mui/x-date-pickers/DateCalendar';
import dayjs, { type Dayjs } from 'dayjs';
import { useChangeStatus, useReschedule, useAssignDoctor } from '@/lib/dashboardQueries';
import { useDoctors, useAvailability } from '@/lib/queries';
import { useToast } from '@/components/feedback/ToastProvider';
import { errorMessage } from '@/lib/api';
import { formatTime12h } from '@/lib/format';
import { Loader, EmptyState } from '@/components/ui/States';
import type { Appointment, AppointmentStatus } from '@/lib/types';

// Renders the status-appropriate workflow actions for a single appointment.
export function AppointmentActions({ appointment, size = 'small', onDone }: { appointment: Appointment; size?: 'small' | 'medium'; onDone?: () => void }) {
  const toast = useToast();
  const changeStatus = useChangeStatus();
  const [dialog, setDialog] = useState<null | 'reschedule' | 'assign' | 'reject'>(null);

  const status = appointment.status;
  const canConfirm = status === 'PENDING' || status === 'RESCHEDULED';
  const canComplete = status === 'CONFIRMED' || status === 'RESCHEDULED';
  const isClosed = ['COMPLETED', 'CANCELLED', 'NO_SHOW'].includes(status);

  const doStatus = (newStatus: AppointmentStatus, note?: string) =>
    changeStatus.mutate(
      { id: appointment.id, status: newStatus, note },
      {
        onSuccess: () => {
          toast.success(`Appointment ${newStatus.toLowerCase()}`);
          onDone?.();
        },
        onError: (e) => toast.error(errorMessage(e)),
      },
    );

  return (
    <>
      <Stack direction="row" spacing={1} flexWrap="wrap" useFlexGap>
        {canConfirm && (
          <Button size={size} variant="contained" color="success" startIcon={<CheckIcon />} onClick={() => doStatus('CONFIRMED')} disabled={changeStatus.isPending}>
            Accept
          </Button>
        )}
        {!isClosed && (
          <Button size={size} variant="outlined" startIcon={<EventRepeatIcon />} onClick={() => setDialog('reschedule')}>
            Reschedule
          </Button>
        )}
        {!isClosed && (
          <Button size={size} variant="outlined" startIcon={<PersonSearchIcon />} onClick={() => setDialog('assign')}>
            Assign
          </Button>
        )}
        {canComplete && (
          <Button size={size} variant="outlined" color="success" startIcon={<DoneAllIcon />} onClick={() => doStatus('COMPLETED')}>
            Complete
          </Button>
        )}
        {canComplete && (
          <Button size={size} variant="text" color="inherit" onClick={() => doStatus('NO_SHOW')}>
            No-show
          </Button>
        )}
        {!isClosed && (
          <Button size={size} variant="text" color="error" startIcon={<CloseIcon />} onClick={() => setDialog('reject')}>
            {status === 'PENDING' ? 'Reject' : 'Cancel'}
          </Button>
        )}
      </Stack>

      <RescheduleDialog open={dialog === 'reschedule'} appointment={appointment} onClose={() => setDialog(null)} onDone={onDone} />
      <AssignDialog open={dialog === 'assign'} appointment={appointment} onClose={() => setDialog(null)} onDone={onDone} />
      <RejectDialog open={dialog === 'reject'} appointment={appointment} onClose={() => setDialog(null)} onConfirm={(note) => { doStatus('CANCELLED', note); setDialog(null); }} />
    </>
  );
}

// ── Reschedule dialog ─────────────────────────────────────────────────
function RescheduleDialog({ open, appointment, onClose, onDone }: { open: boolean; appointment: Appointment; onClose: () => void; onDone?: () => void }) {
  const toast = useToast();
  const reschedule = useReschedule();
  const { data: doctors } = useDoctors();
  const [doctorId, setDoctorId] = useState<number>(appointment.doctorId);
  const [date, setDate] = useState<Dayjs | null>(dayjs(appointment.scheduledDate));
  const [startTime, setStartTime] = useState<string | undefined>();
  const [note, setNote] = useState('');

  const doctor = doctors?.find((d) => d.id === doctorId);
  const dateStr = date?.format('YYYY-MM-DD');
  // Single-doctor clinic: availability is keyed on the date alone.
  const { data: availability, isLoading } = useAvailability(dateStr);

  const submit = () => {
    if (!dateStr || !startTime) return;
    reschedule.mutate(
      { id: appointment.id, doctorId, date: dateStr, startTime, note: note || undefined },
      {
        onSuccess: () => {
          toast.success('Appointment rescheduled');
          onClose();
          onDone?.();
        },
        onError: (e) => toast.error(errorMessage(e)),
      },
    );
  };

  return (
    <Dialog open={open} onClose={onClose} maxWidth="md" fullWidth PaperProps={{ sx: { borderRadius: 4 } }}>
      <DialogTitle sx={{ fontWeight: 700 }}>Reschedule — {appointment.appointmentCode}</DialogTitle>
      <DialogContent>
        <Grid container spacing={2} sx={{ mt: 0 }}>
          <Grid size={{ xs: 12, md: 6 }}>
            <TextField select fullWidth label="Doctor" value={doctorId} onChange={(e) => { setDoctorId(Number(e.target.value)); setStartTime(undefined); }} sx={{ mb: 2 }}>
              {(doctors ?? []).map((d) => (
                <MenuItem key={d.id} value={d.id}>
                  {d.fullName}
                </MenuItem>
              ))}
            </TextField>
            <Box sx={{ border: '1px solid rgba(15,30,61,0.08)', borderRadius: 3 }}>
              <DateCalendar
                value={date}
                onChange={(d) => { setDate(d); setStartTime(undefined); }}
                disablePast
                shouldDisableDate={(d) => (doctor?.availableDays.length ? !doctor.availableDays.includes(d.day()) : false)}
              />
            </Box>
          </Grid>
          <Grid size={{ xs: 12, md: 6 }}>
            <Typography variant="subtitle2" sx={{ mb: 1 }}>
              Available slots
            </Typography>
            {isLoading ? (
              <Loader minHeight={140} />
            ) : !availability?.isWorkingDay ? (
              <EmptyState title="Not available" description={availability?.closedReason} />
            ) : (
              <Grid container spacing={1}>
                {availability.slots.map((s) => (
                  <Grid size={{ xs: 4 }} key={s.startTime}>
                    <Button fullWidth size="small" disabled={!s.available} variant={startTime === s.startTime ? 'contained' : 'outlined'} onClick={() => setStartTime(s.startTime)} sx={{ opacity: s.available ? 1 : 0.4 }}>
                      {formatTime12h(s.startTime)}
                    </Button>
                  </Grid>
                ))}
              </Grid>
            )}
            <TextField fullWidth label="Note (optional)" value={note} onChange={(e) => setNote(e.target.value)} sx={{ mt: 2 }} multiline minRows={2} />
          </Grid>
        </Grid>
      </DialogContent>
      <DialogActions sx={{ px: 3, pb: 2 }}>
        <Button onClick={onClose}>Cancel</Button>
        <Button variant="contained" onClick={submit} disabled={!startTime || reschedule.isPending}>
          Confirm Reschedule
        </Button>
      </DialogActions>
    </Dialog>
  );
}

// ── Assign doctor dialog ──────────────────────────────────────────────
function AssignDialog({ open, appointment, onClose, onDone }: { open: boolean; appointment: Appointment; onClose: () => void; onDone?: () => void }) {
  const toast = useToast();
  const assign = useAssignDoctor();
  const { data: doctors } = useDoctors();
  const [doctorId, setDoctorId] = useState<number>(appointment.doctorId);
  const [note, setNote] = useState('');

  const submit = () =>
    assign.mutate(
      { id: appointment.id, doctorId, note: note || undefined },
      {
        onSuccess: () => {
          toast.success('Doctor assigned');
          onClose();
          onDone?.();
        },
        onError: (e) => toast.error(errorMessage(e)),
      },
    );

  return (
    <Dialog open={open} onClose={onClose} maxWidth="xs" fullWidth PaperProps={{ sx: { borderRadius: 4 } }}>
      <DialogTitle sx={{ fontWeight: 700 }}>Assign Doctor</DialogTitle>
      <DialogContent>
        <TextField select fullWidth label="Doctor" value={doctorId} onChange={(e) => setDoctorId(Number(e.target.value))} sx={{ mt: 1, mb: 2 }}>
          {(doctors ?? []).map((d) => (
            <MenuItem key={d.id} value={d.id}>
              {d.fullName} — {d.specialization}
            </MenuItem>
          ))}
        </TextField>
        <TextField fullWidth label="Internal note (optional)" value={note} onChange={(e) => setNote(e.target.value)} multiline minRows={2} />
      </DialogContent>
      <DialogActions sx={{ px: 3, pb: 2 }}>
        <Button onClick={onClose}>Cancel</Button>
        <Button variant="contained" onClick={submit} disabled={assign.isPending}>
          Assign
        </Button>
      </DialogActions>
    </Dialog>
  );
}

// ── Reject/cancel dialog ──────────────────────────────────────────────
function RejectDialog({ open, appointment, onClose, onConfirm }: { open: boolean; appointment: Appointment; onClose: () => void; onConfirm: (note?: string) => void }) {
  const [note, setNote] = useState('');
  return (
    <Dialog open={open} onClose={onClose} maxWidth="xs" fullWidth PaperProps={{ sx: { borderRadius: 4 } }}>
      <DialogTitle sx={{ fontWeight: 700 }}>{appointment.status === 'PENDING' ? 'Reject request' : 'Cancel appointment'}</DialogTitle>
      <DialogContent>
        <Typography variant="body2" color="text.secondary" sx={{ mb: 2 }}>
          The patient will be notified. Add an optional reason.
        </Typography>
        <TextField fullWidth label="Reason (optional)" value={note} onChange={(e) => setNote(e.target.value)} multiline minRows={2} autoFocus />
      </DialogContent>
      <DialogActions sx={{ px: 3, pb: 2 }}>
        <Button onClick={onClose}>Keep</Button>
        <Button variant="contained" color="error" onClick={() => onConfirm(note || undefined)}>
          Confirm
        </Button>
      </DialogActions>
    </Dialog>
  );
}
