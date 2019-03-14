export const fetchAsync = async (url) => 
  await (await fetch(url)).json()
  
const SVGNS = 'http://www.w3.org/2000/svg'
export const createElement = name => document.createElementNS(SVGNS, name)

export const setAttributes = (el, attrs) => {
  for(const key in attrs)
    el.setAttribute(key, attrs[key])
}