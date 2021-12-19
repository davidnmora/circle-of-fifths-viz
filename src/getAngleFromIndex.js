import { pointRadial } from 'd3-shape'
import {
  CANVAS_HEIGHT,
  CANVAS_WIDTH,
  KEY_NAME_RADIUS,
} from './components/constants'
import { A_FULL_KEY_ANGLE } from './use-derived-state'

export const getAngleFromIndex = (index) => {
  return A_FULL_KEY_ANGLE * index
}

export const getCoordsFromIndex = (
  index,
  radius = KEY_NAME_RADIUS,
  addJitter = false,
) => {
  const angle = getAngleFromIndex(index)

  const [x, y] = pointRadial(angle, radius)
  const jitter = addJitter ? Math.random() * 16 : 0
  return [x + CANVAS_WIDTH / 2 + jitter, y + CANVAS_HEIGHT / 2 + jitter]
}
