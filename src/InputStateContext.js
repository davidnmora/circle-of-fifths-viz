import { createContext, useContext } from 'react'
import { useImmer } from 'use-immer'
import useMIDIInput from './useMIDIInput'

const DEFAULT_INPUT_STATE = {
  bassNote: 'C',
  trebbleNotes: [],
}

const InputStateContext = createContext({})

export const useBassNote = () => {
  const {
    inputState: { bassNote },
  } = useContext(InputStateContext)
  return bassNote
}

export const useUpdateInputState = () => {
  const { updateInputState } = useContext(InputStateContext)
  return updateInputState
}

const InputStateContexztProvider = ({ children }) => {
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

export default InputStateContexztProvider
