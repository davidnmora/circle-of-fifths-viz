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

const preProcessMIDIMessage = (msg, handleMIDIMessage) => {
  const [commandType, noteNum /*velocity*/] = msg.data || []
  if (noteNum === undefined || commandType === MIDI_MSG_TYPES.activeSensing) {
    return
  }
  handleMIDIMessage(getNoteObjectFromMidiNumber(noteNum))
}

const connectToMIDI = (handleMIDIMessage) => {
  navigator.requestMIDIAccess().then(onMIDISuccess)

  function onMIDISuccess(midiAccess) {
    for (var input of midiAccess.inputs.values())
      input.onmidimessage = (msg) =>
        preProcessMIDIMessage(msg, handleMIDIMessage)
  }
}

const useMIDIInput = (onMessageRecieved) => {
  useEffect(() => {
    connectToMIDI(onMessageRecieved)
  }, [])
}

export default useMIDIInput
