import { Box, Button, Card, Chip, Container, Stack, Typography } from '@mui/material';
import Grid from '@mui/material/Grid2';
import { Link } from 'react-router-dom';
import ArrowForwardIcon from '@mui/icons-material/ArrowForward';
import WorkspacePremiumOutlinedIcon from '@mui/icons-material/WorkspacePremiumOutlined';
import BiotechOutlinedIcon from '@mui/icons-material/BiotechOutlined';
import VolunteerActivismOutlinedIcon from '@mui/icons-material/VolunteerActivismOutlined';
import VerifiedOutlinedIcon from '@mui/icons-material/VerifiedOutlined';
import FormatQuoteIcon from '@mui/icons-material/FormatQuote';
import GroupsOutlinedIcon from '@mui/icons-material/GroupsOutlined';
import { brand, hoverShadow } from '@/theme/theme';
import { IMG } from '@/data/images';
import { useDoctors } from '@/lib/queries';
import { Reveal } from '@/components/ui/Reveal';
import { usePageMeta } from '@/lib/usePageMeta';

const NAVY = '#10213D';

const CREDENTIALS = [
  { icon: <WorkspacePremiumOutlinedIcon />, title: 'Certified & Experienced', sub: 'BDS (MUHS) · Reg. No. A-47915' },
  { icon: <BiotechOutlinedIcon />, title: 'Modern Techniques', sub: 'Advanced Digital Tools' },
  { icon: <VolunteerActivismOutlinedIcon />, title: 'Patient Focused', sub: 'Gentle & Caring' },
  { icon: <VerifiedOutlinedIcon />, title: 'Honest Advice', sub: 'Transparent Treatment Plans' },
];

// Professional memberships from the client's approved reference design.
const MEMBERSHIPS = ['Indian Dental Association (IDA)', 'Endodontic Society of India', 'ACFFI (Facial Aesthetics)'];

const SPECIALTIES = ['General Dentistry', 'Cosmetic Dentistry', 'Implants', 'Endodontics'];

export default function Dentist() {
  usePageMeta(
    'Dr. Afaque Khan — BrightSmile Dental Clinic',
    'Meet Dr. Afaque Khan — BDS (MUHS), Dental Surgeon (Reg. No. A-47915), 5+ years of gentle, painless and honest dental care in Bhiwandi.',
  );
  const { data: doctors } = useDoctors();
  const doctor = doctors?.[0];

  return (
    <Box>
      {/* ── Navy hero ── */}
      <Box sx={{ bgcolor: NAVY, pt: { xs: '86px', md: '116px' }, pb: { xs: 0, md: 0 }, overflow: 'hidden' }}>
        <Container>
          <Grid container spacing={{ xs: 3, md: 6 }} alignItems="flex-end">
            <Grid size={{ xs: 12, md: 7 }} sx={{ pb: { xs: 4, md: 7 } }}>
              <Typography sx={{ color: '#7fb1ff', fontWeight: 700, letterSpacing: '0.2em', fontSize: 12.5, mb: 1 }}>
                + MEET YOUR DOCTOR
              </Typography>
              <Typography component="h1" sx={{ color: '#fff', fontWeight: 800, letterSpacing: '-0.025em', fontSize: { xs: '2.1rem', md: '2.9rem' }, lineHeight: 1.15, mb: 1 }}>
                {doctor?.fullName ?? 'Dr. Afaque Khan'}
              </Typography>
              <Typography sx={{ color: '#9fc2ff', fontWeight: 700, mb: 2 }}>
                {doctor?.qualification ?? 'BDS (MUHS) — Dental Surgeon (Reg. No. A-47915)'}
              </Typography>
              <Typography sx={{ color: 'rgba(255,255,255,0.8)', maxWidth: 540, mb: 3 }}>
                Dr. Afaque Khan is the founder and principal dentist of BrightSmile Dental Clinic.
                With over 5 years of experience across general, cosmetic, and implant dentistry, he
                is known for gentle, painless treatment and honest, patient-first advice.
              </Typography>
              <Stack direction="row" spacing={1} flexWrap="wrap" useFlexGap>
                {SPECIALTIES.map((s) => (
                  <Chip key={s} label={s} sx={{ bgcolor: 'rgba(255,255,255,0.1)', color: '#fff', fontWeight: 600, borderRadius: '8px' }} />
                ))}
              </Stack>
            </Grid>
            <Grid size={{ xs: 12, md: 5 }}>
              <Box sx={{ position: 'relative', maxWidth: 400, mx: { xs: 'auto', md: 0 } }}>
                <Box
                  component="img"
                  src={IMG.doctorPortrait}
                  alt={doctor?.fullName ?? 'Dr. Afaque Khan'}
                  sx={{ width: '100%', aspectRatio: { xs: '1/1', md: '7/8' }, objectFit: 'cover', objectPosition: 'top', borderRadius: '18px 18px 0 0', display: 'block', bgcolor: '#fff' }}
                />
                <Card sx={{ position: 'absolute', bottom: 16, right: { xs: 8, md: -14 }, px: 2, py: 1.1, borderRadius: '12px', boxShadow: hoverShadow, display: 'flex', alignItems: 'center', gap: 1 }}>
                  <WorkspacePremiumOutlinedIcon sx={{ color: brand.primary, fontSize: 22 }} />
                  <Box sx={{ lineHeight: 1.15 }}>
                    <Typography sx={{ fontWeight: 800, fontSize: 14.5 }}>{doctor?.experienceYears ?? 15}+ Years</Typography>
                    <Typography variant="caption" color="text.secondary">
                      Experience
                    </Typography>
                  </Box>
                </Card>
              </Box>
            </Grid>
          </Grid>
        </Container>
      </Box>

      {/* ── Credential cards ── */}
      <Container sx={{ py: { xs: 4, md: 5.5 } }}>
        <Grid container spacing={2}>
          {CREDENTIALS.map((c, i) => (
            <Grid size={{ xs: 6, md: 3 }} key={c.title}>
              <Reveal delayIndex={i}>
                <Card sx={{ p: 2.25, height: '100%', display: 'flex', alignItems: 'center', gap: 1.5 }}>
                  <Box sx={{ width: 44, height: 44, borderRadius: '11px', bgcolor: brand.cloud, color: brand.primary, display: 'grid', placeItems: 'center', flexShrink: 0 }}>
                    {c.icon}
                  </Box>
                  <Box sx={{ minWidth: 0 }}>
                    <Typography sx={{ fontWeight: 800, fontSize: 14.5, lineHeight: 1.3 }}>{c.title}</Typography>
                    <Typography variant="caption" color="text.secondary" sx={{ lineHeight: 1.3, display: 'block' }}>
                      {c.sub}
                    </Typography>
                  </Box>
                </Card>
              </Reveal>
            </Grid>
          ))}
        </Grid>
      </Container>

      {/* ── Approach + memberships ── */}
      <Container sx={{ pb: { xs: 6, md: 9 } }}>
        <Grid container spacing={2.5}>
          <Grid size={{ xs: 12, md: 7 }}>
            <Reveal>
              <Card sx={{ p: { xs: 3, md: 4 }, height: '100%' }}>
                <Typography component="h2" sx={{ fontWeight: 800, fontSize: '1.3rem', mb: 2 }}>
                  Dr. Khan's Approach
                </Typography>
                <Stack direction="row" spacing={1.5}>
                  <FormatQuoteIcon sx={{ color: brand.cloud, fontSize: 44, flexShrink: 0 }} />
                  <Typography sx={{ color: 'text.secondary', fontStyle: 'italic' }}>
                    "I believe in creating a comfortable environment where every patient feels heard
                    and valued. My goal is to provide the best possible care using modern techniques,
                    ensuring long-lasting and healthy smiles."
                  </Typography>
                </Stack>
                <Typography sx={{ mt: 2.5, fontFamily: 'cursive', fontSize: '1.4rem', color: brand.primary }}>
                  Dr. Afaque Khan
                </Typography>
              </Card>
            </Reveal>
          </Grid>
          <Grid size={{ xs: 12, md: 5 }}>
            <Reveal delayIndex={1}>
              <Card sx={{ p: { xs: 3, md: 4 }, height: '100%' }}>
                <Typography component="h2" sx={{ fontWeight: 800, fontSize: '1.3rem', mb: 2 }}>
                  Professional Memberships
                </Typography>
                <Stack spacing={1.75}>
                  {MEMBERSHIPS.map((m) => (
                    <Stack key={m} direction="row" spacing={1.5} alignItems="center">
                      <Box sx={{ width: 36, height: 36, borderRadius: '9px', bgcolor: brand.cloud, color: brand.primary, display: 'grid', placeItems: 'center', flexShrink: 0 }}>
                        <GroupsOutlinedIcon sx={{ fontSize: 19 }} />
                      </Box>
                      <Typography sx={{ fontWeight: 600, fontSize: 14.5 }}>{m}</Typography>
                    </Stack>
                  ))}
                </Stack>
              </Card>
            </Reveal>
          </Grid>
        </Grid>

        {/* ── Consultation CTA ── */}
        <Reveal sx={{ mt: 2.5 }}>
          <Card sx={{ p: { xs: 2.5, md: 3 }, bgcolor: brand.cloud, border: `1px solid ${brand.line}`, boxShadow: 'none' }}>
            <Stack direction={{ xs: 'column', md: 'row' }} spacing={2} alignItems={{ md: 'center' }}>
              <Box sx={{ flex: 1 }}>
                <Typography sx={{ fontWeight: 800 }}>Book Your Consultation</Typography>
                <Typography variant="body2" color="text.secondary">
                  Meet Dr. Afaque Khan and get a personalized treatment plan.
                </Typography>
              </Box>
              <Button component={Link} to="/book-appointment" variant="contained" endIcon={<ArrowForwardIcon />} sx={{ flexShrink: 0 }}>
                Book Appointment
              </Button>
            </Stack>
          </Card>
        </Reveal>
      </Container>
    </Box>
  );
}
