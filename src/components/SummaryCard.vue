<script setup>
defineProps({
  title: {
    type: String,
    required: true
  },
  amount: {
    type: Number,
    required: true
  },
  type: {
    type: String,
    required: true
  },
  icon: {
    type: String,
    required: true
  }
})

function formatCurrency(amount) {
  return new Intl.NumberFormat('en-IN', {
    style: 'currency',
    currency: 'INR',
    maximumFractionDigits: 0
  }).format(amount)
}
</script>

<template>
  <div class="card" :class="type">
    <div class="card-content">
      <div class="card-info">
        <p class="card-title">{{ title }}</p>
        <p class="card-amount" :class="type">{{ formatCurrency(amount) }}</p>
      </div>
      <span class="card-icon">{{ icon }}</span>
    </div>
  </div>
</template>

<style scoped>
.card {
  background: white;
  border-radius: 12px;
  box-shadow: 0 4px 6px -1px rgba(0, 0, 0, 0.1);
  padding: 1.25rem;
  border-left: 4px solid;
}

.card.income {
  border-left-color: #10b981;
}

.card.expense {
  border-left-color: #ef4444;
}

.card-content {
  display: flex;
  align-items: center;
  justify-content: space-between;
}

.card-title {
  color: #6b7280;
  font-size: 0.875rem;
  font-weight: 500;
}

.card-amount {
  font-size: 1.5rem;
  font-weight: 700;
  margin-top: 0.25rem;
}

.card-amount.income {
  color: #059669;
}

.card-amount.expense {
  color: #dc2626;
}

.card-icon {
  font-size: 2rem;
}
</style>
