// RegisterView.vue
<template>
  <div class="auth-container">
    <RegisterForm />
    <router-link to="/login" class="link">Already have an account? Login</router-link>
  </div>
</template>

<script>
import RegisterForm from '@/components/RegisterForm.vue';
export default {
  components: { RegisterForm }
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