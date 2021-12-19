import { arc as d3arc } from 'd3-shape'
import { useKeyCenterArcAngles } from '../use-derived-state'
import { KEY_NAME_RADIUS, CANVAS_WIDTH, CANVAS_HEIGHT } from './constants'

const KEY_CENTER_ARC_OUTER_RADIUS = KEY_NAME_RADIUS - 20
const KEY_CENTER_ARC_WIDTH = 10
const KEY_CENTER_ARC_INNER_RADIUS =
  KEY_CENTER_ARC_OUTER_RADIUS - KEY_CENTER_ARC_WIDTH
const arcGenerator = d3arc()
export const KeyCenterArc = () => {
  const { startAngle, endAngle } = useKeyCenterArcAngles()
  const noKeysMatch = [startAngle, endAngle].includes(undefined)

  if (noKeysMatch) {
    return null
  }
  const arcD = arcGenerator({
    innerRadius: KEY_CENTER_ARC_INNER_RADIUS,
    outerRadius: KEY_CENTER_ARC_OUTER_RADIUS,
    startAngle,
    endAngle,
  })
  return (
    <path
      transform={`translate(${CANVAS_WIDTH / 2}, ${CANVAS_HEIGHT / 2})`}
      d={arcD}
      fill="skyblue"
      opacity={0.2}
    ></path>
  )
}
