import { prisma } from '../lib/prisma.js';
import { ApiError } from '../lib/http.js';
import { ACTIVE_STATUSES } from '../constants/enums.js';
import {
  addMinutes,
  dayOfWeekUTC,
  parseDateOnly,
  rangesOverlap,
  toMinutes,
} from '../lib/time.js';

export interface SlotOption {
  startTime: string; // "HH:mm"
  endTime: string;
  available: boolean;
  remaining: number; // seats left in this slot
  reason?: string; // why unavailable
}

export interface DayAvailability {
  doctorId: number;
  date: string; // YYYY-MM-DD
  isWorkingDay: boolean;
  closedReason?: string;
  slotDurationMin: number;
  slots: SlotOption[];
}

/**
 * Computes bookable slots for a doctor on a given date by layering, in order:
 *   1. Clinic holidays          → whole day closed
 *   2. Doctor leave             → whole day closed
 *   3. Doctor's weekday schedule → working window (+ break carve-out)
 *   4. Slot blocks              → specific ranges removed
 *   5. Existing active bookings → seat counting vs maxPatientsPerSlot
 *   6. Past times               → not bookable
 */
export async function getDayAvailability(
  doctorId: number,
  dateInput: string | Date,
): Promise<DayAvailability> {
  const date = parseDateOnly(dateInput);
  const dateStr = date.toISOString().slice(0, 10);

  const doctor = await prisma.doctor.findUnique({
    where: { id: doctorId },
    include: { schedules: true },
  });
  if (!doctor || !doctor.isActive) throw ApiError.notFound('Doctor not found');

  const base: DayAvailability = {
    doctorId,
    date: dateStr,
    isWorkingDay: false,
    slotDurationMin: doctor.slotDurationMin,
    slots: [],
  };

  // 1. Holiday
  const holiday = await prisma.holiday.findUnique({ where: { date } });
  if (holiday) return { ...base, closedReason: `Clinic closed — ${holiday.name}` };

  // 2. Doctor leave (date falls within any leave range)
  const leave = await prisma.doctorLeave.findFirst({
    where: { doctorId, startDate: { lte: date }, endDate: { gte: date } },
  });
  if (leave) return { ...base, closedReason: 'Doctor is on leave this day' };

  // 3. Weekday schedule
  const dow = dayOfWeekUTC(date);
  const schedule = doctor.schedules.find((s) => s.dayOfWeek === dow);
  if (!schedule || !schedule.isWorking) {
    return { ...base, closedReason: 'Doctor is not available on this day' };
  }

  // 4. Slot blocks for this doctor/date (or clinic-wide blocks with null doctor)
  const blocks = await prisma.slotBlock.findMany({
    where: { date, OR: [{ doctorId }, { doctorId: null }] },
  });

  // 5. Existing active appointments on this date
  const appointments = await prisma.appointment.findMany({
    where: { doctorId, scheduledDate: date, status: { in: ACTIVE_STATUSES } },
    select: { startTime: true },
  });
  const bookedCount = new Map<string, number>();
  for (const a of appointments) {
    bookedCount.set(a.startTime, (bookedCount.get(a.startTime) ?? 0) + 1);
  }

  // Now/past cutoff (compare against UTC "today")
  const now = new Date();
  const todayUtc = new Date(Date.UTC(now.getUTCFullYear(), now.getUTCMonth(), now.getUTCDate()));
  const isToday = date.getTime() === todayUtc.getTime();
  const isPastDay = date.getTime() < todayUtc.getTime();
  const nowMinutes = now.getUTCHours() * 60 + now.getUTCMinutes();

  const slots: SlotOption[] = [];
  const step = doctor.slotDurationMin;
  const start = toMinutes(schedule.startTime);
  const end = toMinutes(schedule.endTime);

  for (let t = start; t + step <= end; t += step) {
    const slotStart = addMinutes(schedule.startTime, t - start);
    const slotEnd = addMinutes(slotStart, step);

    let available = true;
    let reason: string | undefined;

    // Break window
    if (
      schedule.breakStart &&
      schedule.breakEnd &&
      rangesOverlap(slotStart, slotEnd, schedule.breakStart, schedule.breakEnd)
    ) {
      available = false;
      reason = 'Break time';
    }

    // Slot blocks
    if (available) {
      const blocked = blocks.find((b) => rangesOverlap(slotStart, slotEnd, b.startTime, b.endTime));
      if (blocked) {
        available = false;
        reason = blocked.reason ?? 'Unavailable';
      }
    }

    // Seat counting
    const used = bookedCount.get(slotStart) ?? 0;
    const remaining = Math.max(0, doctor.maxPatientsPerSlot - used);
    if (available && remaining <= 0) {
      available = false;
      reason = 'Fully booked';
    }

    // Past time
    if (available && (isPastDay || (isToday && toMinutes(slotStart) <= nowMinutes))) {
      available = false;
      reason = 'Time has passed';
    }

    slots.push({ startTime: slotStart, endTime: slotEnd, available, remaining, reason });
  }

  return { ...base, isWorkingDay: true, slots };
}

/**
 * Validates that a specific slot is bookable right now. Used at booking time to
 * defend against races between availability display and confirmation.
 */
export async function assertSlotBookable(
  doctorId: number,
  dateInput: string | Date,
  startTime: string,
): Promise<{ endTime: string }> {
  const availability = await getDayAvailability(doctorId, dateInput);
  if (!availability.isWorkingDay) {
    throw ApiError.conflict(availability.closedReason ?? 'Doctor is not available on this day');
  }
  const slot = availability.slots.find((s) => s.startTime === startTime);
  if (!slot) throw ApiError.badRequest('That time slot does not exist for this doctor');
  if (!slot.available) {
    throw ApiError.conflict(`That time slot is no longer available (${slot.reason}).`);
  }
  return { endTime: slot.endTime };
}
