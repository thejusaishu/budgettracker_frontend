<script setup>
import { reactive, ref } from 'vue'
import { useTransactions } from '../composables/useTransactions.js'

const { addTransaction } = useTransactions()

const incomeCategories = ['Salary', 'Freelance', 'Investment', 'Gift', 'Other']
const expenseCategories = ['Food', 'Transport', 'Shopping', 'Bills', 'Entertainment', 'Health', 'Other']

const form = reactive({
  type: 'expense',
  description: '',
  amount: '',
  category: '',
  date: new Date().toISOString().split('T')[0]
})

const errors = ref({})
const submitting = ref(false)
const successMessage = ref('')

function validate() {
  errors.value = {}
  
  if (!form.description.trim()) {
    errors.value.description = 'Description is required'
  }
  
  if (!form.amount || parseFloat(form.amount) <= 0) {
    errors.value.amount = 'Enter a valid amount'
  }
  
  if (!form.category) {
    errors.value.category = 'Select a category'
  }
  
  if (!form.date) {
    errors.value.date = 'Date is required'
  }
  
  return Object.keys(errors.value).length === 0
}

async function handleSubmit() {
  if (!validate()) return
  
  submitting.value = true
  successMessage.value = ''
  
  try {
    const result = await addTransaction({
      type: form.type,
      description: form.description.trim(),
      amount: parseFloat(form.amount),
      category: form.category,
      date: form.date
    })
    
    if (result.success) {
      // Reset form only on success
      form.description = ''
      form.amount = ''
      form.category = ''
      form.date = new Date().toISOString().split('T')[0]
      errors.value = {}
      successMessage.value = 'Transaction added successfully!'
      
      // Clear success message after 3 seconds
      setTimeout(() => {
        successMessage.value = ''
      }, 3000)
    } else {
      errors.value.submit = result.error || 'Failed to add transaction'
    }
  } catch (err) {
    errors.value.submit = 'Failed to add transaction. Please try again.'
  } finally {
    submitting.value = false
  }
}

function getCurrentCategories() {
  return form.type === 'income' ? incomeCategories : expenseCategories
}
</script>

<template>
  <div class="form-card">
    <h2 class="form-title">Add Transaction</h2>
    
    <!-- Success Message -->
    <div v-if="successMessage" class="success-message">
      {{ successMessage }}
    </div>
    
    <!-- Error Message -->
    <div v-if="errors.submit" class="error-message">
      {{ errors.submit }}
    </div>
    
    <form @submit.prevent="handleSubmit">
      <!-- Type Toggle -->
      <div class="type-toggle">
        <button
          type="button"
          @click="form.type = 'expense'; form.category = ''"
          class="toggle-btn"
          :class="{ 'active-expense': form.type === 'expense' }"
        >
          Expense
        </button>
        <button
          type="button"
          @click="form.type = 'income'; form.category = ''"
          class="toggle-btn"
          :class="{ 'active-income': form.type === 'income' }"
        >
          Income
        </button>
      </div>

      <!-- Description -->
      <div class="form-group">
        <label class="form-label">Description</label>
        <input
          v-model="form.description"
          type="text"
          placeholder="e.g., Grocery shopping"
          class="form-input"
          :class="{ 'input-error': errors.description }"
          :disabled="submitting"
        />
        <p v-if="errors.description" class="error-text">
          {{ errors.description }}
        </p>
      </div>

      <!-- Amount -->
      <div class="form-group">
        <label class="form-label">Amount (₹)</label>
        <input
          v-model="form.amount"
          type="number"
          step="1"
          min="0"
          placeholder="0"
          class="form-input"
          :class="{ 'input-error': errors.amount }"
          :disabled="submitting"
        />
        <p v-if="errors.amount" class="error-text">
          {{ errors.amount }}
        </p>
      </div>

      <!-- Category -->
      <div class="form-group">
        <label class="form-label">Category</label>
        <select
          v-model="form.category"
          class="form-input"
          :class="{ 'input-error': errors.category }"
          :disabled="submitting"
        >
          <option value="" disabled>Select category</option>
          <option v-for="cat in getCurrentCategories()" :key="cat" :value="cat">
            {{ cat }}
          </option>
        </select>
        <p v-if="errors.category" class="error-text">
          {{ errors.category }}
        </p>
      </div>

      <!-- Date -->
      <div class="form-group">
        <label class="form-label">Date</label>
        <input
          v-model="form.date"
          type="date"
          class="form-input"
          :class="{ 'input-error': errors.date }"
          :disabled="submitting"
        />
        <p v-if="errors.date" class="error-text">
          {{ errors.date }}
        </p>
      </div>

      <!-- Submit Button -->
      <button type="submit" class="submit-btn" :disabled="submitting">
        <span v-if="submitting" class="btn-loading">
          <span class="spinner"></span>
          Adding...
        </span>
        <span v-else>Add Transaction</span>
      </button>
    </form>
  </div>
</template>

<style scoped>
.form-card {
  background: white;
  border-radius: 12px;
  box-shadow: 0 4px 6px -1px rgba(0, 0, 0, 0.1);
  padding: 1.5rem;
}

.form-title {
  font-size: 1.125rem;
  font-weight: 600;
  color: #1f2937;
  margin-bottom: 1rem;
}

.success-message {
  background: #d1fae5;
  color: #065f46;
  padding: 0.75rem;
  border-radius: 8px;
  margin-bottom: 1rem;
  font-size: 0.875rem;
  text-align: center;
}

.error-message {
  background: #fee2e2;
  color: #991b1b;
  padding: 0.75rem;
  border-radius: 8px;
  margin-bottom: 1rem;
  font-size: 0.875rem;
  text-align: center;
}

.type-toggle {
  display: flex;
  border-radius: 8px;
  overflow: hidden;
  border: 1px solid #e5e7eb;
  margin-bottom: 1rem;
}

.toggle-btn {
  flex: 1;
  padding: 0.5rem;
  font-size: 0.875rem;
  font-weight: 500;
  border: none;
  background: #f9fafb;
  color: #6b7280;
  cursor: pointer;
  transition: all 0.2s;
}

.toggle-btn:hover {
  background: #f3f4f6;
}

.toggle-btn.active-expense {
  background: #ef4444;
  color: white;
}

.toggle-btn.active-income {
  background: #10b981;
  color: white;
}

.form-group {
  margin-bottom: 1rem;
}

.form-label {
  display: block;
  font-size: 0.875rem;
  font-weight: 500;
  color: #374151;
  margin-bottom: 0.25rem;
}

.form-input {
  width: 100%;
  padding: 0.5rem 0.75rem;
  border: 1px solid #d1d5db;
  border-radius: 8px;
  font-size: 1rem;
  outline: none;
  transition: border-color 0.2s, box-shadow 0.2s;
  box-sizing: border-box;
}

.form-input:focus {
  border-color: #10b981;
  box-shadow: 0 0 0 3px rgba(16, 185, 129, 0.1);
}

.form-input:disabled {
  background: #f3f4f6;
  cursor: not-allowed;
}

.form-input.input-error {
  border-color: #ef4444;
}

.error-text {
  color: #ef4444;
  font-size: 0.75rem;
  margin-top: 0.25rem;
}

.submit-btn {
  width: 100%;
  padding: 0.75rem;
  background: linear-gradient(135deg, #059669, #0d9488);
  color: white;
  font-weight: 500;
  border: none;
  border-radius: 8px;
  font-size: 1rem;
  cursor: pointer;
  transition: all 0.2s;
  box-shadow: 0 4px 6px -1px rgba(0, 0, 0, 0.1);
}

.submit-btn:hover:not(:disabled) {
  background: linear-gradient(135deg, #047857, #0f766e);
  box-shadow: 0 6px 8px -1px rgba(0, 0, 0, 0.15);
}

.submit-btn:disabled {
  opacity: 0.7;
  cursor: not-allowed;
}

.btn-loading {
  display: flex;
  align-items: center;
  justify-content: center;
  gap: 0.5rem;
}

.spinner {
  width: 16px;
  height: 16px;
  border: 2px solid rgba(255, 255, 255, 0.3);
  border-top-color: white;
  border-radius: 50%;
  animation: spin 0.8s linear infinite;
}

@keyframes spin {
  to {
    transform: rotate(360deg);
  }
}
</style>
