import { NOTE_NAMES } from './constants'

export const getNoteNameFromNoteNum = (noteNum) => NOTE_NAMES[noteNum % 12]
