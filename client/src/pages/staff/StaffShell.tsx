import { Box, Container, Stack, Typography } from '@mui/material';
import ShieldOutlinedIcon from '@mui/icons-material/ShieldOutlined';
import { Logo } from '@/components/layout/Logo';
import { gradients } from '@/theme/theme';
import { useNoIndex } from '@/lib/useNoIndex';
import type { ReactNode } from 'react';

const POINTS = [
  'Role-based access — you only see your modules',
  'All activity is logged for clinic records',
  'Sessions expire automatically for safety',
];

// Split-screen shell for the internal staff portal (login / reset pages).
// Intentionally carries no links back into the public website chrome.
export function StaffShell({ title, subtitle, children }: { title: string; subtitle?: string; children: ReactNode }) {
  useNoIndex();
  return (
    <Box sx={{ minHeight: '100vh', display: 'flex' }}>
      <Box
        sx={{
          display: { xs: 'none', md: 'flex' },
          flexDirection: 'column',
          justifyContent: 'space-between',
          width: '45%',
          p: 6,
          background: gradients.hero,
          color: '#fff',
          position: 'relative',
          overflow: 'hidden',
        }}
      >
        <Box sx={{ position: 'absolute', inset: 0, backgroundImage: 'radial-gradient(circle at 20% 30%, rgba(255,255,255,0.15), transparent 40%), radial-gradient(circle at 80% 80%, rgba(34,193,195,0.3), transparent 45%)' }} />
        <Box sx={{ position: 'relative', '& *': { color: '#fff' } }}>
          <Logo light />
        </Box>
        <Box sx={{ position: 'relative' }}>
          <Typography variant="overline" sx={{ letterSpacing: 2, color: 'rgba(255,255,255,0.7)', fontWeight: 700 }}>
            Internal Staff Portal
          </Typography>
          <Typography variant="h3" sx={{ fontSize: '2.1rem', mb: 2, mt: 0.5 }}>
            Clinic operations, in one place.
          </Typography>
          <Stack spacing={1.5}>
            {POINTS.map((p) => (
              <Stack key={p} direction="row" spacing={1.5} alignItems="center">
                <ShieldOutlinedIcon sx={{ color: '#a8e0ff' }} />
                <Typography sx={{ color: 'rgba(255,255,255,0.92)' }}>{p}</Typography>
              </Stack>
            ))}
          </Stack>
        </Box>
        <Typography variant="body2" sx={{ position: 'relative', color: 'rgba(255,255,255,0.6)' }}>
          Authorized personnel only · © {new Date().getFullYear()} Bright Smile Dental Clinic
        </Typography>
      </Box>

      <Box sx={{ flex: 1, display: 'flex', alignItems: 'center', justifyContent: 'center', p: { xs: 3, md: 6 } }}>
        <Container maxWidth="xs" disableGutters>
          <Box sx={{ display: { xs: 'block', md: 'none' }, mb: 4 }}>
            <Logo />
          </Box>
          <Typography variant="h4" sx={{ mb: 1 }}>
            {title}
          </Typography>
          {subtitle && (
            <Typography color="text.secondary" sx={{ mb: 3 }}>
              {subtitle}
            </Typography>
          )}
          {children}
        </Container>
      </Box>
    </Box>
  );
}
