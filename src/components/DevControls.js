import { useUpdateInputState } from '../InputStateContext'

const SAMPLE_TREBLE_NOTES = [
  [
    { noteName: 'E', octave: 5, noteNum: 76 },
    { noteName: 'F', octave: 5, noteNum: 77 },
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
