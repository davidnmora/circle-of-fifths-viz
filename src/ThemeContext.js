import { ThemeProvider, createGlobalStyle } from 'styled-components'

const GlobalStyle = createGlobalStyle`
  body {
    background-color: ${({ theme }) => theme.neutral.dark};
    font-family: 'Karla', sans-serif;
    color: ${({ theme }) => theme.neutral.light};
  }
`

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
    medium: '#8A87AC',
    light: '#F0F0F0',
  },
}

const ThemeContext = ({ children }) => {
  return (
    <ThemeProvider theme={DEFAULT_THEME}>
      <GlobalStyle /> {children}
    </ThemeProvider>
  )
}

export default ThemeContext
