import { Box, CircularProgress, Typography, Button } from '@mui/material';
import SentimentDissatisfiedIcon from '@mui/icons-material/SentimentDissatisfied';
import ErrorOutlineIcon from '@mui/icons-material/ErrorOutline';
import type { ReactNode } from 'react';

export function Loader({ label, minHeight = 240 }: { label?: string; minHeight?: number | string }) {
  return (
    <Box sx={{ display: 'grid', placeItems: 'center', minHeight, gap: 2, py: 4 }}>
      <CircularProgress />
      {label && (
        <Typography color="text.secondary" variant="body2">
          {label}
        </Typography>
      )}
    </Box>
  );
}

export function EmptyState({ title, description, icon, action }: { title: string; description?: string; icon?: ReactNode; action?: ReactNode }) {
  return (
    <Box sx={{ textAlign: 'center', py: 6, px: 2, color: 'text.secondary' }}>
      <Box sx={{ fontSize: 0, mb: 1.5, color: 'text.disabled' }}>
        {icon ?? <SentimentDissatisfiedIcon sx={{ fontSize: 56 }} />}
      </Box>
      <Typography variant="h6" color="text.primary" sx={{ mb: 0.5 }}>
        {title}
      </Typography>
      {description && <Typography variant="body2">{description}</Typography>}
      {action && <Box sx={{ mt: 2.5 }}>{action}</Box>}
    </Box>
  );
}

export function ErrorState({ message, onRetry }: { message?: string; onRetry?: () => void }) {
  return (
    <Box sx={{ textAlign: 'center', py: 6, color: 'text.secondary' }}>
      <ErrorOutlineIcon color="error" sx={{ fontSize: 56, mb: 1 }} />
      <Typography variant="h6" color="text.primary" sx={{ mb: 0.5 }}>
        Something went wrong
      </Typography>
      <Typography variant="body2" sx={{ mb: 2 }}>
        {message ?? 'Please try again in a moment.'}
      </Typography>
      {onRetry && (
        <Button variant="outlined" onClick={onRetry}>
          Retry
        </Button>
      )}
    </Box>
  );
}
