import styled, { useTheme } from 'styled-components'
import { arc as d3arc } from 'd3-shape'
import { useKeyCenterArcAngles } from '../use-derived-state'
import { KEY_NAME_RADIUS, CANVAS_WIDTH, CANVAS_HEIGHT } from './constants'

const KEY_CENTER_ARC_OUTER_RADIUS = KEY_NAME_RADIUS - 20
const KEY_CENTER_ARC_WIDTH = 10
const KEY_CENTER_ARC_INNER_RADIUS =
  KEY_CENTER_ARC_OUTER_RADIUS - KEY_CENTER_ARC_WIDTH
const arcGenerator = d3arc()

const StyledPath = styled.path`
  transform: rotate(${({ rotation }) => rotation}rad)
    translate(${CANVAS_WIDTH / 2}px, ${CANVAS_HEIGHT / 2}px);
  transition: 0.5s transform;
  transform-origin: ${CANVAS_WIDTH / 2}px ${CANVAS_HEIGHT / 2}px;
`

export const KeyCenterArc = () => {
  const theme = useTheme()
  const { startAngle, endAngle } = useKeyCenterArcAngles()
  const noKeysMatch = [startAngle, endAngle].includes(undefined)

  if (noKeysMatch) {
    return null
  }
  const arcD = arcGenerator({
    innerRadius: KEY_CENTER_ARC_INNER_RADIUS,
    outerRadius: KEY_CENTER_ARC_OUTER_RADIUS,
    startAngle: 0,
    endAngle: endAngle - startAngle,
  })

  const rotation =
    startAngle >= Math.PI ? -(2 * Math.PI - startAngle) : startAngle
  return (
    <StyledPath
      rotation={rotation}
      transform={`translate(${CANVAS_WIDTH / 2}, ${CANVAS_HEIGHT / 2})`}
      d={arcD}
      fill={theme.secondary.cool}
      opacity={1}
    ></StyledPath>
  )
}
