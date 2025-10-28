import { createTheme } from '@mui/material';

export const theme = createTheme({
  typography: {
    fontFamily: 'var(--font-amarante), sans-serif',
    h1: {
      fontFamily: 'var(--font-amarante), sans-serif',
      fontWeight: 700,
      fontSize: '1.5rem',
      lineHeight: '1.26',
      letterSpacing: 'var(--default-letter-spacing)',
      verticalAlign: 'middle',
      textTransform: 'uppercase',

      '@media (min-width: 768px)': {
        fontSize: '2rem',
      },
    },
    h2: {
      fontFamily: 'var(--font-amarante), sans-serif',
      fontWeight: 700,
      fontSize: '1rem',
      lineHeight: '1.26',
      letterSpacing: 'var(--default-letter-spacing)',
      textTransform: 'uppercase',

      '@media (min-width: 768px)': {
        fontSize: '1.375rem',
      },
    },
    body1: {
      fontWeight: 400,
      fontSize: '0.75rem',
      lineHeight: 'var(--default-line-height)',
      letterSpacing: 'var(--default-letter-spacing)',
      color: 'var(--color-typography)',

      '@media (min-width: 768px)': {
        fontSize: '1rem',
      },
    },
    body2: {
      fontWeight: 400,
      fontSize: '0.65rem',
      lineHeight: '1.125',
      letterSpacing: 'var(--default-letter-spacing)',
      color: 'var(--color-typography)',

      '@media (min-width: 768px)': {
        fontSize: '0.875rem',
      },
    },
    button: {
      fontWeight: 400,
      fontSize: '0.75rem',
      lineHeight: 'var(--default-line-height)',
      letterSpacing: 'var(--default-letter-spacing)',
      color: 'var(--color-typography)',

      '@media (min-width: 768px)': {
        fontSize: '1rem',
      },
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
