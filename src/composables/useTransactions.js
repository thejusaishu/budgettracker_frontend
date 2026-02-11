import { ref, computed } from 'vue'
import { transactionsAPI } from '../api/index.js'

// Shared state across all components
const transactions = ref([])
const loading = ref(false)
const error = ref(null)

export function useTransactions() {

  const totalIncome = computed(() => {
    return transactions.value
      .filter(t => t.type === 'income')
      .reduce((sum, t) => sum + parseFloat(t.amount), 0)
  })

  const totalExpense = computed(() => {
    return transactions.value
      .filter(t => t.type === 'expense')
      .reduce((sum, t) => sum + parseFloat(t.amount), 0)
  })

  const balance = computed(() => {
    return totalIncome.value - totalExpense.value
  })

  async function fetchTransactions() {
    loading.value = true
    error.value = null
    try {
      const data = await transactionsAPI.getAll()
      transactions.value = data
    } catch (err) {
      error.value = 'Failed to fetch transactions'
      console.error(err)
    } finally {
      loading.value = false
    }
  }

  async function addTransaction(transaction) {
    loading.value = true
    error.value = null
    try {
      const newTransaction = await transactionsAPI.add(transaction)
      transactions.value.unshift(newTransaction)
      return { success: true }
    } catch (err) {
      error.value = 'Failed to add transaction'
      console.error(err)
      return { success: false, error: err.message }
    } finally {
      loading.value = false
    }
  }

  async function deleteTransaction(id) {
    loading.value = true
    error.value = null
    try {
      await transactionsAPI.delete(id)
      const index = transactions.value.findIndex(t => t.id === id)
      if (index !== -1) {
        transactions.value.splice(index, 1)
      }
      return { success: true }
    } catch (err) {
      error.value = 'Failed to delete transaction'
      console.error(err)
      return { success: false, error: err.message }
    } finally {
      loading.value = false
    }
  }

  function clearTransactions() {
    transactions.value = []
    error.value = null
  }

  return {
    transactions,
    loading,
    error,
    totalIncome,
    totalExpense,
    balance,
    fetchTransactions,
    addTransaction,
    deleteTransaction,
    clearTransactions
  }
}
