import { createTheme, responsiveFontSizes } from '@mui/material/styles';

let theme = createTheme({
  breakpoints: {
    values: {
      xs: 0,
      sm: 600,
      md: 900,
      lg: 1200,
      xl: 1536,
    },
  },
  palette: {
    primary: {
      main: '#2196f3',
      dark: '#1976d2',
      light: '#64b5f6',
      contrastText: '#fff',
    },
    secondary: {
      main: '#f50057',
      dark: '#c51162',
      light: '#ff4081',
      contrastText: '#fff',
    },
    background: {
      default: '#f5f5f5',
      paper: '#ffffff',
    },
  },
  typography: {
    fontFamily: '"Segoe UI", "Roboto", "Arial", sans-serif',
    h1: {
      fontSize: '2.5rem',
      '@media (max-width:600px)': {
        fontSize: '2rem',
      },
    },
    h2: {
      fontSize: '2rem',
      '@media (max-width:600px)': {
        fontSize: '1.75rem',
      },
    },
    h3: {
      fontSize: '1.75rem',
      '@media (max-width:600px)': {
        fontSize: '1.5rem',
      },
    },
    h4: {
      fontSize: '1.5rem',
      fontWeight: 600,
      '@media (max-width:600px)': {
        fontSize: '1.25rem',
      },
    },
    h5: {
      fontSize: '1.25rem',
      '@media (max-width:600px)': {
        fontSize: '1.1rem',
      },
    },
    h6: {
      fontSize: '1.1rem',
      '@media (max-width:600px)': {
        fontSize: '1rem',
      },
    },
    body1: {
      fontSize: '1rem',
      '@media (max-width:600px)': {
        fontSize: '0.875rem',
      },
    },
    body2: {
      fontSize: '0.875rem',
      '@media (max-width:600px)': {
        fontSize: '0.75rem',
      },
    },
  },
  components: {
    MuiCssBaseline: {
      styleOverrides: {
        html: {
          WebkitFontSmoothing: 'auto',
        },
        body: {
          margin: 0,
          padding: 0,
          boxSizing: 'border-box',
        },
      },
    },
    MuiButton: {
      styleOverrides: {
        root: {
          borderRadius: 8,
          textTransform: 'none',
          padding: '8px 16px',
          '@media (max-width:600px)': {
            padding: '6px 12px',
            fontSize: '0.875rem',
          },
        },
        sizeLarge: {
          padding: '12px 24px',
          '@media (max-width:600px)': {
            padding: '8px 16px',
          },
        },
        sizeSmall: {
          padding: '4px 8px',
          '@media (max-width:600px)': {
            padding: '2px 6px',
          },
        },
      },
    },
    MuiDialog: {
      styleOverrides: {
        paper: {
          borderRadius: 16,
          margin: 16,
          '@media (max-width:600px)': {
            margin: 8,
            width: 'calc(100% - 16px)',
            maxHeight: 'calc(100% - 16px)',
          },
        },
      },
    },
    MuiTableCell: {
      styleOverrides: {
        root: {
          padding: '16px',
          '@media (max-width:600px)': {
            padding: '8px',
            fontSize: '0.75rem',
          },
        },
        head: {
          fontWeight: 600,
          backgroundColor: '#f5f5f5',
        },
      },
    },
    MuiCard: {
      styleOverrides: {
        root: {
          borderRadius: 16,
          '@media (max-width:600px)': {
            borderRadius: 12,
          },
        },
      },
    },
    MuiCardContent: {
      styleOverrides: {
        root: {
          padding: '24px',
          '@media (max-width:600px)': {
            padding: '16px',
          },
          '&:last-child': {
            paddingBottom: '24px',
            '@media (max-width:600px)': {
              paddingBottom: '16px',
            },
          },
        },
      },
    },
    MuiContainer: {
      styleOverrides: {
        root: {
          padding: '24px',
          '@media (max-width:600px)': {
            padding: '16px',
          },
        },
      },
    },
    MuiInputBase: {
      styleOverrides: {
        root: {
          fontSize: '1rem',
          '@media (max-width:600px)': {
            fontSize: '0.875rem',
          },
        },
      },
    },
    MuiChip: {
      styleOverrides: {
        root: {
          height: '32px',
          '@media (max-width:600px)': {
            height: '24px',
            fontSize: '0.75rem',
          },
        },
        label: {
          padding: '0 12px',
          '@media (max-width:600px)': {
            padding: '0 8px',
          },
        },
      },
    },
  },
  spacing: (factor) => `${8 * factor}px`,
});

// Add responsive font sizes
theme = responsiveFontSizes(theme, {
  breakpoints: ['xs', 'sm', 'md', 'lg', 'xl'],
  factor: 2,
});

// Custom mixins for responsive design
theme.mixins.toolbar = {
  ...theme.mixins.toolbar,
  '@media (max-width:600px)': {
    minHeight: 56,
  },
};

theme.mixins.responsivePadding = {
  padding: theme.spacing(3),
  [theme.breakpoints.down('sm')]: {
    padding: theme.spacing(2),
  },
};

theme.mixins.responsiveSpacing = {
  margin: theme.spacing(2),
  [theme.breakpoints.down('sm')]: {
    margin: theme.spacing(1),
  },
};

export default theme;