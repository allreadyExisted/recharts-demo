export const fetchAsync = async (url) => 
  await (await fetch(url)).json()
  
const SVGNS = 'http://www.w3.org/2000/svg'
export const createElement = name => document.createElementNS(SVGNS, name)

export const setAttributes = (el, attrs) => {
  for(const key in attrs)
    el.setAttribute(key, attrs[key])
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

  return {
    x: {
      data: xAxisData
    },
    y: {
      domain: [Math.min(...yMin), Math.max(...yMax)],
      datasets: Object.keys(data.names).map(name => yAxesData[name])
    }
  }
}