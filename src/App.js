import CircleOfFifthsViz from './components/CirlceOfFifthsViz'
import DevControls from './components/DevControls'
import InputStateContextProvider from './InputStateContext'

const App = () => {
  return (
    <InputStateContextProvider>
      <div>
        <header>
          <h1>Circle of Fifths Viz</h1>
        </header>
        <DevControls />
        <CircleOfFifthsViz />
      </div>
    </InputStateContextProvider>
  )
}

export default App
