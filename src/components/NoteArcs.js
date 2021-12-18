import { scaleBand } from 'd3-scale'
import { arc as d3arc } from 'd3-shape'
import { A_FULL_KEY_ANGLE } from '../use-derived-state'
import {
  CANVAS_HEIGHT,
  CANVAS_WIDTH,
  CIRCLE_NOTES_DATA,
} from './CirlceOfFifthsViz'
const MIN_RADIUS = 20
const MAX_RADIUS = 130

const a4 = 69
const a5 = 81

const getNoteStartAndEndAngles = (noteIndex) => {
  const startAngle = noteIndex * A_FULL_KEY_ANGLE
  const endAngle = startAngle + A_FULL_KEY_ANGLE - 0.05
  return { startAngle, endAngle }
}

const getNoteRadii = (noteNum) => {
  const innerRadius = 20
  const outerRadius = 40
  return { innerRadius, outerRadius }
}

const arcGenerator = d3arc()

const NoteArcForAKey = ({ noteIndex, noteNum }) => {
  const { startAngle, endAngle } = getNoteStartAndEndAngles(noteIndex)
  const { innerRadius, outerRadius } = getNoteRadii(noteNum)

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

const NoteArcsForASingleNote = () => {
  return CIRCLE_NOTES_DATA.map((_, noteIndex) => (
    <NoteArcForAKey key={noteIndex} noteIndex={noteIndex} />
  ))
}

const NoteArcs = () => {
  return <g>{[69].map((noteNum) => NoteArcsForASingleNote(noteNum))}</g>
}

export default NoteArcs
