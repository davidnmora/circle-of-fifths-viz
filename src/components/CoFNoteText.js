import styled from 'styled-components'
import {
  useBassNote,
  useTrebleExtent,
  useUpdateInputState,
} from '../InputStateContext'
import { CIRCLE_NOTES_DATA } from './constants'

const CoFNoteText = styled.text`
  opacity: ${({ selected }) => (selected ? 1 : 0.2)};
  font-size: ${({ selected }) => (selected ? '24px' : '20px')};
  cursor: pointer;
`
export const CoFLetters = () => {
  const bassNote = useBassNote()
  const updateInputState = useUpdateInputState()
  const { trebleMin } = useTrebleExtent()
  return (
    <g>
      {CIRCLE_NOTES_DATA.map(({ x, y, noteName }) => (
        <g key={noteName} transform={`translate(${x},${y})`}>
          <CoFNoteText
            onClick={() =>
              updateInputState((draft) => {
                // TODO: TEMPORARY hacky, data not fully true...
                draft.bassNote = {
                  noteNum: 0,
                  noteName,
                  octave: trebleMin.octave - 1,
                }
              })
            }
            selected={bassNote.noteName === noteName}
          >
            {noteName}
          </CoFNoteText>
        </g>
      ))}
    </g>
  )
}
