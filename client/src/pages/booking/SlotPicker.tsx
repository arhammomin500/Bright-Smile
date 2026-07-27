import { Box, ButtonBase, Stack, Typography } from '@mui/material';
import Grid from '@mui/material/Grid2';
import dayjs, { type Dayjs } from 'dayjs';
import CheckIcon from '@mui/icons-material/Check';
import WbSunnyOutlinedIcon from '@mui/icons-material/WbSunnyOutlined';
import WbTwilightOutlinedIcon from '@mui/icons-material/WbTwilightOutlined';
import DarkModeOutlinedIcon from '@mui/icons-material/DarkModeOutlined';
import { brand } from '@/theme/theme';
import { formatTime12h } from '@/lib/format';
import { Loader, EmptyState } from '@/components/ui/States';
import type { Doctor, DayAvailability } from '@/lib/types';

// Friendly date & time picker: a horizontal strip of day cards, then evenly
// sized time buttons grouped into Morning / Afternoon / Evening.
const DAYS_AHEAD = 14;

function dayLabel(d: Dayjs): string {
  if (d.isSame(dayjs(), 'day')) return 'Today';
  if (d.isSame(dayjs().add(1, 'day'), 'day')) return 'Tomorrow';
  return d.format('ddd');
}

export function SlotPicker({
  doctor,
  date,
  onDateChange,
  availability,
  loadingSlots,
  startTime,
  onSlotChange,
}: {
  doctor?: Doctor;
  date: Dayjs | null;
  onDateChange: (d: Dayjs | null) => void;
  availability?: DayAvailability;
  loadingSlots: boolean;
  startTime?: string;
  onSlotChange: (t: string) => void;
}) {
  const availableDays = doctor?.availableDays ?? [];
  const days = Array.from({ length: DAYS_AHEAD }, (_, i) => dayjs().add(i, 'day'));

  const slots = availability?.slots ?? [];
  const groups = [
    { key: 'Morning', icon: <WbSunnyOutlinedIcon sx={{ fontSize: 17 }} />, slots: slots.filter((s) => s.startTime < '12:00') },
    { key: 'Afternoon', icon: <WbTwilightOutlinedIcon sx={{ fontSize: 17 }} />, slots: slots.filter((s) => s.startTime >= '12:00' && s.startTime < '17:00') },
    { key: 'Evening', icon: <DarkModeOutlinedIcon sx={{ fontSize: 17 }} />, slots: slots.filter((s) => s.startTime >= '17:00') },
  ].filter((g) => g.slots.length > 0);

  return (
    <Box>
      {/* ── Day strip ── */}
      <Typography sx={{ fontWeight: 800, mb: 1.5, fontSize: '1.05rem' }}>
        Choose a day
      </Typography>
      <Stack
        direction="row"
        spacing={1}
        sx={{
          overflowX: 'auto',
          pb: 1.5,
          mb: 3.5,
          mx: -0.5,
          px: 0.5,
          scrollSnapType: 'x proximity',
          '&::-webkit-scrollbar': { height: 5 },
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
              sx={{
                scrollSnapAlign: 'start',
                flexShrink: 0,
                flexDirection: 'column',
                minWidth: 68,
                px: 1.25,
                py: 1,
                borderRadius: '14px',
                border: `1.5px solid ${selected ? brand.primary : brand.line}`,
                bgcolor: selected ? brand.primary : '#fff',
                color: selected ? '#fff' : disabled ? 'text.disabled' : 'text.primary',
                opacity: disabled ? 0.4 : 1,
                boxShadow: selected ? '0 8px 18px rgba(31,111,235,0.3)' : 'none',
                transition: 'all .18s ease',
                '&:hover': disabled || selected ? {} : { borderColor: brand.primary, bgcolor: brand.mist },
              }}
            >
              <Typography variant="caption" sx={{ fontWeight: 700, color: 'inherit', opacity: selected ? 0.9 : 0.6, lineHeight: 1.3 }}>
                {dayLabel(d)}
              </Typography>
              <Typography sx={{ fontWeight: 800, fontSize: 18, lineHeight: 1.25, color: 'inherit' }}>
                {d.format('D')}
              </Typography>
              <Typography variant="caption" sx={{ color: 'inherit', opacity: selected ? 0.9 : 0.6, lineHeight: 1.3 }}>
                {d.format('MMM')}
              </Typography>
            </ButtonBase>
          );
        })}
      </Stack>

      {/* ── Time slots ── */}
      <Typography sx={{ fontWeight: 800, mb: 1.5, fontSize: '1.05rem' }}>
        Choose a time
        {date && (
          <Typography component="span" sx={{ color: 'text.secondary', fontWeight: 600, ml: 1, fontSize: '0.9rem' }}>
            {date.format('dddd, MMM D')}
          </Typography>
        )}
      </Typography>
      {!date ? (
        <EmptyState title="Pick a day above" description="Available times will appear here." />
      ) : loadingSlots ? (
        <Loader minHeight={140} label="Checking availability…" />
      ) : !availability?.isWorkingDay ? (
        <EmptyState title="Clinic closed" description={availability?.closedReason ?? 'The clinic is not open on this day.'} />
      ) : slots.every((s) => !s.available) ? (
        <EmptyState title="Fully booked" description="No open slots on this day — please try another date." />
      ) : (
        <Stack spacing={2.75}>
          {groups.map((g) => (
            <Box key={g.key}>
              <Stack direction="row" spacing={0.75} alignItems="center" sx={{ mb: 1.25, color: 'text.secondary' }}>
                {g.icon}
                <Typography variant="body2" sx={{ fontWeight: 700, letterSpacing: 0.6, fontSize: 12.5, textTransform: 'uppercase' }}>
                  {g.key}
                </Typography>
                <Typography variant="caption" sx={{ color: 'text.disabled', fontWeight: 600 }}>
                  · {g.slots.filter((s) => s.available).length} open
                </Typography>
              </Stack>
              {/* Uniform grid: every time button is the same size */}
              <Grid container spacing={1}>
                {g.slots.map((s) => {
                  const selected = startTime === s.startTime;
                  return (
                    <Grid key={s.startTime} size={{ xs: 4, sm: 3 }}>
                      <ButtonBase
                        disabled={!s.available}
                        onClick={() => onSlotChange(s.startTime)}
                        sx={{
                          width: '100%',
                          height: 44,
                          borderRadius: '12px',
                          fontSize: 14,
                          fontWeight: 700,
                          fontFamily: 'inherit',
                          gap: 0.5,
                          border: `1.5px solid ${selected ? brand.primary : brand.line}`,
                          bgcolor: selected ? brand.primary : '#fff',
                          color: selected ? '#fff' : s.available ? 'text.primary' : 'text.disabled',
                          textDecoration: s.available ? 'none' : 'line-through',
                          opacity: s.available ? 1 : 0.45,
                          boxShadow: selected ? '0 8px 18px rgba(31,111,235,0.3)' : 'none',
                          transition: 'all .15s ease',
                          '&:hover': !s.available || selected ? {} : { borderColor: brand.primary, bgcolor: brand.mist },
                        }}
                      >
                        {selected && <CheckIcon sx={{ fontSize: 16 }} />}
                        {formatTime12h(s.startTime)}
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
