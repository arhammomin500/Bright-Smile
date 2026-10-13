import { Box, Container, Stack, Typography, IconButton, Divider, Link as MuiLink } from '@mui/material';
import Grid from '@mui/material/Grid2';
import { Link } from 'react-router-dom';
import FacebookIcon from '@mui/icons-material/Facebook';
import InstagramIcon from '@mui/icons-material/Instagram';
import TwitterIcon from '@mui/icons-material/Twitter';
import YouTubeIcon from '@mui/icons-material/YouTube';
import LinkedInIcon from '@mui/icons-material/LinkedIn';
import CallIcon from '@mui/icons-material/Call';
import EmailOutlinedIcon from '@mui/icons-material/EmailOutlined';
import PlaceIcon from '@mui/icons-material/Place';
import AccessTimeIcon from '@mui/icons-material/AccessTime';
import { Logo } from './Logo';
import { CLINIC } from '@/lib/clinic';
import { brand } from '@/theme/theme';

const treatmentsLinks = [
  { label: 'Dental Implants', to: '/treatments/dental-implants' },
  { label: 'Invisible Aligners', to: '/treatments/invisible-aligners' },
  { label: 'Teeth Whitening', to: '/treatments/teeth-whitening' },
  { label: 'Root Canal', to: '/treatments/root-canal-treatment' },
  { label: 'Smile Makeover', to: '/treatments/smile-makeover' },
];
const companyLinks = [
  { label: 'About Us', to: '/about' },
  { label: 'Our Doctor', to: '/doctors' },
  { label: 'Gallery', to: '/gallery' },
  { label: 'Blog', to: '/blog' },
  { label: 'Contact', to: '/contact' },
];
const socials = [
  { icon: <FacebookIcon fontSize="small" />, href: CLINIC.socials.facebook, label: 'Facebook' },
  { icon: <InstagramIcon fontSize="small" />, href: CLINIC.socials.instagram, label: 'Instagram' },
  { icon: <TwitterIcon fontSize="small" />, href: CLINIC.socials.twitter, label: 'Twitter' },
  { icon: <YouTubeIcon fontSize="small" />, href: CLINIC.socials.youtube, label: 'YouTube' },
  { icon: <LinkedInIcon fontSize="small" />, href: CLINIC.socials.linkedin, label: 'LinkedIn' },
];

// Light, minimal footer consistent with the blue & white brand.
export function Footer() {
  return (
    <Box component="footer" sx={{ bgcolor: brand.mist, borderTop: `1px solid ${brand.line}`, mt: 'auto' }}>
      <Container sx={{ pt: { xs: 6, md: 8 }, pb: 4 }}>
        <Grid container spacing={{ xs: 4, md: 6 }}>
          <Grid size={{ xs: 12, md: 4 }}>
            <Logo />
            <Typography variant="body2" sx={{ mt: 2.5, maxWidth: 340, color: 'text.secondary' }}>
              World-class, painless, and personalised dental care. Advanced technology with a gentle
              human touch — for a smile you'll love for life.
            </Typography>
            <Stack direction="row" spacing={1} sx={{ mt: 3 }}>
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
                    color: brand.primary,
                    bgcolor: '#fff',
                    border: `1px solid ${brand.line}`,
                    '&:hover': { bgcolor: brand.primary, color: '#fff', borderColor: brand.primary },
                  }}
                >
                  {s.icon}
                </IconButton>
              ))}
            </Stack>
          </Grid>

          <Grid size={{ xs: 6, md: 2 }}>
            <FooterCol title="Treatments" links={treatmentsLinks} />
          </Grid>
          <Grid size={{ xs: 6, md: 2 }}>
            <FooterCol title="Company" links={companyLinks} />
          </Grid>

          <Grid size={{ xs: 12, md: 4 }}>
            <Typography sx={{ fontWeight: 700, mb: 2 }}>Get in touch</Typography>
            <Stack spacing={1.75}>
              <ContactRow icon={<PlaceIcon fontSize="small" />} text={CLINIC.address} />
              <ContactRow icon={<CallIcon fontSize="small" />} text={CLINIC.phone} href={CLINIC.phoneHref} />
              <ContactRow icon={<EmailOutlinedIcon fontSize="small" />} text={CLINIC.email} href={`mailto:${CLINIC.email}`} />
              <ContactRow icon={<AccessTimeIcon fontSize="small" />} text="Mon–Fri 8:30–19:00 · Sat 9:00–15:00" />
            </Stack>
          </Grid>
        </Grid>

        <Divider sx={{ my: 4, borderColor: brand.line }} />
        <Stack direction={{ xs: 'column', sm: 'row' }} justifyContent="space-between" alignItems="center" spacing={1.5}>
          <Typography variant="body2" sx={{ color: 'text.secondary' }}>
            © {new Date().getFullYear()} {CLINIC.name}. All rights reserved.
          </Typography>
        </Stack>
      </Container>
    </Box>
  );
}

function FooterCol({ title, links }: { title: string; links: { label: string; to: string }[] }) {
  return (
    <>
      <Typography sx={{ fontWeight: 700, mb: 2 }}>{title}</Typography>
      <Stack spacing={1.2}>
        {links.map((l) => (
          <MuiLink
            key={l.to}
            component={Link}
            to={l.to}
            underline="none"
            sx={{ color: 'text.secondary', fontSize: 14.5, '&:hover': { color: brand.primary } }}
          >
            {l.label}
          </MuiLink>
        ))}
      </Stack>
    </>
  );
}

function ContactRow({ icon, text, href }: { icon: React.ReactNode; text: string; href?: string }) {
  const content = (
    <Stack direction="row" spacing={1.5} alignItems="flex-start">
      <Box sx={{ color: brand.primary, mt: 0.3 }}>{icon}</Box>
      <Typography variant="body2" sx={{ color: 'text.secondary' }}>
        {text}
      </Typography>
    </Stack>
  );
  return href ? (
    <MuiLink href={href} underline="none" sx={{ '&:hover p': { color: 'text.primary' } }}>
      {content}
    </MuiLink>
  ) : (
    content
  );
}
