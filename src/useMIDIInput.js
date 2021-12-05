import { useEffect } from 'react'

const MIDI_MSG_TYPES = {
  activeSensing: 254,
}

const getNoteFromMidiNumber = (midiNote) => {
  const note_names = [
    'C',
    'C#',
    'D',
    'Eb',
    'E',
    'F',
    'F#',
    'G',
    'G#',
    'A',
    'Ab',
    'B',
  ]
  return note_names[midiNote % 12] + Math.floor(midiNote / 12 - 1)
}

const preProcessMIDIMessage = (msg, handleMIDIMessage) => {
  const [commandType, note, velocity] = msg.data || []
  if (note === undefined || commandType === MIDI_MSG_TYPES.activeSensing) {
    return
  }
  handleMIDIMessage(getNoteFromMidiNumber(note))
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
  //   const [midiAccess, setMidiAccess] = useState(null)
  useEffect(() => {
    connectToMIDI(onMessageRecieved)
  }, [])
}

export default useMIDIInput
