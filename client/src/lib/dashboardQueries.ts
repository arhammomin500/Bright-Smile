import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query';
import { apiGet, apiPatch, apiPost } from './api';
import type { Appointment, AppointmentStatus, AppNotification } from './types';

// ── Reception dashboard ───────────────────────────────────────────────
export interface DashboardData {
  today: { total: number; confirmed: number; pending: number; completed: number; cancelled: number; noShow: number };
  upcomingWeek: number;
  pendingApprovals: number;
  newPatientsThisMonth: number;
  totalPatients: number;
  todaysBoard: Appointment[];
  recentBookings: Appointment[];
}

export const useDashboard = () =>
  useQuery({ queryKey: ['dashboard'], queryFn: () => apiGet<DashboardData>('/reception/dashboard'), refetchInterval: 30_000 });

export interface AppointmentsQuery {
  page?: number;
  pageSize?: number;
  status?: AppointmentStatus;
  doctorId?: number;
  scope?: 'today' | 'upcoming' | 'past' | 'all';
  from?: string;
  to?: string;
  search?: string;
}

export interface AppointmentsPage {
  data: Appointment[];
  meta: { page: number; pageSize: number; total: number; totalPages: number };
}

// The list endpoint returns a paginated envelope; fetch it raw to keep meta.
export const useAppointmentsList = (query: AppointmentsQuery) =>
  useQuery({
    queryKey: ['appointments-list', query],
    queryFn: async () => {
      const q = new URLSearchParams();
      Object.entries(query).forEach(([k, v]) => {
        if (v !== undefined && v !== '' && v !== null) q.set(k, String(v));
      });
      const { api } = await import('./api');
      const res = await api.get(`/reception/appointments?${q.toString()}`);
      return { data: res.data.data as Appointment[], meta: res.data.meta as AppointmentsPage['meta'] };
    },
  });

export const useAppointment = (id?: string | number) =>
  useQuery({
    queryKey: ['appointment', id],
    queryFn: () => apiGet<Appointment & { statusHistory: Appointment['statusHistory']; documents: { id: number; title: string; filePath: string }[] }>(`/reception/appointments/${id}`),
    enabled: !!id,
  });

// ── Mutations ─────────────────────────────────────────────────────────
export function useChangeStatus() {
  const qc = useQueryClient();
  return useMutation({
    mutationFn: ({ id, status, note }: { id: number; status: AppointmentStatus; note?: string }) =>
      apiPatch(`/reception/appointments/${id}/status`, { status, note }),
    onSuccess: () => invalidateAppointments(qc),
  });
}

export function useReschedule() {
  const qc = useQueryClient();
  return useMutation({
    mutationFn: ({ id, doctorId, date, startTime, note }: { id: number; doctorId?: number; date: string; startTime: string; note?: string }) =>
      apiPatch(`/reception/appointments/${id}/reschedule`, { doctorId, date, startTime, note }),
    onSuccess: () => invalidateAppointments(qc),
  });
}

export function useAssignDoctor() {
  const qc = useQueryClient();
  return useMutation({
    mutationFn: ({ id, doctorId, note }: { id: number; doctorId: number; note?: string }) =>
      apiPatch(`/reception/appointments/${id}/assign`, { doctorId, note }),
    onSuccess: () => invalidateAppointments(qc),
  });
}

function invalidateAppointments(qc: ReturnType<typeof useQueryClient>) {
  qc.invalidateQueries({ queryKey: ['appointments-list'] });
  qc.invalidateQueries({ queryKey: ['appointment'] });
  qc.invalidateQueries({ queryKey: ['dashboard'] });
}

// ── Notifications ─────────────────────────────────────────────────────
export const useNotifications = () =>
  useQuery({
    queryKey: ['notifications'],
    queryFn: () => apiGet<{ items: AppNotification[]; unreadCount: number }>('/notifications?take=15'),
    refetchInterval: 30_000,
  });

export function useMarkNotificationRead() {
  const qc = useQueryClient();
  return useMutation({
    mutationFn: (id: number) => apiPatch(`/notifications/${id}/read`),
    onSuccess: () => qc.invalidateQueries({ queryKey: ['notifications'] }),
  });
}

export function useMarkAllRead() {
  const qc = useQueryClient();
  return useMutation({
    mutationFn: () => apiPatch('/notifications/read-all'),
    onSuccess: () => qc.invalidateQueries({ queryKey: ['notifications'] }),
  });
}

// ── Patients ──────────────────────────────────────────────────────────
export const usePatients = (search: string, page: number) =>
  useQuery({
    queryKey: ['patients', search, page],
    queryFn: async () => {
      const q = new URLSearchParams({ page: String(page), pageSize: '15' });
      if (search) q.set('search', search);
      const { api } = await import('./api');
      const res = await api.get(`/patients?${q.toString()}`);
      return { data: res.data.data as PatientRow[], meta: res.data.meta };
    },
  });

export interface PatientRow {
  id: number;
  patientCode: string;
  fullName: string;
  firstName: string;
  lastName: string;
  mobile: string;
  email?: string | null;
  gender?: string | null;
  city?: string | null;
  createdAt: string;
}

export const usePatientDetail = (id?: string) =>
  useQuery({ queryKey: ['patient', id], queryFn: () => apiGet<any>(`/patients/${id}`), enabled: !!id });

export function useCreatePatient() {
  const qc = useQueryClient();
  return useMutation({
    mutationFn: (body: Record<string, unknown>) => apiPost('/patients', body),
    onSuccess: () => qc.invalidateQueries({ queryKey: ['patients'] }),
  });
}

// ── Slot management ───────────────────────────────────────────────────
export const useHolidays = () => useQuery({ queryKey: ['holidays'], queryFn: () => apiGet<any[]>('/slots/holidays') });
export const useBlocks = (doctorId?: number) =>
  useQuery({ queryKey: ['blocks', doctorId], queryFn: () => apiGet<any[]>(`/slots/blocks${doctorId ? `?doctorId=${doctorId}` : ''}`) });
export const useLeaves = () => useQuery({ queryKey: ['leaves'], queryFn: () => apiGet<any[]>('/slots/leaves') });
