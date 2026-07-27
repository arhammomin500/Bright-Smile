import { prisma } from './prisma.js';

// Human-friendly, sequential-ish business codes.
// A small "Setting" counter row backs each series so codes stay unique and
// monotonic without exposing raw autoincrement ids.

async function nextCounter(key: string): Promise<number> {
  // Upsert-then-increment inside a transaction to avoid race conditions.
  const result = await prisma.$transaction(async (tx) => {
    const existing = await tx.setting.findUnique({ where: { key } });
    const current = existing ? parseInt(existing.value, 10) || 0 : 0;
    const next = current + 1;
    if (existing) {
      await tx.setting.update({ where: { key }, data: { value: String(next) } });
    } else {
      await tx.setting.create({ data: { key, value: String(next) } });
    }
    return next;
  });
  return result;
}

const pad = (n: number, len: number) => String(n).padStart(len, '0');

export async function generatePatientCode(): Promise<string> {
  const n = await nextCounter('counter:patient');
  return `BSP-${pad(n, 6)}`;
}

export async function generateInvoiceNo(): Promise<string> {
  const n = await nextCounter('counter:invoice');
  return `BSI-${pad(n, 6)}`;
}

// Appointment codes embed the date for readability: BSA-YYYYMMDD-NNNN
export async function generateAppointmentCode(date: Date): Promise<string> {
  const ymd = `${date.getFullYear()}${pad(date.getMonth() + 1, 2)}${pad(date.getDate(), 2)}`;
  const n = await nextCounter(`counter:appt:${ymd}`);
  return `BSA-${ymd}-${pad(n, 4)}`;
}
