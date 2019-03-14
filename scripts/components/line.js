import { createElement, setAttributes } from '../utils.js'

const defaultOpts = {
  color: '#666',
  data: {
    x: [],
    y: [],
    yMax: 0
  }
}

export class Line {
  constructor(element, opts = {}) {
    const { color, data } = {
      ...defaultOpts,
      ...opts
    }
    this._data = data
    this._element = element
    const group = createElement('g')
    this._path = createElement('path')

    setAttributes(group, {
      class: 'tchart-cartesian-line'
    })

    setAttributes(this._path, {
      fill: 'none',
      stroke: color,
      strokeWidth: '2px'
    })
    
    group.appendChild(this._path)
    element.appendChild(group)
  }

  draw() {
    setAttributes(this._path, {
      d: this._createPath()
    })
  }

  _createPath() {
    const { x, y, yMax } = this._data
    const { width, height } = this._element.getBoundingClientRect()
    const xPerc = width / x.length
    const yPerc = height / yMax
    let d = `M0,${height - yPerc * y[0]}`

    x.forEach((_, item) => {
      const index = item + 1
      if (index <= x.length - 1) {
        d += `L${xPerc * index},${height - yPerc * y[index]}`
      }
    })

    return d
  }
}