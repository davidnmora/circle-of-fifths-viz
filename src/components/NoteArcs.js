import { scaleBand } from 'd3-scale'
import { range } from 'd3-array'
import { arc as d3arc } from 'd3-shape'
import {
  CANVAS_HEIGHT,
  CANVAS_WIDTH,
  CIRCLE_NOTES_DATA,
} from './CirlceOfFifthsViz'
import { SCALE_NOTES_BY_KEY } from '../use-derived-state'
import {
  useBassNote,
  useTrebleExtent,
  useTrebleNotes,
} from '../InputStateContext'
import { getNoteObjectFromMidiNumber } from '../useMIDIInput'

const KEY_INDEXES = range(0, 12)

const KEY_CENTER_ARC_INNER_RADIUS = 170 // DUPLICATE: I just copy pasta-ed to skip an imports error
const MIN_RADIUS = 20
const MAX_RADIUS = KEY_CENTER_ARC_INNER_RADIUS

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

const useNoteRadii = (noteNum) => {
  const { trebleMin, trebleMax } = useTrebleExtent()
  const noteRadiusBandScale = scaleBand()
    .domain(range(trebleMin.noteNum, trebleMax.noteNum + 1))
    .range([MIN_RADIUS, MAX_RADIUS])
    .paddingInner(0.05)

  const innerRadius = noteRadiusBandScale(noteNum)
  const outerRadius = innerRadius + noteRadiusBandScale.bandwidth()
  return { innerRadius, outerRadius }
}

const arcGenerator = d3arc()
const useNoteOpacity = (noteNum, noteIndex) => {
  const trebleNotes = useTrebleNotes()
  const selected = trebleNotes.some(
    (trebleNote) => trebleNote.noteNum === noteNum,
  )
  const keyNoteName = CIRCLE_NOTES_DATA[noteIndex].noteName
  const noteIsInThisKey = SCALE_NOTES_BY_KEY[keyNoteName].includes(
    getNoteObjectFromMidiNumber(noteNum).noteName,
  )

  const bassNote = useBassNote()
  if (selected) {
    if (bassNote.noteName === CIRCLE_NOTES_DATA[noteIndex].noteName) {
      return 1
    }
    return noteIsInThisKey ? 0.4 : 0.1
  }
  return 0.05
}

const SingleNoteArcForAKey = ({
  noteIndex,
  innerRadius,
  outerRadius,
  noteNum,
}) => {
  const opacity = useNoteOpacity(noteNum, noteIndex)
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
      opacity={opacity}
    ></path>
  )
}

const NoteArcsForASingleNote = ({ noteNum }) => {
  const { innerRadius, outerRadius } = useNoteRadii(noteNum)
  return KEY_INDEXES.map((noteIndex) => (
    <SingleNoteArcForAKey
      key={noteIndex}
      innerRadius={innerRadius}
      outerRadius={outerRadius}
      noteIndex={noteIndex}
      noteNum={noteNum}
    />
  ))
}

const NoteArcs = () => {
  const { trebleMin, trebleMax } = useTrebleExtent()
  const noteNums = range(trebleMin.noteNum, trebleMax.noteNum + 1)
  return (
    <g>
      {noteNums.map((noteNum) => (
        <NoteArcsForASingleNote key={noteNum} noteNum={noteNum} />
      ))}
    </g>
  )
}

export default NoteArcs
