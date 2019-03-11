import { createElement } from './utils.js'

export class Chart {
  constructor({ element, opts = {} }) {
    this.init({ element })
  }

  init({ element }) {
    if (typeof element === 'string') {
      this._element = document.querySelector(element)
    } else {
      this._element = element
    }
    
    this._svg = createElement('svg')
    this._svg.setAttribute('preserveAspectRatio', 'xMinYMin slice')
    this._svg.setAttribute(
      'viewBox',
      `0 0 ${this.width} ${this.height}`
    )

    this._g = createElement('g')
    this._svg.appendChild(this._g)

    this._element.appendChild(this._svg)
  }

  draw() {
    

    const path = createElement('path')
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
    return `M${this.width * .2},${this.height * .8} ${this.width * .8},${this.height * .2}`
  }

  get width() {
    return this._element.offsetWidth
  }

  get height() {
    return this._element.offsetHeight
  }
}