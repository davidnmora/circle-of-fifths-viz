import CircleOfFifthsViz from './components/CirlceOfFifthsViz'
import DevControls from './components/DevControls'
import InputStateContexztProvider from './InputStateContext'

const App = () => {
  return (
    <InputStateContexztProvider>
      <div>
        <header>
          <h1>Circle of Fifths Viz</h1>
        </header>
        <DevControls />
        <CircleOfFifthsViz />
      </div>
    </InputStateContexztProvider>
  )
}

export default App
