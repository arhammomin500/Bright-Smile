import dayjs, { type Dayjs } from 'dayjs';
import type { Doctor } from '@/lib/types';

// Preferred-time options for a given day, derived from the clinic's PUBLISHED
// WEEKLY HOURS (a fact) — never from live availability, which this static
// site cannot know. For today, times already past are omitted.
function toMinutes(hhmm: string): number {
  const [h, m] = hhmm.split(':').map(Number);
  return h * 60 + m;
}
function toHHMM(mins: number): string {
  return `${String(Math.floor(mins / 60)).padStart(2, '0')}:${String(mins % 60).padStart(2, '0')}`;
}

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
