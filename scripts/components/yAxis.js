import { Axis } from './axis.js'
import { setAttributes, createElement, getTicks, TIKS_HEIGHT } from '../utils.js'

export class YAxis extends Axis {
  constructor(element) {
    super(element, 'yAxis')
  }

  draw() {
    const { domain: [_, axisMax] } = this._data
    const ticks = getTicks(axisMax, this._height * TIKS_HEIGHT)

    ticks.forEach(item => {
      const g = createElement('g')
      const text = createElement('text')

      
      text.appendChild(document.createTextNode(item.value))
      g.appendChild(text)
      this._ticks.appendChild(g)
      
      setAttributes(text, {
        x: 0,
        y: item.position,
        class: 'tchart-cartesian-tick-value'
      })

      const { height } = text.getBBox()

      setAttributes(g, {
        transform: `translate(0 ${height * .66})`
      })
    })
  }
}

