import { useEffect, useState } from 'react';
import {
  Box,
  Card,
  CardContent,
  CardMedia,
  Chip,
  Container,
  Divider,
  InputAdornment,
  Pagination,
  Stack,
  TextField,
  Typography,
} from '@mui/material';
import Grid from '@mui/material/Grid2';
import { alpha } from '@mui/material/styles';
import { Link } from 'react-router-dom';
import SearchRoundedIcon from '@mui/icons-material/SearchRounded';
import AccessTimeRoundedIcon from '@mui/icons-material/AccessTimeRounded';
import PersonOutlineRoundedIcon from '@mui/icons-material/PersonOutlineRounded';
import ArticleOutlinedIcon from '@mui/icons-material/ArticleOutlined';

import { PageHero } from '@/components/ui/PageHero';
import { Reveal } from '@/components/ui/Reveal';
import { Loader, EmptyState, ErrorState } from '@/components/ui/States';
import { useBlogList } from '@/lib/queries';
import { errorMessage } from '@/lib/api';
import { formatDate } from '@/lib/format';
import { brand, gradients } from '@/theme/theme';
import type { BlogPost } from '@/lib/types';
import { usePageMeta } from '@/lib/usePageMeta';

export default function BlogList() {
  usePageMeta('Dental Health Blog — Bright Smile Dental Clinic', 'Dental tips and insights from Bright Smile Dental Clinic.');
  const [category, setCategory] = useState<string | undefined>(undefined);
  const [searchInput, setSearchInput] = useState('');
  const [search, setSearch] = useState('');
  const [page, setPage] = useState(1);

  // Debounce the search input.
  useEffect(() => {
    const t = setTimeout(() => {
      setSearch(searchInput.trim());
      setPage(1);
    }, 400);
    return () => clearTimeout(t);
  }, [searchInput]);

  const { data, isLoading, isError, error, refetch, isFetching } = useBlogList({ category, search, page });

  const selectCategory = (name?: string) => {
    setCategory((prev) => (prev === name ? undefined : name));
    setPage(1);
  };

  return (
    <Box>
      <PageHero
        title="Dental Health Blog"
        subtitle="Expert tips, treatment guides, and the latest in dentistry — written by our clinical team."
        crumbs={[{ label: 'Blog' }]}
      />

      <Container sx={{ py: { xs: 5, md: 8 } }}>
        <Grid container spacing={{ xs: 4, md: 5 }}>
          {/* ── Main column ─────────────────────────────────────── */}
          <Grid size={{ xs: 12, md: 8 }}>
            {(category || search) && (
              <Stack direction="row" spacing={1} alignItems="center" sx={{ mb: 3, flexWrap: 'wrap', gap: 1 }}>
                <Typography color="text.secondary" variant="body2">
                  Filtering by:
                </Typography>
                {category && <Chip label={category} onDelete={() => selectCategory(undefined)} color="primary" size="small" />}
                {search && <Chip label={`"${search}"`} onDelete={() => setSearchInput('')} size="small" />}
              </Stack>
            )}

            {isLoading ? (
              <Loader label="Loading articles…" />
            ) : isError ? (
              <ErrorState message={errorMessage(error)} onRetry={() => refetch()} />
            ) : !data || data.items.length === 0 ? (
              <EmptyState
                title="No articles found"
                description="Try a different category or search term."
                icon={<ArticleOutlinedIcon sx={{ fontSize: 56 }} />}
              />
            ) : (
              <>
                <Grid container spacing={{ xs: 3, sm: 3.5 }} sx={{ opacity: isFetching ? 0.6 : 1, transition: 'opacity .2s ease' }}>
                  {data.items.map((post, i) => (
                    <Grid key={post.id} size={{ xs: 12, sm: 6 }}>
                      <Reveal delayIndex={i % 2}>
                        <BlogCard post={post} />
                      </Reveal>
                    </Grid>
                  ))}
                </Grid>

                {data.meta.totalPages > 1 && (
                  <Stack alignItems="center" sx={{ mt: 5 }}>
                    <Pagination
                      count={data.meta.totalPages}
                      page={page}
                      onChange={(_, p) => setPage(p)}
                      color="primary"
                      shape="rounded"
                      size="large"
                    />
                  </Stack>
                )}
              </>
            )}
          </Grid>

          {/* ── Sidebar ─────────────────────────────────────────── */}
          <Grid size={{ xs: 12, md: 4 }}>
            <Stack spacing={3} sx={{ position: { md: 'sticky' }, top: { md: 96 } }}>
              {/* Search */}
              <Card>
                <CardContent>
                  <Typography variant="h6" sx={{ mb: 2 }}>
                    Search
                  </Typography>
                  <TextField
                    fullWidth
                    placeholder="Search articles…"
                    value={searchInput}
                    onChange={(e) => setSearchInput(e.target.value)}
                    slotProps={{
                      input: {
                        startAdornment: (
                          <InputAdornment position="start">
                            <SearchRoundedIcon sx={{ color: 'text.secondary' }} />
                          </InputAdornment>
                        ),
                      },
                    }}
                  />
                </CardContent>
              </Card>

              {/* Categories */}
              {data && data.categories.length > 0 && (
                <Card>
                  <CardContent>
                    <Typography variant="h6" sx={{ mb: 1.5 }}>
                      Categories
                    </Typography>
                    <Stack divider={<Divider flexItem />}>
                      {data.categories.map((c) => {
                        const activeCat = category === c.name;
                        return (
                          <Box
                            key={c.name}
                            onClick={() => selectCategory(c.name)}
                            sx={{
                              display: 'flex',
                              alignItems: 'center',
                              justifyContent: 'space-between',
                              py: 1.25,
                              cursor: 'pointer',
                              color: activeCat ? brand.primary : 'text.primary',
                              fontWeight: activeCat ? 700 : 500,
                              transition: 'color .2s ease',
                              '&:hover': { color: brand.primary },
                            }}
                          >
                            <Typography sx={{ fontWeight: 'inherit', color: 'inherit' }}>{c.name}</Typography>
                            <Chip
                              label={c.count}
                              size="small"
                              sx={{
                                bgcolor: activeCat ? brand.primary : alpha(brand.primary, 0.1),
                                color: activeCat ? '#fff' : brand.primary,
                                fontWeight: 700,
                                minWidth: 34,
                              }}
                            />
                          </Box>
                        );
                      })}
                    </Stack>
                  </CardContent>
                </Card>
              )}

              {/* Popular posts */}
              {data && data.popular.length > 0 && (
                <Card sx={{ background: gradients.soft }}>
                  <CardContent>
                    <Typography variant="h6" sx={{ mb: 2 }}>
                      Popular Posts
                    </Typography>
                    <Stack spacing={2}>
                      {data.popular.map((p) => (
                        <Box
                          key={p.id}
                          component={Link}
                          to={`/blog/${p.slug}`}
                          sx={{
                            display: 'flex',
                            gap: 1.5,
                            textDecoration: 'none',
                            color: 'inherit',
                            alignItems: 'center',
                            '&:hover .pp-title': { color: brand.primary },
                          }}
                        >
                          <Box
                            component="img"
                            src={p.coverImage ?? undefined}
                            alt={p.title}
                            sx={{ width: 68, height: 68, borderRadius: 2, objectFit: 'cover', flexShrink: 0 }}
                          />
                          <Box sx={{ minWidth: 0 }}>
                            <Typography
                              className="pp-title"
                              sx={{ fontWeight: 700, fontSize: 14.5, lineHeight: 1.35, transition: 'color .2s ease' }}
                            >
                              {p.title}
                            </Typography>
                            {p.publishedAt && (
                              <Typography variant="caption" color="text.secondary">
                                {formatDate(p.publishedAt)}
                              </Typography>
                            )}
                          </Box>
                        </Box>
                      ))}
                    </Stack>
                  </CardContent>
                </Card>
              )}
            </Stack>
          </Grid>
        </Grid>
      </Container>
    </Box>
  );
}

function BlogCard({ post }: { post: BlogPost }) {
  return (
    <Card
      component={Link}
      to={`/blog/${post.slug}`}
      sx={{
        height: '100%',
        display: 'flex',
        flexDirection: 'column',
        textDecoration: 'none',
        overflow: 'hidden',
        transition: 'transform .28s ease, box-shadow .28s ease',
        '&:hover': { transform: 'translateY(-6px)', boxShadow: `0 22px 44px ${alpha(brand.ink, 0.14)}` },
        '&:hover .bc-img': { transform: 'scale(1.06)' },
      }}
    >
      <Box sx={{ overflow: 'hidden', position: 'relative' }}>
        <CardMedia
          className="bc-img"
          component="img"
          image={post.coverImage ?? undefined}
          alt={post.title}
          sx={{ height: 190, transition: 'transform .5s ease' }}
        />
        <Chip
          label={post.category}
          size="small"
          sx={{
            position: 'absolute',
            top: 12,
            left: 12,
            bgcolor: 'rgba(255,255,255,0.92)',
            color: brand.primary,
            fontWeight: 700,
            backdropFilter: 'blur(4px)',
          }}
        />
      </Box>
      <CardContent sx={{ flex: 1, display: 'flex', flexDirection: 'column', p: { xs: 2.5, md: 3 } }}>
        <Typography variant="h6" sx={{ fontSize: '1.15rem', mb: 1, lineHeight: 1.3, color: 'text.primary' }}>
          {post.title}
        </Typography>
        <Typography color="text.secondary" variant="body2" sx={{ mb: 2, flex: 1 }}>
          {post.excerpt}
        </Typography>
        <Stack direction="row" spacing={2} alignItems="center" sx={{ color: 'text.secondary', flexWrap: 'wrap', rowGap: 0.5 }}>
          <Stack direction="row" spacing={0.5} alignItems="center">
            <PersonOutlineRoundedIcon sx={{ fontSize: 16 }} />
            <Typography variant="caption">{post.author}</Typography>
          </Stack>
          <Stack direction="row" spacing={0.5} alignItems="center">
            <AccessTimeRoundedIcon sx={{ fontSize: 16 }} />
            <Typography variant="caption">{post.readMinutes} min read</Typography>
          </Stack>
          {post.publishedAt && (
            <Typography variant="caption" sx={{ ml: 'auto' }}>
              {formatDate(post.publishedAt)}
            </Typography>
          )}
        </Stack>
      </CardContent>
    </Card>
  );
}
