<script setup>
import { onMounted, watch } from 'vue';
import { useAuth } from './composables/useAuth.js';
import { useTransactions } from './composables/useTransactions.js';
import AuthPage from './components/AuthPage.vue';
import UserHeader from './components/UserHeader.vue';
import LoadingSpinner from './components/LoadingSpinner.vue';
import SummaryCard from './components/SummaryCard.vue';
import TransactionForm from './components/TransactionForm.vue';
import TransactionList from './components/TransactionList.vue';

const { user, loading: authLoading, isAuthenticated, checkAuth } = useAuth();
const { 
  transactions,
  loading: transactionsLoading,
  error: transactionsError,
  totalIncome,
  totalExpense,
  balance,
  fetchTransactions,
  deleteTransaction,
  clearTransactions
} = useTransactions();

onMounted(async () => {
  await checkAuth();
});

// Watch for authentication changes
watch(isAuthenticated, (newValue) => {
  if (newValue) {
    fetchTransactions();
  } else {
    clearTransactions();
  }
}, { immediate: true });

async function handleDeleteTransaction(id) {
  await deleteTransaction(id);
}
</script>

<template>
  <div class="app">
    <LoadingSpinner v-if="authLoading" />
    
    <AuthPage v-else-if="!isAuthenticated" />
    
    <template v-else>
      <UserHeader />
      
      <main class="main-content">
        <!-- Error Message -->
        <div v-if="transactionsError" class="error-banner">
          {{ transactionsError }}
        </div>
        
        <div class="summary-section">
          <SummaryCard 
            title="Income" 
            :amount="totalIncome" 
            type="income" 
          />
          <SummaryCard 
            title="Expense" 
            :amount="totalExpense" 
            type="expense" 
          />
          <SummaryCard 
            title="Balance" 
            :amount="balance" 
            type="balance" 
          />
        </div>
        
        <div class="content-grid">
          <TransactionForm />
          <TransactionList 
            :transactions="transactions" 
            :loading="transactionsLoading"
            @delete="handleDeleteTransaction"
          />
        </div>
      </main>
    </template>
  </div>
</template>

<style scoped>
.app {
  min-height: 100vh;
  background: #f5f7fa;
}

.main-content {
  max-width: 1000px;
  margin: 0 auto;
  padding: 25px 20px;
}

.error-banner {
  background: #fee2e2;
  color: #991b1b;
  padding: 0.75rem 1rem;
  border-radius: 8px;
  margin-bottom: 1rem;
  text-align: center;
}

.summary-section {
  display: grid;
  grid-template-columns: repeat(3, 1fr);
  gap: 20px;
  margin-bottom: 30px;
}

.content-grid {
  display: grid;
  grid-template-columns: 1fr 1.5fr;
  gap: 25px;
}

@media (max-width: 900px) {
  .content-grid {
    grid-template-columns: 1fr;
  }
}

@media (max-width: 600px) {
  .summary-section {
    grid-template-columns: 1fr;
    gap: 15px;
  }
  
  .main-content {
    padding: 15px;
  }
}
</style>
