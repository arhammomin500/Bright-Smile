import { Routes, Route, Navigate } from 'react-router-dom';
import { ScrollManager } from './components/layout/ScrollManager';
import { PublicLayout } from './components/layout/PublicLayout';
import { DashboardLayout } from './components/dashboard/DashboardLayout';
import { RequireAuth } from './auth/RequireAuth';

// Public marketing pages
import Home from './pages/public/Home';
import About from './pages/public/About';
import DoctorsList from './pages/public/DoctorsList';
import DoctorDetail from './pages/public/DoctorDetail';
import TreatmentsList from './pages/public/TreatmentsList';
import TreatmentDetail from './pages/public/TreatmentDetail';
import Gallery from './pages/public/Gallery';
import Testimonials from './pages/public/Testimonials';
import BlogList from './pages/public/BlogList';
import BlogDetail from './pages/public/BlogDetail';
import Contact from './pages/public/Contact';
import NotFound from './pages/public/NotFound';

// Booking (no login required)
import Booking from './pages/booking/Booking';
import BookingStatus from './pages/booking/BookingStatus';

// Staff portal (intentionally NOT linked anywhere on the public site)
import StaffLogin from './pages/staff/StaffLogin';
import StaffForgotPassword from './pages/staff/StaffForgotPassword';
import ReceptionDashboard from './pages/dashboard/ReceptionDashboard';
import DoctorDashboard from './pages/dashboard/DoctorDashboard';
import AppointmentsList from './pages/dashboard/AppointmentsList';
import AppointmentDetail from './pages/dashboard/AppointmentDetail';
import PatientsList from './pages/dashboard/PatientsList';
import PatientDetail from './pages/dashboard/PatientDetail';
import SlotManagement from './pages/dashboard/SlotManagement';

export default function App() {
  return (
    <>
      <ScrollManager />
      <Routes>
        {/* ── Public website (marketing + guest booking only) ── */}
        <Route element={<PublicLayout />}>
          <Route path="/" element={<Home />} />
          <Route path="/about" element={<About />} />
          <Route path="/doctors" element={<DoctorsList />} />
          <Route path="/doctors/:slug" element={<DoctorDetail />} />
          <Route path="/treatments" element={<TreatmentsList />} />
          <Route path="/treatments/:slug" element={<TreatmentDetail />} />
          <Route path="/gallery" element={<Gallery />} />
          <Route path="/testimonials" element={<Testimonials />} />
          <Route path="/blog" element={<BlogList />} />
          <Route path="/blog/:slug" element={<BlogDetail />} />
          <Route path="/contact" element={<Contact />} />
          <Route path="/book" element={<Booking />} />
          <Route path="/booking" element={<BookingStatus />} />
          <Route path="/booking/:code" element={<BookingStatus />} />
        </Route>

        {/* ── Staff portal (unlinked, secure URL) ── */}
        <Route path="/staff" element={<StaffLogin />} />
        <Route path="/staff/forgot-password" element={<StaffForgotPassword />} />
        <Route
          element={
            <RequireAuth roles={['RECEPTION', 'ADMIN', 'DOCTOR']}>
              <DashboardLayout />
            </RequireAuth>
          }
        >
          {/* Shared modules (all staff) */}
          <Route path="/staff/appointments" element={<AppointmentsList />} />
          <Route path="/staff/appointments/:id" element={<AppointmentDetail />} />
          <Route path="/staff/patients" element={<PatientsList />} />
          <Route path="/staff/patients/:id" element={<PatientDetail />} />
          {/* Reception / Admin only */}
          <Route
            path="/staff/reception"
            element={
              <RequireAuth roles={['RECEPTION', 'ADMIN']}>
                <ReceptionDashboard />
              </RequireAuth>
            }
          />
          <Route
            path="/staff/slots"
            element={
              <RequireAuth roles={['RECEPTION', 'ADMIN']}>
                <SlotManagement />
              </RequireAuth>
            }
          />
          {/* Doctor view — also open to the main doctor (ADMIN with a linked profile) */}
          <Route
            path="/staff/doctor"
            element={
              <RequireAuth roles={['DOCTOR', 'ADMIN']}>
                <DoctorDashboard />
              </RequireAuth>
            }
          />
        </Route>

        {/* Legacy paths — all go to the public home so none of them reveal
            the staff portal URL to path-guessers. */}
        <Route path="/dashboard/*" element={<Navigate to="/" replace />} />
        <Route path="/portal" element={<Navigate to="/" replace />} />
        <Route path="/login" element={<Navigate to="/" replace />} />
        <Route path="/register" element={<Navigate to="/" replace />} />

        <Route path="*" element={<NotFound />} />
      </Routes>
    </>
  );
}
