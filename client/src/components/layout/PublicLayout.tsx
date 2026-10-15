import { Box } from '@mui/material';
import { Outlet } from 'react-router-dom';
import { Navbar } from './Navbar';
import { CtaBand } from './CtaBand';
import { Footer } from './Footer';
import { FloatingActions } from './FloatingActions';
import { MobileBookingBar } from './MobileBookingBar';

// Shell for all public pages: nav on top, blue CTA band + navy footer below,
// floating WhatsApp + fixed mobile booking bar (per the reference design).
export function PublicLayout() {
  return (
    <Box sx={{ display: 'flex', flexDirection: 'column', minHeight: '100vh' }}>
      <Navbar />
      <Box component="main" sx={{ flex: 1 }}>
        <Outlet />
      </Box>
      <CtaBand />
      <Footer />
      <FloatingActions />
      <MobileBookingBar />
    </Box>
  );
}
