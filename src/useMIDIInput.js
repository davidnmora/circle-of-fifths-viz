import { useEffect } from 'react'

const MIDI_MSG_TYPES = {
  activeSensing: 254,
}

export const getNoteObjectFromMidiNumber = (noteNum) => {
  const note_names = [
    'C',
    'C#',
    'D',
    'Eb',
    'E',
    'F',
    'F#',
    'G',
    'Ab',
    'A',
    'Bb',
    'B',
  ]
  const noteName = note_names[noteNum % 12]
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
  }, [])
}

export default useMIDIInput
