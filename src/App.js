import { useState } from 'react'
import CircleOfFifthsViz from './components/CirlceOfFifthsViz'
import { useImmer } from 'use-immer'
const DEFAULT_INPUT_STATE = {
  bassNote: 'C',
  trebbleNotes: [],
}
const App = () => {
  const [inputState, updateInputState] = useImmer(DEFAULT_INPUT_STATE)

  return (
    <div>
      <header className="App-header">
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
