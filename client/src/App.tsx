import { Routes, Route, Navigate } from 'react-router-dom';
import { ScrollManager } from './components/layout/ScrollManager';
import { PublicLayout } from './components/layout/PublicLayout';

import Home from './pages/public/Home';
import About from './pages/public/About';
import TreatmentsList from './pages/public/TreatmentsList';
import TreatmentDetail from './pages/public/TreatmentDetail';
import Dentist from './pages/public/Dentist';
import Reviews from './pages/public/Reviews';
import Contact from './pages/public/Contact';
import Booking from './pages/booking/Booking';
import { Privacy, Terms } from './pages/public/Legal';
import BlogList from './pages/public/BlogList';
import BlogDetail from './pages/public/BlogDetail';
import Gallery from './pages/public/Gallery';
import NotFound from './pages/public/NotFound';

// Frontend-only public website (routes per the client's reference design).
export default function App() {
  return (
    <>
      <ScrollManager />
      <Routes>
        <Route element={<PublicLayout />}>
          <Route path="/" element={<Home />} />
          <Route path="/about" element={<About />} />
          <Route path="/treatments" element={<TreatmentsList />} />
          <Route path="/treatments/:slug" element={<TreatmentDetail />} />
          <Route path="/dentist" element={<Dentist />} />
          <Route path="/reviews" element={<Reviews />} />
          <Route path="/book-appointment" element={<Booking />} />
          <Route path="/contact" element={<Contact />} />
          <Route path="/privacy" element={<Privacy />} />
          <Route path="/terms" element={<Terms />} />
          {/* Extra content pages (not in the main navigation) */}
          <Route path="/blog" element={<BlogList />} />
          <Route path="/blog/:slug" element={<BlogDetail />} />
          <Route path="/gallery" element={<Gallery />} />
        </Route>

        {/* Legacy paths from earlier builds */}
        <Route path="/book" element={<Navigate to="/book-appointment" replace />} />
        <Route path="/booking" element={<Navigate to="/book-appointment" replace />} />
        <Route path="/booking/:code" element={<Navigate to="/book-appointment" replace />} />
        <Route path="/doctors" element={<Navigate to="/dentist" replace />} />
        <Route path="/doctors/:slug" element={<Navigate to="/dentist" replace />} />
        <Route path="/testimonials" element={<Navigate to="/reviews" replace />} />
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
