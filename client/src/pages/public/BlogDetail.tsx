import {
  Box,
  Button,
  Card,
  CardContent,
  CardMedia,
  Chip,
  Container,
  Divider,
  Stack,
  Typography,
} from '@mui/material';
import Grid from '@mui/material/Grid2';
import { alpha } from '@mui/material/styles';
import { Link, useParams } from 'react-router-dom';
import ArrowBackRoundedIcon from '@mui/icons-material/ArrowBackRounded';
import AccessTimeRoundedIcon from '@mui/icons-material/AccessTimeRounded';
import PersonOutlineRoundedIcon from '@mui/icons-material/PersonOutlineRounded';
import CalendarTodayRoundedIcon from '@mui/icons-material/CalendarTodayRounded';
import ArrowForwardRoundedIcon from '@mui/icons-material/ArrowForwardRounded';
import ArticleOutlinedIcon from '@mui/icons-material/ArticleOutlined';

import { Reveal } from '@/components/ui/Reveal';
import { Loader, EmptyState, ErrorState } from '@/components/ui/States';
import { useBlogPost } from '@/lib/queries';
import { errorMessage } from '@/lib/api';
import { formatDateLong } from '@/lib/format';
import { brand, gradients } from '@/theme/theme';

export default function BlogDetail() {
  const { slug } = useParams<{ slug: string }>();
  const { data: post, isLoading, isError, error, refetch } = useBlogPost(slug);

  if (isLoading) {
    return (
      <Box sx={{ pt: { xs: 12, md: 16 } }}>
        <Loader label="Loading article…" minHeight={360} />
      </Box>
    );
  }

  if (isError) {
    return (
      <Container sx={{ py: { xs: 12, md: 16 } }}>
        <ErrorState message={errorMessage(error)} onRetry={() => refetch()} />
      </Container>
    );
  }

  if (!post) {
    return (
      <Container sx={{ py: { xs: 12, md: 16 } }}>
        <EmptyState
          title="Article not found"
          description="The article you're looking for may have been moved or removed."
          icon={<ArticleOutlinedIcon sx={{ fontSize: 56 }} />}
          action={
            <Button component={Link} to="/blog" variant="contained">
              Back to Blog
            </Button>
          }
        />
      </Container>
    );
  }

  return (
    <Box>
      {/* ── Cover header ─────────────────────────────────────────── */}
      <Box
        sx={{
          position: 'relative',
          color: '#fff',
          pt: { xs: 12, md: 16 },
          pb: { xs: 6, md: 9 },
          backgroundImage: post.coverImage
            ? `linear-gradient(180deg, rgba(10,26,58,0.55) 0%, rgba(10,26,58,0.86) 100%), url(${post.coverImage})`
            : gradients.hero,
          backgroundSize: 'cover',
          backgroundPosition: 'center',
        }}
      >
        <Container sx={{ position: 'relative', maxWidth: 900 }}>
          <Button
            component={Link}
            to="/blog"
            startIcon={<ArrowBackRoundedIcon />}
            sx={{ color: '#fff', mb: 3, px: 0, '&:hover': { bgcolor: 'transparent', opacity: 0.85 } }}
          >
            Back to Blog
          </Button>
          <Chip
            label={post.category}
            sx={{ mb: 2.5, bgcolor: 'rgba(255,255,255,0.18)', color: '#fff', fontWeight: 700, backdropFilter: 'blur(4px)' }}
          />
          <Typography variant="h2" sx={{ fontSize: { xs: '1.9rem', sm: '2.5rem', md: '3rem' }, mb: 3 }}>
            {post.title}
          </Typography>
          <Stack direction="row" spacing={{ xs: 2, sm: 3 }} sx={{ flexWrap: 'wrap', rowGap: 1, color: 'rgba(255,255,255,0.9)' }}>
            <Stack direction="row" spacing={0.75} alignItems="center">
              <PersonOutlineRoundedIcon sx={{ fontSize: 18 }} />
              <Typography variant="body2">{post.author}</Typography>
            </Stack>
            {post.publishedAt && (
              <Stack direction="row" spacing={0.75} alignItems="center">
                <CalendarTodayRoundedIcon sx={{ fontSize: 16 }} />
                <Typography variant="body2">{formatDateLong(post.publishedAt)}</Typography>
              </Stack>
            )}
            <Stack direction="row" spacing={0.75} alignItems="center">
              <AccessTimeRoundedIcon sx={{ fontSize: 18 }} />
              <Typography variant="body2">{post.readMinutes} min read</Typography>
            </Stack>
          </Stack>
        </Container>
      </Box>

      {/* ── Article body ─────────────────────────────────────────── */}
      <Container sx={{ py: { xs: 5, md: 8 }, maxWidth: 820 }}>
        <Reveal>
          <Typography color="text.secondary" sx={{ fontSize: '1.2rem', fontWeight: 500, mb: 4, lineHeight: 1.6 }}>
            {post.excerpt}
          </Typography>
          <Box
            className="article-content"
            sx={{
              color: 'text.primary',
              fontSize: '1.075rem',
              lineHeight: 1.8,
              '& h2': { fontSize: { xs: '1.5rem', md: '1.8rem' }, fontWeight: 800, mt: 5, mb: 2, letterSpacing: '-0.02em', color: brand.ink },
              '& h3': { fontSize: { xs: '1.25rem', md: '1.4rem' }, fontWeight: 700, mt: 4, mb: 1.5, color: brand.ink },
              '& p': { mb: 2.5 },
              '& ul, & ol': { pl: 3, mb: 2.5 },
              '& li': { mb: 1 },
              '& a': { color: brand.primary, fontWeight: 600, textDecoration: 'underline' },
              '& img': { maxWidth: '100%', height: 'auto', borderRadius: 3, my: 3, display: 'block' },
              '& blockquote': {
                borderLeft: `4px solid ${brand.primary}`,
                bgcolor: alpha(brand.primary, 0.05),
                m: 0,
                my: 3,
                py: 1.5,
                px: 3,
                borderRadius: 1,
                fontStyle: 'italic',
                color: 'text.secondary',
              },
              '& strong': { fontWeight: 700, color: brand.ink },
              '& code': { bgcolor: alpha(brand.ink, 0.06), px: 0.75, py: 0.25, borderRadius: 1, fontSize: '0.9em' },
            }}
            dangerouslySetInnerHTML={{ __html: post.content ?? '' }}
          />
        </Reveal>

        {/* Tags */}
        {post.tags.length > 0 && (
          <>
            <Divider sx={{ my: 4 }} />
            <Stack direction="row" spacing={1} sx={{ flexWrap: 'wrap', gap: 1 }} alignItems="center">
              <Typography sx={{ fontWeight: 700, mr: 1 }}>Tags:</Typography>
              {post.tags.map((tag) => (
                <Chip key={tag} label={tag} size="small" sx={{ bgcolor: alpha(brand.primary, 0.08), color: brand.primary, fontWeight: 600 }} />
              ))}
            </Stack>
          </>
        )}

        {/* CTA card */}
        <Reveal sx={{ mt: 6 }}>
          <Card sx={{ background: gradients.hero, color: '#fff', overflow: 'hidden' }}>
            <CardContent sx={{ p: { xs: 3.5, md: 5 }, textAlign: 'center' }}>
              <Typography variant="h4" sx={{ mb: 1.5, fontSize: { xs: '1.5rem', md: '2rem' } }}>
                Ready to book your visit?
              </Typography>
              <Typography sx={{ mb: 3, color: 'rgba(255,255,255,0.9)', maxWidth: 520, mx: 'auto' }}>
                Take the first step toward a healthier, brighter smile. Our team is ready to welcome you.
              </Typography>
              <Button
                component={Link}
                to="/book"
                size="large"
                endIcon={<ArrowForwardRoundedIcon />}
                sx={{ bgcolor: '#fff', color: brand.primary, fontWeight: 700, '&:hover': { bgcolor: 'rgba(255,255,255,0.9)' } }}
              >
                Book an Appointment
              </Button>
            </CardContent>
          </Card>
        </Reveal>
      </Container>

      {/* ── Related articles ─────────────────────────────────────── */}
      {post.related && post.related.length > 0 && (
        <Box sx={{ background: gradients.soft, py: { xs: 6, md: 9 } }}>
          <Container>
            <Typography variant="h4" sx={{ mb: { xs: 3, md: 4 }, fontSize: { xs: '1.6rem', md: '2.1rem' } }}>
              Related Articles
            </Typography>
            <Grid container spacing={{ xs: 3, sm: 3.5 }}>
              {post.related.map((r, i) => (
                <Grid key={r.id} size={{ xs: 12, sm: 6, md: 4 }}>
                  <Reveal delayIndex={i % 3}>
                    <Card
                      component={Link}
                      to={`/blog/${r.slug}`}
                      sx={{
                        height: '100%',
                        display: 'flex',
                        flexDirection: 'column',
                        textDecoration: 'none',
                        overflow: 'hidden',
                        transition: 'transform .28s ease, box-shadow .28s ease',
                        '&:hover': { transform: 'translateY(-6px)', boxShadow: `0 22px 44px ${alpha(brand.ink, 0.14)}` },
                        '&:hover .rel-img': { transform: 'scale(1.06)' },
                      }}
                    >
                      <Box sx={{ overflow: 'hidden' }}>
                        <CardMedia
                          className="rel-img"
                          component="img"
                          image={r.coverImage ?? undefined}
                          alt={r.title}
                          sx={{ height: 170, transition: 'transform .5s ease' }}
                        />
                      </Box>
                      <CardContent sx={{ flex: 1, p: { xs: 2.5, md: 3 } }}>
                        <Typography variant="h6" sx={{ fontSize: '1.1rem', mb: 1, lineHeight: 1.3, color: 'text.primary' }}>
                          {r.title}
                        </Typography>
                        {r.excerpt && (
                          <Typography color="text.secondary" variant="body2">
                            {r.excerpt}
                          </Typography>
                        )}
                      </CardContent>
                    </Card>
                  </Reveal>
                </Grid>
              ))}
            </Grid>
          </Container>
        </Box>
      )}
    </Box>
  );
}
