import styled from 'styled-components'
import CircleOfFifthsViz from './components/CirlceOfFifthsViz'
import DevControls from './components/DevControls'
import InputStateContextProvider from './InputStateContext'
import ThemeContext from './ThemeContext'

const HeaderText = styled.h1`
  color: ${({ theme }) => theme.neutral.medium};
`

export const SubTitle = styled.h3`
  color: ${({ theme }) => theme.neutral.medium};
`
export const BlueHighlightedText = styled.span`
  color: ${({ theme }) => theme.neutral.dark};
  background-color: ${({ theme }) => theme.secondary.cool};
`

const App = () => {
  return (
    <InputStateContextProvider>
      <ThemeContext>
        <div>
          <header>
            <HeaderText>Circle of Fifths Viz</HeaderText>
            The <BlueHighlightedText>
              Blue Key Center arc
            </BlueHighlightedText>{' '}
            highlights the (major) key centers your chord could belong within
            (if any)
          </header>
          <DevControls />
          <CircleOfFifthsViz />
        </div>
      </ThemeContext>
    </InputStateContextProvider>
  )
}

export default App
