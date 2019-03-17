export const fetchAsync = async (url) => 
  await (await fetch(url)).json()
  
const SVGNS = 'http://www.w3.org/2000/svg'
export const createElement = name => document.createElementNS(SVGNS, name)

export const setAttributes = (el, attrs) => {
  for(const key in attrs)
    el.setAttribute(key, attrs[key])
}

export const flipCoordinateSystem = (parent, child) => {
  const { height } = parent.getBoundingClientRect()

  setAttributes(child, {
    transform: `matrix(1 0 0 -1 0 ${height})`
  })
}

export const normalizeData = data => {
  const xAxisData = (data.columns.find(item => item[0] === 'x') || []).slice(1)
  const yAxesData = {}
  const yMin = []
  const yMax = []
  
  data.columns.forEach(item => {
    if (!item[0].startsWith('x')) {
      const name = item[0]
      const axisData = item.slice(1)
      yMin.push(Math.min(...axisData)) 
      yMax.push(Math.max(...axisData))
      yAxesData[name] = {
        type: data.types[name],
        name,
        color: data.colors[name],
        data: axisData
      }
    }
  })

  const yAxisMax = Math.max(...yMax)
  const depth = Math.floor(Math.log10(yAxisMax) + 1) - 1
  const pow = Math.pow(10, depth)
  const max = Math.ceil(yAxisMax / pow) * pow

  return {
    x: {
      data: xAxisData
    },
    y: {
      domain: [Math.min(...yMin), max],
      datasets: Object.keys(data.names).map(name => yAxesData[name])
    }
  }
}

const COUNT_TICKS = 5

export const getTicks = (axisMax, height) =>
  new Array(COUNT_TICKS + 1)
    .fill(0)
    .map((_, index) => {
      const value = axisMax - (axisMax / COUNT_TICKS) * index
      const axisPerc = height / axisMax

      return {
        position: height - axisPerc  * value,
        value
      }
    })

export const AXIS_HEIGHT = .95
export const TIKS_HEIGHT = .9