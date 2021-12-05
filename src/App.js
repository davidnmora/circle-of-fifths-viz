import CircleOfFifthsViz from './components/CirlceOfFifthsViz'
import { useImmer } from 'use-immer'
import useMIDIInput from './useMIDIInput'
const DEFAULT_INPUT_STATE = {
  bassNote: 'C',
  trebbleNotes: [],
}
const handleMIDIMessage = (msg = []) => {
  console.log(msg)
}
const App = () => {
  const [inputState, updateInputState] = useImmer(DEFAULT_INPUT_STATE)
  useMIDIInput(handleMIDIMessage)
  return (
    <div>
      <header>
        <h1>Circle of Fifths Viz</h1>
      </header>
      <CircleOfFifthsViz
        inputState={inputState}
        updateInputState={updateInputState}
      />
    </div>
  )
}

export default App
