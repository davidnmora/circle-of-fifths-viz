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

const SAMPLE_BASS_NOTES = [
  { noteName: 'F', octave: 3, noteNum: 53 },
  { noteName: 'F#', octave: 3, noteNum: 54 },
  { noteName: 'G', octave: 3, noteNum: 55 },
  { noteName: 'Ab', octave: 3, noteNum: 56 },
  { noteName: 'A', octave: 3, noteNum: 57 },
  { noteName: 'Bb', octave: 3, noteNum: 58 },
  { noteName: 'B', octave: 3, noteNum: 59 },
  { noteName: 'C', octave: 4, noteNum: 60 },
  { noteName: 'C#', octave: 4, noteNum: 61 },
  { noteName: 'D', octave: 4, noteNum: 62 },
  { noteName: 'Eb', octave: 4, noteNum: 63 },
  { noteName: 'E', octave: 4, noteNum: 64 },
]

const DevControls = () => {
  const updateInputState = useUpdateInputState()
  const [trebleIndex, setTrebledIndex] = useState(null)
  const [bassIndex, setBassIndex] = useState(null)
  return (
    <div>
      <SubTitle>Select Treble notes:</SubTitle>
      {SAMPLE_TREBLE_NOTES.map((trebleNotes, i) => (
        <button
          key={i}
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

      <SubTitle>Select Bass note:</SubTitle>
      {SAMPLE_BASS_NOTES.map((bassNote, i) => (
        <button
          key={bassNote.noteName}
          onClick={() => {
            setBassIndex(i)
            updateInputState((draft) => {
              draft.bassNote = bassNote
            })
          }}
          style={{ opacity: bassIndex === i ? 1 : 0.7 }}
        >
          {`Make note ${bassNote.noteName}`}
        </button>
      ))}
    </div>
  )
}

export default DevControls
