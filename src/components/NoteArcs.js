import { scaleBand } from 'd3-scale'
import { arc as d3arc } from 'd3-shape'
import { A_FULL_KEY_ANGLE } from '../use-derived-state'
import { CANVAS_HEIGHT, CANVAS_WIDTH } from './CirlceOfFifthsViz'
const MIN_RADIUS = 20
const MAX_RADIUS = 130

const a4 = 69
const a5 = 81

const getNoteStartAndEndAngles = () => {
  const startAngle = 0
  const endAngle = 0 + A_FULL_KEY_ANGLE
  return { startAngle, endAngle }
}
const arcGenerator = d3arc()

const NoteArcForAKey = (noteNum) => {
  const { startAngle, endAngle } = getNoteStartAndEndAngles()
  const noKeysMatch = [startAngle, endAngle].includes(undefined)

  if (noKeysMatch) {
    return null
  }
  const arcD = arcGenerator({
    innerRadius: 20,
    outerRadius: 40,
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
  return ['blah'].map((noteInAKey) => <NoteArcForAKey />)
}

const NoteArcs = () => {
  return <g>{[69].map((noteNum) => NoteArcsForASingleNote(noteNum))}</g>
}

export default NoteArcs
