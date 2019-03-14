import { fetchAsync } from './utils.js'
import { Chart } from './chart.js'

fetchAsync('/data/chart_data.json').then(data => {
  const wrapper = document.getElementById('js-charts')
  data.forEach(chartItemData => {
    const element = document.createElement('div')
    element.className = 'tchart-wrapper'
    wrapper.appendChild(element)
    const chart = new Chart(element, { data: chartItemData })
    
    chart.draw()
  })
})