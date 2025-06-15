<template>
  <div class="chart-container">
    <div class="chart-controls">
      <label for="chartType">Type of chart:</label>
      <select v-model="selectedChartType" id="chartType">
        <option value="bar">Bar</option>
        <option value="horizontalBar">Horizontal Bar</option>
        <option value="pie">Pie</option>
        <option value="doughnut">Doughnut</option>
      </select>
    </div>
    <canvas ref="chartCanvas"></canvas>
  </div>
</template>

<script>
import {
  ref,
  onMounted,
  watch
} from 'vue';
import {
  Chart,
  BarController,
  PieController,
  DoughnutController,
  BarElement,
  ArcElement,
  CategoryScale,
  LinearScale,
  Tooltip,
  Legend
} from 'chart.js';

Chart.register(
  BarController, PieController, DoughnutController,
  BarElement, ArcElement,
  CategoryScale, LinearScale,
  Tooltip, Legend
);

export default {
  props: {
    sums: {
      type: Object,
      required: true
    }
  },
  setup(props) {
    const chartCanvas = ref(null);
    const selectedChartType = ref('bar');
    let chartInstance = null;

    const createChart = () => {
      if (chartInstance) {
        chartInstance.destroy();
      }

      const chartType = selectedChartType.value === 'horizontalBar' ? 'bar' : selectedChartType.value;
      const isBar = selectedChartType.value === 'bar' || selectedChartType.value === 'horizontalBar';

      chartInstance = new Chart(chartCanvas.value, {
        type: chartType,
        data: {
          labels: Object.keys(props.sums),
          datasets: [{
            label: 'Expense per Category',
            data: Object.values(props.sums),
            backgroundColor: [
              '#3498db', '#e67e22', '#2ecc71', '#9b59b6', '#e74c3c',
              '#1abc9c', '#f39c12', '#8e44ad', '#c0392b', '#16a085'
            ]
          }]
        },
        options: {
          responsive: true,
          maintainAspectRatio: false,
          indexAxis: selectedChartType.value === 'horizontalBar' ? 'y' : 'x',
          plugins: {
            legend: {
              display: true,
              labels: {
                font: {
                  size: 14,
                  family: 'Arial'
                }
              }
            },
            tooltip: {
              enabled: true,
              titleFont: {
                size: 16
              },
              bodyFont: {
                size: 14
              }
            },
            title: {
              display: true,
              text: 'Трошоци по Категорија',
              font: {
                size: 22
              },
              color: '#333'
            }
          },
          scales: isBar ? {
            x: {
              ticks: {
                font: { size: 14 },
                color: '#333'
              },
              grid: { display: false }
            },
            y: {
              beginAtZero: true,
              ticks: {
                font: { size: 14 },
                color: '#333'
              },
              grid: { color: '#e0e0e0' }
            }
          } : {}
        }
      });
    };

    onMounted(() => {
      createChart();
    });

    watch(() => props.sums, createChart);
    watch(selectedChartType, createChart);

    return {
      chartCanvas,
      selectedChartType
    };
  }
};
</script>

<style scoped>
.chart-container {
  max-width: 1000px;
  height: 500px;
  margin: 40px auto;
  padding: 20px;
  background: #f5f7fa;
  border-radius: 12px;
  box-shadow: 0 4px 12px rgba(0, 0, 0, 0.1);
}

canvas {
  width: 100% !important;
  height: 100% !important;
}

.chart-controls {
  display: flex;
  align-items: center;
  justify-content: flex-end;
  margin-bottom: 10px;
  gap: 10px;
}

label {
  font-weight: bold;
  color: #555;
}
select {
  padding: 6px 12px;
  font-size: 14px;
  border: 1.5px solid #ccc;
  border-radius: 6px;
  background-color: white;
  cursor: pointer;
  transition: border-color 0.3s ease;
}

select:hover, select:focus {
  border-color: #3498db;
  outline: none;
}



</style>

