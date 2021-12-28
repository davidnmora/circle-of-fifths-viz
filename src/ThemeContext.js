import { ThemeProvider } from 'styled-components'

const DEFAULT_THEME = {
  primary: {
    dark: '#5146D9',
    medium: '#9D70FC',
    light: '#BDA1F6',
  },
  secondary: {
    cool: '#95CEE0',
  },
  highlights: {
    hot: '#FF6D3F',
    bright: '#FFEC3F',
  },
  neutral: {
    dark: '#1D1763',
  },
}

const ThemeContext = ({ children }) => {
  return <ThemeProvider theme={DEFAULT_THEME}>{children}</ThemeProvider>
}

export default ThemeContext
