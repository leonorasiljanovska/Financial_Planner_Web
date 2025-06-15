<template>
  <div class="tables-view">
    <h1>Detailed Expense Tables</h1>

    <ExpenseTable :expenses="expenses" @delete-expense="deleteExpense" />

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