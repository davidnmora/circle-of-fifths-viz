import { useUpdateInputState } from '../InputStateContext'

const SAMPLE_TREBLE_NOTES = [
  [
    { noteName: 'C', octave: 4, noteNum: 60 },
    { noteName: 'E', octave: 4, noteNum: 64 },
    { noteName: 'F', octave: 4, noteNum: 65 },
  ],
]
const DevControls = () => {
  const updateInputState = useUpdateInputState()
  return (
    <div>
      {SAMPLE_TREBLE_NOTES.map((trebleNotes) => (
        <button
          key={trebleNotes.toString()}
          onClick={() =>
            updateInputState((draft) => {
              draft.trebleNotes = trebleNotes
            })
          }
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
