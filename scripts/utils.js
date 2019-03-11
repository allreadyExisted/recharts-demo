export const fetchAsync = async (url) => 
  await (await fetch(url)).json()
  
const SVGNS = 'http://www.w3.org/2000/svg'
export const createElement = name => document.createElementNS(SVGNS, name)