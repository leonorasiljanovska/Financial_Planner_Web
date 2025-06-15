<template>
  <div class="auth-container">
    <LoginForm />
    <router-link to="/register" class="link">Don't have an account? Register</router-link>
  </div>
</template>

<script>
import LoginForm from '@/components/LoginForm.vue';
export default {
  components: { LoginForm }
};
</script>

<style scoped>
.auth-container {
  max-width: 400px;
  margin: 100px auto;
  padding: 40px;
  background-color: #ffffff;
  border-radius: 12px;
  box-shadow: 0 4px 20px rgba(0,0,0,0.1);
  text-align: center;
  font-family: 'Segoe UI', sans-serif;
}
.link {
  display: block;
  margin-top: 20px;
  color: #3498db;
  font-size: 14px;
  text-decoration: none;
}
.link:hover {
  text-decoration: underline;
}
</style>
