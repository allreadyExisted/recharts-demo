export const fetchAsync = async (url) => 
  await (await fetch(url)).json()
  
const SVGNS = 'http://www.w3.org/2000/svg'
export const createElement = name => document.createElementNS(SVGNS, name)

export const setAttributes = (el, attrs) => {
  for(const key in attrs)
    el.setAttribute(key, attrs[key])
}

export const normalizeData = data => {
  const yAxesKeys = Object.keys(data.names)
  const yMax = data.columns
    .filter(item => !item[0].startsWith('x'))
    .reduce((prev, curr) => Math.max(prev, ...curr.slice(1)), 0)
  const xAxisData = (data.columns.find(item => item[0] === 'x') || []).slice(1)

  return yAxesKeys.map(name => ({
    xAxisData,
    yAxisData: data.columns.find(item => item[0] === name).slice(1),
    yAxisType: data.types[name],
    yAxisName: data.names[name],
    yAxisColor: data.colors[name],
    yMax
  }))
}