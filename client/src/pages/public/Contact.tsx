import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { z } from 'zod';
import { Box, Button, Card, Container, Stack, TextField, Typography, Link as MuiLink } from '@mui/material';
import Grid from '@mui/material/Grid2';
import CallIcon from '@mui/icons-material/Call';
import WhatsAppIcon from '@mui/icons-material/WhatsApp';
import EmailOutlinedIcon from '@mui/icons-material/EmailOutlined';
import PlaceIcon from '@mui/icons-material/Place';
import SendIcon from '@mui/icons-material/Send';
import MapOutlinedIcon from '@mui/icons-material/MapOutlined';
import { brand, softShadow } from '@/theme/theme';
import { IMG } from '@/data/images';
import { CLINIC, mailtoLink, whatsappLink } from '@/lib/clinic';
import { useToast } from '@/components/feedback/ToastProvider';
import { Reveal } from '@/components/ui/Reveal';
import { usePageMeta } from '@/lib/usePageMeta';

const schema = z.object({
  name: z.string().min(2, 'Please enter your name'),
  email: z.string().email('Please enter a valid email'),
  phone: z.string().min(8, 'Please enter a valid mobile number'),
  message: z.string().min(10, 'Please enter at least 10 characters'),
});
type ContactForm = z.infer<typeof schema>;

const CHANNELS = [
  { icon: <CallIcon />, title: CLINIC.phone, sub: 'Call us for immediate assistance', href: CLINIC.phoneHref },
  { icon: <WhatsAppIcon />, title: 'Chat on WhatsApp', sub: 'Quick & easy booking', href: whatsappLink(), green: true },
  { icon: <EmailOutlinedIcon />, title: CLINIC.email, sub: 'We reply within 24 hours', href: `mailto:${CLINIC.email}` },
  { icon: <PlaceIcon />, title: CLINIC.addressShort, sub: 'Visit us at our clinic', href: `https://www.google.com/maps?q=${encodeURIComponent(CLINIC.mapQuery)}` },
];

export default function Contact() {
  usePageMeta(
    'Contact Us — BrightSmile Dental Clinic',
    "We're here to help — call, WhatsApp, email, or visit BrightSmile Dental Clinic in Andheri West, Mumbai.",
  );
  const toast = useToast();
  const {
    register,
    handleSubmit,
    getValues,
    trigger,
    formState: { errors },
  } = useForm<ContactForm>({ resolver: zodResolver(schema), defaultValues: { name: '', email: '', phone: '', message: '' } });

  const composeBody = (v: ContactForm) => `Name: ${v.name}\nEmail: ${v.email}\nPhone: ${v.phone}\n\n${v.message}`;

  // Frontend-only: the form opens the visitor's own email/WhatsApp app.
  const onSubmit = (v: ContactForm) => {
    window.location.href = mailtoLink(`Website enquiry from ${v.name}`, composeBody(v));
    toast.info('Your email app has opened with the message ready — just press send.');
  };
  const sendViaWhatsApp = async () => {
    if (!(await trigger())) return;
    window.open(whatsappLink(`Hi Bright Smile 👋\n\n${composeBody(getValues())}`), '_blank', 'noopener');
    toast.info('WhatsApp has opened with the message ready — just press send.');
  };

  return (
    <Box>
      {/* ── Page hero ── */}
      <Box sx={{ bgcolor: brand.mist, pt: { xs: '86px', md: '116px' }, pb: { xs: 4, md: 6 }, borderBottom: `1px solid ${brand.line}` }}>
        <Container>
          <Grid container spacing={{ xs: 3, md: 6 }} alignItems="center">
            <Grid size={{ xs: 12, md: 7 }}>
              <Typography sx={{ color: brand.primary, fontWeight: 700, letterSpacing: '0.2em', fontSize: 12.5, mb: 1 }}>
                + CONTACT US
              </Typography>
              <Typography component="h1" sx={{ fontWeight: 800, letterSpacing: '-0.025em', fontSize: { xs: '1.9rem', md: '2.6rem' }, lineHeight: 1.18, color: 'text.primary', mb: 1.5 }}>
                We're Here to Help!
              </Typography>
              <Typography sx={{ color: 'text.secondary', maxWidth: 520 }}>
                Have a question or need assistance? Reach out to us and we'll get back to you as soon
                as possible.
              </Typography>
            </Grid>
            <Grid size={{ xs: 12, md: 5 }} sx={{ display: { xs: 'none', md: 'block' } }}>
              <Box
                component="img"
                src={IMG.clinicReception}
                alt="BrightSmile clinic reception"
                sx={{ width: '100%', aspectRatio: '16/9', objectFit: 'cover', borderRadius: '16px', boxShadow: softShadow, display: 'block' }}
              />
            </Grid>
          </Grid>
        </Container>
      </Box>

      <Container sx={{ py: { xs: 5, md: 8 } }}>
        <Grid container spacing={2.5}>
          {/* ── Get in touch ── */}
          <Grid size={{ xs: 12, md: 4 }}>
            <Reveal>
              <Card sx={{ p: { xs: 2.5, md: 3 }, height: '100%' }}>
                <Typography component="h2" sx={{ fontWeight: 800, fontSize: '1.15rem', mb: 2 }}>
                  Get in Touch
                </Typography>
                <Stack spacing={2}>
                  {CHANNELS.map((c) => (
                    <MuiLink
                      key={c.sub}
                      href={c.href}
                      target={c.href.startsWith('http') ? '_blank' : undefined}
                      rel="noopener noreferrer"
                      underline="none"
                      sx={{ display: 'flex', alignItems: 'center', gap: 1.5, color: 'inherit', '&:hover .t': { color: brand.primary } }}
                    >
                      <Box
                        sx={{
                          width: 42,
                          height: 42,
                          borderRadius: '11px',
                          bgcolor: c.green ? '#e7f8ee' : brand.cloud,
                          color: c.green ? '#1da851' : brand.primary,
                          display: 'grid',
                          placeItems: 'center',
                          flexShrink: 0,
                        }}
                      >
                        {c.icon}
                      </Box>
                      <Box sx={{ minWidth: 0 }}>
                        <Typography className="t" sx={{ fontWeight: 700, fontSize: 14.5, lineHeight: 1.3, transition: '.2s', overflowWrap: 'anywhere' }}>
                          {c.title}
                        </Typography>
                        <Typography variant="caption" color="text.secondary">
                          {c.sub}
                        </Typography>
                      </Box>
                    </MuiLink>
                  ))}
                </Stack>
              </Card>
            </Reveal>
          </Grid>

          {/* ── Clinic hours + map ── */}
          <Grid size={{ xs: 12, md: 4 }}>
            <Reveal delayIndex={1}>
              <Stack spacing={2.5} sx={{ height: '100%' }}>
                <Card sx={{ p: { xs: 2.5, md: 3 } }}>
                  <Typography component="h2" sx={{ fontWeight: 800, fontSize: '1.15rem', mb: 2 }}>
                    Clinic Hours
                  </Typography>
                  <Stack spacing={1.25}>
                    {CLINIC.hours.map((h) => (
                      <Stack key={h.day} direction="row" justifyContent="space-between" spacing={2}>
                        <Typography variant="body2" sx={{ fontWeight: 600 }}>
                          {h.day}
                        </Typography>
                        <Typography variant="body2" color={h.time === 'Closed' ? 'error' : 'text.secondary'} sx={{ fontWeight: h.time === 'Closed' ? 700 : 400 }}>
                          {h.time}
                        </Typography>
                      </Stack>
                    ))}
                  </Stack>
                </Card>
                <Card sx={{ overflow: 'hidden', flex: 1, display: 'flex', flexDirection: 'column' }}>
                  <Box
                    component="iframe"
                    title="BrightSmile Dental Clinic location"
                    src={`https://www.google.com/maps?q=${encodeURIComponent(CLINIC.mapQuery)}&output=embed`}
                    loading="lazy"
                    sx={{ width: '100%', border: 0, flex: 1, minHeight: 200, display: 'block' }}
                  />
                  <Button
                    startIcon={<MapOutlinedIcon />}
                    component="a"
                    href={`https://www.google.com/maps?q=${encodeURIComponent(CLINIC.mapQuery)}`}
                    target="_blank"
                    rel="noopener noreferrer"
                    sx={{ borderRadius: 0, py: 1.25 }}
                  >
                    View on Google Maps
                  </Button>
                </Card>
              </Stack>
            </Reveal>
          </Grid>

          {/* ── Send a message ── */}
          <Grid size={{ xs: 12, md: 4 }}>
            <Reveal delayIndex={2}>
              <Card sx={{ p: { xs: 2.5, md: 3 }, height: '100%' }}>
                <Typography component="h2" sx={{ fontWeight: 800, fontSize: '1.15rem', mb: 2 }}>
                  Send a Message
                </Typography>
                <Box component="form" onSubmit={handleSubmit(onSubmit)} noValidate>
                  <Stack spacing={1.75}>
                    <TextField label="Name" required fullWidth size="small" {...register('name')} error={!!errors.name} helperText={errors.name?.message} />
                    <TextField label="Email" required fullWidth size="small" type="email" {...register('email')} error={!!errors.email} helperText={errors.email?.message} />
                    <TextField label="Phone" required fullWidth size="small" type="tel" {...register('phone')} error={!!errors.phone} helperText={errors.phone?.message} />
                    <TextField label="Message" required fullWidth multiline minRows={4} {...register('message')} error={!!errors.message} helperText={errors.message?.message} />
                    <Button type="submit" variant="contained" size="large" startIcon={<SendIcon />}>
                      Send Message
                    </Button>
                    <Button variant="outlined" size="large" startIcon={<WhatsAppIcon />} onClick={sendViaWhatsApp} sx={{ color: '#1da851', borderColor: '#1da85166', '&:hover': { borderColor: '#1da851', bgcolor: '#1da8510d' } }}>
                      Send via WhatsApp
                    </Button>
                    <Typography variant="caption" sx={{ color: 'text.secondary' }}>
                      Opens your own email or WhatsApp app with the message prepared — you review and
                      send it directly to the clinic.
                    </Typography>
                  </Stack>
                </Box>
              </Card>
            </Reveal>
          </Grid>
        </Grid>
      </Container>
    </Box>
  );
}
