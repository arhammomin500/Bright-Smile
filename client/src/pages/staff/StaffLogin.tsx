import { useState } from 'react';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { z } from 'zod';
import { Link, useNavigate, useLocation, Navigate } from 'react-router-dom';
import { Alert, Box, Button, Divider, Stack, TextField, Typography, InputAdornment, IconButton } from '@mui/material';
import Visibility from '@mui/icons-material/Visibility';
import VisibilityOff from '@mui/icons-material/VisibilityOff';
import { StaffShell } from './StaffShell';
import { useAuth } from '@/auth/AuthContext';
import { errorMessage } from '@/lib/api';
import type { Role } from '@/lib/types';

const schema = z.object({
  email: z.string().email('Enter a valid email'),
  password: z.string().min(1, 'Password is required'),
});
type FormValues = z.infer<typeof schema>;

// Where each staff role lands after sign-in.
export function staffHome(role: Role): string {
  return role === 'DOCTOR' ? '/staff/doctor' : '/staff/reception';
}

export default function StaffLogin() {
  const { user, login, logout } = useAuth();
  const navigate = useNavigate();
  const location = useLocation();
  const [error, setError] = useState('');
  const [showPw, setShowPw] = useState(false);

  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
    setValue,
  } = useForm<FormValues>({ resolver: zodResolver(schema) });

  // Already signed in as staff? Straight to their dashboard.
  if (user && user.role !== 'PATIENT') {
    return <Navigate to={staffHome(user.role)} replace />;
  }

  const onSubmit = async (values: FormValues) => {
    setError('');
    try {
      const u = await login(values.email, values.password);
      if (u.role === 'PATIENT') {
        // Patients have no portal — this entrance is staff-only.
        await logout();
        setError('This portal is for clinic staff only.');
        return;
      }
      const from = (location.state as { from?: string })?.from;
      navigate(from && from.startsWith('/staff/') ? from : staffHome(u.role), { replace: true });
    } catch (e) {
      setError(errorMessage(e, 'Invalid email or password.'));
    }
  };

  const fillDemo = (email: string, password: string) => {
    setValue('email', email);
    setValue('password', password);
  };

  return (
    <StaffShell title="Staff sign in" subtitle="One login for reception and doctors — you'll be taken to your own dashboard.">
      {error && (
        <Alert severity="error" sx={{ mb: 2, borderRadius: 3 }}>
          {error}
        </Alert>
      )}
      <Box component="form" onSubmit={handleSubmit(onSubmit)} noValidate>
        <Stack spacing={2.5}>
          <TextField label="Work email" type="email" fullWidth autoFocus {...register('email')} error={!!errors.email} helperText={errors.email?.message} />
          <TextField
            label="Password"
            type={showPw ? 'text' : 'password'}
            fullWidth
            {...register('password')}
            error={!!errors.password}
            helperText={errors.password?.message}
            InputProps={{
              endAdornment: (
                <InputAdornment position="end">
                  <IconButton onClick={() => setShowPw((s) => !s)} edge="end" aria-label="Toggle password visibility">
                    {showPw ? <VisibilityOff /> : <Visibility />}
                  </IconButton>
                </InputAdornment>
              ),
            }}
          />
          <Box sx={{ textAlign: 'right' }}>
            <Typography component={Link} to="/staff/forgot-password" variant="body2" sx={{ color: 'primary.main', textDecoration: 'none' }}>
              Forgot password?
            </Typography>
          </Box>
          <Button type="submit" variant="contained" size="large" disabled={isSubmitting}>
            {isSubmitting ? 'Signing in…' : 'Sign In'}
          </Button>
        </Stack>
      </Box>

      {/* Dev-only convenience — remove before production deploy. */}
      <Divider sx={{ my: 3 }}>Demo accounts</Divider>
      <Stack direction="row" spacing={1} flexWrap="wrap" useFlexGap justifyContent="center">
        <Button size="small" variant="outlined" onClick={() => fillDemo('reception@brightsmile.com', 'Reception@123')}>
          Reception
        </Button>
        <Button size="small" variant="outlined" onClick={() => fillDemo('dr.afaque@brightsmile.com', 'Doctor@123')}>
          Dr. Afaque Khan
        </Button>
      </Stack>
    </StaffShell>
  );
}
