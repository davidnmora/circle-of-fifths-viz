import { createContext, useContext } from 'react'
import { useImmer } from 'use-immer'
import useMIDIInput from './useMIDIInput'

const DEFAULT_INPUT_STATE = {
  bassNote: { noteName: 'F', octave: 3, noteNum: 53 },
  trebleNotes: [{ noteName: 'F', octave: 4, noteNum: 65 }],
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

export const useUpdateInputState = () => {
  const { updateInputState } = useContext(InputStateContext)
  return updateInputState
}

const InputStateContextProvider = ({ children }) => {
  const [inputState, updateInputState] = useImmer(DEFAULT_INPUT_STATE)
  const handleMIDIMessage = ({ note, octave }) => {
    console.log(note, octave)
    updateInputState((draft) => {
      draft.bassNote = note
    })
  }
  useMIDIInput(handleMIDIMessage)

  return (
    <InputStateContext.Provider value={{ inputState, updateInputState }}>
      {children}
    </InputStateContext.Provider>
  )
}

export default InputStateContextProvider
