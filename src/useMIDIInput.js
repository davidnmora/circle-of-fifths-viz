import { useEffect } from 'react'
import { getNoteNameFromNoteNum } from './components/utils'

const MIDI_MSG_TYPES = {
  activeSensing: 254,
}

export const getNoteObjectFromMidiNumber = (noteNum) => {
  const noteName = getNoteNameFromNoteNum(noteNum)
  const octave = Math.floor(noteNum / 12 - 1)
  return { noteName, octave, noteNum: noteNum }
}

const preProcessMIDIMessage = (msg, handleMIDINoteUpdate) => {
  const [commandType, noteNum, velocity] = msg.data || []
  if (noteNum === undefined || commandType === MIDI_MSG_TYPES.activeSensing) {
    return
  }

  const noteIsBeingReleased = velocity === 0
  handleMIDINoteUpdate(
    getNoteObjectFromMidiNumber(noteNum),
    noteIsBeingReleased,
  )
}

const connectToMIDI = (handleMIDINoteUpdate) => {
  navigator.requestMIDIAccess().then(onMIDISuccess)

  function onMIDISuccess(midiAccess) {
    for (var input of midiAccess.inputs.values())
      input.onmidimessage = (msg) =>
        preProcessMIDIMessage(msg, handleMIDINoteUpdate)
  }
}

const useMIDIInput = (handleMIDINoteUpdate) => {
  useEffect(() => {
    connectToMIDI(handleMIDINoteUpdate)
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [])
}

export default useMIDIInput
