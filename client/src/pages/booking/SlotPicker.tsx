import { Box, ButtonBase, Stack, Typography } from '@mui/material';
import Grid from '@mui/material/Grid2';
import dayjs, { type Dayjs } from 'dayjs';
import WbSunnyOutlinedIcon from '@mui/icons-material/WbSunnyOutlined';
import WbTwilightOutlinedIcon from '@mui/icons-material/WbTwilightOutlined';
import DarkModeOutlinedIcon from '@mui/icons-material/DarkModeOutlined';
import InfoOutlinedIcon from '@mui/icons-material/InfoOutlined';
import { brand } from '@/theme/theme';
import { formatTime12h } from '@/lib/format';
import { EmptyState } from '@/components/ui/States';
import type { Doctor } from '@/lib/types';

// Frontend-only picker: times are derived from the clinic's PUBLISHED WEEKLY
// HOURS (a fact), never from live availability (which this static site cannot
// know). The visitor picks a *preferred* time; the clinic confirms it.
export const DAYS_AHEAD = 14;

function toMinutes(hhmm: string): number {
  const [h, m] = hhmm.split(':').map(Number);
  return h * 60 + m;
}
function toHHMM(mins: number): string {
  return `${String(Math.floor(mins / 60)).padStart(2, '0')}:${String(mins % 60).padStart(2, '0')}`;
}

// Preferred-time options for a given day, from the doctor's weekly schedule.
// For today, times that have already passed are omitted (that part is a fact).
export function getDaySlots(doctor: Doctor | undefined, date: Dayjs | null): string[] {
  if (!doctor || !date) return [];
  const sched = doctor.schedules?.find((s) => s.dayOfWeek === date.day() && s.isWorking);
  if (!sched) return [];
  const step = doctor.slotDurationMin || 30;
  const out: string[] = [];
  const breakStart = sched.breakStart ? toMinutes(sched.breakStart) : null;
  const breakEnd = sched.breakEnd ? toMinutes(sched.breakEnd) : null;
  const now = dayjs();
  const isToday = date.isSame(now, 'day');
  for (let t = toMinutes(sched.startTime); t + step <= toMinutes(sched.endTime); t += step) {
    if (breakStart !== null && breakEnd !== null && t >= breakStart && t < breakEnd) continue;
    if (isToday && t <= now.hour() * 60 + now.minute() + 30) continue; // needs ≥30 min notice
    out.push(toHHMM(t));
  }
  return out;
}

function dayLabel(d: Dayjs): string {
  if (d.isSame(dayjs(), 'day')) return 'Today';
  if (d.isSame(dayjs().add(1, 'day'), 'day')) return 'Tomorrow';
  return d.format('ddd');
}

export function SlotPicker({
  doctor,
  date,
  onDateChange,
  startTime,
  onSlotChange,
}: {
  doctor?: Doctor;
  date: Dayjs | null;
  onDateChange: (d: Dayjs | null) => void;
  startTime?: string;
  onSlotChange: (t: string) => void;
}) {
  const availableDays = doctor?.availableDays ?? [];
  const days = Array.from({ length: DAYS_AHEAD }, (_, i) => dayjs().add(i, 'day'));

  const slots = getDaySlots(doctor, date);
  const groups = [
    { key: 'Morning', icon: <WbSunnyOutlinedIcon sx={{ fontSize: 16 }} />, slots: slots.filter((s) => s < '12:00') },
    { key: 'Afternoon', icon: <WbTwilightOutlinedIcon sx={{ fontSize: 16 }} />, slots: slots.filter((s) => s >= '12:00' && s < '17:00') },
    { key: 'Evening', icon: <DarkModeOutlinedIcon sx={{ fontSize: 16 }} />, slots: slots.filter((s) => s >= '17:00') },
  ].filter((g) => g.slots.length > 0);

  return (
    <Box>
      {/* ── Day strip ── */}
      <Typography sx={{ fontWeight: 800, mb: 1.25, fontSize: '1rem' }}>Select date</Typography>
      <Stack
        direction="row"
        spacing={1}
        sx={{
          overflowX: 'auto',
          pb: 1.25,
          mb: 2.5,
          mx: -0.5,
          px: 0.5,
          scrollSnapType: 'x proximity',
          '&::-webkit-scrollbar': { height: 4 },
        }}
      >
        {days.map((d) => {
          const disabled = availableDays.length > 0 && !availableDays.includes(d.day());
          const selected = !!date && d.isSame(date, 'day');
          return (
            <ButtonBase
              key={d.format('YYYY-MM-DD')}
              disabled={disabled}
              onClick={() => onDateChange(d)}
              aria-label={d.format('dddd, MMMM D')}
              sx={{
                scrollSnapAlign: 'start',
                flexShrink: 0,
                flexDirection: 'column',
                minWidth: 66,
                minHeight: 72,
                px: 1.25,
                py: 1,
                borderRadius: '12px',
                border: `1.5px solid ${selected ? brand.primary : brand.line}`,
                bgcolor: selected ? brand.primary : '#fff',
                color: selected ? '#fff' : disabled ? 'text.disabled' : 'text.primary',
                opacity: disabled ? 0.35 : 1,
                boxShadow: selected ? '0 6px 16px rgba(31,111,235,0.28)' : 'none',
                transition: 'all .18s ease',
                '&:hover': disabled || selected ? {} : { borderColor: brand.primary, bgcolor: brand.mist },
                '&:focus-visible': { outline: `2px solid ${brand.primary}`, outlineOffset: 2 },
              }}
            >
              <Typography variant="caption" sx={{ fontWeight: 700, color: 'inherit', opacity: selected ? 0.9 : 0.6, lineHeight: 1.3 }}>
                {dayLabel(d)}
              </Typography>
              <Typography sx={{ fontWeight: 800, fontSize: 19, lineHeight: 1.25, color: 'inherit' }}>
                {d.format('D')}
              </Typography>
              <Typography variant="caption" sx={{ color: 'inherit', opacity: selected ? 0.9 : 0.6, lineHeight: 1.3 }}>
                {d.format('MMM')}
              </Typography>
            </ButtonBase>
          );
        })}
      </Stack>

      {/* ── Preferred time ── */}
      <Typography sx={{ fontWeight: 800, mb: 0.5, fontSize: '1rem' }}>
        Select a preferred time
        {date && (
          <Typography component="span" sx={{ color: 'text.secondary', fontWeight: 600, ml: 1, fontSize: '0.88rem' }}>
            {date.format('ddd, MMM D')}
          </Typography>
        )}
      </Typography>
      <Stack direction="row" spacing={0.75} alignItems="center" sx={{ mb: 1.5, color: 'text.secondary' }}>
        <InfoOutlinedIcon sx={{ fontSize: 15 }} />
        <Typography variant="caption">
          These are the clinic's usual hours — the clinic will confirm your exact time.
        </Typography>
      </Stack>
      {!date ? (
        <EmptyState title="Pick a day above" description="The clinic's hours for that day will appear here." />
      ) : slots.length === 0 ? (
        <EmptyState title="Clinic closed" description="No consulting hours on this day — please pick another date." />
      ) : (
        <Stack spacing={2}>
          {groups.map((g) => (
            <Box key={g.key}>
              <Stack direction="row" spacing={0.6} alignItems="center" sx={{ mb: 1, color: 'text.secondary' }}>
                {g.icon}
                <Typography variant="caption" sx={{ fontWeight: 700, letterSpacing: 0.5, textTransform: 'uppercase' }}>
                  {g.key}
                </Typography>
              </Stack>
              <Grid container spacing={1}>
                {g.slots.map((s) => {
                  const selected = startTime === s;
                  return (
                    <Grid key={s} size={{ xs: 4, sm: 3 }}>
                      <ButtonBase
                        onClick={() => onSlotChange(s)}
                        aria-pressed={selected}
                        sx={{
                          width: '100%',
                          height: 48,
                          borderRadius: '10px',
                          fontSize: 14.5,
                          fontWeight: 700,
                          fontFamily: 'inherit',
                          border: `1.5px solid ${selected ? brand.primary : brand.line}`,
                          bgcolor: selected ? brand.primary : '#fff',
                          color: selected ? '#fff' : 'text.primary',
                          boxShadow: selected ? '0 6px 16px rgba(31,111,235,0.28)' : 'none',
                          transition: 'all .15s ease',
                          '&:hover': selected ? {} : { borderColor: brand.primary, bgcolor: brand.mist },
                          '&:focus-visible': { outline: `2px solid ${brand.primary}`, outlineOffset: 2 },
                        }}
                      >
                        {formatTime12h(s)}
                      </ButtonBase>
                    </Grid>
                  );
                })}
              </Grid>
            </Box>
          ))}
        </Stack>
      )}
    </Box>
  );
}
