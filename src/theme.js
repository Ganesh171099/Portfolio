import { createTheme } from '@mui/material/styles'

const theme = createTheme({
  palette: {
    primary: {
      main: '#4B006E',
    },
    text: {
      primary: '#1a1220',
      secondary: '#6b6174',
    },
    background: {
      default: '#f7f5f8',
      paper: '#ffffff',
    },
  },
  typography: {
    fontFamily: "'Outfit', sans-serif",
    h1: { fontFamily: "'Unbounded', 'Space Grotesk', sans-serif" },
    h2: { fontFamily: "'Space Grotesk', 'Outfit', sans-serif" },
    h3: { fontFamily: "'Space Grotesk', 'Outfit', sans-serif" },
    h4: { fontFamily: "'Space Grotesk', 'Outfit', sans-serif" },
  },
  components: {
    MuiCssBaseline: {
      styleOverrides: {
        body: {
          margin: 0,
        },
      },
    },
    MuiLink: {
      defaultProps: {
        underline: 'none',
      },
    },
    MuiButtonBase: {
      defaultProps: {
        disableRipple: false,
      },
    },
  },
})

export default theme
