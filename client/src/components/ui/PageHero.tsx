import { Box, Breadcrumbs, Container, Link as MuiLink, Typography } from '@mui/material';
import { Link } from 'react-router-dom';
import NavigateNextIcon from '@mui/icons-material/NavigateNext';
import { brand } from '@/theme/theme';

interface Crumb {
  label: string;
  to?: string;
}

// Light inner-page banner: soft blue tint, dark headline, subtle shapes.
export function PageHero({ title, subtitle, crumbs = [] }: { title: string; subtitle?: string; crumbs?: Crumb[] }) {
  return (
    <Box
      sx={{
        bgcolor: brand.mist,
        borderBottom: `1px solid ${brand.line}`,
        pt: { xs: 13, md: 17 },
        pb: { xs: 5, md: 7 },
        position: 'relative',
        overflow: 'hidden',
      }}
    >
      {/* Soft decorative shapes */}
      <Box
        sx={{
          position: 'absolute',
          top: -160,
          right: -120,
          width: 420,
          height: 420,
          borderRadius: '50%',
          background: `radial-gradient(circle, ${brand.cloud} 0%, transparent 65%)`,
          pointerEvents: 'none',
        }}
      />
      <Box
        sx={{
          position: 'absolute',
          bottom: -180,
          left: -140,
          width: 380,
          height: 380,
          borderRadius: '50%',
          background: 'radial-gradient(circle, rgba(34,193,195,0.08) 0%, transparent 65%)',
          pointerEvents: 'none',
        }}
      />
      <Container sx={{ position: 'relative' }}>
        <Breadcrumbs
          separator={<NavigateNextIcon fontSize="small" sx={{ color: 'text.disabled' }} />}
          sx={{ mb: 2, '& a, & p': { fontSize: 14 } }}
        >
          <MuiLink component={Link} to="/" underline="hover" sx={{ color: 'text.secondary' }}>
            Home
          </MuiLink>
          {crumbs.map((c, i) =>
            c.to && i < crumbs.length - 1 ? (
              <MuiLink key={i} component={Link} to={c.to} underline="hover" sx={{ color: 'text.secondary' }}>
                {c.label}
              </MuiLink>
            ) : (
              <Typography key={i} sx={{ color: 'primary.main', fontWeight: 600 }}>
                {c.label}
              </Typography>
            ),
          )}
        </Breadcrumbs>
        <Typography variant="h2" sx={{ fontSize: { xs: '1.9rem', sm: '2.4rem', md: '2.9rem' }, maxWidth: 820, color: 'text.primary' }}>
          {title}
        </Typography>
        {subtitle && (
          <Typography sx={{ mt: 2, maxWidth: 660, color: 'text.secondary', fontSize: { xs: '1rem', md: '1.1rem' } }}>
            {subtitle}
          </Typography>
        )}
      </Container>
    </Box>
  );
}
