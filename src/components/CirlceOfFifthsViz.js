import styled from 'styled-components'
import NoteArcs from './NoteArcs'
import { CoFLetters } from './CoFNoteText'
import { KeyCenterArc } from './KeyCenterArc'
import { CANVAS_HEIGHT, CANVAS_WIDTH } from './constants'

const SVGContainer = styled.svg`
  background-color: lavenderblush;
`
const CircleOfFifthsViz = () => (
  <div>
    <SVGContainer height={CANVAS_HEIGHT} width={CANVAS_WIDTH}>
      <CoFLetters />
      <NoteArcs />
      <KeyCenterArc />
    </SVGContainer>
  </div>
)

export default CircleOfFifthsViz
