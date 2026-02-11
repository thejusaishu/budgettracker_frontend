import { ref, computed } from 'vue';
import { authAPI, setToken, removeToken } from '../api/index.js';

const user = ref(null);
const loading = ref(true);
const error = ref('');

export function useAuth() {
  const isAuthenticated = computed(() => !!user.value);

  async function checkAuth() {
    const token = localStorage.getItem('token');
    if (!token) {
      loading.value = false;
      return;
    }

    try {
      const data = await authAPI.getMe();
      user.value = data.user;
    } catch (err) {
      removeToken();
      user.value = null;
    } finally {
      loading.value = false;
    }
  }

  async function register(name, email, password) {
    error.value = '';
    try {
      const data = await authAPI.register(name, email, password);
      setToken(data.token);
      user.value = data.user;
      return { success: true };
    } catch (err) {
      error.value = err.message;
      return { success: false, error: err.message };
    }
  }

  async function login(email, password) {
    error.value = '';
    try {
      const data = await authAPI.login(email, password);
      setToken(data.token);
      user.value = data.user;
      return { success: true };
    } catch (err) {
      error.value = err.message;
      return { success: false, error: err.message };
    }
  }

  function logout() {
    removeToken();
    user.value = null;
  }

  return {
    user,
    loading,
    error,
    isAuthenticated,
    checkAuth,
    register,
    login,
    logout
  };
}
