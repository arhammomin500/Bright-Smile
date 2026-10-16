import { Box, Container, Stack, Typography, IconButton, Divider, Link as MuiLink } from '@mui/material';
import Grid from '@mui/material/Grid2';
import { Link } from 'react-router-dom';
import FacebookIcon from '@mui/icons-material/Facebook';
import InstagramIcon from '@mui/icons-material/Instagram';
import YouTubeIcon from '@mui/icons-material/YouTube';
import CallIcon from '@mui/icons-material/Call';
import EmailOutlinedIcon from '@mui/icons-material/EmailOutlined';
import PlaceIcon from '@mui/icons-material/Place';
import AccessTimeIcon from '@mui/icons-material/AccessTime';
import { Logo } from './Logo';
import { CLINIC } from '@/lib/clinic';

// Dark navy footer, per the client's reference design.
const NAVY = '#10213D';

const quickLinks = [
  { label: 'Home', to: '/' },
  { label: 'About', to: '/about' },
  { label: 'Treatments', to: '/treatments' },
  { label: 'Our Dentist', to: '/dentist' },
  { label: 'Reviews', to: '/reviews' },
  { label: 'Contact', to: '/contact' },
];
const treatmentLinks = [
  { label: 'General Dentistry', to: '/treatments/general-dentistry' },
  { label: 'Root Canal', to: '/treatments/root-canal-treatment' },
  { label: 'Dental Implants', to: '/treatments/dental-implants' },
  { label: 'Teeth Whitening', to: '/treatments/teeth-whitening' },
  { label: 'Clear Aligners', to: '/treatments/invisible-aligners' },
  { label: 'Smile Makeover', to: '/treatments/smile-makeover' },
];
const socials = [
  { icon: <FacebookIcon fontSize="small" />, href: CLINIC.socials.facebook, label: 'Facebook' },
  { icon: <InstagramIcon fontSize="small" />, href: CLINIC.socials.instagram, label: 'Instagram' },
  { icon: <YouTubeIcon fontSize="small" />, href: CLINIC.socials.youtube, label: 'YouTube' },
];

export function Footer() {
  return (
    <Box component="footer" sx={{ bgcolor: NAVY, color: 'rgba(255,255,255,0.75)', mt: 'auto' }}>
      <Container sx={{ pt: { xs: 5, md: 7 }, pb: 3 }}>
        <Grid container spacing={{ xs: 4, md: 6 }}>
          <Grid size={{ xs: 12, md: 4 }}>
            <Logo light />
            <Typography variant="body2" sx={{ mt: 2, color: 'rgba(255,255,255,0.7)', fontWeight: 600 }}>
              Healthy Teeth • Happy You
            </Typography>
            <Typography variant="body2" sx={{ mt: 1.5, maxWidth: 320, color: 'rgba(255,255,255,0.6)' }}>
              Gentle, modern dental care by Dr. Afaque Khan — from routine check-ups to complete
              smile makeovers.
            </Typography>
            <Stack direction="row" spacing={1} sx={{ mt: 2.5 }}>
              {socials.map((s) => (
                <IconButton
                  key={s.label}
                  component="a"
                  href={s.href}
                  target="_blank"
                  rel="noopener noreferrer"
                  aria-label={s.label}
                  size="small"
                  sx={{
                    color: '#fff',
                    bgcolor: 'rgba(255,255,255,0.1)',
                    '&:hover': { bgcolor: '#216CF3' },
                  }}
                >
                  {s.icon}
                </IconButton>
              ))}
            </Stack>
          </Grid>

          <Grid size={{ xs: 6, md: 2.5 }}>
            <FooterCol title="Quick Links" links={quickLinks} />
          </Grid>
          <Grid size={{ xs: 6, md: 2.5 }}>
            <FooterCol title="Treatments" links={treatmentLinks} />
          </Grid>

          <Grid size={{ xs: 12, md: 3 }}>
            <Typography sx={{ fontWeight: 700, mb: 2, color: '#fff' }}>Contact Us</Typography>
            <Stack spacing={1.5}>
              <Row icon={<CallIcon sx={{ fontSize: 17 }} />} text={CLINIC.phone} href={CLINIC.phoneHref} />
              <Row icon={<EmailOutlinedIcon sx={{ fontSize: 17 }} />} text={CLINIC.email} href={`mailto:${CLINIC.email}`} />
              <Row icon={<AccessTimeIcon sx={{ fontSize: 17 }} />} text="Mon–Sat: 10 AM – 2:30 PM & 6 – 10:30 PM · Sun: by appointment" />
              <Row icon={<PlaceIcon sx={{ fontSize: 17 }} />} text={CLINIC.address} />
            </Stack>
          </Grid>
        </Grid>

        <Divider sx={{ my: 3, borderColor: 'rgba(255,255,255,0.12)' }} />
        <Stack direction={{ xs: 'column', sm: 'row' }} justifyContent="space-between" alignItems="center" spacing={1}>
          <Typography variant="body2" sx={{ color: 'rgba(255,255,255,0.55)' }}>
            © {new Date().getFullYear()} BrightSmile Dental Clinic. All rights reserved.
          </Typography>
          <Stack direction="row" spacing={2.5}>
            <MuiLink component={Link} to="/privacy" underline="hover" sx={{ color: 'rgba(255,255,255,0.55)', fontSize: 13.5 }}>
              Privacy Policy
            </MuiLink>
            <MuiLink component={Link} to="/terms" underline="hover" sx={{ color: 'rgba(255,255,255,0.55)', fontSize: 13.5 }}>
              Terms & Conditions
            </MuiLink>
          </Stack>
        </Stack>
      </Container>
    </Box>
  );
}

function FooterCol({ title, links }: { title: string; links: { label: string; to: string }[] }) {
  return (
    <>
      <Typography sx={{ fontWeight: 700, mb: 2, color: '#fff' }}>{title}</Typography>
      <Stack spacing={1.1}>
        {links.map((l) => (
          <MuiLink
            key={l.label}
            component={Link}
            to={l.to}
            underline="none"
            sx={{ color: 'rgba(255,255,255,0.6)', fontSize: 14, '&:hover': { color: '#fff' } }}
          >
            {l.label}
          </MuiLink>
        ))}
      </Stack>
    </>
  );
}

function Row({ icon, text, href }: { icon: React.ReactNode; text: string; href?: string }) {
  const content = (
    <Stack direction="row" spacing={1.25} alignItems="flex-start">
      <Box sx={{ color: '#5c9bff', mt: 0.25 }}>{icon}</Box>
      <Typography variant="body2" sx={{ color: 'rgba(255,255,255,0.65)' }}>
        {text}
      </Typography>
    </Stack>
  );
  return href ? (
    <MuiLink href={href} underline="none" sx={{ '&:hover p': { color: '#fff' } }}>
      {content}
    </MuiLink>
  ) : (
    content
  );
}
