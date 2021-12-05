import { useState } from "react";
import CircleOfFifthsViz from "./components/CirlceOfFifthsViz";
const DEFAULT_INPUT_STATE = {
  bassNote: 'C',
  trebbleNotes: [],
}
const App = () => {
  const [inputState, setInputState] = useState()
  return (
    <div>
      <header className="App-header">
        <h1>Circle of Fifths Viz</h1>
      </header>
      <CircleOfFifthsViz inputState={inputState} setInputState={setInputState}/>
    </div>
  );
}

export default App;
