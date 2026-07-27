import { Stack, Typography } from '@mui/material';
import { brand } from '@/theme/theme';
import { Reveal } from './Reveal';

interface Props {
  eyebrow?: string;
  title: string;
  subtitle?: string;
  align?: 'center' | 'left';
  light?: boolean;
}

// Reference-inspired section header: "+ EYEBROW" label, blue title, slate subtitle.
export function SectionHeading({ eyebrow, title, subtitle, align = 'center', light }: Props) {
  return (
    <Reveal
      sx={{
        textAlign: align,
        maxWidth: align === 'center' ? 760 : 640,
        mx: align === 'center' ? 'auto' : 0,
        mb: { xs: 4, md: 6 },
      }}
    >
      {eyebrow && (
        <Stack
          direction="row"
          spacing={0.75}
          justifyContent={align === 'center' ? 'center' : 'flex-start'}
          alignItems="center"
          sx={{ mb: 1.5 }}
        >
          <Typography
            component="span"
            sx={{ color: light ? '#a8e0ff' : brand.primary, fontWeight: 800, fontSize: 15, lineHeight: 1 }}
          >
            +
          </Typography>
          <Typography
            component="span"
            sx={{
              color: light ? 'rgba(255,255,255,0.85)' : brand.primary,
              fontWeight: 700,
              letterSpacing: '0.22em',
              textTransform: 'uppercase',
              fontSize: 12.5,
            }}
          >
            {eyebrow}
          </Typography>
        </Stack>
      )}
      <Typography
        variant="h2"
        sx={{
          fontSize: { xs: '1.8rem', sm: '2.2rem', md: '2.6rem' },
          color: light ? '#fff' : brand.primary,
        }}
      >
        {title}
      </Typography>
      {subtitle && (
        <Typography
          variant="body1"
          sx={{
            mt: 1.75,
            fontSize: { xs: '1rem', md: '1.08rem' },
            color: light ? 'rgba(255,255,255,0.85)' : 'text.secondary',
          }}
        >
          {subtitle}
        </Typography>
      )}
    </Reveal>
  );
}
