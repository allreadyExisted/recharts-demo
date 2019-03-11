import { fetchAsync } from './utils.js'
import { Chart } from './chart.js'

fetchAsync('/data/chart_data.json').then(data => {
  const wrapper = document.getElementById('js-charts')
  data.forEach((chartData, index) => {
    const element = document.createElement('div')
    element.className = 'chart'
    wrapper.appendChild(element)
    const chart = new Chart({
      element
    })
    
    chart.draw()
  })
})