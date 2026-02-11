<script setup>
import { ref } from 'vue'

const props = defineProps({
  transaction: {
    type: Object,
    required: true
  }
})

const emit = defineEmits(['delete'])

const showConfirm = ref(false)

function formatCurrency(amount) {
  return new Intl.NumberFormat('en-IN', {
    style: 'currency',
    currency: 'INR',
    maximumFractionDigits: 0
  }).format(amount)
}

function formatDate(dateStr) {
  return new Date(dateStr).toLocaleDateString('en-IN', {
    month: 'short',
    day: 'numeric',
    year: 'numeric'
  })
}

function handleDelete() {
  emit('delete', props.transaction.id)
  showConfirm.value = false
}
</script>

<template>
  <div class="transaction-item" :class="transaction.type">
    <div class="transaction-info">
      <div class="transaction-header">
        <span class="transaction-icon">
          {{ transaction.type === 'income' ? '💵' : '💸' }}
        </span>
        <h3 class="transaction-description">{{ transaction.description }}</h3>
      </div>
      <div class="transaction-meta">
        <span class="transaction-category">{{ transaction.category }}</span>
        <span class="transaction-date">{{ formatDate(transaction.date) }}</span>
      </div>
    </div>

    <div class="transaction-actions">
      <span class="transaction-amount" :class="transaction.type">
        {{ transaction.type === 'income' ? '+' : '-' }}{{ formatCurrency(transaction.amount) }}
      </span>

      <!-- Delete Button -->
      <div v-if="!showConfirm" class="delete-wrapper">
        <button
          @click="showConfirm = true"
          class="delete-btn"
          title="Delete transaction"
        >
          🗑️
        </button>
      </div>

      <!-- Confirm Delete -->
      <div v-else class="confirm-actions">
        <button @click="handleDelete" class="confirm-delete-btn">
          Delete
        </button>
        <button @click="showConfirm = false" class="cancel-btn">
          Cancel
        </button>
      </div>
    </div>
  </div>
</template>

<style scoped>
.transaction-item {
  background: white;
  border-radius: 8px;
  box-shadow: 0 1px 3px rgba(0, 0, 0, 0.1);
  border-left: 4px solid;
  padding: 1rem;
  display: flex;
  align-items: center;
  justify-content: space-between;
  gap: 1rem;
  transition: box-shadow 0.2s;
}

.transaction-item:hover {
  box-shadow: 0 4px 6px -1px rgba(0, 0, 0, 0.1);
}

.transaction-item.income {
  border-left-color: #10b981;
}

.transaction-item.expense {
  border-left-color: #ef4444;
}

.transaction-info {
  flex: 1;
  min-width: 0;
}

.transaction-header {
  display: flex;
  align-items: center;
  gap: 0.5rem;
  margin-bottom: 0.25rem;
}

.transaction-icon {
  font-size: 1.125rem;
}

.transaction-description {
  font-weight: 500;
  color: #1f2937;
  font-size: 1rem;
  white-space: nowrap;
  overflow: hidden;
  text-overflow: ellipsis;
}

.transaction-meta {
  display: flex;
  align-items: center;
  gap: 0.75rem;
  font-size: 0.875rem;
  color: #6b7280;
}

.transaction-category {
  background: #f3f4f6;
  padding: 0.125rem 0.5rem;
  border-radius: 4px;
}

.transaction-actions {
  display: flex;
  align-items: center;
  gap: 0.75rem;
}

.transaction-amount {
  font-weight: 600;
  font-size: 1.125rem;
  white-space: nowrap;
}

.transaction-amount.income {
  color: #059669;
}

.transaction-amount.expense {
  color: #dc2626;
}

.delete-btn {
  padding: 0.5rem;
  background: none;
  border: none;
  border-radius: 8px;
  color: #9ca3af;
  transition: all 0.2s;
}

.delete-btn:hover {
  background: #fef2f2;
  color: #ef4444;
}

.confirm-actions {
  display: flex;
  align-items: center;
  gap: 0.25rem;
}

.confirm-delete-btn {
  padding: 0.25rem 0.5rem;
  background: #ef4444;
  color: white;
  font-size: 0.75rem;
  border: none;
  border-radius: 4px;
  transition: background 0.2s;
}

.confirm-delete-btn:hover {
  background: #dc2626;
}

.cancel-btn {
  padding: 0.25rem 0.5rem;
  background: #e5e7eb;
  color: #4b5563;
  font-size: 0.75rem;
  border: none;
  border-radius: 4px;
  transition: background 0.2s;
}

.cancel-btn:hover {
  background: #d1d5db;
}
</style>
