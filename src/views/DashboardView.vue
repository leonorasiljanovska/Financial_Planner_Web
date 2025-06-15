<!--&lt;!&ndash;<template>&ndash;&gt;-->
<!--&lt;!&ndash;  <div class="chart-container">&ndash;&gt;-->
<!--&lt;!&ndash;    <h2>Monthly Financial Overview</h2>&ndash;&gt;-->
<!--&lt;!&ndash;    <ExpenseChart :chart-data="chartData" :chart-options="chartOptions" />&ndash;&gt;-->
<!--&lt;!&ndash;  </div>&ndash;&gt;-->
<!--&lt;!&ndash;</template>&ndash;&gt;-->

<!--&lt;!&ndash;<script setup>&ndash;&gt;-->
<!--&lt;!&ndash;import { computed, reactive } from 'vue'&ndash;&gt;-->
<!--&lt;!&ndash;import ExpenseChart from '../components/ExpenseChart.vue'&ndash;&gt;-->

<!--&lt;!&ndash;// Replace with your real user data or state from Vuex later&ndash;&gt;-->
<!--&lt;!&ndash;const userFinancialData = reactive([&ndash;&gt;-->
<!--&lt;!&ndash;  { month: 'Jan', income: 1000, expenses: 800, savings: 150 },&ndash;&gt;-->
<!--&lt;!&ndash;  { month: 'Feb', income: 1200, expenses: 900, savings: 180 },&ndash;&gt;-->
<!--&lt;!&ndash;  // Add more months dynamically&ndash;&gt;-->
<!--&lt;!&ndash;])&ndash;&gt;-->

<!--&lt;!&ndash;const chartData = computed(() => ({&ndash;&gt;-->
<!--&lt;!&ndash;  labels: userFinancialData.map(d => d.month),&ndash;&gt;-->
<!--&lt;!&ndash;  datasets: [&ndash;&gt;-->
<!--&lt;!&ndash;    {&ndash;&gt;-->
<!--&lt;!&ndash;      label: 'Income',&ndash;&gt;-->
<!--&lt;!&ndash;      backgroundColor: '#4CAF50',&ndash;&gt;-->
<!--&lt;!&ndash;      data: userFinancialData.map(d => d.income)&ndash;&gt;-->
<!--&lt;!&ndash;    },&ndash;&gt;-->
<!--&lt;!&ndash;    {&ndash;&gt;-->
<!--&lt;!&ndash;      label: 'Expenses',&ndash;&gt;-->
<!--&lt;!&ndash;      backgroundColor: '#F44336',&ndash;&gt;-->
<!--&lt;!&ndash;      data: userFinancialData.map(d => d.expenses)&ndash;&gt;-->
<!--&lt;!&ndash;    },&ndash;&gt;-->
<!--&lt;!&ndash;    {&ndash;&gt;-->
<!--&lt;!&ndash;      label: 'Savings',&ndash;&gt;-->
<!--&lt;!&ndash;      backgroundColor: '#2196F3',&ndash;&gt;-->
<!--&lt;!&ndash;      data: userFinancialData.map(d => d.savings)&ndash;&gt;-->
<!--&lt;!&ndash;    }&ndash;&gt;-->
<!--&lt;!&ndash;  ]&ndash;&gt;-->
<!--&lt;!&ndash;}))&ndash;&gt;-->

<!--&lt;!&ndash;const chartOptions = {&ndash;&gt;-->
<!--&lt;!&ndash;  responsive: true,&ndash;&gt;-->
<!--&lt;!&ndash;  maintainAspectRatio: false,&ndash;&gt;-->
<!--&lt;!&ndash;  plugins: {&ndash;&gt;-->
<!--&lt;!&ndash;    legend: { position: 'top' },&ndash;&gt;-->
<!--&lt;!&ndash;    tooltip: { enabled: true }&ndash;&gt;-->
<!--&lt;!&ndash;  }&ndash;&gt;-->
<!--&lt;!&ndash;}&ndash;&gt;-->
<!--&lt;!&ndash;</script>&ndash;&gt;-->

<!--&lt;!&ndash;<style scoped>&ndash;&gt;-->
<!--&lt;!&ndash;.chart-container {&ndash;&gt;-->
<!--&lt;!&ndash;  max-width: 700px;&ndash;&gt;-->
<!--&lt;!&ndash;  height: 400px;&ndash;&gt;-->
<!--&lt;!&ndash;  margin: 30px auto;&ndash;&gt;-->
<!--&lt;!&ndash;  padding: 20px;&ndash;&gt;-->
<!--&lt;!&ndash;  background: #f9f9f9;&ndash;&gt;-->
<!--&lt;!&ndash;  border-radius: 10px;&ndash;&gt;-->
<!--&lt;!&ndash;  box-shadow: 0 0 15px rgba(0,0,0,0.1);&ndash;&gt;-->
<!--&lt;!&ndash;  font-family: 'Segoe UI', Tahoma, Geneva, Verdana, sans-serif;&ndash;&gt;-->
<!--&lt;!&ndash;  color: #333;&ndash;&gt;-->
<!--&lt;!&ndash;}&ndash;&gt;-->
<!--&lt;!&ndash;h2 {&ndash;&gt;-->
<!--&lt;!&ndash;  text-align: center;&ndash;&gt;-->
<!--&lt;!&ndash;  margin-bottom: 20px;&ndash;&gt;-->
<!--&lt;!&ndash;  font-weight: 600;&ndash;&gt;-->
<!--&lt;!&ndash;}&ndash;&gt;-->
<!--&lt;!&ndash;</style>&ndash;&gt;-->

<!--<template>-->
<!--  <div>-->
<!--    <h1>Dashboard View</h1>-->
<!--    <DashboardCharts />-->
<!--  </div>-->
<!--</template>-->


<!--<script>-->

<!--import DashboardCharts from '@/components/DashboardCharts.vue';-->

<!--export default {-->
<!--  name: 'DashboardView',-->
<!--  components: {-->
<!--    DashboardCharts-->
<!--  }-->
<!--};-->
<!--</script>-->

<!--<template>-->
<!--  <div class="tables-view">-->
<!--    <h1>Detailed Expense Tables</h1>-->
<!--    <ExpenseTable :expenses="expenses" @delete-expense="deleteExpense" />-->
<!--    <button class="back-button" @click="goBackToDashboard">Back to Dashboard</button>-->


<!--  </div>-->
<!--</template>-->
<template>
  <div class="tables-view">
    <h1>Detailed Expense Tables</h1>

    <ExpenseTable :expenses="expenses" @delete-expense="deleteExpense" />

    <!-- 👇 Add this line below the table to show the chart -->
    <ExpenseChart :sums="expenseSums" />

    <button @click="goBackToDashboard" class="back-button">Back to Dashboard</button>
  </div>
</template>

<script>
import ExpenseTable from '@/components/ExpenseTable.vue';
import ExpenseChart from '@/components/ExpenseChart.vue';

export default {
  components: { ExpenseTable, ExpenseChart },
  data() {
    return {
      expenses: []
    };
  },
  computed: {
    expenseSums() {
      // Return a dictionary of category => total amount
      return this.expenses.reduce((acc, expense) => {
        acc[expense.category] = (acc[expense.category] || 0) + expense.amount;
        return acc;
      }, {});
    }
  },
  mounted() {
    this.loadExpenses();
  },
  methods: {
    loadExpenses() {
      const username = localStorage.getItem('loggedInUser');
      this.expenses = JSON.parse(localStorage.getItem(`expenses_${username}`)) || [];
    },
    deleteExpense(expenseToDelete) {
      const username = localStorage.getItem('loggedInUser');
      this.expenses = this.expenses.filter(e => e.id !== expenseToDelete.id);
      localStorage.setItem(`expenses_${username}`, JSON.stringify(this.expenses));
    },
    goBackToDashboard() {
      this.$router.push('/expenses');
    }
  }
};
</script>

<!--<script>-->
<!--  import ExpenseTable from '@/components/ExpenseTable.vue';-->

<!--  export default {-->
<!--  components: {ExpenseTable},-->
<!--  data() {-->
<!--  return {-->
<!--  expenses: []-->
<!--  };-->
<!--  },-->
<!--  mounted() {-->
<!--  this.loadExpenses();-->
<!--},-->
<!--  methods: {-->
<!--  loadExpenses() {-->
<!--  const username = localStorage.getItem('loggedInUser');-->
<!--  this.expenses = JSON.parse(localStorage.getItem(`expenses_${username}`)) || [];-->
<!--},-->
<!--  deleteExpense(expenseToDelete) {-->
<!--  const username = localStorage.getItem('loggedInUser');-->
<!--  this.expenses = this.expenses.filter(e => e.id !== expenseToDelete.id);-->
<!--  localStorage.setItem(`expenses_${username}`, JSON.stringify(this.expenses));-->
<!--},-->
<!--  goBackToDashboard() {-->
<!--  this.$router.push('/expenses');  // This will now work-->
<!--}-->
<!--}-->
<!--};-->
<!--</script>-->

<style scoped>


.back-button {
  margin-top: 20px;
  padding: 10px 20px;
  background-color: #3498db;
  color: white;
  border: none;
  border-radius: 6px;
  cursor: pointer;
  font-size: 16px;
  transition: background-color 0.3s ease, transform 0.2s ease;
}

.back-button:hover {
  background-color: #2980b9;
  transform: translateY(-2px);
}

.back-button:active {
  transform: translateY(0);
  background-color: #2471a3;
}
</style>