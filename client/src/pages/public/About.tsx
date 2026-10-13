import { Box, Card, CardContent, Container, Stack, Typography, Avatar, Chip } from '@mui/material';
import Grid from '@mui/material/Grid2';
import { alpha } from '@mui/material/styles';
import VisibilityOutlinedIcon from '@mui/icons-material/VisibilityOutlined';
import RocketLaunchOutlinedIcon from '@mui/icons-material/RocketLaunchOutlined';
import FavoriteBorderIcon from '@mui/icons-material/FavoriteBorder';
import EmojiEventsOutlinedIcon from '@mui/icons-material/EmojiEventsOutlined';
import AutoAwesomeOutlinedIcon from '@mui/icons-material/AutoAwesomeOutlined';
import VerifiedUserOutlinedIcon from '@mui/icons-material/VerifiedUserOutlined';
import SpaOutlinedIcon from '@mui/icons-material/SpaOutlined';
import HandshakeOutlinedIcon from '@mui/icons-material/HandshakeOutlined';
import WorkspacePremiumOutlinedIcon from '@mui/icons-material/WorkspacePremiumOutlined';
import BadgeOutlinedIcon from '@mui/icons-material/BadgeOutlined';
import LocalHospitalOutlinedIcon from '@mui/icons-material/LocalHospitalOutlined';
import type { SvgIconProps } from '@mui/material';

import { PageHero } from '@/components/ui/PageHero';
import { SectionHeading } from '@/components/ui/SectionHeading';
import { Reveal } from '@/components/ui/Reveal';
import { CountUp } from '@/components/ui/CountUp';
import { Loader, EmptyState, ErrorState } from '@/components/ui/States';
import { useAwards, useTeam, useStats } from '@/lib/queries';
import { errorMessage } from '@/lib/api';
import { CLINIC } from '@/lib/clinic';
import { brand, gradients } from '@/theme/theme';
import { usePageMeta } from '@/lib/usePageMeta';

const cardHover = {
  transition: 'transform .28s ease, box-shadow .28s ease',
  '&:hover': { transform: 'translateY(-6px)', boxShadow: `0 22px 44px ${alpha(brand.ink, 0.14)}` },
};

const VALUES: { icon: React.ComponentType<SvgIconProps>; title: string; text: string }[] = [
  { icon: FavoriteBorderIcon, title: 'Compassion', text: 'We listen first and treat every patient with genuine warmth, patience, and empathy.' },
  { icon: EmojiEventsOutlinedIcon, title: 'Excellence', text: 'World-class clinical standards, refined techniques, and an obsession with detail.' },
  { icon: AutoAwesomeOutlinedIcon, title: 'Innovation', text: 'Digital dentistry, 3D imaging, and modern materials for faster, better outcomes.' },
  { icon: VerifiedUserOutlinedIcon, title: 'Integrity', text: 'Honest advice and transparent pricing — we only recommend what you truly need.' },
  { icon: SpaOutlinedIcon, title: 'Comfort', text: 'A calm, spa-like environment designed to melt away dental anxiety.' },
  { icon: HandshakeOutlinedIcon, title: 'Transparency', text: 'Clear treatment plans, upfront costs, and no surprises — ever.' },
];

const MILESTONES: { year: string; title: string; text: string }[] = [
  { year: '2005', title: 'The Beginning', text: 'Bright Smile opened its first two-chair practice with a simple promise: painless, honest dentistry.' },
  { year: '2009', title: 'Growing Family', text: 'We expanded to a full team of specialists and welcomed our 10,000th patient.' },
  { year: '2013', title: 'Going Digital', text: 'Adopted intraoral scanners and 3D imaging, retiring uncomfortable putty impressions for good.' },
  { year: '2017', title: 'The Flagship', text: 'Moved to our signature riverfront centre with 12 operatories and an in-house dental lab.' },
  { year: '2021', title: 'Award-Winning Care', text: 'Recognised as a regional Centre of Excellence for cosmetic and implant dentistry.' },
  { year: '2026', title: 'Today', text: 'A trusted home for thousands of smiles, blending advanced technology with a gentle human touch.' },
];

export default function About() {
  usePageMeta('About Us — Bright Smile Dental Clinic', 'Learn about Bright Smile Dental Clinic — our story, values, and the team behind gentle, modern dental care.');
  const awards = useAwards();
  const team = useTeam();
  const stats = useStats();

  return (
    <Box>
      <PageHero
        title="About Bright Smile Dental Clinic"
        subtitle="Two decades of gentle, meticulous, technology-driven care — and thousands of smiles we're proud to call family."
        crumbs={[{ label: 'About' }]}
      />

      {/* ── Clinic Story ─────────────────────────────────────────── */}
      <Container sx={{ py: { xs: 6, md: 10 } }}>
        <Grid container spacing={{ xs: 4, md: 7 }} alignItems="center">
          <Grid size={{ xs: 12, md: 6 }}>
            <Reveal>
              <Box
                component="img"
                src="https://images.unsplash.com/photo-1629909613654-28e377c37b09?w=900&q=75&auto=format&fit=crop"
                alt="Inside Bright Smile Dental Clinic"
                sx={{
                  width: '100%',
                  borderRadius: 5,
                  display: 'block',
                  boxShadow: `0 24px 60px ${alpha(brand.ink, 0.18)}`,
                }}
              />
            </Reveal>
          </Grid>
          <Grid size={{ xs: 12, md: 6 }}>
            <Reveal delayIndex={1}>
              <Chip
                label="Our Story"
                sx={{ mb: 2, fontWeight: 700, textTransform: 'uppercase', letterSpacing: 0.5, fontSize: 12, color: brand.primary, bgcolor: alpha(brand.primary, 0.1) }}
              />
              <Typography variant="h3" sx={{ mb: 2.5, fontSize: { xs: '1.8rem', md: '2.3rem' } }}>
                A clinic built around people, not procedures
              </Typography>
              <Stack spacing={2}>
                <Typography color="text.secondary">
                  {CLINIC.name} was founded in 2005 by a small team of clinicians who were frustrated with rushed,
                  impersonal dentistry. They imagined a different kind of practice — one where patients felt genuinely
                  cared for, where every question was welcome, and where fear had no place in the chair.
                </Typography>
                <Typography color="text.secondary">
                  Twenty years on, that founding philosophy still guides everything we do. We pair internationally
                  trained specialists with the latest digital tools, so treatment is more precise, more comfortable, and
                  far quicker than most people expect. But the technology only matters because of how it lets us serve
                  you better.
                </Typography>
                <Typography color="text.secondary">
                  From a nervous first-time visitor to a full smile transformation, our team treats every patient the way
                  we'd want our own family treated — with honesty, warmth, and an unwavering commitment to doing things
                  right.
                </Typography>
              </Stack>
            </Reveal>
          </Grid>
        </Grid>
      </Container>

      {/* ── Vision & Mission ─────────────────────────────────────── */}
      <Box sx={{ background: gradients.soft, py: { xs: 6, md: 10 } }}>
        <Container>
          <SectionHeading eyebrow="Purpose" title="Vision & Mission" subtitle="The north star that shapes every decision we make." />
          <Grid container spacing={{ xs: 3, md: 4 }}>
            {[
              {
                icon: VisibilityOutlinedIcon,
                title: 'Our Vision',
                text: 'To be the most trusted and loved dental clinic in the region — the place people recommend to the people they care about most, and the standard others aspire to.',
              },
              {
                icon: RocketLaunchOutlinedIcon,
                title: 'Our Mission',
                text: 'To deliver painless, precise, and personalised dental care that fits real lives — making world-class treatment accessible, transparent, and genuinely comfortable for every patient.',
              },
            ].map((item, i) => {
              const Icon = item.icon;
              return (
                <Grid key={item.title} size={{ xs: 12, md: 6 }}>
                  <Reveal delayIndex={i}>
                    <Card sx={{ height: '100%', ...cardHover }}>
                      <CardContent sx={{ p: { xs: 3, md: 4 } }}>
                        <Box
                          sx={{
                            width: 64,
                            height: 64,
                            borderRadius: 3,
                            display: 'grid',
                            placeItems: 'center',
                            background: gradients.primary,
                            color: '#fff',
                            mb: 2.5,
                          }}
                        >
                          <Icon sx={{ fontSize: 32 }} />
                        </Box>
                        <Typography variant="h5" sx={{ mb: 1.5 }}>
                          {item.title}
                        </Typography>
                        <Typography color="text.secondary" sx={{ fontSize: '1.05rem' }}>
                          {item.text}
                        </Typography>
                      </CardContent>
                    </Card>
                  </Reveal>
                </Grid>
              );
            })}
          </Grid>
        </Container>
      </Box>

      {/* ── Our Values ───────────────────────────────────────────── */}
      <Container sx={{ py: { xs: 6, md: 10 } }}>
        <SectionHeading eyebrow="What We Stand For" title="Our Core Values" subtitle="Six principles that every member of our team lives by, every single day." />
        <Grid container spacing={{ xs: 3, md: 3.5 }}>
          {VALUES.map((v, i) => {
            const Icon = v.icon;
            return (
              <Grid key={v.title} size={{ xs: 12, sm: 6, md: 4 }}>
                <Reveal delayIndex={i % 3}>
                  <Card sx={{ height: '100%', ...cardHover }}>
                    <CardContent sx={{ p: { xs: 3, md: 3.5 } }}>
                      <Box
                        sx={{
                          width: 56,
                          height: 56,
                          borderRadius: '50%',
                          display: 'grid',
                          placeItems: 'center',
                          bgcolor: alpha(brand.primary, 0.1),
                          color: brand.primary,
                          mb: 2,
                        }}
                      >
                        <Icon sx={{ fontSize: 28 }} />
                      </Box>
                      <Typography variant="h6" sx={{ mb: 1 }}>
                        {v.title}
                      </Typography>
                      <Typography color="text.secondary" variant="body2">
                        {v.text}
                      </Typography>
                    </CardContent>
                  </Card>
                </Reveal>
              </Grid>
            );
          })}
        </Grid>
      </Container>

      {/* ── Infrastructure ───────────────────────────────────────── */}
      <Box sx={{ background: gradients.soft, py: { xs: 6, md: 10 } }}>
        <Container>
          <Grid container spacing={{ xs: 4, md: 6 }} alignItems="center">
            <Grid size={{ xs: 12, md: 5 }}>
              <Reveal>
                <Chip
                  label="Our Space"
                  sx={{ mb: 2, fontWeight: 700, textTransform: 'uppercase', letterSpacing: 0.5, fontSize: 12, color: brand.primary, bgcolor: alpha(brand.primary, 0.1) }}
                />
                <Typography variant="h3" sx={{ mb: 2, fontSize: { xs: '1.8rem', md: '2.3rem' } }}>
                  Modern infrastructure, calm surroundings
                </Typography>
                <Typography color="text.secondary" sx={{ mb: 2 }}>
                  Our flagship centre was purpose-built for comfort and precision. Twelve fully digital operatories, an
                  in-house dental laboratory, 3D CBCT imaging, and dedicated sterilisation suites mean faster, safer, and
                  more accurate treatment under one roof.
                </Typography>
                <Typography color="text.secondary">
                  Every detail — from noise-dampened rooms to natural light and soothing interiors — is designed to make
                  your visit feel less like a clinic and more like a retreat.
                </Typography>
              </Reveal>
            </Grid>
            <Grid size={{ xs: 12, md: 7 }}>
              <Grid container spacing={2}>
                {['infra1', 'infra2', 'infra3', 'infra4'].map((seed, i) => (
                  <Grid key={seed} size={{ xs: 6 }}>
                    <Reveal delayIndex={i % 2}>
                      <Box
                        component="img"
                        src={[
                          'https://images.unsplash.com/photo-1598256989800-fe5f95da9787?w=600&q=75&auto=format&fit=crop',
                          'https://images.unsplash.com/photo-1629909613654-28e377c37b09?w=600&q=75&auto=format&fit=crop',
                          'https://images.unsplash.com/photo-1606811841689-23dfddce3e95?w=600&q=75&auto=format&fit=crop',
                          'https://images.unsplash.com/photo-1612277795421-9bc7706a4a34?w=600&q=75&auto=format&fit=crop',
                        ][i]}
                        alt="Clinic infrastructure"
                        sx={{
                          width: '100%',
                          height: { xs: 150, sm: 200 },
                          objectFit: 'cover',
                          borderRadius: 4,
                          display: 'block',
                          boxShadow: `0 12px 30px ${alpha(brand.ink, 0.1)}`,
                        }}
                      />
                    </Reveal>
                  </Grid>
                ))}
              </Grid>
            </Grid>
          </Grid>
        </Container>
      </Box>

      {/* ── Journey Timeline ─────────────────────────────────────── */}
      <Container sx={{ py: { xs: 6, md: 10 } }}>
        <SectionHeading eyebrow="Our Journey" title="Two Decades of Bright Smiles" subtitle="From a two-chair practice to a regional centre of excellence." />
        <Box sx={{ maxWidth: 820, mx: 'auto', position: 'relative' }}>
          {/* vertical line */}
          <Box
            sx={{
              position: 'absolute',
              top: 8,
              bottom: 8,
              left: { xs: 18, md: 24 },
              width: 2,
              background: `linear-gradient(${brand.primary}, ${alpha(brand.accent, 0.5)})`,
            }}
          />
          <Stack spacing={{ xs: 3, md: 4 }}>
            {MILESTONES.map((m, i) => (
              <Reveal key={m.year} delayIndex={i % 3}>
                <Stack direction="row" spacing={{ xs: 2.5, md: 4 }} alignItems="flex-start">
                  <Box sx={{ position: 'relative', flexShrink: 0 }}>
                    <Box
                      sx={{
                        width: { xs: 38, md: 50 },
                        height: { xs: 38, md: 50 },
                        borderRadius: '50%',
                        background: gradients.primary,
                        color: '#fff',
                        display: 'grid',
                        placeItems: 'center',
                        fontWeight: 800,
                        fontSize: { xs: 11, md: 13 },
                        boxShadow: `0 8px 20px ${alpha(brand.primary, 0.35)}`,
                        border: '4px solid #fff',
                      }}
                    >
                      {m.year}
                    </Box>
                  </Box>
                  <Card sx={{ flex: 1, ...cardHover }}>
                    <CardContent sx={{ p: { xs: 2.5, md: 3 } }}>
                      <Typography variant="h6" sx={{ mb: 0.5 }}>
                        {m.title}
                      </Typography>
                      <Typography color="text.secondary" variant="body2">
                        {m.text}
                      </Typography>
                    </CardContent>
                  </Card>
                </Stack>
              </Reveal>
            ))}
          </Stack>
        </Box>
      </Container>

      {/* ── Achievements ─────────────────────────────────────────── */}
      <Box sx={{ background: gradients.soft, py: { xs: 6, md: 10 } }}>
        <Container>
          <SectionHeading eyebrow="Recognition" title="Awards & Achievements" subtitle="Honours that reflect our relentless pursuit of clinical excellence." />
          {awards.isLoading ? (
            <Loader label="Loading achievements…" />
          ) : awards.isError ? (
            <ErrorState message={errorMessage(awards.error)} onRetry={() => awards.refetch()} />
          ) : !awards.data || awards.data.length === 0 ? (
            <EmptyState title="No achievements yet" description="Check back soon for our latest recognitions." icon={<WorkspacePremiumOutlinedIcon sx={{ fontSize: 56 }} />} />
          ) : (
            <Grid container spacing={{ xs: 3, md: 3.5 }}>
              {awards.data.map((a, i) => (
                <Grid key={a.id} size={{ xs: 12, sm: 6, md: 4 }}>
                  <Reveal delayIndex={i % 3}>
                    <Card sx={{ height: '100%', ...cardHover }}>
                      <CardContent sx={{ p: { xs: 3, md: 3.5 } }}>
                        <Stack direction="row" spacing={2} alignItems="center" sx={{ mb: 2 }}>
                          <Box
                            sx={{
                              width: 52,
                              height: 52,
                              borderRadius: 2.5,
                              display: 'grid',
                              placeItems: 'center',
                              background: gradients.accent,
                              color: '#fff',
                              flexShrink: 0,
                            }}
                          >
                            <WorkspacePremiumOutlinedIcon />
                          </Box>
                          {a.year && (
                            <Chip label={a.year} size="small" sx={{ bgcolor: alpha(brand.primary, 0.1), color: brand.primary, fontWeight: 700 }} />
                          )}
                        </Stack>
                        <Typography variant="h6" sx={{ mb: 0.5 }}>
                          {a.title}
                        </Typography>
                        {a.issuer && (
                          <Typography variant="body2" sx={{ color: brand.primary, fontWeight: 600, mb: 1 }}>
                            {a.issuer}
                          </Typography>
                        )}
                        {a.description && (
                          <Typography color="text.secondary" variant="body2">
                            {a.description}
                          </Typography>
                        )}
                      </CardContent>
                    </Card>
                  </Reveal>
                </Grid>
              ))}
            </Grid>
          )}
        </Container>
      </Box>

      {/* ── Team ─────────────────────────────────────────────────── */}
      <Container sx={{ py: { xs: 6, md: 10 } }}>
        <SectionHeading eyebrow="Behind The Smiles" title="Meet Our Team" subtitle="The warm, dedicated people who make every visit feel effortless." />
        {team.isLoading ? (
          <Loader label="Loading team…" />
        ) : team.isError ? (
          <ErrorState message={errorMessage(team.error)} onRetry={() => team.refetch()} />
        ) : !team.data || team.data.length === 0 ? (
          <EmptyState title="Team coming soon" description="We're putting the finishing touches on our team profiles." icon={<BadgeOutlinedIcon sx={{ fontSize: 56 }} />} />
        ) : (
          <Grid container spacing={{ xs: 3, md: 3.5 }}>
            {team.data.map((member, i) => (
              <Grid key={member.id} size={{ xs: 12, sm: 6, md: 4 }}>
                <Reveal delayIndex={i % 3}>
                  <Card sx={{ height: '100%', textAlign: 'center', ...cardHover }}>
                    <CardContent sx={{ p: { xs: 3, md: 3.5 } }}>
                      <Avatar
                        src={member.photoUrl ?? undefined}
                        alt={member.name}
                        sx={{
                          width: 104,
                          height: 104,
                          mx: 'auto',
                          mb: 2,
                          border: `3px solid ${alpha(brand.primary, 0.25)}`,
                          bgcolor: alpha(brand.primary, 0.12),
                          color: brand.primary,
                          fontSize: 32,
                          fontWeight: 700,
                        }}
                      >
                        {member.name.charAt(0)}
                      </Avatar>
                      <Typography variant="h6">{member.name}</Typography>
                      <Typography variant="body2" sx={{ color: brand.primary, fontWeight: 600, mb: member.bio ? 1.5 : 0 }}>
                        {member.role}
                      </Typography>
                      {member.bio && (
                        <Typography color="text.secondary" variant="body2">
                          {member.bio}
                        </Typography>
                      )}
                    </CardContent>
                  </Card>
                </Reveal>
              </Grid>
            ))}
          </Grid>
        )}
      </Container>

      {/* ── Stats strip ──────────────────────────────────────────── */}
      <Box sx={{ background: gradients.hero, color: '#fff', py: { xs: 6, md: 8 } }}>
        <Container>
          {stats.isLoading ? (
            <Loader label="" />
          ) : stats.isError ? (
            <Typography sx={{ textAlign: 'center', color: 'rgba(255,255,255,0.85)' }}>
              {errorMessage(stats.error)}
            </Typography>
          ) : stats.data && stats.data.length > 0 ? (
            <Grid container spacing={{ xs: 3, md: 4 }}>
              {stats.data.map((s, i) => (
                <Grid key={s.id} size={{ xs: 6, md: 12 / Math.min(stats.data!.length, 4) }}>
                  <Reveal delayIndex={i % 4} sx={{ textAlign: 'center' }}>
                    <Typography sx={{ fontWeight: 800, fontSize: { xs: '2.2rem', md: '3rem' }, lineHeight: 1 }}>
                      <CountUp value={s.value} suffix={s.suffix ?? ''} />
                    </Typography>
                    <Typography sx={{ mt: 1, color: 'rgba(255,255,255,0.85)', fontWeight: 600 }}>
                      {s.label}
                    </Typography>
                  </Reveal>
                </Grid>
              ))}
            </Grid>
          ) : null}
        </Container>
      </Box>
    </Box>
  );
}
