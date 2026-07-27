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
  Chip,
  Typography,
  Link as MuiLink,
} from '@mui/material';
import MenuIcon from '@mui/icons-material/Menu';
import CloseIcon from '@mui/icons-material/Close';
import CallIcon from '@mui/icons-material/Call';
import EmailOutlinedIcon from '@mui/icons-material/EmailOutlined';
import AccessTimeIcon from '@mui/icons-material/AccessTime';
import FacebookIcon from '@mui/icons-material/Facebook';
import InstagramIcon from '@mui/icons-material/Instagram';
import YouTubeIcon from '@mui/icons-material/YouTube';
import { NavLink, useNavigate } from 'react-router-dom';
import { Logo } from './Logo';
import { CLINIC } from '@/lib/clinic';
import { brand } from '@/theme/theme';

const NAV_LINKS = [
  { label: 'Home', to: '/' },
  { label: 'About', to: '/about' },
  { label: 'Treatments', to: '/treatments' },
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
          bgcolor: 'rgba(255,255,255,0.92)',
          backdropFilter: 'saturate(180%) blur(14px)',
          borderBottom: `1px solid ${scrolled ? brand.line : 'transparent'}`,
          transition: 'border-color .3s ease',
        }}
      >
        {/* Slim contact strip */}
        <Box
          sx={{
            bgcolor: brand.mist,
            borderBottom: `1px solid ${brand.line}`,
            display: { xs: 'none', md: 'block' },
          }}
        >
          <Container>
            <Stack direction="row" justifyContent="space-between" alignItems="center" sx={{ height: 36 }}>
              <Stack direction="row" spacing={3} alignItems="center">
                <MuiLink href={`mailto:${CLINIC.email}`} underline="none" sx={{ display: 'inline-flex', alignItems: 'center', gap: 0.75 }}>
                  <EmailOutlinedIcon sx={{ fontSize: 15, color: brand.primary }} />
                  <Typography variant="caption" sx={{ color: 'text.secondary', fontWeight: 600 }}>
                    {CLINIC.email}
                  </Typography>
                </MuiLink>
                <MuiLink href={CLINIC.phoneHref} underline="none" sx={{ display: 'inline-flex', alignItems: 'center', gap: 0.75 }}>
                  <CallIcon sx={{ fontSize: 15, color: brand.primary }} />
                  <Typography variant="caption" sx={{ color: 'text.primary', fontWeight: 700 }}>
                    {CLINIC.phone}
                  </Typography>
                </MuiLink>
                <Stack direction="row" spacing={0.75} alignItems="center" sx={{ display: { xs: 'none', lg: 'inline-flex' } }}>
                  <AccessTimeIcon sx={{ fontSize: 15, color: brand.primary }} />
                  <Typography variant="caption" sx={{ color: 'text.secondary', fontWeight: 600 }}>
                    Mon–Fri 8:30–19:00 · Sat 9:00–15:00
                  </Typography>
                </Stack>
              </Stack>
              <Stack direction="row" spacing={0.5} alignItems="center">
                {[
                  { icon: <FacebookIcon sx={{ fontSize: 16 }} />, href: CLINIC.socials.facebook, label: 'Facebook' },
                  { icon: <InstagramIcon sx={{ fontSize: 16 }} />, href: CLINIC.socials.instagram, label: 'Instagram' },
                  { icon: <YouTubeIcon sx={{ fontSize: 17 }} />, href: CLINIC.socials.youtube, label: 'YouTube' },
                ].map((s) => (
                  <IconButton
                    key={s.label}
                    component="a"
                    href={s.href}
                    target="_blank"
                    rel="noopener noreferrer"
                    aria-label={s.label}
                    size="small"
                    sx={{ color: brand.primary, '&:hover': { bgcolor: brand.cloud } }}
                  >
                    {s.icon}
                  </IconButton>
                ))}
              </Stack>
            </Stack>
          </Container>
        </Box>

        {/* Main navigation */}
        <Container>
          <Toolbar disableGutters sx={{ minHeight: { xs: 64, md: 72 }, gap: 2 }}>
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
                    px: 1.6,
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

            <Stack direction="row" spacing={1.5} alignItems="center" sx={{ display: { xs: 'none', md: 'flex' }, ml: 2 }}>
              <Button variant="contained" onClick={() => navigate('/book')}>
                Book Appointment
              </Button>
            </Stack>

            <IconButton
              onClick={() => setOpen(true)}
              sx={{ display: { xs: 'inline-flex', lg: 'none' }, ml: 1, color: 'text.primary' }}
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
        PaperProps={{ sx: { width: { xs: '82%', sm: 360 }, p: 2.5, borderRadius: '20px 0 0 20px' } }}
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
              sx={{ borderRadius: 2, mb: 0.5, '&.active': { bgcolor: brand.cloud, color: 'primary.main' } }}
            >
              <ListItemText primaryTypographyProps={{ fontWeight: 600 }}>{link.label}</ListItemText>
            </ListItemButton>
          ))}
        </List>
        <Divider sx={{ my: 1.5 }} />
        <Stack spacing={1.5} sx={{ mt: 1 }}>
          <Button variant="contained" size="large" onClick={() => { setOpen(false); navigate('/book'); }}>
            Book Appointment
          </Button>
          <Chip
            component="a"
            clickable
            variant="outlined"
            icon={<CallIcon />}
            label={`Call: ${CLINIC.phone}`}
            href={CLINIC.phoneHref}
            sx={{ py: 2.4, fontWeight: 700, color: 'primary.main', borderColor: 'primary.main' }}
          />
        </Stack>
      </Drawer>
    </>
  );
}
