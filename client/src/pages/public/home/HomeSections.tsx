import {
  Box,
  Button,
  Card,
  CardContent,
  Chip,
  Container,
  Stack,
  Typography,
  Avatar,
  Rating,
  Accordion,
  AccordionSummary,
  AccordionDetails,
  Divider,
} from '@mui/material';
import Grid from '@mui/material/Grid2';
import { Link } from 'react-router-dom';
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';
import CheckCircleOutlineIcon from '@mui/icons-material/CheckCircleOutline';
import ArrowForwardIcon from '@mui/icons-material/ArrowForward';
import EmojiEventsOutlinedIcon from '@mui/icons-material/EmojiEventsOutlined';
import FormatQuoteIcon from '@mui/icons-material/FormatQuote';
import BiotechOutlinedIcon from '@mui/icons-material/BiotechOutlined';
import CameraAltOutlinedIcon from '@mui/icons-material/CameraAltOutlined';
import PrecisionManufacturingOutlinedIcon from '@mui/icons-material/PrecisionManufacturingOutlined';
import ScienceOutlinedIcon from '@mui/icons-material/ScienceOutlined';
import BoltOutlinedIcon from '@mui/icons-material/BoltOutlined';
import MonitorHeartOutlinedIcon from '@mui/icons-material/MonitorHeartOutlined';
import PlaceIcon from '@mui/icons-material/Place';
import CallIcon from '@mui/icons-material/Call';
import EmailOutlinedIcon from '@mui/icons-material/EmailOutlined';
import AccessTimeIcon from '@mui/icons-material/AccessTime';

import { brand, softShadow, hoverShadow } from '@/theme/theme';
import { CLINIC } from '@/lib/clinic';
import { formatPriceRange, formatDate } from '@/lib/format';
import { Reveal } from '@/components/ui/Reveal';
import { SectionHeading } from '@/components/ui/SectionHeading';
import { CountUp } from '@/components/ui/CountUp';
import { TreatmentIcon } from '@/components/ui/TreatmentIcon';
import { Loader } from '@/components/ui/States';
import {
  useStats,
  useDoctors,
  useTreatments,
  useTestimonials,
  useFaqs,
  useAwards,
  useInsurance,
  useGallery,
  useBlogList,
} from '@/lib/queries';

const cardHover = {
  transition: 'transform .28s ease, box-shadow .28s ease, border-color .28s ease',
  '&:hover': { transform: 'translateY(-6px)', boxShadow: hoverShadow, borderColor: 'rgba(31,111,235,0.25)' },
};

// Reusable light icon chip.
function IconChip({ children, size = 52 }: { children: React.ReactNode; size?: number }) {
  return (
    <Box
      sx={{
        width: size,
        height: size,
        borderRadius: `${Math.round(size * 0.3)}px`,
        bgcolor: brand.cloud,
        color: brand.primary,
        display: 'grid',
        placeItems: 'center',
        flexShrink: 0,
      }}
    >
      {children}
    </Box>
  );
}

// ── Statistics band ───────────────────────────────────────────────────
export function StatsSection() {
  const { data: stats } = useStats();
  return (
    <Box sx={{ bgcolor: brand.mist, borderBlock: `1px solid ${brand.line}` }}>
      <Container sx={{ py: { xs: 5, md: 7 } }}>
        <Grid container spacing={{ xs: 3, md: 2 }}>
          {(stats ?? []).map((s, i) => (
            <Grid size={{ xs: 6, md: 3 }} key={s.id}>
              <Reveal delayIndex={i} sx={{ textAlign: 'center' }}>
                <Typography variant="h2" sx={{ fontSize: { xs: '2rem', md: '2.8rem' }, color: brand.primary }}>
                  <CountUp value={s.value} suffix={s.suffix ?? ''} />
                </Typography>
                <Typography color="text.secondary" sx={{ fontWeight: 600, mt: 0.5 }}>
                  {s.label}
                </Typography>
              </Reveal>
            </Grid>
          ))}
        </Grid>
      </Container>
    </Box>
  );
}

// ── Why choose us ─────────────────────────────────────────────────────
const REASONS = [
  'Qualified BDS, MDS dentist with 15+ years in practice',
  'Modern digital dentistry equipment',
  'Transparent pricing discussed before treatment',
  'Comfort-first, anxiety-free environment',
  'Same-day emergency appointments',
  'Personalised treatment plans for every patient',
];

export function WhyChooseUsSection() {
  return (
    <Container sx={{ py: { xs: 8, md: 12 } }}>
      <Grid container spacing={{ xs: 5, md: 8 }} alignItems="center">
        <Grid size={{ xs: 12, md: 6 }}>
          <Reveal>
            <Box sx={{ position: 'relative' }}>
              <Box
                component="img"
                src="https://images.unsplash.com/photo-1629909613654-28e377c37b09?w=900&q=75&auto=format&fit=crop"
                alt="Modern dental treatment room"
                sx={{ width: '100%', borderRadius: 6, border: `1px solid ${brand.line}`, boxShadow: softShadow }}
              />
              <Card
                sx={{
                  position: 'absolute',
                  bottom: -22,
                  right: { xs: 12, md: -22 },
                  px: 2.5,
                  py: 2,
                  borderRadius: 4,
                  boxShadow: hoverShadow,
                }}
              >
                <Stack direction="row" spacing={1.5} alignItems="center">
                  <IconChip size={46}>
                    <EmojiEventsOutlinedIcon />
                  </IconChip>
                  <Box>
                    <Typography sx={{ fontWeight: 800, lineHeight: 1.1 }}>15+ Years</Typography>
                    <Typography variant="caption" color="text.secondary">
                      of trusted care
                    </Typography>
                  </Box>
                </Stack>
              </Card>
            </Box>
          </Reveal>
        </Grid>
        <Grid size={{ xs: 12, md: 6 }}>
          <SectionHeading
            align="left"
            eyebrow="About Us"
            title="Bright Smile — dentistry designed around your comfort"
            subtitle="For over 15 years we've blended clinical excellence with a genuinely human touch — every visit feels calm, clear, and completely in your control."
          />
          <Grid container spacing={1.75}>
            {REASONS.map((r, i) => (
              <Grid size={{ xs: 12, sm: 6 }} key={i}>
                <Reveal delayIndex={i}>
                  <Stack direction="row" spacing={1.25} alignItems="flex-start">
                    <CheckCircleOutlineIcon sx={{ color: brand.primary, mt: 0.25 }} fontSize="small" />
                    <Typography variant="body2" sx={{ fontWeight: 500 }}>
                      {r}
                    </Typography>
                  </Stack>
                </Reveal>
              </Grid>
            ))}
          </Grid>
          <Button component={Link} to="/about" variant="contained" endIcon={<ArrowForwardIcon />} sx={{ mt: 4 }}>
            More About Us
          </Button>
        </Grid>
      </Grid>
    </Container>
  );
}

// ── Treatments / services ─────────────────────────────────────────────
export function TreatmentsSection() {
  const { data: treatments, isLoading } = useTreatments({ featured: true });
  return (
    <Box sx={{ bgcolor: brand.mist, borderBlock: `1px solid ${brand.line}` }}>
      <Container sx={{ py: { xs: 8, md: 12 } }}>
        <SectionHeading
          eyebrow="Our Services"
          title="High-quality care for every smile"
          subtitle="From preventive check-ups to advanced cosmetic and surgical dentistry — everything under one roof."
        />
        {isLoading ? (
          <Loader />
        ) : (
          <Grid container spacing={2.5}>
            {(treatments ?? []).map((t, i) => (
              <Grid size={{ xs: 12, sm: 6, md: 4 }} key={t.id}>
                <Reveal delayIndex={i % 3}>
                  <Card component={Link} to={`/treatments/${t.slug}`} sx={{ display: 'block', textDecoration: 'none', height: '100%', ...cardHover }}>
                    <CardContent sx={{ p: 3.25 }}>
                      <IconChip>
                        <TreatmentIcon name={t.icon} />
                      </IconChip>
                      <Typography variant="h6" sx={{ mt: 2, mb: 0.75 }}>
                        {t.name}
                      </Typography>
                      <Typography variant="body2" color="text.secondary" sx={{ mb: 2, minHeight: 42 }}>
                        {t.shortDesc}
                      </Typography>
                      <Stack direction="row" justifyContent="space-between" alignItems="center">
                        <Typography variant="body2" sx={{ fontWeight: 700, color: brand.primary }}>
                          {formatPriceRange(t.priceMin, t.priceMax)}
                        </Typography>
                        <Stack direction="row" spacing={0.5} alignItems="center" sx={{ color: brand.primary }}>
                          <Typography variant="body2" sx={{ fontWeight: 700 }}>
                            Learn more
                          </Typography>
                          <ArrowForwardIcon sx={{ fontSize: 16 }} />
                        </Stack>
                      </Stack>
                    </CardContent>
                  </Card>
                </Reveal>
              </Grid>
            ))}
          </Grid>
        )}
        <Box sx={{ textAlign: 'center', mt: 5 }}>
          <Button component={Link} to="/treatments" variant="outlined" size="large">
            View All Treatments
          </Button>
        </Box>
      </Container>
    </Box>
  );
}

// ── Technology / unique features ──────────────────────────────────────
const TECH = [
  { icon: <BiotechOutlinedIcon />, title: '3D CBCT Imaging', text: 'Precise, low-radiation diagnostics for confident planning.' },
  { icon: <CameraAltOutlinedIcon />, title: 'Digital Oral Scanner', text: 'Clean digital impressions — no gagging, no delays.' },
  { icon: <PrecisionManufacturingOutlinedIcon />, title: 'CAD/CAM Restorations', text: 'Computer-designed crowns and veneers with perfect fit.' },
  { icon: <BoltOutlinedIcon />, title: 'Laser Dentistry', text: 'Minimally invasive treatments with faster healing.' },
  { icon: <ScienceOutlinedIcon />, title: 'In-House Lab', text: 'Attached dental lab delivers precise work, faster.' },
  { icon: <MonitorHeartOutlinedIcon />, title: 'Digital Treatment Plans', text: 'See your results before treatment even begins.' },
];

export function TechnologySection() {
  return (
    <Container sx={{ py: { xs: 8, md: 12 } }}>
      <SectionHeading
        eyebrow="Latest Technology"
        title="Advanced tools, gentler care"
        subtitle="We invest in world-class dental technology so your treatment is faster, more precise, and far more comfortable."
      />
      <Grid container spacing={2.5}>
        {TECH.map((t, i) => (
          <Grid size={{ xs: 12, sm: 6, md: 4 }} key={t.title}>
            <Reveal delayIndex={i % 3}>
              <Card sx={{ height: '100%', ...cardHover }}>
                <CardContent sx={{ p: 3.25 }}>
                  <IconChip>{t.icon}</IconChip>
                  <Typography variant="h6" sx={{ mt: 2, mb: 0.5 }}>
                    {t.title}
                  </Typography>
                  <Typography variant="body2" color="text.secondary">
                    {t.text}
                  </Typography>
                </CardContent>
              </Card>
            </Reveal>
          </Grid>
        ))}
      </Grid>
    </Container>
  );
}

// ── Meet the doctor (single-doctor clinic) ────────────────────────────
export function DoctorsSection() {
  const { data: doctors, isLoading } = useDoctors();
  const doctor = doctors?.[0];
  return (
    <Box sx={{ bgcolor: brand.mist, borderBlock: `1px solid ${brand.line}` }}>
      <Container sx={{ py: { xs: 8, md: 12 } }}>
        {isLoading || !doctor ? (
          <Loader />
        ) : (
          <Grid container spacing={{ xs: 5, md: 8 }} alignItems="center">
            <Grid size={{ xs: 12, md: 5 }}>
              <Reveal>
                <Box sx={{ position: 'relative', maxWidth: 440, mx: 'auto' }}>
                  <Box
                    component="img"
                    src={doctor.photoUrl ?? ''}
                    alt={doctor.fullName}
                    sx={{ width: '100%', aspectRatio: '4/4.6', objectFit: 'cover', borderRadius: 6, border: `1px solid ${brand.line}`, boxShadow: softShadow }}
                  />
                  <Card sx={{ position: 'absolute', bottom: -20, left: '50%', transform: 'translateX(-50%)', px: 2.5, py: 1.5, borderRadius: '14px', boxShadow: hoverShadow, whiteSpace: 'nowrap' }}>
                    <Typography sx={{ fontWeight: 800, lineHeight: 1.2 }}>{doctor.experienceYears}+ Years Experience</Typography>
                    <Typography variant="caption" color="text.secondary">
                      {doctor.qualification.split('—')[0].trim()}
                    </Typography>
                  </Card>
                </Box>
              </Reveal>
            </Grid>
            <Grid size={{ xs: 12, md: 7 }}>
              <SectionHeading
                align="left"
                eyebrow="Meet Your Doctor"
                title={doctor.fullName}
                subtitle={doctor.qualification}
              />
              <Typography color="text.secondary" sx={{ mb: 3, mt: -2 }}>
                {doctor.bio}
              </Typography>
              <Stack direction="row" spacing={1} flexWrap="wrap" useFlexGap sx={{ mb: 4 }}>
                <Chip label={doctor.specialization} sx={{ bgcolor: brand.cloud, color: brand.primary, fontWeight: 700 }} />
                <Chip label={`Speaks ${doctor.languages.join(', ')}`} sx={{ bgcolor: brand.cloud, color: brand.primary, fontWeight: 700 }} />
                <Chip label="Mon – Sat" sx={{ bgcolor: brand.cloud, color: brand.primary, fontWeight: 700 }} />
              </Stack>
              <Stack direction={{ xs: 'column', sm: 'row' }} spacing={2}>
                <Button component={Link} to="/book" variant="contained" size="large">
                  Book with Dr. {doctor.lastName}
                </Button>
                <Button component={Link} to={`/doctors/${doctor.slug}`} variant="outlined" size="large" endIcon={<ArrowForwardIcon />}>
                  Full Profile
                </Button>
              </Stack>
            </Grid>
          </Grid>
        )}
      </Container>
    </Box>
  );
}

// ── Before & after ────────────────────────────────────────────────────
export function BeforeAfterSection() {
  const { data } = useGallery('BEFORE_AFTER');
  const items = (data ?? []).slice(0, 3);
  if (!items.length) return null;
  return (
    <Container sx={{ py: { xs: 8, md: 12 } }}>
      <SectionHeading
        eyebrow="Real Results"
        title="Smiles we've transformed"
        subtitle="Genuine before-and-after results from our patients — your transformation could be next."
      />
      <Grid container spacing={2.5}>
        {items.map((g, i) => (
          <Grid size={{ xs: 12, md: 4 }} key={g.id}>
            <Reveal delayIndex={i}>
              <Card sx={{ overflow: 'hidden', ...cardHover }}>
                <Grid container>
                  <Grid size={6} sx={{ position: 'relative' }}>
                    <Box component="img" src={g.beforeUrl ?? ''} alt="Before" sx={{ width: '100%', aspectRatio: '1/1', objectFit: 'cover' }} />
                    <Chip label="Before" size="small" sx={{ position: 'absolute', bottom: 8, left: 8, bgcolor: 'rgba(255,255,255,0.92)', fontWeight: 700 }} />
                  </Grid>
                  <Grid size={6} sx={{ position: 'relative' }}>
                    <Box component="img" src={g.afterUrl ?? ''} alt="After" sx={{ width: '100%', aspectRatio: '1/1', objectFit: 'cover' }} />
                    <Chip label="After" size="small" color="primary" sx={{ position: 'absolute', bottom: 8, right: 8, fontWeight: 700 }} />
                  </Grid>
                </Grid>
                <CardContent sx={{ py: 2 }}>
                  <Typography variant="subtitle1" sx={{ fontWeight: 700 }}>
                    {g.title}
                  </Typography>
                </CardContent>
              </Card>
            </Reveal>
          </Grid>
        ))}
      </Grid>
      <Box sx={{ textAlign: 'center', mt: 5 }}>
        <Button component={Link} to="/gallery" variant="outlined" size="large">
          View Full Gallery
        </Button>
      </Box>
    </Container>
  );
}

// ── Testimonials ──────────────────────────────────────────────────────
export function TestimonialsSection() {
  const { data } = useTestimonials(true);
  const items = (data ?? []).slice(0, 6);
  return (
    <Box sx={{ bgcolor: brand.mist, borderBlock: `1px solid ${brand.line}` }}>
      <Container sx={{ py: { xs: 8, md: 12 } }}>
        <SectionHeading
          eyebrow="Patient Stories"
          title="What our patients say"
          subtitle="Experiences from patients who trusted us with their smiles."
        />
        <Grid container spacing={2.5}>
          {items.map((t, i) => (
            <Grid size={{ xs: 12, md: 4 }} key={t.id}>
              <Reveal delayIndex={i % 3}>
                <Card sx={{ p: 0.5, height: '100%', position: 'relative', ...cardHover }}>
                  <CardContent>
                    <FormatQuoteIcon sx={{ fontSize: 40, color: brand.cloud, position: 'absolute', top: 14, right: 18 }} />
                    <Rating value={t.rating} readOnly size="small" sx={{ mb: 1.5 }} />
                    <Typography variant="body2" sx={{ mb: 2.5, color: 'text.secondary' }}>
                      "{t.content}"
                    </Typography>
                    <Stack direction="row" spacing={1.5} alignItems="center">
                      <Avatar src={t.avatarUrl ?? undefined} />
                      <Box>
                        <Typography sx={{ fontWeight: 700, lineHeight: 1.2 }}>{t.patientName}</Typography>
                        <Typography variant="caption" color="text.secondary">
                          {t.location} {t.treatment ? `· ${t.treatment}` : ''}
                        </Typography>
                      </Box>
                    </Stack>
                  </CardContent>
                </Card>
              </Reveal>
            </Grid>
          ))}
        </Grid>
        <Box sx={{ textAlign: 'center', mt: 5 }}>
          <Button component={Link} to="/testimonials" variant="outlined" size="large">
            Read More Stories
          </Button>
        </Box>
      </Container>
    </Box>
  );
}

// ── Insurance partners ────────────────────────────────────────────────
export function InsuranceSection() {
  const { data } = useInsurance();
  if (!data?.length) return null;
  return (
    <Container sx={{ py: { xs: 6, md: 8 } }}>
      <Typography align="center" color="text.secondary" sx={{ fontWeight: 700, mb: 4, textTransform: 'uppercase', letterSpacing: 1.5, fontSize: 12.5 }}>
        Trusted & accepted by leading insurance partners
      </Typography>
      <Grid container spacing={3} alignItems="center" justifyContent="center">
        {data.map((p) => (
          <Grid size={{ xs: 6, sm: 4, md: 2 }} key={p.id}>
            <Box
              component="img"
              src={p.logoUrl ?? ''}
              alt={p.name}
              sx={{ width: '100%', maxWidth: 130, mx: 'auto', filter: 'grayscale(1)', opacity: 0.55, transition: '.3s', '&:hover': { filter: 'none', opacity: 1 } }}
            />
          </Grid>
        ))}
      </Grid>
    </Container>
  );
}

// ── Awards ────────────────────────────────────────────────────────────
export function AwardsSection() {
  const { data } = useAwards();
  if (!data?.length) return null;
  return (
    <Box sx={{ bgcolor: brand.mist, borderBlock: `1px solid ${brand.line}` }}>
      <Container sx={{ py: { xs: 8, md: 11 } }}>
        <SectionHeading eyebrow="Recognition" title="Awarded & certified excellence" />
        <Grid container spacing={2.5}>
          {data.map((a, i) => (
            <Grid size={{ xs: 12, sm: 6, md: 3 }} key={a.id}>
              <Reveal delayIndex={i}>
                <Card sx={{ textAlign: 'center', p: 1.5, height: '100%', ...cardHover }}>
                  <CardContent>
                    <Box sx={{ width: 54, height: 54, borderRadius: '50%', bgcolor: brand.cloud, color: brand.primary, display: 'grid', placeItems: 'center', mx: 'auto', mb: 2 }}>
                      <EmojiEventsOutlinedIcon />
                    </Box>
                    <Typography variant="subtitle1" sx={{ fontWeight: 700, lineHeight: 1.3 }}>
                      {a.title}
                    </Typography>
                    <Typography variant="caption" color="text.secondary" sx={{ display: 'block', mt: 0.75 }}>
                      {a.issuer} {a.year ? `· ${a.year}` : ''}
                    </Typography>
                  </CardContent>
                </Card>
              </Reveal>
            </Grid>
          ))}
        </Grid>
      </Container>
    </Box>
  );
}

// ── FAQ ───────────────────────────────────────────────────────────────
export function FaqSection() {
  const { data } = useFaqs();
  const items = (data ?? []).slice(0, 6);
  return (
    <Container maxWidth="md" sx={{ py: { xs: 8, md: 12 } }}>
      <SectionHeading
        eyebrow="FAQ"
        title="Questions? We've got answers"
        subtitle="Everything you need to know before your visit. Still curious? Just reach out."
      />
      {items.map((f, i) => (
        <Reveal key={f.id} delayIndex={i % 3}>
          <Accordion disableGutters sx={{ mb: 1.5, borderRadius: '14px !important', overflow: 'hidden', bgcolor: '#fff' }}>
            <AccordionSummary expandIcon={<ExpandMoreIcon sx={{ color: brand.primary }} />} sx={{ px: 3, py: 0.75, '& .MuiAccordionSummary-content': { fontWeight: 700 } }}>
              {f.question}
            </AccordionSummary>
            <AccordionDetails sx={{ px: 3, pb: 2.5, color: 'text.secondary' }}>{f.answer}</AccordionDetails>
          </Accordion>
        </Reveal>
      ))}
    </Container>
  );
}

// ── Latest blogs ──────────────────────────────────────────────────────
export function BlogSection() {
  const { data } = useBlogList({ page: 1 });
  const items = (data?.items ?? []).slice(0, 3);
  if (!items.length) return null;
  return (
    <Box sx={{ bgcolor: brand.mist, borderBlock: `1px solid ${brand.line}` }}>
      <Container sx={{ py: { xs: 8, md: 12 } }}>
        <SectionHeading eyebrow="Our Blog" title="Dental tips & insights" subtitle="Expert advice to keep your smile healthy between visits." />
        <Grid container spacing={2.5}>
          {items.map((b, i) => (
            <Grid size={{ xs: 12, md: 4 }} key={b.id}>
              <Reveal delayIndex={i}>
                <Card component={Link} to={`/blog/${b.slug}`} sx={{ display: 'block', textDecoration: 'none', overflow: 'hidden', height: '100%', ...cardHover }}>
                  <Box component="img" src={b.coverImage ?? ''} alt={b.title} sx={{ width: '100%', aspectRatio: '16/9', objectFit: 'cover' }} />
                  <CardContent>
                    <Chip label={b.category} size="small" sx={{ mb: 1.5, bgcolor: brand.cloud, color: brand.primary, fontWeight: 700 }} />
                    <Typography variant="h6" sx={{ mb: 1, lineHeight: 1.35, fontSize: '1.05rem' }}>
                      {b.title}
                    </Typography>
                    <Typography variant="caption" color="text.secondary">
                      {b.author} · {formatDate(b.publishedAt ?? '')} · {b.readMinutes} min read
                    </Typography>
                  </CardContent>
                </Card>
              </Reveal>
            </Grid>
          ))}
        </Grid>
      </Container>
    </Box>
  );
}

// ── Contact + map ─────────────────────────────────────────────────────
export function MapContactSection() {
  return (
    <Container sx={{ py: { xs: 8, md: 12 } }}>
      <SectionHeading
        eyebrow="Visit Us"
        title="Ready to transform your smile?"
        subtitle="Drop by the clinic, give us a call, or book online — whatever works best for you."
      />
      <Grid container spacing={2.5}>
        <Grid size={{ xs: 12, md: 5 }}>
          <Card sx={{ p: { xs: 3, md: 4 }, height: '100%' }}>
            <Stack spacing={3}>
              <ContactRow icon={<PlaceIcon />} title="Address" text={CLINIC.address} />
              <ContactRow icon={<CallIcon />} title="Phone" text={CLINIC.phone} href={CLINIC.phoneHref} />
              <ContactRow icon={<EmailOutlinedIcon />} title="Email" text={CLINIC.email} href={`mailto:${CLINIC.email}`} />
              <ContactRow icon={<AccessTimeIcon />} title="Working Hours" text={CLINIC.hours.map((h) => `${h.day}: ${h.time}`).join('  ·  ')} />
              <Divider />
              <Stack direction={{ xs: 'column', sm: 'row' }} spacing={1.5}>
                <Button component={Link} to="/book" variant="contained" size="large" fullWidth>
                  Book Appointment
                </Button>
                <Button component={Link} to="/contact" variant="outlined" size="large" fullWidth>
                  Contact Us
                </Button>
              </Stack>
            </Stack>
          </Card>
        </Grid>
        <Grid size={{ xs: 12, md: 7 }}>
          <Box
            component="iframe"
            title="Clinic location"
            src={`https://www.google.com/maps?q=${encodeURIComponent(CLINIC.mapQuery)}&output=embed`}
            loading="lazy"
            sx={{
              border: `1px solid ${brand.line}`,
              borderRadius: 5,
              width: '100%',
              height: '100%',
              minHeight: { xs: 320, md: 420 },
              display: 'block',
              boxShadow: softShadow,
            }}
          />
        </Grid>
      </Grid>
    </Container>
  );
}

function ContactRow({ icon, title, text, href }: { icon: React.ReactNode; title: string; text: string; href?: string }) {
  const body = (
    <Stack direction="row" spacing={2} alignItems="flex-start">
      <IconChip size={44}>{icon}</IconChip>
      <Box>
        <Typography variant="caption" sx={{ color: 'text.secondary', fontWeight: 700, textTransform: 'uppercase', letterSpacing: 0.6 }}>
          {title}
        </Typography>
        <Typography variant="body2" sx={{ fontWeight: 600, mt: 0.25 }}>
          {text}
        </Typography>
      </Box>
    </Stack>
  );
  return href ? (
    <Box component="a" href={href} sx={{ textDecoration: 'none', color: 'inherit', '&:hover': { opacity: 0.85 } }}>
      {body}
    </Box>
  ) : (
    body
  );
}
