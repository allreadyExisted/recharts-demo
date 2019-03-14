import { Axis } from './axis.js'
import { setAttributes } from '../utils.js'

export class YAxis extends Axis {
  constructor(element) {
    super(element, 'yAxis')
  }

  draw() {
    setAttributes(this._line, {
      x1: 0,
      y1: this._height,
      x2: 0,
      y2: 0
    })
  }
}

