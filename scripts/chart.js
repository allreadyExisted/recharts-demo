import { createElement } from './utils.js'
import { YAxis } from './components/yAxis.js'
import { XAxis } from './components/xAxis.js'

export class Chart {
  constructor({ element, opts = {} }) {
    this.init({ element, opts })
  }

  init({ element, opts }) {
    if (typeof element === 'string') {
      this._element = document.querySelector(element)
    } else {
      this._element = element
    }

    this._data = opts.data
    
    this._svg = createElement('svg')
    this._svg.setAttribute('width', '100%')
    this._svg.setAttribute('height', '100%')
    this._svg.setAttribute('preserveAspectRatio', 'xMinYMin slice')
    this._svg.setAttribute(
      'viewBox',
      `0 0 ${this.width} ${this.height}`
    )

    this._g = createElement('g')
    this._svg.appendChild(this._g)

    this._element.appendChild(this._svg)

    this._xAxis = new XAxis(this._svg)
    this._yAxis = new YAxis(this._svg)
  }

  draw() {
    this._xAxis.draw()
    this._yAxis.draw()

    const path = createElement('path')
    path.setAttribute('fill', 'none')
    path.setAttribute(
      'stroke',
      `rgb(
        ${Math.floor(Math.random() * 255)},
        ${Math.floor(Math.random() * 255)},
        ${Math.floor(Math.random() * 255)}
      )`
    )
    path.setAttribute('d', this.createPath())

    this._svg.appendChild(path)
  }

  createPath() {
    const x = this._data[0].slice(1).map((_, i) => i)
    const y1 = this._data[1].slice(1)
    const y2 = this._data[2].slice(1)
    const yMax = Math.max(Math.max(...y1), Math.max(...y2))
    const { width, height } = this._svg.getBoundingClientRect()
    const xPerc = width / x.length
    const yPerc = height / yMax

    let d = `M0,${height - yPerc * y1[0]}`

    x.forEach(item => {
      const index = item + 1
      if (index <= x.length - 1) {
        d += `L${xPerc * index},${height - yPerc * y1[index]}`
      }
    })

    return d
  }

  get width() {
    return this._element.offsetWidth
  }

  get height() {
    return this._element.offsetHeight
  }
}