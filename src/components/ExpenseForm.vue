<template>
  <form @submit.prevent="addExpense" class="expense-form">
    <label>
      Monthly Income:
      <input v-model.number="income" type="number" min="0" placeholder="Enter income"/>
    </label>
    <div class="readonly-fields">
      <label>
        Savings (15%):
        <input :value="savings.toFixed(2)" readonly/>
      </label>
      <label>
        Amount to Spend:
        <input :value="amountToSpend.toFixed(2)" readonly/>
      </label>
    </div>

    <input v-model="expense.name" placeholder="Expense Name"/>
    <input v-model.number="expense.amount" type="number" placeholder="Amount" min="0"/>
    <input v-model="expense.date" type="date"/>
    <select v-model="expense.category">
      <option disabled value="">Select Category</option>
      <option>Food</option>
      <option>Clothes</option>
      <option>Entertainment</option>
      <option>Utility</option>
    </select>
    <button type="submit">Add Expense</button>
<!--    <button type="button" @click="exportToCSV">Download CSV</button>-->
  </form>
</template>

<script>
export default {
  data() {
    return {
      income: 0,
      expense: {
        name: '',
        amount: null,
        date: '',
        category: ''
      },
      totalExpenses: 0
    };
  },
  computed: {
    savings() {
      return this.income * 0.15;
    },
    amountToSpend() {
      return this.income - this.savings - this.totalExpenses;
    }
  },
  watch: {
    income() {
      this.updateTotalExpenses();
    }
  },
  methods: {
    addExpense() {
      const username = localStorage.getItem('loggedInUser');
      if (!username) {
        alert('User not logged in.');
        return;
      }
      if (!this.expense.name || !this.expense.amount || !this.expense.date || !this.expense.category) {
        alert('Please fill all fields');
        return;
      }
      if (this.expense.amount > this.amountToSpend) {
        alert(`Cannot add expense. Amount exceeds available spendable funds (${this.amountToSpend.toFixed(2)})`);
        return;
      }
      // Save income in localStorage (so it persists between reloads)
      localStorage.setItem(`income_${username}`, this.income);

      // Fetch expenses and update total
      const expenses = JSON.parse(localStorage.getItem(`expenses_${username}`)) || [];
      expenses.push({...this.expense, id: Date.now()});

      localStorage.setItem(`expenses_${username}`, JSON.stringify(expenses));

      this.$emit('expense-added');

      // Update total expenses
      this.updateTotalExpenses();

      // Clear form except income
      this.expense = {name: '', amount: null, date: '', category: ''};
    },
    updateTotalExpenses() {
      const username = localStorage.getItem('loggedInUser');
      const expenses = JSON.parse(localStorage.getItem(`expenses_${username}`)) || [];
      this.totalExpenses = expenses.reduce((sum, e) => sum + e.amount, 0);
    },

  },
  mounted() {
    // Load income from localStorage if exists
    const username = localStorage.getItem('loggedInUser');
    if (username) {
      const storedIncome = parseFloat(localStorage.getItem(`income_${username}`));
      if (!isNaN(storedIncome)) {
        this.income = storedIncome;
      }
      this.updateTotalExpenses();
    }
  }
};
</script>

<style scoped>
.expense-form {
  display: flex;
  flex-direction: column;
  gap: 12px;
}

input, select {
  padding: 10px;
  font-size: 14px;
  border: 1px solid #ccc;
  border-radius: 6px;
}

button {
  background-color: #2ecc71;
  color: white;
  border: none;
  padding: 10px;
  font-weight: bold;
  border-radius: 6px;
  cursor: pointer;
  transition: background-color 0.3s;
}

button:hover {
  background-color: #27ae60;
}

.readonly-fields {
  display: flex;
  gap: 12px;
}

.readonly-fields label {
  flex: 1;
}

.readonly-fields input {
  background-color: #eee;
  cursor: not-allowed;
}
</style>
