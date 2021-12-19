import { getCoordsFromIndex } from '../getAngleFromIndex'

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
