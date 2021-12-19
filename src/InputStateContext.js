import { createContext, useContext } from 'react'
import { useImmer } from 'use-immer'
import useMIDIInput from './useMIDIInput'

const DEFAULT_INPUT_STATE = {
  // bassNote: { noteName: 'F', octave: 3, noteNum: 53 },
  // trebleNotes: [{ noteName: 'F', octave: 5, noteNum: 77 }],
  bassNote: null,
  trebleNotes: [],
  trebleMin: { noteName: 'A', octave: 4, noteNum: 69 },
  trebleMax: { noteName: 'A', octave: 5, noteNum: 81 },
}

const InputStateContext = createContext({})

export const useBassNote = () => {
  const {
    inputState: { bassNote },
  } = useContext(InputStateContext)
  return bassNote || {}
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
  const handleMIDINoteUpdate = (note, noteIsBeingReleased) => {
    const isBassNote = note.noteNum < inputState.trebleMin.noteNum
    if (isBassNote) {
      updateInputState((draft) => {
        if (noteIsBeingReleased) {
          if (note.noteNum === (draft.bassNote || {}).noteNum)
            draft.bassNote = null
        } else {
          draft.bassNote = note
        }
      })
    } else {
      updateInputState((draft) => {
        if (noteIsBeingReleased) {
          draft.trebleNotes = draft.trebleNotes.filter(
            ({ noteNum }) => noteNum !== note.noteNum,
          )
        } else {
          draft.trebleNotes.push(note)
        }
      })
    }
  }

  useMIDIInput(handleMIDINoteUpdate)

  return (
    <InputStateContext.Provider value={{ inputState, updateInputState }}>
      {children}
    </InputStateContext.Provider>
  )
}

export default InputStateContextProvider
