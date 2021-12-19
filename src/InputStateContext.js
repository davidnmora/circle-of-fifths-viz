import { createContext, useContext } from 'react'
import { useImmer } from 'use-immer'
import useMIDIInput from './useMIDIInput'

const DEFAULT_INPUT_STATE = {
  bassNote: { noteName: 'F', octave: 3, noteNum: 53 },
  trebleNotes: [{ noteName: 'F', octave: 5, noteNum: 77 }],
  trebleMin: { noteName: 'A', octave: 4, noteNum: 69 },
  trebleMax: { noteName: 'A', octave: 5, noteNum: 81 },
}

const InputStateContext = createContext({})

export const useBassNote = () => {
  const {
    inputState: { bassNote },
  } = useContext(InputStateContext)
  return bassNote
}
export const useTrebleNotes = () => {
  const {
    inputState: { trebleNotes },
  } = useContext(InputStateContext)
  return trebleNotes
}

export const useTrebleExtent = () => {
  const {
    inputState: { trebleMin, trebleMax },
  } = useContext(InputStateContext)
  return { trebleMin, trebleMax }
}

export const useUpdateInputState = () => {
  const { updateInputState } = useContext(InputStateContext)
  return updateInputState
}

const InputStateContextProvider = ({ children }) => {
  const [inputState, updateInputState] = useImmer(DEFAULT_INPUT_STATE)
  const handleMIDIMessage = (note) => {
    // TODO: handle "note off" messages
    // TODO: determine if its a bass note:
    const isBassNote = true
    if (isBassNote) {
      updateInputState((draft) => {
        draft.bassNote = note
      })
    }
  }

  useMIDIInput(handleMIDIMessage)

  return (
    <InputStateContext.Provider value={{ inputState, updateInputState }}>
      {children}
    </InputStateContext.Provider>
  )
}

export default InputStateContextProvider
