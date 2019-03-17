import { fetchAsync } from './utils.js'
import { Chart } from './chart.js'

fetchAsync('/data/chart_data.json').then(data => {
  const wrapper = document.getElementById('js-charts')
  data.forEach(chartItemData => {
    const element = document.createElement('div')
    const chartWrapper = document.createElement('div')
    element.className = 'wrapper-item'
    chartWrapper.className = 'tchart-wrapper'
    element.appendChild(chartWrapper)
    wrapper.appendChild(element)
    const chart = new Chart(chartWrapper, { data: chartItemData })
    
    chart.draw()
  })
})