import styled from 'styled-components'
import CircleOfFifthsViz from './components/CirlceOfFifthsViz'
import DevControls from './components/DevControls'
import InputStateContextProvider from './InputStateContext'
import ThemeContext from './ThemeContext'

const HeaderText = styled.h1`
  color: ${({ theme }) => theme.neutral.medium};
`

const App = () => {
  return (
    <InputStateContextProvider>
      <ThemeContext>
        <div>
          <header>
            <HeaderText>Circle of Fifths Viz</HeaderText>
          </header>
          <DevControls />
          <CircleOfFifthsViz />
        </div>
      </ThemeContext>
    </InputStateContextProvider>
  )
}

export default App
