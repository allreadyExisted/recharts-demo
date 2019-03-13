import { Axis } from './axis.js'

export class XAxis extends Axis {
  constructor(element) {
    super(element, 'xAxis')
  }

  draw() {
    this._line.setAttribute('x1', 0)
    this._line.setAttribute('y1', this._height)
    this._line.setAttribute('x2', this._width)
    this._line.setAttribute('y2', this._height)
  }
}