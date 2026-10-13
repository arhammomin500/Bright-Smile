import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { z } from 'zod';
import {
  Accordion,
  AccordionDetails,
  AccordionSummary,
  Box,
  Button,
  Card,
  CardActionArea,
  CardContent,
  Chip,
  Container,
  Divider,
  Stack,
  TextField,
  Typography,
} from '@mui/material';
import Grid from '@mui/material/Grid2';
import { Link, useParams } from 'react-router-dom';
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';
import CalendarMonthIcon from '@mui/icons-material/CalendarMonth';
import ScheduleIcon from '@mui/icons-material/Schedule';
import PaidIcon from '@mui/icons-material/Paid';
import CheckCircleIcon from '@mui/icons-material/CheckCircle';
import TaskAltIcon from '@mui/icons-material/TaskAlt';
import HealingIcon from '@mui/icons-material/Healing';
import SendIcon from '@mui/icons-material/Send';
import { PageHero } from '@/components/ui/PageHero';
import { Reveal } from '@/components/ui/Reveal';
import { SectionHeading } from '@/components/ui/SectionHeading';
import { Loader, ErrorState, EmptyState } from '@/components/ui/States';
import { TreatmentIcon } from '@/components/ui/TreatmentIcon';
import { useTreatment } from '@/lib/queries';
import { errorMessage } from '@/lib/api';
import { whatsappLink } from '@/lib/clinic';
import { formatPriceRange } from '@/lib/format';
import { useToast } from '@/components/feedback/ToastProvider';
import { brand, gradients } from '@/theme/theme';
import type { Treatment } from '@/lib/types';

const inquirySchema = z.object({
  name: z.string().min(2, 'Please enter your full name'),
  phone: z.string().min(7, 'Please enter a valid phone number'),
  email: z.string().email('Please enter a valid email').or(z.literal('')).optional(),
  message: z.string().optional(),
});
type InquiryForm = z.infer<typeof inquirySchema>;

export default function TreatmentDetail() {
  const { slug } = useParams();
  const { data: treatment, isLoading, isError, error, refetch } = useTreatment(slug);

  if (isLoading) {
    return (
      <Box>
        <PageHero title="Treatment" crumbs={[{ label: 'Treatments', to: '/treatments' }, { label: 'Details' }]} />
        <Container sx={{ py: { xs: 6, md: 10 } }}>
          <Loader label="Loading treatment…" />
        </Container>
      </Box>
    );
  }

  if (isError || !treatment) {
    return (
      <Box>
        <PageHero title="Treatment" crumbs={[{ label: 'Treatments', to: '/treatments' }, { label: 'Details' }]} />
        <Container sx={{ py: { xs: 6, md: 10 } }}>
          {isError ? (
            <ErrorState message={errorMessage(error)} onRetry={() => refetch()} />
          ) : (
            <EmptyState
              title="Treatment not found"
              description="This treatment may have moved or is no longer available."
              action={
                <Button component={Link} to="/treatments" variant="contained">
                  Browse all treatments
                </Button>
              }
            />
          )}
        </Container>
      </Box>
    );
  }

  const overviewParagraphs = treatment.overview.split(/\n\n+/).filter(Boolean);

  return (
    <Box>
      <PageHero
        title={treatment.name}
        subtitle={treatment.shortDesc}
        crumbs={[{ label: 'Treatments', to: '/treatments' }, { label: treatment.name }]}
      />

      <Container sx={{ py: { xs: 6, md: 10 } }}>
        {/* ── Hero row: image + overview ─────────────────────────── */}
        <Grid container spacing={{ xs: 4, md: 6 }} alignItems="center">
          <Grid size={{ xs: 12, md: 6 }}>
            <Reveal>
              <Box
                sx={{
                  borderRadius: 5,
                  overflow: 'hidden',
                  height: { xs: 260, md: 420 },
                  background: gradients.soft,
                  boxShadow: `0 20px 48px ${brand.ink}14`,
                }}
              >
                {treatment.imageUrl ? (
                  <Box
                    component="img"
                    src={treatment.imageUrl}
                    alt={treatment.name}
                    sx={{ width: '100%', height: '100%', objectFit: 'cover', display: 'block' }}
                  />
                ) : (
                  <Box sx={{ display: 'grid', placeItems: 'center', height: '100%' }}>
                    <TreatmentIcon name={treatment.icon ?? undefined} sx={{ fontSize: 96, color: brand.primary }} />
                  </Box>
                )}
              </Box>
            </Reveal>
          </Grid>

          <Grid size={{ xs: 12, md: 6 }}>
            <Reveal>
              <Stack direction="row" spacing={1.5} alignItems="center" sx={{ mb: 2 }}>
                <Box
                  sx={{
                    width: 52,
                    height: 52,
                    borderRadius: '50%',
                    background: gradients.accent,
                    color: '#fff',
                    display: 'grid',
                    placeItems: 'center',
                  }}
                >
                  <TreatmentIcon name={treatment.icon ?? undefined} sx={{ fontSize: 26 }} />
                </Box>
                <Chip
                  label={treatment.category}
                  sx={{ bgcolor: `${brand.primary}14`, color: brand.primary, fontWeight: 700 }}
                />
              </Stack>

              <Typography variant="h3" sx={{ fontWeight: 800, mb: 2 }}>
                {treatment.name}
              </Typography>

              {overviewParagraphs.map((para, i) => (
                <Typography key={i} variant="body1" color="text.secondary" sx={{ mb: 1.5 }}>
                  {para}
                </Typography>
              ))}

              <Stack direction="row" spacing={2} flexWrap="wrap" useFlexGap sx={{ mt: 3 }}>
                <Stack
                  direction="row"
                  spacing={1.25}
                  alignItems="center"
                  sx={{ px: 2.25, py: 1.25, borderRadius: 3, bgcolor: brand.mist }}
                >
                  <PaidIcon sx={{ color: brand.primary }} />
                  <Box>
                    <Typography variant="caption" sx={{ color: brand.slate, fontWeight: 700 }}>
                      Price range
                    </Typography>
                    <Typography sx={{ fontWeight: 800, color: 'text.primary', lineHeight: 1.2 }}>
                      {formatPriceRange(treatment.priceMin, treatment.priceMax)}
                    </Typography>
                  </Box>
                </Stack>
                <Stack
                  direction="row"
                  spacing={1.25}
                  alignItems="center"
                  sx={{ px: 2.25, py: 1.25, borderRadius: 3, bgcolor: brand.mist }}
                >
                  <ScheduleIcon sx={{ color: brand.primary }} />
                  <Box>
                    <Typography variant="caption" sx={{ color: brand.slate, fontWeight: 700 }}>
                      Duration
                    </Typography>
                    <Typography sx={{ fontWeight: 800, color: 'text.primary', lineHeight: 1.2 }}>
                      ~{treatment.durationMin} min
                    </Typography>
                  </Box>
                </Stack>
              </Stack>

              <Button
                component={Link}
                to={`/book?treatment=${treatment.slug}`}
                variant="contained"
                size="large"
                startIcon={<CalendarMonthIcon />}
                sx={{ mt: 3.5 }}
              >
                Book This Treatment
              </Button>
            </Reveal>
          </Grid>
        </Grid>

        {/* ── Signs & Symptoms ───────────────────────────────────── */}
        {treatment.symptoms?.length > 0 && (
          <Box sx={{ mt: { xs: 7, md: 12 } }}>
            <SectionHeading
              eyebrow="When you might need it"
              title="Signs & Symptoms"
              subtitle="If you're experiencing any of the following, this treatment may be right for you."
              align="left"
            />
            <Grid container spacing={2}>
              {treatment.symptoms.map((symptom, i) => (
                <Grid key={i} size={{ xs: 12, sm: 6 }}>
                  <Reveal delayIndex={i % 2}>
                    <Stack
                      direction="row"
                      spacing={1.5}
                      alignItems="flex-start"
                      sx={{ p: 2.25, borderRadius: 3, bgcolor: brand.mist, height: '100%' }}
                    >
                      <CheckCircleIcon sx={{ color: brand.primary, mt: 0.2 }} />
                      <Typography variant="body1" sx={{ fontWeight: 600 }}>
                        {symptom}
                      </Typography>
                    </Stack>
                  </Reveal>
                </Grid>
              ))}
            </Grid>
          </Box>
        )}

        {/* ── Treatment Process ──────────────────────────────────── */}
        {treatment.process?.length > 0 && (
          <Box sx={{ mt: { xs: 7, md: 12 } }}>
            <SectionHeading
              eyebrow="What to expect"
              title="Treatment Process"
              subtitle="A clear, step-by-step journey from first consultation to a healthy result."
              align="left"
            />
            <Stack spacing={2.5}>
              {treatment.process.map((step, i) => (
                <Reveal key={i} delayIndex={i % 3}>
                  <Card sx={{ p: { xs: 2.5, md: 3 } }}>
                    <Stack direction="row" spacing={{ xs: 2, md: 3 }} alignItems="flex-start">
                      <Box
                        sx={{
                          width: 52,
                          height: 52,
                          borderRadius: '50%',
                          background: gradients.primary,
                          color: '#fff',
                          display: 'grid',
                          placeItems: 'center',
                          fontWeight: 800,
                          fontSize: 20,
                          flexShrink: 0,
                        }}
                      >
                        {i + 1}
                      </Box>
                      <Box>
                        <Typography variant="h6" sx={{ fontWeight: 800 }}>
                          {step.title}
                        </Typography>
                        <Typography variant="body1" color="text.secondary" sx={{ mt: 0.5 }}>
                          {step.description}
                        </Typography>
                      </Box>
                    </Stack>
                  </Card>
                </Reveal>
              ))}
            </Stack>
          </Box>
        )}

        {/* ── Benefits ───────────────────────────────────────────── */}
        {treatment.benefits?.length > 0 && (
          <Box sx={{ mt: { xs: 7, md: 12 } }}>
            <SectionHeading
              eyebrow="Why choose it"
              title="Benefits"
              subtitle="The lasting advantages you can expect from this treatment."
              align="left"
            />
            <Grid container spacing={2}>
              {treatment.benefits.map((benefit, i) => (
                <Grid key={i} size={{ xs: 12, sm: 6, md: 4 }}>
                  <Reveal delayIndex={i % 3} sx={{ height: '100%' }}>
                    <Card sx={{ p: 2.75, height: '100%' }}>
                      <Stack direction="row" spacing={1.5} alignItems="flex-start">
                        <TaskAltIcon sx={{ color: brand.success, mt: 0.2 }} />
                        <Typography variant="body1" sx={{ fontWeight: 600 }}>
                          {benefit}
                        </Typography>
                      </Stack>
                    </Card>
                  </Reveal>
                </Grid>
              ))}
            </Grid>
          </Box>
        )}

        {/* ── Recovery & Aftercare ───────────────────────────────── */}
        {treatment.recovery && (
          <Box sx={{ mt: { xs: 7, md: 12 } }}>
            <Reveal>
              <Card
                sx={{
                  p: { xs: 3, md: 5 },
                  background: gradients.soft,
                  border: `1px solid ${brand.primary}1f`,
                }}
              >
                <Stack direction="row" spacing={1.5} alignItems="center" sx={{ mb: 2 }}>
                  <Box
                    sx={{
                      width: 48,
                      height: 48,
                      borderRadius: '50%',
                      background: gradients.accent,
                      color: '#fff',
                      display: 'grid',
                      placeItems: 'center',
                    }}
                  >
                    <HealingIcon />
                  </Box>
                  <Typography variant="h4" sx={{ fontWeight: 800 }}>
                    Recovery & Aftercare
                  </Typography>
                </Stack>
                {treatment.recovery
                  .split(/\n\n+/)
                  .filter(Boolean)
                  .map((para, i) => (
                    <Typography key={i} variant="body1" color="text.secondary" sx={{ mb: 1.5 }}>
                      {para}
                    </Typography>
                  ))}
              </Card>
            </Reveal>
          </Box>
        )}

        {/* ── FAQs + Cost inquiry form ───────────────────────────── */}
        <Grid container spacing={{ xs: 4, md: 6 }} sx={{ mt: { xs: 5, md: 10 } }}>
          <Grid size={{ xs: 12, md: 7 }}>
            {treatment.faqs?.length > 0 && (
              <>
                <SectionHeading
                  eyebrow="Good to know"
                  title="Frequently Asked Questions"
                  align="left"
                />
                <Reveal>
                  <Box>
                    {treatment.faqs.map((faq, i) => (
                      <Accordion
                        key={i}
                        disableGutters
                        elevation={0}
                        sx={{
                          mb: 1.5,
                          border: `1px solid ${brand.ink}12`,
                          borderRadius: 3,
                          '&:before': { display: 'none' },
                          overflow: 'hidden',
                        }}
                      >
                        <AccordionSummary expandIcon={<ExpandMoreIcon />} sx={{ px: 2.5, py: 0.5 }}>
                          <Typography sx={{ fontWeight: 700 }}>{faq.question}</Typography>
                        </AccordionSummary>
                        <AccordionDetails sx={{ px: 2.5, pb: 2.5, pt: 0 }}>
                          <Typography color="text.secondary">{faq.answer}</Typography>
                        </AccordionDetails>
                      </Accordion>
                    ))}
                  </Box>
                </Reveal>
              </>
            )}
          </Grid>

          <Grid size={{ xs: 12, md: 5 }}>
            <Reveal sx={{ position: { md: 'sticky' }, top: { md: 100 } }}>
              <CostInquiryForm treatment={treatment} />
            </Reveal>
          </Grid>
        </Grid>

        {/* ── Related treatments ─────────────────────────────────── */}
        {treatment.related && treatment.related.length > 0 && (
          <Box sx={{ mt: { xs: 8, md: 12 } }}>
            <SectionHeading eyebrow="You may also need" title="Related Treatments" align="left" />
            <Grid container spacing={{ xs: 3, md: 4 }}>
              {treatment.related.map((rel, i) => (
                <Grid key={rel.id} size={{ xs: 12, sm: 6, md: 4 }}>
                  <Reveal delayIndex={i % 3} sx={{ height: '100%' }}>
                    <Card
                      sx={{
                        height: '100%',
                        transition: 'transform .28s ease, box-shadow .28s ease',
                        '&:hover': { transform: 'translateY(-6px)', boxShadow: `0 22px 48px ${brand.primary}22` },
                      }}
                    >
                      <CardActionArea component={Link} to={`/treatments/${rel.slug}`} sx={{ height: '100%' }}>
                        <CardContent sx={{ p: 3 }}>
                          <Box
                            sx={{
                              width: 56,
                              height: 56,
                              borderRadius: '50%',
                              background: gradients.accent,
                              color: '#fff',
                              display: 'grid',
                              placeItems: 'center',
                              mb: 2,
                            }}
                          >
                            <TreatmentIcon name={rel.icon ?? undefined} sx={{ fontSize: 28 }} />
                          </Box>
                          <Typography variant="h6" sx={{ fontWeight: 800 }}>
                            {rel.name}
                          </Typography>
                          <Typography variant="body2" color="text.secondary" sx={{ mt: 1 }}>
                            {rel.shortDesc}
                          </Typography>
                        </CardContent>
                      </CardActionArea>
                    </Card>
                  </Reveal>
                </Grid>
              ))}
            </Grid>
          </Box>
        )}
      </Container>
    </Box>
  );
}

function CostInquiryForm({ treatment }: { treatment: Treatment }) {
  const toast = useToast();
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<InquiryForm>({
    resolver: zodResolver(inquirySchema),
    defaultValues: { name: '', phone: '', email: '', message: '' },
  });

  // Frontend-only site: the enquiry opens in the visitor's WhatsApp with the
  // message prepared — nothing is stored or sent by the website itself.
  const onSubmit = (values: InquiryForm) => {
    const msg =
      `Hi Bright Smile 👋 I'd like a cost estimate for *${treatment.name}*.\n\n` +
      `Name: ${values.name}\nPhone: ${values.phone}` +
      (values.email ? `\nEmail: ${values.email}` : '') +
      (values.message ? `\n\n${values.message}` : '');
    window.open(whatsappLink(msg), '_blank', 'noopener');
    toast.info('WhatsApp has opened with your enquiry ready — just press send.');
  };

  return (
    <Card sx={{ p: { xs: 3, md: 4 }, border: `1px solid ${brand.primary}1f` }}>
      <Typography variant="h5" sx={{ fontWeight: 800 }}>
        Request a Cost Estimate
      </Typography>
      <Typography variant="body2" color="text.secondary" sx={{ mt: 1 }}>
        Share your details and our team will get back to you with pricing for {treatment.name}.
      </Typography>

      <Divider sx={{ my: 2.5 }} />

      <Box component="form" onSubmit={handleSubmit(onSubmit)} noValidate>
        <Stack spacing={2.25}>
          <TextField
            label="Full name"
            fullWidth
            required
            {...register('name')}
            error={!!errors.name}
            helperText={errors.name?.message}
          />
          <TextField
            label="Phone number"
            fullWidth
            required
            {...register('phone')}
            error={!!errors.phone}
            helperText={errors.phone?.message}
          />
          <TextField
            label="Email (optional)"
            type="email"
            fullWidth
            {...register('email')}
            error={!!errors.email}
            helperText={errors.email?.message}
          />
          <TextField
            label="Message (optional)"
            fullWidth
            multiline
            minRows={3}
            placeholder="Tell us a little about what you're looking for…"
            {...register('message')}
            error={!!errors.message}
            helperText={errors.message?.message}
          />
          <Button type="submit" variant="contained" size="large" fullWidth startIcon={<SendIcon />}>
            Send Enquiry on WhatsApp
          </Button>
          <Typography variant="caption" sx={{ color: 'text.secondary' }}>
            Opens WhatsApp with your enquiry prepared — you review and send it directly to the clinic.
          </Typography>
        </Stack>
      </Box>
    </Card>
  );
}
