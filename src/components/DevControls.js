import { useState } from 'react'
import { useUpdateInputState } from '../InputStateContext'
import { SubTitle } from '../App'

const SAMPLE_TREBLE_NOTES = [
  [
    { noteName: 'E', octave: 5, noteNum: 76 },
    { noteName: 'F', octave: 5, noteNum: 77 },
  ],
  [
    { noteName: 'C', octave: 5, noteNum: 72 },
    { noteName: 'E', octave: 5, noteNum: 76 },
    { noteName: 'G', octave: 5, noteNum: 79 },
    { noteName: 'Bb', octave: 5, noteNum: 81 },
  ],
  [
    { noteName: 'C', octave: 5, noteNum: 72 },
    { noteName: 'Eb', octave: 5, noteNum: 75 },
    { noteName: 'G', octave: 5, noteNum: 79 },
    { noteName: 'Bb', octave: 5, noteNum: 81 },
  ],
  [
    { noteName: 'C', octave: 5, noteNum: 72 },
    { noteName: 'E', octave: 5, noteNum: 76 },
    { noteName: 'G', octave: 5, noteNum: 79 },
  ],
  [
    { noteName: 'C', octave: 5, noteNum: 72 },
    { noteName: 'Eb', octave: 5, noteNum: 75 },
    { noteName: 'G', octave: 5, noteNum: 79 },
  ],
]
const DevControls = () => {
  const updateInputState = useUpdateInputState()
  const [trebleIndex, setTrebledIndex] = useState(null)
  return (
    <div>
      <SubTitle>Select Treble notes:</SubTitle>
      {SAMPLE_TREBLE_NOTES.map((trebleNotes, i) => (
        <button
          key={trebleNotes.toString()}
          onClick={() => {
            setTrebledIndex(i)
            updateInputState((draft) => {
              draft.trebleNotes = trebleNotes
            })
          }}
          style={{ opacity: trebleIndex === i ? 1 : 0.7 }}
        >
          {`Make note ${trebleNotes
            .map(({ noteName }) => noteName)
            .toString()}`}
        </button>
      ))}
    </div>
  )
}

export default DevControls
