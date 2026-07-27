import { useState } from 'react';
import { useParams } from 'react-router-dom';
import { useQuery } from '@tanstack/react-query';
import { Box, Button, Card, Container, Stack, TextField, Typography, Divider, Chip } from '@mui/material';
import SearchIcon from '@mui/icons-material/Search';
import { PageHero } from '@/components/ui/PageHero';
import { Loader, EmptyState } from '@/components/ui/States';
import { apiGet } from '@/lib/api';
import { STATUS_META, formatDateLong, formatTime12h } from '@/lib/format';
import type { Appointment } from '@/lib/types';

export default function BookingStatus() {
  const { code: routeCode } = useParams();
  const [input, setInput] = useState(routeCode ?? '');
  const [code, setCode] = useState(routeCode ?? '');

  const { data, isLoading, isError } = useQuery({
    queryKey: ['booking-status', code],
    queryFn: () => apiGet<Appointment>(`/appointments/code/${code}`),
    enabled: !!code,
    retry: false,
  });

  const meta = data ? STATUS_META[data.status] : null;

  return (
    <>
      <PageHero title="Track Your Booking" subtitle="Enter your appointment ID to check its current status." crumbs={[{ label: 'Track Booking' }]} />
      <Container maxWidth="sm" sx={{ py: { xs: 4, md: 6 } }}>
        <Stack direction="row" spacing={1.5} sx={{ mb: 4 }}>
          <TextField
            fullWidth
            label="Appointment ID"
            placeholder="e.g. BSA-20260720-0001"
            value={input}
            onChange={(e) => setInput(e.target.value.toUpperCase())}
            onKeyDown={(e) => e.key === 'Enter' && setCode(input.trim())}
          />
          <Button variant="contained" onClick={() => setCode(input.trim())} startIcon={<SearchIcon />} sx={{ px: 3 }}>
            Track
          </Button>
        </Stack>

        {isLoading && <Loader />}
        {isError && <EmptyState title="Not found" description="We couldn't find an appointment with that ID. Please check and try again." />}

        {data && meta && (
          <Card sx={{ p: { xs: 2.5, md: 4 } }}>
            <Stack direction="row" justifyContent="space-between" alignItems="center" sx={{ mb: 3 }}>
              <Box>
                <Typography variant="caption" color="text.secondary">
                  Appointment ID
                </Typography>
                <Typography variant="h6">{data.appointmentCode}</Typography>
              </Box>
              <Chip label={meta.label} color={meta.color} sx={{ fontWeight: 700, py: 2 }} />
            </Stack>
            <Divider sx={{ mb: 2 }} />
            <Stack spacing={1.5} divider={<Divider flexItem />}>
              <Row label="Patient" value={data.contactName} />
              <Row label="Doctor" value={data.doctor?.fullName ?? '—'} />
              <Row label="Treatment" value={data.treatment?.name ?? 'General consultation'} />
              <Row label="Date" value={formatDateLong(data.scheduledDate)} />
              <Row label="Time" value={formatTime12h(data.startTime)} />
            </Stack>
          </Card>
        )}
      </Container>
    </>
  );
}

function Row({ label, value }: { label: string; value: React.ReactNode }) {
  return (
    <Stack direction="row" justifyContent="space-between" spacing={2}>
      <Typography color="text.secondary" variant="body2">
        {label}
      </Typography>
      <Typography sx={{ fontWeight: 600, textAlign: 'right' }}>{value}</Typography>
    </Stack>
  );
}
