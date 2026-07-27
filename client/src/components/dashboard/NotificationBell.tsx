import { useState } from 'react';
import { Badge, Box, Button, Divider, IconButton, Menu, Stack, Typography } from '@mui/material';
import NotificationsNoneIcon from '@mui/icons-material/NotificationsNone';
import CircleIcon from '@mui/icons-material/Circle';
import { useNotifications, useMarkAllRead, useMarkNotificationRead } from '@/lib/dashboardQueries';
import { formatDate } from '@/lib/format';

export function NotificationBell() {
  const [anchor, setAnchor] = useState<null | HTMLElement>(null);
  const { data } = useNotifications();
  const markAll = useMarkAllRead();
  const markOne = useMarkNotificationRead();

  const items = data?.items ?? [];
  const unread = data?.unreadCount ?? 0;

  return (
    <>
      <IconButton onClick={(e) => setAnchor(e.currentTarget)} aria-label="Notifications">
        <Badge badgeContent={unread} color="error" max={99}>
          <NotificationsNoneIcon />
        </Badge>
      </IconButton>
      <Menu
        anchorEl={anchor}
        open={!!anchor}
        onClose={() => setAnchor(null)}
        PaperProps={{ sx: { width: 360, maxWidth: '92vw', maxHeight: 460, borderRadius: 3, mt: 1 } }}
        transformOrigin={{ horizontal: 'right', vertical: 'top' }}
        anchorOrigin={{ horizontal: 'right', vertical: 'bottom' }}
      >
        <Stack direction="row" justifyContent="space-between" alignItems="center" sx={{ px: 2, py: 1.5 }}>
          <Typography sx={{ fontWeight: 700 }}>Notifications</Typography>
          {unread > 0 && (
            <Button size="small" onClick={() => markAll.mutate()}>
              Mark all read
            </Button>
          )}
        </Stack>
        <Divider />
        {items.length === 0 ? (
          <Box sx={{ p: 4, textAlign: 'center', color: 'text.secondary' }}>
            <NotificationsNoneIcon sx={{ fontSize: 40, mb: 1, opacity: 0.4 }} />
            <Typography variant="body2">You're all caught up</Typography>
          </Box>
        ) : (
          items.map((n) => (
            <Box
              key={n.id}
              onClick={() => !n.isRead && markOne.mutate(n.id)}
              sx={{
                px: 2,
                py: 1.5,
                cursor: 'pointer',
                bgcolor: n.isRead ? 'transparent' : 'rgba(31,111,235,0.05)',
                '&:hover': { bgcolor: 'rgba(31,111,235,0.09)' },
                borderBottom: '1px solid rgba(15,30,61,0.05)',
              }}
            >
              <Stack direction="row" spacing={1.2} alignItems="flex-start">
                {!n.isRead && <CircleIcon sx={{ fontSize: 9, color: 'primary.main', mt: 0.7 }} />}
                <Box sx={{ flex: 1, minWidth: 0, pl: n.isRead ? 2.2 : 0 }}>
                  <Typography variant="body2" sx={{ fontWeight: 700 }}>
                    {n.title}
                  </Typography>
                  <Typography variant="body2" color="text.secondary" sx={{ mb: 0.3 }}>
                    {n.message}
                  </Typography>
                  <Typography variant="caption" color="text.disabled">
                    {formatDate(n.createdAt, { month: 'short', day: 'numeric', hour: 'numeric', minute: '2-digit' })}
                  </Typography>
                </Box>
              </Stack>
            </Box>
          ))
        )}
      </Menu>
    </>
  );
}
