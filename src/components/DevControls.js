import { useUpdateInputState } from '../InputStateContext'
import { CIRCLE_NOTES_DATA } from './CirlceOfFifthsViz'

const DevControls = () => {
  const updateInputState = useUpdateInputState()
  return (
    <div>
      {CIRCLE_NOTES_DATA.map(({ note }) => (
        <button
          key={note}
          onClick={() =>
            updateInputState((draft) => {
              draft.bassNote = note
            })
          }
        >
          {`Make note ${note}`}
        </button>
      ))}
    </div>
  )
}

export default DevControls
