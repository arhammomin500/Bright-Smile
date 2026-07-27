import { Navigate, useLocation } from 'react-router-dom';
import { Box, CircularProgress } from '@mui/material';
import { useAuth } from './AuthContext';
import type { Role } from '@/lib/types';

// Guards staff-portal routes. Unauthenticated visitors are sent to the staff
// login; authenticated users outside the allowed roles go to their own home.
export function RequireAuth({ roles, children }: { roles?: Role[]; children: React.ReactNode }) {
  const { user, loading } = useAuth();
  const location = useLocation();

  if (loading) {
    return (
      <Box sx={{ display: 'grid', placeItems: 'center', minHeight: '60vh' }}>
        <CircularProgress />
      </Box>
    );
  }

  if (!user || user.role === 'PATIENT') {
    // Patients have no portal; anyone unauthenticated signs in at /staff.
    return <Navigate to="/staff" state={{ from: location.pathname }} replace />;
  }

  if (roles && !roles.includes(user.role)) {
    return <Navigate to={user.role === 'DOCTOR' ? '/staff/doctor' : '/staff/reception'} replace />;
  }

  return <>{children}</>;
}
