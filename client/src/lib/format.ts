
export function formatMoney(n: number): string {
  return new Intl.NumberFormat('en-IN', { style: 'currency', currency: 'INR', maximumFractionDigits: 0 }).format(n);
}

// Treatment fees are quoted by the clinic after examination — prices are
// published only when the owner confirms them (0/0 = on consultation).
export function formatPriceRange(min: number, max: number): string {
  if (!min && !max) return 'On consultation';
  if (min === max) return formatMoney(min);
  return `${formatMoney(min)} – ${formatMoney(max)}`;
}

export function formatTime12h(hhmm: string): string {
  const [h, m] = hhmm.split(':').map(Number);
  const period = h >= 12 ? 'PM' : 'AM';
  const hour = h % 12 === 0 ? 12 : h % 12;
  return `${hour}:${String(m).padStart(2, '0')} ${period}`;
}

export function formatDate(iso: string, opts: Intl.DateTimeFormatOptions = { month: 'short', day: 'numeric', year: 'numeric' }): string {
  return new Date(iso.length <= 10 ? iso + 'T00:00:00' : iso).toLocaleDateString('en-US', opts);
}

export function formatDateLong(iso: string): string {
  return formatDate(iso, { weekday: 'long', month: 'long', day: 'numeric', year: 'numeric' });
}

// MUI color + label per appointment status.

export const WEEKDAYS = ['Sunday', 'Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday'];
export const WEEKDAYS_SHORT = ['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'];
