import { Axis } from './axis.js'

export class YAxis extends Axis {
  constructor(element) {
    super(element, 'yAxis')
  }

  draw() {
    this._line.setAttribute('x1', 0)
    this._line.setAttribute('y1', this._height)
    this._line.setAttribute('x2', 0)
    this._line.setAttribute('y2', 0)
  }
}

