import { createTheme, alpha, type ThemeOptions } from '@mui/material/styles';

// ── Bright Smile brand palette ────────────────────────────────────────
// Light, clean, premium: white surfaces, calm blues, generous whitespace.
export const brand = {
  primary: '#1f6feb',
  primaryDark: '#1558c9',
  primaryLight: '#5c9bff',
  accent: '#22c1c3',
  ink: '#0b1c36',
  slate: '#5b6b84',
  mist: '#f5f9ff', // section tint
  cloud: '#eef4ff', // chip / icon tint
  line: '#e6edf9', // hairline borders
  success: '#16a34a',
  warning: '#d97706',
  danger: '#dc2626',
};

// Kept for internal surfaces (staff portal shell, emails). The public site
// itself stays light — use `brand.mist`/`brand.cloud` tints there instead.
export const gradients = {
  primary: `linear-gradient(135deg, ${brand.primary} 0%, ${brand.primaryDark} 100%)`,
  hero: `linear-gradient(135deg, #1f6feb 0%, #0a4bc2 55%, #06b6d4 140%)`,
  soft: `linear-gradient(180deg, ${brand.mist} 0%, #ffffff 100%)`,
  glass: `linear-gradient(135deg, ${alpha('#ffffff', 0.92)} 0%, ${alpha('#ffffff', 0.7)} 100%)`,
  accent: `linear-gradient(135deg, ${brand.accent} 0%, ${brand.primary} 100%)`,
};

// Soft, layered shadow used by cards and floating elements.
export const softShadow = '0 1px 2px rgba(11,28,54,0.04), 0 12px 32px rgba(11,28,54,0.07)';
export const hoverShadow = '0 2px 4px rgba(11,28,54,0.05), 0 20px 44px rgba(11,28,54,0.12)';

const baseOptions: ThemeOptions = {
  palette: {
    mode: 'light',
    primary: {
      main: brand.primary,
      dark: brand.primaryDark,
      light: brand.primaryLight,
      contrastText: '#ffffff',
    },
    secondary: { main: brand.accent, contrastText: '#ffffff' },
    success: { main: brand.success },
    warning: { main: brand.warning },
    error: { main: brand.danger },
    text: { primary: brand.ink, secondary: brand.slate },
    background: { default: '#ffffff', paper: '#ffffff' },
    divider: brand.line,
  },
  shape: { borderRadius: 12 },
  typography: {
    fontFamily: '"Plus Jakarta Sans", "Manrope", system-ui, -apple-system, sans-serif',
    h1: { fontWeight: 800, letterSpacing: '-0.035em', lineHeight: 1.06 },
    h2: { fontWeight: 800, letterSpacing: '-0.028em', lineHeight: 1.14 },
    h3: { fontWeight: 700, letterSpacing: '-0.02em', lineHeight: 1.2 },
    h4: { fontWeight: 700, letterSpacing: '-0.015em' },
    h5: { fontWeight: 700 },
    h6: { fontWeight: 700 },
    subtitle1: { fontWeight: 600 },
    button: { fontWeight: 700, textTransform: 'none', letterSpacing: 0 },
    body1: { lineHeight: 1.75 },
    body2: { lineHeight: 1.7 },
  },
  components: {
    MuiCssBaseline: {
      styleOverrides: {
        html: { scrollBehavior: 'smooth', WebkitFontSmoothing: 'antialiased' },
        body: { backgroundColor: '#ffffff', overflowX: 'hidden' },
        '::selection': { background: alpha(brand.primary, 0.15) },
        '*::-webkit-scrollbar': { width: 10, height: 10 },
        '*::-webkit-scrollbar-thumb': {
          background: alpha(brand.primary, 0.25),
          borderRadius: 8,
        },
        '*::-webkit-scrollbar-thumb:hover': { background: alpha(brand.primary, 0.4) },
      },
    },
    MuiButton: {
      defaultProps: { disableElevation: true },
      styleOverrides: {
        root: {
          borderRadius: 12,
          paddingInline: 22,
          paddingBlock: 10,
          fontWeight: 700,
          transition: 'transform .18s ease, box-shadow .18s ease, background-color .18s ease',
        },
        containedPrimary: {
          backgroundColor: brand.primary,
          boxShadow: `0 8px 20px ${alpha(brand.primary, 0.28)}`,
          '&:hover': {
            backgroundColor: brand.primaryDark,
            boxShadow: `0 12px 26px ${alpha(brand.primary, 0.36)}`,
            transform: 'translateY(-1px)',
          },
        },
        outlinedPrimary: {
          borderColor: alpha(brand.primary, 0.35),
          '&:hover': { borderColor: brand.primary, backgroundColor: alpha(brand.primary, 0.04) },
        },
        sizeLarge: { paddingInline: 32, paddingBlock: 13, fontSize: '1rem' },
      },
    },
    MuiCard: {
      defaultProps: { elevation: 0 },
      styleOverrides: {
        root: {
          borderRadius: 16,
          border: `1px solid ${brand.line}`,
          boxShadow: softShadow,
          backgroundImage: 'none',
        },
      },
    },
    MuiPaper: {
      styleOverrides: { rounded: { borderRadius: 14 } },
    },
    MuiChip: {
      styleOverrides: {
        root: { fontWeight: 600, borderRadius: 999 },
      },
    },
    MuiTextField: { defaultProps: { variant: 'outlined' } },
    MuiOutlinedInput: {
      styleOverrides: {
        root: {
          borderRadius: 10,
          backgroundColor: '#fff',
          '& fieldset': { borderColor: brand.line },
          '&:hover fieldset': { borderColor: alpha(brand.primary, 0.4) },
        },
      },
    },
    MuiAppBar: {
      styleOverrides: { root: { color: brand.ink } },
    },
    MuiContainer: {
      defaultProps: { maxWidth: 'lg' },
    },
    MuiTooltip: {
      styleOverrides: {
        tooltip: { background: brand.ink, borderRadius: 8, fontSize: 12, fontWeight: 600 },
      },
    },
    MuiAccordion: {
      styleOverrides: {
        root: {
          border: `1px solid ${brand.line}`,
          boxShadow: 'none',
          '&:before': { display: 'none' },
        },
      },
    },
  },
};

export const theme = createTheme(baseOptions);
