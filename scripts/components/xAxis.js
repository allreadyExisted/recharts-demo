import { Axis } from './axis.js'
import { setAttributes } from '../utils.js'

export class XAxis extends Axis {
  constructor(element) {
    super(element, 'xAxis')
  }

  draw() {
    setAttributes(this._line, {
      x1: 0,
      y1: this._height,
      x2: this._width,
      y2: this._height
    })
  }
}