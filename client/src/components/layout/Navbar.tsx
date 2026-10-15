import { useState } from 'react';
import {
  AppBar,
  Box,
  Button,
  Container,
  Drawer,
  IconButton,
  List,
  ListItemButton,
  ListItemText,
  Stack,
  Toolbar,
  useScrollTrigger,
  Divider,
  Typography,
  Link as MuiLink,
} from '@mui/material';
import MenuIcon from '@mui/icons-material/Menu';
import CloseIcon from '@mui/icons-material/Close';
import CallIcon from '@mui/icons-material/Call';
import { NavLink, useNavigate } from 'react-router-dom';
import { Logo } from './Logo';
import { CLINIC } from '@/lib/clinic';
import { brand } from '@/theme/theme';

// Reference header: single white bar — logo | nav links | phone + CTA.
const NAV_LINKS = [
  { label: 'Home', to: '/' },
  { label: 'About', to: '/about' },
  { label: 'Treatments', to: '/treatments' },
  { label: 'Our Dentist', to: '/dentist' },
  { label: 'Reviews', to: '/reviews' },
  { label: 'Contact', to: '/contact' },
];

export function Navbar() {
  const [open, setOpen] = useState(false);
  const navigate = useNavigate();
  const scrolled = useScrollTrigger({ disableHysteresis: true, threshold: 24 });

  return (
    <>
      <AppBar
        position="fixed"
        elevation={0}
        sx={{
          bgcolor: 'rgba(255,255,255,0.96)',
          backdropFilter: 'saturate(180%) blur(12px)',
          borderBottom: `1px solid ${scrolled ? brand.line : 'transparent'}`,
          transition: 'border-color .3s ease',
        }}
      >
        <Container>
          <Toolbar disableGutters sx={{ minHeight: { xs: 62, md: 72 }, gap: 1.5 }}>
            <Logo />
            <Box sx={{ flexGrow: 1 }} />

            <Stack direction="row" spacing={0.25} sx={{ display: { xs: 'none', lg: 'flex' } }}>
              {NAV_LINKS.map((link) => (
                <Button
                  key={link.to}
                  component={NavLink}
                  to={link.to}
                  end={link.to === '/'}
                  sx={{
                    color: 'text.secondary',
                    fontWeight: 600,
                    px: 1.5,
                    borderRadius: 2,
                    fontSize: 15,
                    '&.active': { color: 'primary.main' },
                    '&:hover': { bgcolor: brand.cloud, color: 'text.primary' },
                  }}
                >
                  {link.label}
                </Button>
              ))}
            </Stack>

            <Stack direction="row" spacing={1.75} alignItems="center" sx={{ display: { xs: 'none', md: 'flex' }, ml: 1.5 }}>
              <MuiLink href={CLINIC.phoneHref} underline="none" sx={{ display: { xs: 'none', xl: 'inline-flex' }, alignItems: 'center', gap: 0.75 }}>
                <CallIcon sx={{ fontSize: 17, color: brand.primary }} />
                <Typography sx={{ fontWeight: 700, fontSize: 14.5, color: 'text.primary' }}>{CLINIC.phone}</Typography>
              </MuiLink>
              <Button variant="contained" onClick={() => navigate('/book-appointment')}>
                Book Appointment
              </Button>
            </Stack>

            <IconButton
              onClick={() => setOpen(true)}
              sx={{ display: { xs: 'inline-flex', lg: 'none' }, ml: 0.5, color: 'text.primary' }}
              aria-label="Open menu"
            >
              <MenuIcon />
            </IconButton>
          </Toolbar>
        </Container>
      </AppBar>

      {/* Mobile drawer */}
      <Drawer
        anchor="right"
        open={open}
        onClose={() => setOpen(false)}
        PaperProps={{ sx: { width: { xs: '82%', sm: 360 }, p: 2.5 } }}
      >
        <Stack direction="row" justifyContent="space-between" alignItems="center" sx={{ mb: 2 }}>
          <Logo />
          <IconButton onClick={() => setOpen(false)} aria-label="Close menu">
            <CloseIcon />
          </IconButton>
        </Stack>
        <Divider sx={{ mb: 1 }} />
        <List>
          {NAV_LINKS.map((link) => (
            <ListItemButton
              key={link.to}
              component={NavLink}
              to={link.to}
              end={link.to === '/'}
              onClick={() => setOpen(false)}
              sx={{ borderRadius: 2, mb: 0.5, minHeight: 48, '&.active': { bgcolor: brand.cloud, color: 'primary.main' } }}
            >
              <ListItemText primaryTypographyProps={{ fontWeight: 600 }}>{link.label}</ListItemText>
            </ListItemButton>
          ))}
        </List>
        <Divider sx={{ my: 1.5 }} />
        <Stack spacing={1.5} sx={{ mt: 1 }}>
          <Button variant="contained" size="large" onClick={() => { setOpen(false); navigate('/book-appointment'); }}>
            Book Appointment
          </Button>
          <Button variant="outlined" size="large" startIcon={<CallIcon />} component="a" href={CLINIC.phoneHref}>
            {CLINIC.phone}
          </Button>
        </Stack>
      </Drawer>
    </>
  );
}
