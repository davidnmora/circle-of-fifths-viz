import { pointRadial } from 'd3-shape'
import {
  CANVAS_HEIGHT,
  CANVAS_WIDTH,
  CIRCLE_NOTES_DATA_BY_NOTE,
} from './components/CirlceOfFifthsViz'

const getAngleFromIndex = (index) => {
  const increment =
    (2 * Math.PI) / Object.values(CIRCLE_NOTES_DATA_BY_NOTE).length
  return increment * index
}

export const getCoordsFromIndex = (index, jitter = false) => {
  const angle = getAngleFromIndex(index)
  const radius = 200
  const [x, y] = pointRadial(angle, radius)
  const _jitter = jitter ? Math.random() * 16 : 0
  return [x + CANVAS_WIDTH / 2 + _jitter, y + CANVAS_HEIGHT / 2 + _jitter]
}
const getKeysInKeyCenter = () => {}

export const useKeyCenterArcAngles = (bassNote) => {
  const index = CIRCLE_NOTES_DATA_BY_NOTE[bassNote]
  const startAngle = 0 // getAngleFromIndex(index)
  const endAngle = Math.PI / 2
  return { startAngle, endAngle }
}
