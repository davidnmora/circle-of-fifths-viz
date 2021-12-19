import styled from 'styled-components'
import { arc as d3arc } from 'd3-shape'
import {
  useBassNote,
  useTrebleExtent,
  useUpdateInputState,
} from '../InputStateContext'
import { useKeyCenterArcAngles } from '../use-derived-state'
import { getCoordsFromIndex } from '../getAngleFromIndex'
import NoteArcs from './NoteArcs'
import { getNoteObjectFromMidiNumber } from '../useMIDIInput'

// Constants
export const CIRCLE_NOTES_DATA_BY_NOTE = {
  C: { noteName: 'C', fifthsIndex: 0, chromaticIndex: 0 },
  G: { noteName: 'G', fifthsIndex: 1, chromaticIndex: 7 },
  D: { noteName: 'D', fifthsIndex: 2, chromaticIndex: 2 },
  A: { noteName: 'A', fifthsIndex: 3, chromaticIndex: 9 },
  E: { noteName: 'E', fifthsIndex: 4, chromaticIndex: 4 },
  B: { noteName: 'B', fifthsIndex: 5, chromaticIndex: 11 },
  'F#': { noteName: 'F#', fifthsIndex: 6, chromaticIndex: 6 },
  'C#': { noteName: 'C#', fifthsIndex: 7, chromaticIndex: 1 },
  Ab: { noteName: 'Ab', fifthsIndex: 8, chromaticIndex: 8 },
  Eb: { noteName: 'Eb', fifthsIndex: 9, chromaticIndex: 3 },
  Bb: { noteName: 'Bb', fifthsIndex: 10, chromaticIndex: 10 },
  F: { noteName: 'F', fifthsIndex: 11, chromaticIndex: 5 },
}

export const KEY_NAME_RADIUS = 200
export const CANVAS_HEIGHT = 500,
  CANVAS_WIDTH = 500
const COLORS = {
  text: '#bdc3c7',
  line: '#2ecc71',
  canvas: '#2c3e50',
}

export const CIRCLE_NOTES_DATA = Object.values(CIRCLE_NOTES_DATA_BY_NOTE).map(
  (d) => {
    const [x, y] = getCoordsFromIndex(d.fifthsIndex, 200)
    return {
      ...d,
      x,
      y,
      color: COLORS.text,
    }
  },
)

const SVGContainer = styled.svg`
  background-color: lavenderblush;
`
const KEY_CENTER_ARC_OUTER_RADIUS = KEY_NAME_RADIUS - 20
const KEY_CENTER_ARC_WIDTH = 10
const KEY_CENTER_ARC_INNER_RADIUS =
  KEY_CENTER_ARC_OUTER_RADIUS - KEY_CENTER_ARC_WIDTH
const arcGenerator = d3arc()
const KeyCenterArc = () => {
  const { startAngle, endAngle } = useKeyCenterArcAngles()
  const noKeysMatch = [startAngle, endAngle].includes(undefined)

  if (noKeysMatch) {
    return null
  }
  const arcD = arcGenerator({
    innerRadius: KEY_CENTER_ARC_INNER_RADIUS,
    outerRadius: KEY_CENTER_ARC_OUTER_RADIUS,
    startAngle,
    endAngle,
  })
  return (
    <path
      transform={`translate(${CANVAS_WIDTH / 2}, ${CANVAS_HEIGHT / 2})`}
      d={arcD}
      fill="gray"
    ></path>
  )
}

const CoFNoteText = styled.text`
  fill: ${({ selected }) => (selected ? 'blue' : 'red')};
  cursor: pointer;
`

const CoFLetters = () => {
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

const CircleOfFifthsViz = () => (
  <div>
    <SVGContainer height={CANVAS_HEIGHT} width={CANVAS_WIDTH}>
      <CoFLetters />
      <NoteArcs />
      <KeyCenterArc />
    </SVGContainer>
  </div>
)

export default CircleOfFifthsViz
