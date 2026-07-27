import { Box, Card, Stack, Typography } from '@mui/material';
import type { ReactNode } from 'react';
import { alpha } from '@mui/material/styles';

export function StatCard({
  label,
  value,
  icon,
  color = '#1f6feb',
  hint,
}: {
  label: string;
  value: ReactNode;
  icon: ReactNode;
  color?: string;
  hint?: string;
}) {
  return (
    <Card sx={{ p: 2.5, height: '100%' }}>
      <Stack direction="row" justifyContent="space-between" alignItems="flex-start">
        <Box>
          <Typography variant="body2" color="text.secondary" sx={{ fontWeight: 600 }}>
            {label}
          </Typography>
          <Typography variant="h4" sx={{ fontWeight: 800, mt: 0.5, lineHeight: 1.1 }}>
            {value}
          </Typography>
          {hint && (
            <Typography variant="caption" color="text.secondary">
              {hint}
            </Typography>
          )}
        </Box>
        <Box sx={{ width: 48, height: 48, borderRadius: 3, display: 'grid', placeItems: 'center', color, bgcolor: alpha(color, 0.12) }}>
          {icon}
        </Box>
      </Stack>
    </Card>
  );
}
