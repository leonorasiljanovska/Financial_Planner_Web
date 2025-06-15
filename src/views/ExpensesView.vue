<template>
  <div class="dashboard">
    <div class="header">
      <h1>My Financial Dashboard</h1>
      <button @click="logout">Logout</button>
    </div>

    <div class="form-section">
      <ExpenseForm @expense-added="fetchExpenses" />
    </div>

    <div class="summary-section">
      <h2>Summary by Category</h2>
      <div class="category-summary" v-for="(total, category) in categoryTotals" :key="category">
        <strong>{{ category }}:</strong> {{ total.toFixed(2) }} ден.
      </div>
    </div>

    <button class="view-tables-btn" @click="$router.push('/dashboard')">
      View Detailed Tables
    </button>
       <button type="button" @click="exportToExcel">Download Excel</button>
  </div>
</template>

<script>
import ExpenseForm from '@/components/ExpenseForm.vue';
// import * as XLSX from 'xlsx';
import ExcelJS from 'exceljs';


export default {
  components: {ExpenseForm},
  data() {
    return {
      expenses: [],
      categoryTotals: {}
    };
  },
  methods: {
    fetchExpenses() {
      const username = localStorage.getItem('loggedInUser');
      const stored = JSON.parse(localStorage.getItem(`expenses_${username}`)) || [];
      this.expenses = stored;
      this.calculateTotals();
    },
    calculateTotals() {
      const totals = {};
      this.expenses.forEach(exp => {
        if (!totals[exp.category]) totals[exp.category] = 0;
        totals[exp.category] += parseFloat(exp.amount);
      });
      this.categoryTotals = totals;
    },
    logout() {
      localStorage.removeItem('loggedInUser');
      this.$router.push('/login');
    },
     async exportToExcel() {
      const username = localStorage.getItem('loggedInUser');
      if (!username) {
        alert('User not logged in.');
        return;
      }

      const income = parseFloat(localStorage.getItem(`income_${username}`)) || 0;
      const savings = income * 0.15;
      const expenses = JSON.parse(localStorage.getItem(`expenses_${username}`)) || [];

      const workbook = new ExcelJS.Workbook();
      const sheet = workbook.addWorksheet('Финансии');

      // Top user info rows
      const usernameRow = sheet.addRow(['Корисничко име', username]);
      usernameRow.getCell(2).alignment = { horizontal: 'right' };
      sheet.addRow(['Приход', income]);
      const savingsRow = sheet.addRow(['Заштеда (15%)', savings.toFixed(2)]);
      savingsRow.getCell(2).alignment = { horizontal: 'right' }; // 👉 Align savings amount to the right


      sheet.addRow([]); // Empty row

      // Expense headers
      const headerRow = sheet.addRow(['Категорија', 'Име на трошок', 'Цена на трошок', 'Датум на трошок']);
      headerRow.eachCell(cell => {
        cell.font = { bold: true, color: { argb: 'FFFFFFFF' } };
        cell.fill = {
          type: 'pattern',
          pattern: 'solid',
          fgColor: { argb: 'FF2E86C1' } // Blue
        };
        cell.alignment = { horizontal: 'center' };
        cell.border = {
          top: { style: 'thin' },
          bottom: { style: 'thin' },
          left: { style: 'thin' },
          right: { style: 'thin' }
        };
      });

    // Add expenses
    expenses.forEach(exp => {
      const row = sheet.addRow([
        exp.category,
        exp.name,
        parseFloat(exp.amount),
        exp.date
      ]);
      row.getCell(3).alignment = { horizontal: 'right' }; // Align amount right
      row.getCell(1).alignment = { horizontal: 'left' };
      row.getCell(2).alignment = { horizontal: 'left' };
      row.getCell(4).alignment = { horizontal: 'center' };
  });

  // Auto-fit columns
  sheet.columns.forEach(column => {
    let maxLength = 10;
    column.eachCell({ includeEmpty: true }, cell => {
      const value = cell.value ? cell.value.toString() : '';
      maxLength = Math.max(maxLength, value.length);
    });
    column.width = maxLength + 2;
  });

  // Export file
  const buffer = await workbook.xlsx.writeBuffer();
  const blob = new Blob([buffer], { type: 'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet' });

  const link = document.createElement('a');
  link.href = URL.createObjectURL(blob);
  link.download = `финансии_${username}.xlsx`;
  link.click();
}

  },
  mounted() {
    this.fetchExpenses();
  }
};
</script>

<style scoped>
.dashboard {
  max-width: 900px;
  margin: 50px auto;
  font-family: 'Segoe UI', sans-serif;
  color: #2c3e50;
  background: #f9f9f9;
  border-radius: 12px;
  padding: 30px;
  box-shadow: 0 4px 20px rgba(0, 0, 0, 0.1);
}

.header {
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 30px;
  border-bottom: 1px solid #ddd;
  padding-bottom: 10px;
}

button {
  background-color: #e67e22;
  color: white;
  border: none;
  padding: 10px 20px;
  border-radius: 6px;
  font-size: 14px;
  cursor: pointer;
  transition: background-color 0.3s ease;
}

button:hover {
  background-color: #d35400;
}

.form-section {
  margin-bottom: 30px;
}

.summary-section {
  background: white;
  border-radius: 10px;
  padding: 20px;
  box-shadow: 0 2px 8px rgba(0, 0, 0, 0.05);
}

.category-summary {
  margin-bottom: 10px;
  font-size: 16px;
}

.view-tables-btn {
  margin-top: 20px;
  background-color: #3498db;
}

.view-tables-btn:hover {
  background-color: #2980b9;
}
</style>
