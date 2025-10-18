'use client';

import { ThemeProvider as MuiThemeProvider } from '@mui/material';

import { theme } from '@/src/shared/theme';

function ThemeProvider({ children }: Readonly<{ children: React.ReactNode }>) {
  return <MuiThemeProvider theme={theme}>{children}</MuiThemeProvider>;
}

export default ThemeProvider;
