import styled from 'styled-components'
import { pointRadial } from 'd3-shape'

// Constants
const CIRCLE_NOTES_DATA_BY_NOTE = {
  C: { note: 'C', fifthsIndex: 0, chromaticIndex: 0 },
  G: { note: 'G', fifthsIndex: 1, chromaticIndex: 7 },
  D: { note: 'D', fifthsIndex: 2, chromaticIndex: 2 },
  A: { note: 'A', fifthsIndex: 3, chromaticIndex: 9 },
  E: { note: 'E', fifthsIndex: 4, chromaticIndex: 4 },
  B: { note: 'B', fifthsIndex: 5, chromaticIndex: 11 },
  Fsharp: { note: 'Fsharp', fifthsIndex: 6, chromaticIndex: 6 },
  Csharp: { note: 'Csharp', fifthsIndex: 7, chromaticIndex: 1 },
  Gsharp: { note: 'Gsharp', fifthsIndex: 8, chromaticIndex: 8 },
  Eflat: { note: 'Eflat', fifthsIndex: 9, chromaticIndex: 3 },
  Bflat: { note: 'Bflat', fifthsIndex: 10, chromaticIndex: 10 },
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
const CIRCLE_NOTES_DATA = Object.values(CIRCLE_NOTES_DATA_BY_NOTE).map((d) => {
  const [x, y] = _getCoordsFromIndex(d[INDEX_TYPE])
  return {
    ...d,
    x,
    y,
    color: COLORS.text,
  }
})

const CIRCLE_OF_FOURTHS_TRANSITION_DURATION = 1000

const SVGContainer = styled.svg`
  background-color: lavenderblush;
`

// COMPONENTS

const CoFNoteText = styled.text`
  fill: ${({ selected }) => (selected ? 'blue' : 'red')};
`

const CoFLetters = ({ bassNote }) => {
  return (
    <g>
      {CIRCLE_NOTES_DATA.map(({ x, y, note }) => (
        <g transform={`translate(${x},${y})`}>
          <CoFNoteText selected={bassNote === note}>{note}</CoFNoteText>
        </g>
      ))}
    </g>
  )
}

const CircleOfFifthsViz = ({ inputState, setInputState }) => {
  return (
    <div>
      <button>Make bass note "C"</button>
      <button>Make bass note "G"</button>
      <SVGContainer height={CANVAS_HEIGHT} width={CANVAS_WIDTH}>
        <CoFLetters bassNote={inputState.bassNote} />
      </SVGContainer>
    </div>
  )
}

export default CircleOfFifthsViz
