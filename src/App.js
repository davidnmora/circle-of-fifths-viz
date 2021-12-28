import CircleOfFifthsViz from './components/CirlceOfFifthsViz'
import DevControls from './components/DevControls'
import InputStateContextProvider from './InputStateContext'
import ThemeContext from './ThemeContext'

const App = () => {
  return (
    <InputStateContextProvider>
      <ThemeContext>
        <div>
          <header>
            <h1>Circle of Fifths Viz</h1>
          </header>
          <DevControls />
          <CircleOfFifthsViz />
        </div>
      </ThemeContext>
    </InputStateContextProvider>
  )
}

export default App
