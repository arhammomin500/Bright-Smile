import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { z } from 'zod';
import { Box, Button, Card, Container, Divider, IconButton, Stack, TextField, Typography } from '@mui/material';
import Grid from '@mui/material/Grid2';
import PlaceIcon from '@mui/icons-material/Place';
import CallIcon from '@mui/icons-material/Call';
import EmailIcon from '@mui/icons-material/Email';
import AccessTimeIcon from '@mui/icons-material/AccessTime';
import EmergencyShareIcon from '@mui/icons-material/EmergencyShare';
import SendIcon from '@mui/icons-material/Send';
import FacebookIcon from '@mui/icons-material/Facebook';
import InstagramIcon from '@mui/icons-material/Instagram';
import TwitterIcon from '@mui/icons-material/Twitter';
import YouTubeIcon from '@mui/icons-material/YouTube';
import LinkedInIcon from '@mui/icons-material/LinkedIn';
import WhatsAppIcon from '@mui/icons-material/WhatsApp';
import { PageHero } from '@/components/ui/PageHero';
import { Reveal } from '@/components/ui/Reveal';
import { useToast } from '@/components/feedback/ToastProvider';
import { CLINIC, mailtoLink, whatsappLink } from '@/lib/clinic';
import { brand, gradients } from '@/theme/theme';
import { usePageMeta } from '@/lib/usePageMeta';

const contactSchema = z.object({
  name: z.string().min(2, 'Please enter your name'),
  email: z.string().email('Please enter a valid email'),
  phone: z.string().optional(),
  subject: z.string().optional(),
  message: z.string().min(10, 'Please enter at least 10 characters'),
});
type ContactForm = z.infer<typeof contactSchema>;

const socials = [
  { icon: <FacebookIcon />, href: CLINIC.socials.facebook, label: 'Facebook' },
  { icon: <InstagramIcon />, href: CLINIC.socials.instagram, label: 'Instagram' },
  { icon: <TwitterIcon />, href: CLINIC.socials.twitter, label: 'Twitter' },
  { icon: <YouTubeIcon />, href: CLINIC.socials.youtube, label: 'YouTube' },
  { icon: <LinkedInIcon />, href: CLINIC.socials.linkedin, label: 'LinkedIn' },
];

export default function Contact() {
  usePageMeta('Contact Us — Bright Smile Dental Clinic', 'Visit, call, or message Bright Smile Dental Clinic. Address, working hours, and quick WhatsApp contact.');
  const toast = useToast();
  const {
    register,
    handleSubmit,
    getValues,
    trigger,
    formState: { errors },
  } = useForm<ContactForm>({
    resolver: zodResolver(contactSchema),
    defaultValues: { name: '', email: '', phone: '', subject: '', message: '' },
  });

  // Frontend-only site: the form composes the message and hands it to the
  // visitor's own email or WhatsApp app — the website stores nothing.
  const composeBody = (v: ContactForm) =>
    `Name: ${v.name}\nEmail: ${v.email}${v.phone ? `\nPhone: ${v.phone}` : ''}\n\n${v.message}`;

  const onSubmit = (values: ContactForm) => {
    const subject = values.subject?.trim() || `Website enquiry from ${values.name}`;
    window.location.href = mailtoLink(subject, composeBody(values));
    toast.info('Your email app has opened with the message ready — just press send.');
  };

  const sendViaWhatsApp = async () => {
    const valid = await trigger();
    if (!valid) return;
    const v = getValues();
    window.open(whatsappLink(`Hi Bright Smile 👋\n\n${composeBody(v)}`), '_blank', 'noopener');
    toast.info('WhatsApp has opened with the message ready — just press send.');
  };

  return (
    <Box>
      <PageHero
        title="Contact Us"
        subtitle="Have a question or ready to book? We'd love to hear from you — reach out and our friendly team will respond promptly."
        crumbs={[{ label: 'Contact' }]}
      />

      <Container sx={{ py: { xs: 6, md: 10 } }}>
        <Grid container spacing={{ xs: 4, md: 5 }}>
          {/* Form */}
          <Grid size={{ xs: 12, md: 7 }}>
            <Reveal>
              <Card sx={{ p: { xs: 3, md: 5 } }}>
                <Typography variant="h4" sx={{ fontWeight: 800 }}>
                  Send us a message
                </Typography>
                <Typography color="text.secondary" sx={{ mt: 1 }}>
                  Fill in the form below and we'll get back to you as soon as we can.
                </Typography>

                <Box component="form" onSubmit={handleSubmit(onSubmit)} noValidate sx={{ mt: 3.5 }}>
                  <Grid container spacing={2.25}>
                    <Grid size={{ xs: 12, sm: 6 }}>
                      <TextField
                        label="Full name"
                        fullWidth
                        required
                        {...register('name')}
                        error={!!errors.name}
                        helperText={errors.name?.message}
                      />
                    </Grid>
                    <Grid size={{ xs: 12, sm: 6 }}>
                      <TextField
                        label="Email"
                        type="email"
                        fullWidth
                        required
                        {...register('email')}
                        error={!!errors.email}
                        helperText={errors.email?.message}
                      />
                    </Grid>
                    <Grid size={{ xs: 12, sm: 6 }}>
                      <TextField
                        label="Phone (optional)"
                        fullWidth
                        {...register('phone')}
                        error={!!errors.phone}
                        helperText={errors.phone?.message}
                      />
                    </Grid>
                    <Grid size={{ xs: 12, sm: 6 }}>
                      <TextField
                        label="Subject (optional)"
                        fullWidth
                        {...register('subject')}
                        error={!!errors.subject}
                        helperText={errors.subject?.message}
                      />
                    </Grid>
                    <Grid size={{ xs: 12 }}>
                      <TextField
                        label="Message"
                        fullWidth
                        required
                        multiline
                        minRows={5}
                        placeholder="How can we help you?"
                        {...register('message')}
                        error={!!errors.message}
                        helperText={errors.message?.message}
                      />
                    </Grid>
                    <Grid size={{ xs: 12 }}>
                      <Stack direction={{ xs: 'column', sm: 'row' }} spacing={1.5}>
                        <Button type="submit" variant="contained" size="large" startIcon={<SendIcon />}>
                          Send via Email
                        </Button>
                        <Button
                          variant="outlined"
                          size="large"
                          startIcon={<WhatsAppIcon />}
                          onClick={sendViaWhatsApp}
                          sx={{ color: '#1da851', borderColor: '#1da85166', '&:hover': { borderColor: '#1da851', bgcolor: '#1da8510d' } }}
                        >
                          Send via WhatsApp
                        </Button>
                      </Stack>
                      <Typography variant="caption" sx={{ display: 'block', mt: 1.5, color: 'text.secondary' }}>
                        This opens your own email or WhatsApp app with the message prepared — you review and send it
                        directly to the clinic.
                      </Typography>
                    </Grid>
                  </Grid>
                </Box>
              </Card>
            </Reveal>
          </Grid>

          {/* Info */}
          <Grid size={{ xs: 12, md: 5 }}>
            <Reveal delayIndex={1}>
              <Card
                sx={{
                  p: { xs: 3, md: 4 },
                  height: '100%',
                  background: gradients.soft,
                  border: `1px solid ${brand.primary}1f`,
                }}
              >
                <Typography variant="h5" sx={{ fontWeight: 800, mb: 0.5 }}>
                  Get in touch
                </Typography>
                <Typography variant="body2" color="text.secondary" sx={{ mb: 3 }}>
                  Visit us, call, or drop an email — whatever works best for you.
                </Typography>

                <Stack spacing={2.5}>
                  <InfoRow icon={<PlaceIcon />} label="Address" value={CLINIC.address} />
                  <InfoRow icon={<CallIcon />} label="Phone" value={CLINIC.phone} href={CLINIC.phoneHref} />
                  <InfoRow icon={<EmailIcon />} label="Email" value={CLINIC.email} href={`mailto:${CLINIC.email}`} />
                  <Box>
                    <Stack direction="row" spacing={1.75} alignItems="flex-start">
                      <IconBubble>
                        <AccessTimeIcon fontSize="small" />
                      </IconBubble>
                      <Box>
                        <Typography variant="caption" sx={{ color: brand.slate, fontWeight: 700, textTransform: 'uppercase', letterSpacing: 0.4 }}>
                          Working Hours
                        </Typography>
                        <Stack spacing={0.4} sx={{ mt: 0.5 }}>
                          {CLINIC.hours.map((h) => (
                            <Stack key={h.day} direction="row" justifyContent="space-between" spacing={2}>
                              <Typography variant="body2" sx={{ fontWeight: 600 }}>
                                {h.day}
                              </Typography>
                              <Typography variant="body2" color="text.secondary">
                                {h.time}
                              </Typography>
                            </Stack>
                          ))}
                        </Stack>
                      </Box>
                    </Stack>
                  </Box>
                </Stack>

                {/* Emergency highlight */}
                <Box
                  sx={{
                    mt: 3,
                    p: 2.5,
                    borderRadius: 3,
                    bgcolor: `${brand.danger}0f`,
                    border: `1px solid ${brand.danger}40`,
                  }}
                >
                  <Stack direction="row" spacing={1.5} alignItems="center">
                    <EmergencyShareIcon sx={{ color: brand.danger }} />
                    <Box>
                      <Typography sx={{ fontWeight: 800, color: brand.danger }}>Dental Emergency?</Typography>
                      <Typography
                        component="a"
                        href={CLINIC.emergencyHref}
                        sx={{ fontWeight: 700, color: brand.danger, textDecoration: 'none', '&:hover': { textDecoration: 'underline' } }}
                      >
                        Call now: {CLINIC.emergency}
                      </Typography>
                    </Box>
                  </Stack>
                </Box>

                <Divider sx={{ my: 3 }} />

                <Typography variant="body2" sx={{ fontWeight: 700, mb: 1.25 }}>
                  Follow us
                </Typography>
                <Stack direction="row" spacing={1}>
                  {socials.map((s) => (
                    <IconButton
                      key={s.label}
                      component="a"
                      href={s.href}
                      target="_blank"
                      rel="noopener noreferrer"
                      aria-label={s.label}
                      sx={{
                        color: brand.primary,
                        bgcolor: '#fff',
                        border: `1px solid ${brand.primary}22`,
                        '&:hover': { bgcolor: brand.primary, color: '#fff' },
                      }}
                    >
                      {s.icon}
                    </IconButton>
                  ))}
                </Stack>
              </Card>
            </Reveal>
          </Grid>
        </Grid>

        {/* Map */}
        <Reveal sx={{ mt: { xs: 5, md: 8 } }}>
          <Box
            sx={{
              borderRadius: 5,
              overflow: 'hidden',
              boxShadow: `0 16px 40px ${brand.ink}14`,
              border: `1px solid ${brand.ink}0f`,
              lineHeight: 0,
            }}
          >
            <Box
              component="iframe"
              title="Bright Smile Dental Clinic location"
              src={`https://www.google.com/maps?q=${encodeURIComponent(CLINIC.mapQuery)}&output=embed`}
              loading="lazy"
              referrerPolicy="no-referrer-when-downgrade"
              sx={{ width: '100%', height: 420, border: 0, display: 'block' }}
            />
          </Box>
        </Reveal>
      </Container>
    </Box>
  );
}

function IconBubble({ children }: { children: React.ReactNode }) {
  return (
    <Box
      sx={{
        width: 40,
        height: 40,
        borderRadius: 2,
        background: gradients.primary,
        color: '#fff',
        display: 'grid',
        placeItems: 'center',
        flexShrink: 0,
      }}
    >
      {children}
    </Box>
  );
}

function InfoRow({ icon, label, value, href }: { icon: React.ReactNode; label: string; value: string; href?: string }) {
  return (
    <Stack direction="row" spacing={1.75} alignItems="flex-start">
      <IconBubble>{icon}</IconBubble>
      <Box>
        <Typography variant="caption" sx={{ color: brand.slate, fontWeight: 700, textTransform: 'uppercase', letterSpacing: 0.4 }}>
          {label}
        </Typography>
        {href ? (
          <Typography
            component="a"
            href={href}
            sx={{ display: 'block', fontWeight: 600, color: 'text.primary', textDecoration: 'none', '&:hover': { color: brand.primary } }}
          >
            {value}
          </Typography>
        ) : (
          <Typography sx={{ fontWeight: 600, color: 'text.primary' }}>{value}</Typography>
        )}
      </Box>
    </Stack>
  );
}
