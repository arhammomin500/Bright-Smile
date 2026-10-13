import { Routes, Route, Navigate } from 'react-router-dom';
import { ScrollManager } from './components/layout/ScrollManager';
import { PublicLayout } from './components/layout/PublicLayout';

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
import Booking from './pages/booking/Booking';

// Frontend-only public website — no backend, no admin, no auth.
export default function App() {
  return (
    <>
      <ScrollManager />
      <Routes>
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
        </Route>

        {/* Legacy paths from the previous full-stack build */}
        <Route path="/booking" element={<Navigate to="/book" replace />} />
        <Route path="/booking/:code" element={<Navigate to="/book" replace />} />
        <Route path="/staff/*" element={<Navigate to="/" replace />} />
        <Route path="/dashboard/*" element={<Navigate to="/" replace />} />
        <Route path="/login" element={<Navigate to="/" replace />} />
        <Route path="/register" element={<Navigate to="/" replace />} />
        <Route path="/portal" element={<Navigate to="/" replace />} />

        <Route path="*" element={<NotFound />} />
      </Routes>
    </>
  );
}
