<template>
  <div class="expense-table">
    <div v-if="expenses.length === 0">No expenses yet.</div>
    <div class="categories" v-else>
      <div v-for="(items, category) in grouped" :key="category" class="category-column">
        <h3>{{ category }}</h3>
        <ul>
          <li v-for="e in items" :key="e.id">
            {{ e.name }} - {{ e.amount.toFixed(2) }} ден. - {{ e.date }}
            <button class="delete-btn" @click="$emit('delete-expense', e)">🗑️</button>
          </li>
        </ul>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  props: ['expenses'],
  computed: {
    grouped() {
      return this.expenses.reduce((acc, expense) => {
        if (!acc[expense.category]) acc[expense.category] = [];
        acc[expense.category].push(expense);
        return acc;
      }, {});
    }
  }
};
</script>

<style scoped>
.expense-table {
  font-family: 'Segoe UI', Tahoma, Geneva, Verdana, sans-serif;
  color: #34495e;
}

.categories {
  display: flex;
  gap: 30px;
  justify-content: space-between;
  flex-wrap: wrap;
}

.category-column {
  flex: 1 1 200px;
  background: #f0f3f7;
  padding: 15px;
  border-radius: 8px;
  box-shadow: 0 2px 8px rgba(0, 0, 0, 0.05);
}

.category-column h3 {
  border-bottom: 2px solid #3498db;
  padding-bottom: 5px;
  margin-bottom: 10px;
  color: #2980b9;
}

.category-column ul {
  list-style: none;
  padding: 0;
  margin: 0;
}

.category-column li {
  padding: 6px 0;
  border-bottom: 1px solid #dcdde1;
  display: flex;
  justify-content: space-between;
  align-items: center;
}

.category-column li:last-child {
  border-bottom: none;
}

.delete-btn {
  background-color: transparent;
  border: none;
  cursor: pointer;
  color: #e74c3c;
  font-size: 16px;
}

.delete-btn:hover {
  color: #c0392b;
}
</style>
