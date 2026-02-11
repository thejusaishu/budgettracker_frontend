<script setup>
import { ref, computed } from 'vue'
import TransactionItem from './TransactionItem.vue'

const props = defineProps({
  transactions: {
    type: Array,
    required: true
  },
  loading: {
    type: Boolean,
    default: false
  }
})

const emit = defineEmits(['delete'])

const filterType = ref('all')
const searchQuery = ref('')

// Filter transactions locally
const filteredTransactions = computed(() => {
  let result = [...props.transactions]
  
  // Filter by type
  if (filterType.value !== 'all') {
    result = result.filter(t => t.type === filterType.value)
  }
  
  // Filter by search query
  if (searchQuery.value.trim()) {
    const query = searchQuery.value.toLowerCase()
    result = result.filter(t => 
      t.description.toLowerCase().includes(query) ||
      t.category.toLowerCase().includes(query)
    )
  }
  
  // Sort by date (newest first)
  result.sort((a, b) => new Date(b.date) - new Date(a.date))
  
  return result
})

function handleDelete(id) {
  emit('delete', id)
}
</script>

<template>
  <div class="list-card">
    <div class="list-header">
      <h2 class="list-title">
        Transactions
        <span class="transaction-count">({{ filteredTransactions.length }})</span>
      </h2>

      <!-- Filters -->
      <div class="filters">
        <!-- Search -->
        <div class="search-wrapper">
          <span class="search-icon">🔍</span>
          <input
            v-model="searchQuery"
            type="text"
            placeholder="Search..."
            class="search-input"
          />
        </div>

        <!-- Filter Type -->
        <select v-model="filterType" class="filter-select">
          <option value="all">All Types</option>
          <option value="income">Income Only</option>
          <option value="expense">Expenses Only</option>
        </select>
      </div>
    </div>

    <!-- Loading State -->
    <div v-if="loading && transactions.length === 0" class="loading-state">
      <div class="loading-spinner"></div>
      <p>Loading transactions...</p>
    </div>

    <!-- Transaction List -->
    <div v-else-if="filteredTransactions.length > 0" class="transaction-list">
      <TransactionItem
        v-for="transaction in filteredTransactions"
        :key="transaction.id"
        :transaction="transaction"
        @delete="handleDelete"
      />
    </div>

    <!-- Empty State -->
    <div v-else class="empty-state">
      <div class="empty-icon">📭</div>
      <p class="empty-title">No transactions found</p>
      <p class="empty-subtitle">
        {{ transactions.length > 0 ? 'Try adjusting your filters' : 'Add your first transaction to get started' }}
      </p>
    </div>
  </div>
</template>

<style scoped>
.list-card {
  background: white;
  border-radius: 12px;
  box-shadow: 0 4px 6px -1px rgba(0, 0, 0, 0.1);
  padding: 1.5rem;
}

.list-header {
  display: flex;
  flex-direction: column;
  gap: 1rem;
  margin-bottom: 1.5rem;
}

@media (min-width: 640px) {
  .list-header {
    flex-direction: row;
    align-items: center;
    justify-content: space-between;
  }
}

.list-title {
  font-size: 1.125rem;
  font-weight: 600;
  color: #1f2937;
}

.transaction-count {
  font-weight: 400;
  color: #9ca3af;
  font-size: 0.875rem;
  margin-left: 0.5rem;
}

.filters {
  display: flex;
  flex-direction: column;
  gap: 0.75rem;
}

@media (min-width: 640px) {
  .filters {
    flex-direction: row;
  }
}

.search-wrapper {
  position: relative;
}

.search-icon {
  position: absolute;
  left: 0.625rem;
  top: 50%;
  transform: translateY(-50%);
  font-size: 0.875rem;
  color: #9ca3af;
}

.search-input {
  padding: 0.375rem 0.75rem 0.375rem 2rem;
  border: 1px solid #d1d5db;
  border-radius: 8px;
  font-size: 0.875rem;
  outline: none;
  width: 100%;
  transition: border-color 0.2s, box-shadow 0.2s;
  box-sizing: border-box;
}

@media (min-width: 640px) {
  .search-input {
    width: 160px;
  }
}

.search-input:focus {
  border-color: #10b981;
  box-shadow: 0 0 0 3px rgba(16, 185, 129, 0.1);
}

.filter-select {
  padding: 0.375rem 0.75rem;
  border: 1px solid #d1d5db;
  border-radius: 8px;
  font-size: 0.875rem;
  outline: none;
  background: white;
  cursor: pointer;
  transition: border-color 0.2s, box-shadow 0.2s;
}

.filter-select:focus {
  border-color: #10b981;
  box-shadow: 0 0 0 3px rgba(16, 185, 129, 0.1);
}

.transaction-list {
  display: flex;
  flex-direction: column;
  gap: 0.75rem;
  max-height: 400px;
  overflow-y: auto;
}

.empty-state {
  text-align: center;
  padding: 3rem 1rem;
}

.empty-icon {
  font-size: 3rem;
  margin-bottom: 0.75rem;
}

.empty-title {
  color: #6b7280;
  font-size: 1rem;
}

.empty-subtitle {
  color: #9ca3af;
  font-size: 0.875rem;
  margin-top: 0.25rem;
}

.loading-state {
  text-align: center;
  padding: 3rem 1rem;
  color: #6b7280;
}

.loading-spinner {
  width: 32px;
  height: 32px;
  border: 3px solid #e5e7eb;
  border-top-color: #059669;
  border-radius: 50%;
  animation: spin 1s linear infinite;
  margin: 0 auto 0.75rem;
}

@keyframes spin {
  to {
    transform: rotate(360deg);
  }
}
</style>
