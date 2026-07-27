import { useState } from 'react';
import { NavLink, Outlet, useNavigate } from 'react-router-dom';
import {
  AppBar,
  Avatar,
  Box,
  Divider,
  Drawer,
  IconButton,
  List,
  ListItemButton,
  ListItemIcon,
  ListItemText,
  Menu,
  MenuItem,
  Toolbar,
  Typography,
  useMediaQuery,
  useTheme,
} from '@mui/material';
import MenuIcon from '@mui/icons-material/Menu';
import DashboardIcon from '@mui/icons-material/Dashboard';
import EventNoteIcon from '@mui/icons-material/EventNote';
import PeopleIcon from '@mui/icons-material/People';
import EventBusyIcon from '@mui/icons-material/EventBusy';
import LogoutIcon from '@mui/icons-material/Logout';
import LaunchIcon from '@mui/icons-material/Launch';
import { Logo } from '@/components/layout/Logo';
import { NotificationBell } from './NotificationBell';
import { useAuth } from '@/auth/AuthContext';
import { useNoIndex } from '@/lib/useNoIndex';
import type { Role } from '@/lib/types';

const DRAWER_WIDTH = 264;

interface NavItem {
  label: string;
  to: string;
  icon: React.ReactNode;
  roles: Role[]; // RBAC: which staff roles see this module
}

// Single source of truth for staff navigation & module access.
// "My Day" additionally requires a linked doctor profile (the main doctor is
// an ADMIN with a doctorId, so she sees both the full dashboard and her day).
const NAV: (NavItem & { needsDoctorProfile?: boolean })[] = [
  { label: 'Dashboard', to: '/staff/reception', icon: <DashboardIcon />, roles: ['RECEPTION', 'ADMIN'] },
  { label: 'My Day', to: '/staff/doctor', icon: <DashboardIcon />, roles: ['DOCTOR', 'ADMIN'], needsDoctorProfile: true },
  { label: 'Appointments', to: '/staff/appointments', icon: <EventNoteIcon />, roles: ['RECEPTION', 'ADMIN', 'DOCTOR'] },
  { label: 'Patients', to: '/staff/patients', icon: <PeopleIcon />, roles: ['RECEPTION', 'ADMIN', 'DOCTOR'] },
  { label: 'Slot Management', to: '/staff/slots', icon: <EventBusyIcon />, roles: ['RECEPTION', 'ADMIN'] },
];

const ROLE_LABEL: Record<string, string> = {
  ADMIN: 'Administrator',
  RECEPTION: 'Reception',
  DOCTOR: 'Doctor',
};

export function DashboardLayout() {
  useNoIndex();
  const theme = useTheme();
  const isDesktop = useMediaQuery(theme.breakpoints.up('md'));
  const [mobileOpen, setMobileOpen] = useState(false);
  const [userMenu, setUserMenu] = useState<null | HTMLElement>(null);
  const { user, logout } = useAuth();
  const navigate = useNavigate();

  const navItems = NAV.filter(
    (n) => user && n.roles.includes(user.role) && (!n.needsDoctorProfile || user.doctorId),
  );

  const drawer = (
    <Box sx={{ display: 'flex', flexDirection: 'column', height: '100%' }}>
      <Box sx={{ p: 2.5 }}>
        <Logo />
      </Box>
      <Divider />
      <List sx={{ px: 1.5, py: 2, flex: 1 }}>
        {navItems.map((item) => (
          <ListItemButton
            key={item.to}
            component={NavLink}
            to={item.to}
            end={item.to === '/staff/reception' || item.to === '/staff/doctor'}
            onClick={() => setMobileOpen(false)}
            sx={{
              borderRadius: 3,
              mb: 0.5,
              color: 'text.secondary',
              '&.active': { bgcolor: 'primary.main', color: '#fff', '& .MuiListItemIcon-root': { color: '#fff' } },
              '&:hover': { bgcolor: 'rgba(31,111,235,0.08)' },
            }}
          >
            <ListItemIcon sx={{ minWidth: 40, color: 'inherit' }}>{item.icon}</ListItemIcon>
            <ListItemText primaryTypographyProps={{ fontWeight: 600 }}>{item.label}</ListItemText>
          </ListItemButton>
        ))}
      </List>
      <Divider />
      <Box sx={{ p: 2 }}>
        <ListItemButton component={NavLink} to="/" sx={{ borderRadius: 3, color: 'text.secondary' }}>
          <ListItemIcon sx={{ minWidth: 40 }}>
            <LaunchIcon />
          </ListItemIcon>
          <ListItemText primaryTypographyProps={{ fontWeight: 600 }}>View Website</ListItemText>
        </ListItemButton>
      </Box>
    </Box>
  );

  return (
    <Box sx={{ display: 'flex', minHeight: '100vh', bgcolor: '#f4f7fc' }}>
      {/* Sidebar */}
      <Box component="nav" sx={{ width: { md: DRAWER_WIDTH }, flexShrink: { md: 0 } }}>
        {isDesktop ? (
          <Drawer variant="permanent" open PaperProps={{ sx: { width: DRAWER_WIDTH, borderRight: '1px solid rgba(15,30,61,0.06)' } }}>
            {drawer}
          </Drawer>
        ) : (
          <Drawer
            variant="temporary"
            open={mobileOpen}
            onClose={() => setMobileOpen(false)}
            ModalProps={{ keepMounted: true }}
            PaperProps={{ sx: { width: DRAWER_WIDTH } }}
          >
            {drawer}
          </Drawer>
        )}
      </Box>

      {/* Main */}
      <Box sx={{ flex: 1, minWidth: 0, display: 'flex', flexDirection: 'column' }}>
        <AppBar position="sticky" elevation={0} sx={{ bgcolor: 'rgba(255,255,255,0.85)', backdropFilter: 'blur(12px)', borderBottom: '1px solid rgba(15,30,61,0.06)' }}>
          <Toolbar sx={{ gap: 1 }}>
            {!isDesktop && (
              <IconButton edge="start" onClick={() => setMobileOpen(true)} aria-label="Open menu">
                <MenuIcon />
              </IconButton>
            )}
            <Typography variant="h6" sx={{ fontWeight: 700, display: { xs: 'none', sm: 'block' } }}>
              Staff Portal
            </Typography>
            <Box sx={{ flexGrow: 1 }} />
            <NotificationBell />
            <IconButton onClick={(e) => setUserMenu(e.currentTarget)} sx={{ ml: 0.5 }}>
              <Avatar src={user?.avatarUrl ?? undefined} sx={{ width: 36, height: 36, bgcolor: 'primary.main', fontSize: 15 }}>
                {user?.firstName?.[0]}
                {user?.lastName?.[0]}
              </Avatar>
            </IconButton>
            <Menu anchorEl={userMenu} open={!!userMenu} onClose={() => setUserMenu(null)} PaperProps={{ sx: { borderRadius: 3, minWidth: 200, mt: 1 } }}>
              <Box sx={{ px: 2, py: 1 }}>
                <Typography sx={{ fontWeight: 700 }}>
                  {user?.firstName} {user?.lastName}
                </Typography>
                <Typography variant="caption" color="text.secondary">
                  {user?.email}
                </Typography>
                <Typography variant="caption" sx={{ display: 'block', color: 'primary.main', fontWeight: 700, mt: 0.3 }}>
                  {ROLE_LABEL[user?.role ?? ''] ?? user?.role}
                </Typography>
              </Box>
              <Divider />
              <MenuItem
                onClick={async () => {
                  setUserMenu(null);
                  await logout();
                  navigate('/staff');
                }}
              >
                <ListItemIcon>
                  <LogoutIcon fontSize="small" />
                </ListItemIcon>
                Sign out
              </MenuItem>
            </Menu>
          </Toolbar>
        </AppBar>

        <Box component="main" sx={{ flex: 1, p: { xs: 2, sm: 3, md: 4 } }}>
          <Outlet />
        </Box>
      </Box>
    </Box>
  );
}
