import { createElement, normalizeData, setAttributes } from './utils.js'
import { YAxis } from './components/yAxis.js'
import { XAxis } from './components/xAxis.js'
import { Line } from './components/line.js'

export class Chart {
  constructor(element, opts = {}) {
    this._element = element
    this._data = normalizeData(opts.data)
    this._svg = createElement('svg')

    const { width, height } = this._element.getBoundingClientRect()

    setAttributes(this._svg, {
      width: '100%',
      height: '100%',
      preserveAspectRatio: 'xMinYMin slice',
      viewBox: `0 0 ${width} ${height}`,
      class: 'tchart'
    })

    this._element.appendChild(this._svg)
    
    const { x, y } = this._data
    this._xAxis = new XAxis(this._svg)
    this._yAxis = new YAxis(this._svg)
    this._lines = y.datasets.map(item => new Line(
      this._svg,
      {
        color: item.color,
        data: {
          x: x.data,
          y: item.data,
          domain: y.domain
        }
      }
    ))
  }

  draw() {
    this._xAxis.draw()
    this._yAxis.datum(this._data.y).draw()
    this._lines.forEach(line => {
      line.draw()
    })
  }
}