import styled from 'styled-components'
import { arc as d3arc } from 'd3-shape'
import { useBassNote, useUpdateInputState } from '../InputStateContext'
import { getCoordsFromIndex, useKeyCenterArcAngles } from '../use-derived-state'
import NoteArcs from './NoteArcs'

// Constants
export const CIRCLE_NOTES_DATA_BY_NOTE = {
  C: { note: 'C', fifthsIndex: 0, chromaticIndex: 0 },
  G: { note: 'G', fifthsIndex: 1, chromaticIndex: 7 },
  D: { note: 'D', fifthsIndex: 2, chromaticIndex: 2 },
  A: { note: 'A', fifthsIndex: 3, chromaticIndex: 9 },
  E: { note: 'E', fifthsIndex: 4, chromaticIndex: 4 },
  B: { note: 'B', fifthsIndex: 5, chromaticIndex: 11 },
  'F#': { note: 'F#', fifthsIndex: 6, chromaticIndex: 6 },
  'C#': { note: 'C#', fifthsIndex: 7, chromaticIndex: 1 },
  Ab: { note: 'Ab', fifthsIndex: 8, chromaticIndex: 8 },
  Eb: { note: 'Eb', fifthsIndex: 9, chromaticIndex: 3 },
  Bb: { note: 'Bb', fifthsIndex: 10, chromaticIndex: 10 },
  F: { note: 'F', fifthsIndex: 11, chromaticIndex: 5 },
}

// const COLOR_SCALE = d3.scaleLinear().domain([0, CIRCLE_NOTES_DATA.length]).range(['blue', 'red'])
export const CANVAS_HEIGHT = 500,
  CANVAS_WIDTH = 500
const COLORS = {
  text: '#bdc3c7',
  line: '#2ecc71',
  canvas: '#2c3e50',
}

export const CIRCLE_NOTES_DATA = Object.values(CIRCLE_NOTES_DATA_BY_NOTE).map(
  (d) => {
    const [x, y] = getCoordsFromIndex(d.fifthsIndex)
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

// COMPONENTS
// TODO: make its own file
const arcGenerator = d3arc()
const KeyCenterArc = () => {
  const { startAngle, endAngle } = useKeyCenterArcAngles()
  const noKeysMatch = [startAngle, endAngle].includes(undefined)

  if (noKeysMatch) {
    return null
  }
  const arcD = arcGenerator({
    innerRadius: 170,
    outerRadius: 180,
    startAngle,
    endAngle,
  })
  return (
    <path
      transform={`translate(${CANVAS_WIDTH / 2}, ${CANVAS_HEIGHT / 2})`}
      d={arcD}
    ></path>
  )
}

const CoFNoteText = styled.text`
  fill: ${({ selected }) => (selected ? 'blue' : 'red')};
  cursor: pointer;
`

const CoFLetters = ({ bassNote }) => {
  const updateInputState = useUpdateInputState()
  return (
    <g>
      {CIRCLE_NOTES_DATA.map(({ x, y, note }) => (
        <g key={note} transform={`translate(${x},${y})`}>
          <CoFNoteText
            onClick={() =>
              updateInputState((draft) => {
                draft.bassNote = note
              })
            }
            selected={bassNote === note}
          >
            {note}
          </CoFNoteText>
        </g>
      ))}
    </g>
  )
}

const CircleOfFifthsViz = () => {
  const bassNote = useBassNote()
  return (
    <div>
      <SVGContainer height={CANVAS_HEIGHT} width={CANVAS_WIDTH}>
        <CoFLetters bassNote={bassNote} />
        <NoteArcs />
        <KeyCenterArc />
      </SVGContainer>
    </div>
  )
}

export default CircleOfFifthsViz
