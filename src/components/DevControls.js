import { useUpdateInputState } from '../InputStateContext'

const SAMPLE_TREBLE_NOTES = [
  ['C', 'E', 'F'],
  ['G', 'B', 'D'],
  ['A', 'B', 'C'],
  ['Bb'],
  ['E', 'B'],
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
          {`Make note ${trebleNotes.toString()}`}
        </button>
      ))}
    </div>
  )
}

export default DevControls
