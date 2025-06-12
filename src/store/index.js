// import { createStore } from 'vuex'
//
// export default createStore({
//   state: {
//     user: null,
//     income: 0,
//     expenses: [],
//     currentMonth: new Date().getMonth(),
//   },
//   mutations: {
//     setUser(state, user) {
//       state.user = user
//     },
//     setIncome(state, income) {
//       state.income = income
//     },
//     addExpense(state, expense) {
//       state.expenses.push(expense)
//     },
//     deleteExpense(state, index) {
//       state.expenses.splice(index, 1)
//     },
//   },
//   getters: {
//     savings: state => state.income * 0.15,
//     spendable: state => state.income * 0.85 - state.expenses.reduce((sum, e) => sum + e.amount, 0),
//     expensesByCategory: state => {
//       return state.expenses.reduce((acc, exp) => {
//         acc[exp.category] = (acc[exp.category] || 0) + exp.amount
//         return acc
//       }, {})
//     }
//   }
// })

import { createStore } from 'vuex'

function loadState() {
  const saved = localStorage.getItem('financialPlannerState')
  if (saved) {
    try {
      return JSON.parse(saved)
    } catch {
      return null
    }
  }
  return null
}

const savedState = loadState()

export default createStore({
  state: {
    user: null,
    income: savedState?.income || 0,
    expenses: savedState?.expenses || [],
    currentMonth: new Date().getMonth(),
  },
  mutations: {
    setUser(state, user) {
      state.user = user
    },
    setIncome(state, income) {
      state.income = income
      localStorage.setItem('financialPlannerState', JSON.stringify({
        income: state.income,
        expenses: state.expenses
      }))
    },
    addExpense(state, expense) {
      state.expenses.push(expense)
      localStorage.setItem('financialPlannerState', JSON.stringify({
        income: state.income,
        expenses: state.expenses
      }))
    },
    deleteExpense(state, index) {
      state.expenses.splice(index, 1)
      localStorage.setItem('financialPlannerState', JSON.stringify({
        income: state.income,
        expenses: state.expenses
      }))
    },
  },
  getters: {
    savings: state => state.income * 0.15,
    spendable: state => state.income * 0.85 - state.expenses.reduce((sum, e) => sum + e.amount, 0),
    expensesByCategory: state => {
      return state.expenses.reduce((acc, exp) => {
        acc[exp.category] = (acc[exp.category] || 0) + exp.amount
        return acc
      }, {})
    }
  }
})

