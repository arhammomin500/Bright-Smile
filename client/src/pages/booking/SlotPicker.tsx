import { Box, Chip, Stack, Typography } from '@mui/material';
import dayjs, { type Dayjs } from 'dayjs';
import WbSunnyOutlinedIcon from '@mui/icons-material/WbSunnyOutlined';
import WbTwilightOutlinedIcon from '@mui/icons-material/WbTwilightOutlined';
import DarkModeOutlinedIcon from '@mui/icons-material/DarkModeOutlined';
import { brand } from '@/theme/theme';
import { formatTime12h } from '@/lib/format';
import { Loader, EmptyState } from '@/components/ui/States';
import type { Doctor, DayAvailability } from '@/lib/types';

// Zomato-style date & time picker: a horizontal strip of day pills followed by
// predefined time chips grouped into Morning / Afternoon / Evening.
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
    { key: 'Morning', icon: <WbSunnyOutlinedIcon sx={{ fontSize: 18 }} />, slots: slots.filter((s) => s.startTime < '12:00') },
    { key: 'Afternoon', icon: <WbTwilightOutlinedIcon sx={{ fontSize: 18 }} />, slots: slots.filter((s) => s.startTime >= '12:00' && s.startTime < '17:00') },
    { key: 'Evening', icon: <DarkModeOutlinedIcon sx={{ fontSize: 18 }} />, slots: slots.filter((s) => s.startTime >= '17:00') },
  ].filter((g) => g.slots.length > 0);

  return (
    <Box>
      {/* Day picker strip */}
      <Typography variant="subtitle1" sx={{ fontWeight: 700, mb: 1.5 }}>
        Pick a day
      </Typography>
      <Stack
        direction="row"
        spacing={1.25}
        sx={{
          overflowX: 'auto',
          pb: 1.5,
          mb: 3,
          scrollSnapType: 'x proximity',
          '&::-webkit-scrollbar': { height: 6 },
        }}
      >
        {days.map((d) => {
          const disabled = availableDays.length > 0 && !availableDays.includes(d.day());
          const selected = !!date && d.isSame(date, 'day');
          return (
            <Box
              key={d.format('YYYY-MM-DD')}
              component="button"
              type="button"
              disabled={disabled}
              onClick={() => onDateChange(d)}
              sx={{
                scrollSnapAlign: 'start',
                flexShrink: 0,
                minWidth: 74,
                px: 1.5,
                py: 1.1,
                borderRadius: 3.5,
                cursor: disabled ? 'not-allowed' : 'pointer',
                border: `1.5px solid ${selected ? brand.primary : brand.line}`,
                bgcolor: selected ? brand.primary : '#fff',
                color: selected ? '#fff' : disabled ? 'text.disabled' : 'text.primary',
                opacity: disabled ? 0.45 : 1,
                transition: 'all .18s ease',
                fontFamily: 'inherit',
                '&:hover': disabled ? {} : { borderColor: brand.primary, transform: 'translateY(-2px)' },
              }}
            >
              <Typography variant="caption" sx={{ display: 'block', fontWeight: 700, color: 'inherit', opacity: selected ? 0.85 : 0.65 }}>
                {dayLabel(d)}
              </Typography>
              <Typography sx={{ fontWeight: 800, fontSize: 17, lineHeight: 1.2, color: 'inherit' }}>
                {d.format('D')}
              </Typography>
              <Typography variant="caption" sx={{ display: 'block', color: 'inherit', opacity: selected ? 0.85 : 0.65 }}>
                {d.format('MMM')}
              </Typography>
            </Box>
          );
        })}
      </Stack>

      {/* Time slots, grouped like a table-booking app */}
      <Typography variant="subtitle1" sx={{ fontWeight: 700, mb: 1.5 }}>
        {date ? `Available times — ${date.format('dddd, MMM D')}` : 'Pick a day to see times'}
      </Typography>
      {!date ? (
        <EmptyState title="Choose a day above" description="Open time slots will appear here." />
      ) : loadingSlots ? (
        <Loader minHeight={140} />
      ) : !availability?.isWorkingDay ? (
        <EmptyState title="Clinic closed" description={availability?.closedReason ?? 'The clinic is not open on this day.'} />
      ) : slots.every((s) => !s.available) ? (
        <EmptyState title="Fully booked" description="No open slots on this day — please try another date." />
      ) : (
        <Stack spacing={2.5}>
          {groups.map((g) => (
            <Box key={g.key}>
              <Stack direction="row" spacing={0.75} alignItems="center" sx={{ mb: 1.25, color: 'text.secondary' }}>
                {g.icon}
                <Typography variant="body2" sx={{ fontWeight: 700, textTransform: 'uppercase', letterSpacing: 0.8, fontSize: 12 }}>
                  {g.key}
                </Typography>
              </Stack>
              <Box sx={{ display: 'flex', flexWrap: 'wrap', gap: 1.1 }}>
                {g.slots.map((s) => {
                  const selected = startTime === s.startTime;
                  return (
                    <Chip
                      key={s.startTime}
                      label={formatTime12h(s.startTime)}
                      disabled={!s.available}
                      clickable={s.available}
                      onClick={() => s.available && onSlotChange(s.startTime)}
                      sx={{
                        px: 0.75,
                        py: 2.4,
                        fontWeight: 700,
                        fontSize: 14,
                        borderRadius: 2.5,
                        border: `1.5px solid ${selected ? brand.primary : brand.line}`,
                        bgcolor: selected ? brand.primary : '#fff',
                        color: selected ? '#fff' : 'text.primary',
                        '&:hover': { bgcolor: selected ? brand.primaryDark : brand.cloud },
                        '&.Mui-disabled': { opacity: 0.4, textDecoration: 'line-through' },
                      }}
                    />
                  );
                })}
              </Box>
            </Box>
          ))}
        </Stack>
      )}
    </Box>
  );
}
