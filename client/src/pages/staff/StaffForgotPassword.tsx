import { useState } from 'react';
import { Link } from 'react-router-dom';
import { Alert, Box, Button, Stack, TextField, Typography } from '@mui/material';
import { StaffShell } from './StaffShell';
import { apiPost, errorMessage } from '@/lib/api';

export default function StaffForgotPassword() {
  const [step, setStep] = useState<'request' | 'reset'>('request');
  const [email, setEmail] = useState('');
  const [otp, setOtp] = useState('');
  const [password, setPassword] = useState('');
  const [message, setMessage] = useState('');
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);

  const requestCode = async () => {
    setError('');
    setLoading(true);
    try {
      await apiPost('/auth/forgot-password', { email });
      setMessage('If that email exists, a reset code has been sent.');
      setStep('reset');
    } catch (e) {
      setError(errorMessage(e));
    } finally {
      setLoading(false);
    }
  };

  const resetPassword = async () => {
    setError('');
    setLoading(true);
    try {
      await apiPost('/auth/reset-password', { email, otp, password });
      setMessage('Password updated! You can now sign in.');
      setStep('request');
    } catch (e) {
      setError(errorMessage(e, 'Invalid or expired code.'));
    } finally {
      setLoading(false);
    }
  };

  return (
    <StaffShell title="Reset password" subtitle="We'll email you a one-time code to reset your staff account password.">
      {error && (
        <Alert severity="error" sx={{ mb: 2, borderRadius: 3 }}>
          {error}
        </Alert>
      )}
      {message && (
        <Alert severity="success" sx={{ mb: 2, borderRadius: 3 }}>
          {message}
        </Alert>
      )}

      {step === 'request' ? (
        <Stack spacing={2.5}>
          <TextField label="Work email" type="email" fullWidth value={email} onChange={(e) => setEmail(e.target.value)} />
          <Button variant="contained" size="large" onClick={requestCode} disabled={loading || !email}>
            {loading ? 'Sending…' : 'Send reset code'}
          </Button>
        </Stack>
      ) : (
        <Stack spacing={2.5}>
          <TextField label="6-digit code" fullWidth value={otp} onChange={(e) => setOtp(e.target.value)} />
          <TextField label="New password" type="password" fullWidth value={password} onChange={(e) => setPassword(e.target.value)} helperText="At least 8 characters" />
          <Button variant="contained" size="large" onClick={resetPassword} disabled={loading || !otp || password.length < 8}>
            {loading ? 'Updating…' : 'Update password'}
          </Button>
          <Button onClick={() => setStep('request')}>Use a different email</Button>
        </Stack>
      )}

      <Box sx={{ textAlign: 'center', mt: 3 }}>
        <Typography component={Link} to="/staff" variant="body2" sx={{ color: 'primary.main', textDecoration: 'none' }}>
          ← Back to sign in
        </Typography>
      </Box>
    </StaffShell>
  );
}
