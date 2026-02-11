<script setup>
import { ref } from 'vue';
import { useAuth } from '../composables/useAuth.js';

const { register, login, error } = useAuth();

const isLoginMode = ref(true);
const isLoading = ref(false);

const formData = ref({
  name: '',
  email: '',
  password: '',
  confirmPassword: ''
});

const formError = ref('');

function toggleMode() {
  isLoginMode.value = !isLoginMode.value;
  formError.value = '';
  formData.value = {
    name: '',
    email: '',
    password: '',
    confirmPassword: ''
  };
}

async function handleSubmit() {
  formError.value = '';
  
  if (!formData.value.email || !formData.value.password) {
    formError.value = 'Please fill in all required fields';
    return;
  }
  
  if (!isLoginMode.value) {
    if (!formData.value.name) {
      formError.value = 'Name is required';
      return;
    }
    if (formData.value.password.length < 6) {
      formError.value = 'Password must be at least 6 characters';
      return;
    }
    if (formData.value.password !== formData.value.confirmPassword) {
      formError.value = 'Passwords do not match';
      return;
    }
  }
  
  isLoading.value = true;
  
  try {
    let result;
    if (isLoginMode.value) {
      result = await login(formData.value.email, formData.value.password);
    } else {
      result = await register(formData.value.name, formData.value.email, formData.value.password);
    }
    
    if (!result.success) {
      formError.value = result.error;
    }
  } catch (err) {
    formError.value = 'An error occurred. Please try again.';
  } finally {
    isLoading.value = false;
  }
}
</script>

<template>
  <div class="auth-container">
    <div class="auth-card">
      <div class="auth-header">
        <h1>💰 Budget Tracker</h1>
        <p>Manage your finances with ease</p>
      </div>
      
      <div class="auth-tabs">
        <button 
          :class="['tab-btn', { active: isLoginMode }]"
          @click="isLoginMode = true"
        >
          Login
        </button>
        <button 
          :class="['tab-btn', { active: !isLoginMode }]"
          @click="isLoginMode = false"
        >
          Register
        </button>
      </div>
      
      <form @submit.prevent="handleSubmit" class="auth-form">
        <div v-if="formError" class="error-message">
          {{ formError }}
        </div>
        
        <div v-if="!isLoginMode" class="form-group">
          <label for="name">Full Name</label>
          <input
            id="name"
            v-model="formData.name"
            type="text"
            placeholder="Enter your name"
            :disabled="isLoading"
          />
        </div>
        
        <div class="form-group">
          <label for="email">Email Address</label>
          <input
            id="email"
            v-model="formData.email"
            type="email"
            placeholder="Enter your email"
            :disabled="isLoading"
          />
        </div>
        
        <div class="form-group">
          <label for="password">Password</label>
          <input
            id="password"
            v-model="formData.password"
            type="password"
            placeholder="Enter your password"
            :disabled="isLoading"
          />
        </div>
        
        <div v-if="!isLoginMode" class="form-group">
          <label for="confirmPassword">Confirm Password</label>
          <input
            id="confirmPassword"
            v-model="formData.confirmPassword"
            type="password"
            placeholder="Confirm your password"
            :disabled="isLoading"
          />
        </div>
        
        <button type="submit" class="submit-btn" :disabled="isLoading">
          <span v-if="isLoading">Please wait...</span>
          <span v-else>{{ isLoginMode ? 'Login' : 'Create Account' }}</span>
        </button>
      </form>
      
      <div class="auth-footer">
        <p v-if="isLoginMode">
          Don't have an account? 
          <button @click="toggleMode" class="link-btn">Register here</button>
        </p>
        <p v-else>
          Already have an account? 
          <button @click="toggleMode" class="link-btn">Login here</button>
        </p>
      </div>
    </div>
  </div>
</template>

<style scoped>
.auth-container {
  min-height: 100vh;
  display: flex;
  align-items: center;
  justify-content: center;
  background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
  padding: 20px;
}

.auth-card {
  background: white;
  border-radius: 16px;
  box-shadow: 0 20px 60px rgba(0, 0, 0, 0.3);
  width: 100%;
  max-width: 420px;
  overflow: hidden;
}

.auth-header {
  background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
  color: white;
  padding: 30px;
  text-align: center;
}

.auth-header h1 {
  margin: 0;
  font-size: 28px;
  font-weight: 700;
}

.auth-header p {
  margin: 8px 0 0;
  opacity: 0.9;
  font-size: 14px;
}

.auth-tabs {
  display: flex;
  border-bottom: 1px solid #e0e0e0;
}

.tab-btn {
  flex: 1;
  padding: 15px;
  border: none;
  background: #f5f5f5;
  font-size: 15px;
  font-weight: 600;
  color: #666;
  cursor: pointer;
  transition: all 0.3s ease;
}

.tab-btn.active {
  background: white;
  color: #667eea;
  border-bottom: 3px solid #667eea;
}

.tab-btn:hover:not(.active) {
  background: #eee;
}

.auth-form {
  padding: 30px;
}

.error-message {
  background: #fee;
  color: #c00;
  padding: 12px 15px;
  border-radius: 8px;
  margin-bottom: 20px;
  font-size: 14px;
  border-left: 4px solid #c00;
}

.form-group {
  margin-bottom: 20px;
}

.form-group label {
  display: block;
  margin-bottom: 8px;
  font-weight: 600;
  color: #333;
  font-size: 14px;
}

.form-group input {
  width: 100%;
  padding: 12px 15px;
  border: 2px solid #e0e0e0;
  border-radius: 8px;
  font-size: 15px;
  transition: border-color 0.3s ease;
  box-sizing: border-box;
}

.form-group input:focus {
  outline: none;
  border-color: #667eea;
}

.form-group input:disabled {
  background: #f5f5f5;
  cursor: not-allowed;
}

.submit-btn {
  width: 100%;
  padding: 14px;
  background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
  color: white;
  border: none;
  border-radius: 8px;
  font-size: 16px;
  font-weight: 600;
  cursor: pointer;
  transition: transform 0.2s ease, box-shadow 0.2s ease;
}

.submit-btn:hover:not(:disabled) {
  transform: translateY(-2px);
  box-shadow: 0 5px 20px rgba(102, 126, 234, 0.4);
}

.submit-btn:disabled {
  opacity: 0.7;
  cursor: not-allowed;
}

.auth-footer {
  padding: 20px 30px 30px;
  text-align: center;
  color: #666;
  font-size: 14px;
}

.auth-footer p {
  margin: 0;
}

.link-btn {
  background: none;
  border: none;
  color: #667eea;
  font-weight: 600;
  cursor: pointer;
  padding: 0;
  font-size: 14px;
}

.link-btn:hover {
  text-decoration: underline;
}
</style>
