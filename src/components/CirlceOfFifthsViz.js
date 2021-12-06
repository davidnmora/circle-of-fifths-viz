import styled from 'styled-components'
import { pointRadial } from 'd3-shape'
import { arc as d3arc } from 'd3-shape'
import { useBassNote } from '../InputStateContext'

// Constants
const CIRCLE_NOTES_DATA_BY_NOTE = {
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
const CANVAS_HEIGHT = 500,
  CANVAS_WIDTH = 500
const COLORS = {
  text: '#bdc3c7',
  line: '#2ecc71',
  canvas: '#2c3e50',
}
const INDEX_TYPE = 'fifthsIndex'

const _getCoordsFromIndex = (index, jitter = false) => {
  const increment =
    (2 * Math.PI) / Object.values(CIRCLE_NOTES_DATA_BY_NOTE).length
  const angle = increment * index
  const radius = 200
  const [x, y] = pointRadial(angle, radius)
  const _jitter = jitter ? Math.random() * 16 : 0
  return [x + CANVAS_WIDTH / 2 + _jitter, y + CANVAS_HEIGHT / 2 + _jitter]
}
export const CIRCLE_NOTES_DATA = Object.values(CIRCLE_NOTES_DATA_BY_NOTE).map(
  (d) => {
    const [x, y] = _getCoordsFromIndex(d[INDEX_TYPE])
    return {
      ...d,
      x,
      y,
      color: COLORS.text,
    }
  },
)

const getKeyCenterArcAngles = (bassNote) => {
  const startAngle = 0
  const endAngle = Math.PI / 2
  return { startAngle, endAngle }
}

const SVGContainer = styled.svg`
  background-color: lavenderblush;
`

// COMPONENTS
const arcGenerator = d3arc()
const KeyCenterArc = ({ bassNote }) => {
  const { startAngle, endAngle } = getKeyCenterArcAngles(bassNote)
  const arcD = arcGenerator({
    innerRadius: 0,
    outerRadius: 200,
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
`

const CoFLetters = ({ bassNote }) => {
  return (
    <g>
      {CIRCLE_NOTES_DATA.map(({ x, y, note }) => (
        <g key={note} transform={`translate(${x},${y})`}>
          <CoFNoteText selected={bassNote === note}>{note}</CoFNoteText>
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
        <KeyCenterArc bassNote={bassNote} />
      </SVGContainer>
    </div>
  )
}

export default CircleOfFifthsViz
