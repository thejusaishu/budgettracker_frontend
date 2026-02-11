<script setup>
import { useAuth } from '../composables/useAuth.js';

const { user, logout } = useAuth();

function getInitials(name) {
  if (!name) return '?';
  return name
    .split(' ')
    .map(word => word[0])
    .join('')
    .toUpperCase()
    .slice(0, 2);
}

function handleLogout() {
  if (confirm('Are you sure you want to logout?')) {
    logout();
  }
}
</script>

<template>
  <header class="user-header">
    <div class="header-content">
      <div class="brand">
        <span class="logo">💰</span>
        <h1>Budget Tracker</h1>
      </div>
      
      <div class="user-info">
        <div class="avatar">
          {{ getInitials(user?.name) }}
        </div>
        <div class="user-details">
          <span class="user-name">{{ user?.name }}</span>
          <span class="user-email">{{ user?.email }}</span>
        </div>
        <button @click="handleLogout" class="logout-btn">
          Logout
        </button>
      </div>
    </div>
  </header>
</template>

<style scoped>
.user-header {
  background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
  color: white;
  padding: 15px 20px;
  box-shadow: 0 4px 15px rgba(0, 0, 0, 0.2);
}

.header-content {
  max-width: 1000px;
  margin: 0 auto;
  display: flex;
  justify-content: space-between;
  align-items: center;
}

.brand {
  display: flex;
  align-items: center;
  gap: 10px;
}

.logo {
  font-size: 28px;
}

.brand h1 {
  margin: 0;
  font-size: 22px;
  font-weight: 700;
}

.user-info {
  display: flex;
  align-items: center;
  gap: 12px;
}

.avatar {
  width: 42px;
  height: 42px;
  border-radius: 50%;
  background: rgba(255, 255, 255, 0.2);
  display: flex;
  align-items: center;
  justify-content: center;
  font-weight: 700;
  font-size: 16px;
  border: 2px solid rgba(255, 255, 255, 0.4);
}

.user-details {
  display: flex;
  flex-direction: column;
}

.user-name {
  font-weight: 600;
  font-size: 14px;
}

.user-email {
  font-size: 12px;
  opacity: 0.8;
}

.logout-btn {
  padding: 8px 16px;
  background: rgba(255, 255, 255, 0.2);
  color: white;
  border: 1px solid rgba(255, 255, 255, 0.3);
  border-radius: 6px;
  font-size: 14px;
  font-weight: 500;
  cursor: pointer;
  transition: all 0.3s ease;
  margin-left: 10px;
}

.logout-btn:hover {
  background: rgba(255, 255, 255, 0.3);
}

@media (max-width: 600px) {
  .header-content {
    flex-direction: column;
    gap: 15px;
  }
  
  .user-details {
    display: none;
  }
  
  .user-info {
    width: 100%;
    justify-content: center;
  }
}
</style>
