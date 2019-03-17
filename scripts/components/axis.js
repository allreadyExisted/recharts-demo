import { createElement } from '../utils.js'

const defaultOpts = axisName => ({
  groupCn: `tchart-cartesian-axis tchart-${axisName} ${axisName}`,
  lineCn: `tchart-cartesian-axis-line`,
  ticksCn: `tchart-cartesian-axis-ticks`
})

const createAxis = (element, axisName, opts = {}) => {
  const { groupCn, lineCn, ticksCn } = {
    ...defaultOpts(axisName),
    ...opts
  }

  const group = createElement('g')
  const line = createElement('line')
  const ticks = createElement('g')

  group.setAttribute('class', groupCn)
  line.setAttribute('class', lineCn)
  ticks.setAttribute('class', ticksCn)
  group.appendChild(line)
  group.appendChild(ticks)
  element.appendChild(group)

  return {
    group,
    line,
    ticks
  }
}

export class Axis {
  constructor(element, axisName) {
    const { line, ticks } = createAxis(element, axisName)
    const { width, height } = element.getBoundingClientRect()
    this._line = line
    this._ticks = ticks
    this._width = width
    this._height = height
  }

  datum(data) {
    this._data = data
    return this
  }
}

