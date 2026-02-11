<script setup>
defineProps({
  message: {
    type: String,
    default: 'Loading...'
  }
})
</script>

<template>
  <div class="loading-container">
    <div class="spinner"></div>
    <p class="loading-text">{{ message }}</p>
  </div>
</template>

<style scoped>
.loading-container {
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  min-height: 100vh;
  background: #f3f4f6;
}

.spinner {
  width: 48px;
  height: 48px;
  border: 4px solid #e5e7eb;
  border-top-color: #059669;
  border-radius: 50%;
  animation: spin 1s linear infinite;
}

@keyframes spin {
  to {
    transform: rotate(360deg);
  }
}

.loading-text {
  margin-top: 1rem;
  color: #6b7280;
  font-size: 1rem;
}
</style>
