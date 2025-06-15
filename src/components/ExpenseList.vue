<template>
  <div class="mt-4">
    <h5>Expense Chart</h5>
    <canvas ref="chart"></canvas>
  </div>
</template>

<script>
import { Chart } from 'chart.js/auto'

export default {
  props: ['data'],
  mounted() {
    const ctx = this.$refs.chart
    new Chart(ctx, {
      type: 'bar',
      data: {
        labels: Object.keys(this.data),
        datasets: [{
          label: 'Expenses by Category',
          data: Object.values(this.data),
          backgroundColor: ['#ff6384', '#36a2eb', '#ffcd56', '#4bc0c0']
        }]
      }
    })
  }
}
</script>
