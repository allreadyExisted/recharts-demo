import { Axis } from './axis.js'
import { setAttributes, AXIS_HEIGHT } from '../utils.js'

export class XAxis extends Axis {
  constructor(element) {
    super(element, 'xAxis')
  }

  draw() {
    const height = this._height * AXIS_HEIGHT
    setAttributes(this._line, {
      x1: 0,
      y1: height,
      x2: this._width,
      y2: height
    })
  }
}