import { scaleBand } from 'd3-scale'
import { range } from 'd3-array'
import { arc as d3arc } from 'd3-shape'
import { CANVAS_HEIGHT, CANVAS_WIDTH } from './CirlceOfFifthsViz'

const KEY_INDEXES = range(0, 12)

const KEY_CENTER_ARC_INNER_RADIUS = 170 // DUPLICATE: I just copy pasta-ed to skip an imports error
const MIN_RADIUS = 20
const MAX_RADIUS = KEY_CENTER_ARC_INNER_RADIUS

// FOR NOW: set (somewhat) arbitrary input note boundaries
const a4 = 69
const a5 = 81
const lowestNoteNum = a4
const highestNoteNum = a5

const noteRadiusBandScale = scaleBand()
  .domain(range(lowestNoteNum, highestNoteNum + 1))
  .range([MIN_RADIUS, MAX_RADIUS])
  .paddingInner(0.05)

const noteAngleBandScale = scaleBand()
  .domain(KEY_INDEXES)
  .range([0, 2 * Math.PI])
  .paddingInner(0.05)
  .paddingOuter(0.05)

const getNoteStartAndEndAngles = (noteIndex) => {
  const bandwidth = noteAngleBandScale.bandwidth()
  const startAngle = noteAngleBandScale(noteIndex) - bandwidth / 2
  const endAngle = startAngle + bandwidth
  return { startAngle, endAngle }
}

const getNoteRadii = (noteNum) => {
  const innerRadius = noteRadiusBandScale(noteNum)
  const outerRadius = innerRadius + noteRadiusBandScale.bandwidth()
  return { innerRadius, outerRadius }
}

const arcGenerator = d3arc()

const SingleNoteArcForAKey = ({ noteIndex, innerRadius, outerRadius }) => {
  const { startAngle, endAngle } = getNoteStartAndEndAngles(noteIndex)
  const arcD = arcGenerator({
    innerRadius,
    outerRadius,
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

const NoteArcsForASingleNote = ({ noteNum }) => {
  const { innerRadius, outerRadius } = getNoteRadii(noteNum)
  return KEY_INDEXES.map((_, noteIndex) => (
    <SingleNoteArcForAKey
      key={noteIndex}
      innerRadius={innerRadius}
      outerRadius={outerRadius}
      noteIndex={noteIndex}
    />
  ))
}

const NoteArcs = () => {
  const noteNums = range(lowestNoteNum, highestNoteNum + 1)
  return (
    <g>
      {noteNums.map((noteNum) => (
        <NoteArcsForASingleNote key={noteNum} noteNum={noteNum} />
      ))}
    </g>
  )
}

export default NoteArcs
