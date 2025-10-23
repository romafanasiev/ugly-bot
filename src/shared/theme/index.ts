import { createTheme } from '@mui/material';

export const theme = createTheme({
  typography: {
    fontFamily: 'var(--font-amarante), sans-serif',
    h1: {
      fontFamily: 'var(--font-amarante), sans-serif',
      fontWeight: 700,
      fontSize: '2rem',
      lineHeight: '1.26',
      letterSpacing: 'var(--default-letter-spacing)',
      verticalAlign: 'middle',
      textTransform: 'uppercase',
    },
    h2: {
      fontFamily: 'var(--font-amarante), sans-serif',
      fontWeight: 700,
      fontSize: '1.375rem',
      lineHeight: '1.26',
      letterSpacing: 'var(--default-letter-spacing)',
      textTransform: 'uppercase',
    },
    body1: {
      fontWeight: 400,
      fontSize: '1rem',
      lineHeight: 'var(--default-line-height)',
      letterSpacing: 'var(--default-letter-spacing)',
      color: 'var(--color-typography)',
    },
    body2: {
      fontWeight: 400,
      fontSize: '0.875rem',
      lineHeight: '1.125',
      letterSpacing: 'var(--default-letter-spacing)',
      color: 'var(--color-typography)',
    },
    button: {
      fontWeight: 400,
      fontSize: '1rem',
      lineHeight: 'var(--default-line-height)',
      letterSpacing: 'var(--default-letter-spacing)',
      color: 'var(--color-typography)',
    },
  },
  palette: {},
  components: {
    MuiLink: {
      styleOverrides: {
        root: {
          textDecoration: 'underline',
          fontWeight: 700,
          fontStyle: 'bold',
          color: 'var(--color-link)',
        },
      },
    },
    MuiButton: {
      styleOverrides: {
        root: {},
      },
    },
  },
});
