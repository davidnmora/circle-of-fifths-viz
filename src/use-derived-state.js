import { CIRCLE_NOTES_DATA_BY_NOTE } from './components/CirlceOfFifthsViz'
import { getAngleFromIndex } from './getAngleFromIndex'
import { useBassNote, useTrebleNotes } from './InputStateContext'

const SCALE_NOTES_BY_KEY = {
  C: ['C', 'D', 'E', 'F', 'G', 'A', 'B'],
  G: ['C', 'D', 'E', 'F#', 'G', 'A', 'B'],
  D: ['C#', 'D', 'E', 'F#', 'G', 'A', 'B'],
  A: ['C#', 'D', 'E', 'F#', 'Ab', 'A', 'B'],
  E: ['C#', 'Eb', 'E', 'F#', 'Ab', 'A', 'B'],
  B: ['C#', 'Eb', 'E', 'F#', 'Ab', 'Bb', 'B'],
  'F#': ['C#', 'Eb', 'F', 'F#', 'Ab', 'Bb', 'B'],
  'C#': ['C#', 'Eb', 'F', 'F#', 'Ab', 'Bb', 'C'],
  Ab: ['C#', 'Eb', 'F', 'G', 'Ab', 'Bb', 'C'],
  Eb: ['D', 'Eb', 'F', 'G', 'Ab', 'Bb', 'C'],
  Bb: ['D', 'Eb', 'F', 'G', 'A', 'Bb', 'C'],
  F: ['D', 'E', 'F', 'G', 'A', 'Bb', 'C'],
}

export const A_FULL_KEY_ANGLE = (2 * Math.PI) / 12
export const useKeysInKeyCenter = () => {
  // 1. get state info we need
  const bassNote = useBassNote()
  const trebleNotes = useTrebleNotes()
  const allInputNotes = [
    ...trebleNotes.map(({ noteName }) => noteName),
    bassNote.noteName,
  ]
  // 2. determine overlap between input notes & different keys
  const keysInKeyCenter = Object.keys(SCALE_NOTES_BY_KEY).filter((keyName) => {
    const scaleNotes = SCALE_NOTES_BY_KEY[keyName]
    const someInputNoteIsNotInTheScale = !allInputNotes.some(
      (inputNote) => !scaleNotes.includes(inputNote),
    )
    return someInputNoteIsNotInTheScale
  })
  return keysInKeyCenter
}

const getVisualOrderedAngles = (angles) => {
  const sorted = [...angles].sort()
  let biggerThanIncrementGapFound = false
  const noGapsBetweenAngles = sorted.map((angle, index) => {
    const precedent = sorted[index - 1]

    if (
      precedent !== undefined &&
      Math.round(100 * (angle - precedent)) > Math.round(100 * A_FULL_KEY_ANGLE)
    ) {
      biggerThanIncrementGapFound = true
    }
    return biggerThanIncrementGapFound ? angle - 2 * Math.PI : angle
  })
  return [...noGapsBetweenAngles].sort()
}
const getStartAndEndAngles = (keysInKeyCenter) => {
  const angles = keysInKeyCenter.map((keyName) =>
    getAngleFromIndex(CIRCLE_NOTES_DATA_BY_NOTE[keyName].fifthsIndex),
  )
  if (!angles.length) {
    return {}
  }
  const anglesVisuallyOrdered = getVisualOrderedAngles(angles)
  const startAngle = Math.min(...anglesVisuallyOrdered) - A_FULL_KEY_ANGLE / 2
  const endAngle = Math.max(...anglesVisuallyOrdered) + A_FULL_KEY_ANGLE / 2
  return { startAngle, endAngle }
}

export const useKeyCenterArcAngles = () => {
  const keysInKeyCenter = useKeysInKeyCenter()
  return getStartAndEndAngles(keysInKeyCenter)
}
