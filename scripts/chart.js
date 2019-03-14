import { createElement, normalizeData, setAttributes } from './utils.js'
import { YAxis } from './components/yAxis.js'
import { XAxis } from './components/xAxis.js'
import { Line } from './components/line.js'

export class Chart {
  constructor(element, opts = {}) {
    this._element = element
    this._data = opts.data
    this._svg = createElement('svg')
    this._g = createElement('g')

    const { width, height } = this._element.getBoundingClientRect()

    setAttributes(this._svg, {
      width: '100%',
      height: '100%',
      preserveAspectRatio: 'xMinYMin slice',
      viewBox: `0 0 ${width} ${height}`
    })

    this._svg.appendChild(this._g)
    this._element.appendChild(this._svg)

    this._xAxis = new XAxis(this._svg)
    this._yAxis = new YAxis(this._svg)
    this._lines = normalizeData(opts.data)
      .map(item => new Line(this._svg, {
        color: item.yAxisColor,
        data: {
          x: item.xAxisData,
          y: item.yAxisData,
          yMax: item.yMax
        }
      }))
  }

  draw() {
    this._xAxis.draw()
    this._yAxis.draw()
    this._lines.forEach(line => {
      line.draw()
    })
  }
}