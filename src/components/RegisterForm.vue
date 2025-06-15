<template>
  <form class="auth-form" @submit.prevent="register">
    <h2>Register</h2>
    <input v-model="username" placeholder="Username" required />
    <input v-model="password" type="password" placeholder="Password" required />
    <button type="submit">Register</button>
  </form>
</template>

<script>
export default {
  data() {
    return { username: '', password: '' };
  },
  methods: {
    register() {
      const users = JSON.parse(localStorage.getItem('users') || '[]');
      if (users.find(u => u.username === this.username)) {
        alert('Username already taken');
        return;
      }
      users.push({ username: this.username, password: this.password });
      localStorage.setItem('users', JSON.stringify(users));
      this.$router.push('/login');
    }
  }
};
</script>

<style scoped>
.auth-form {
  max-width: 400px;
  margin: 50px auto;
  padding: 30px;
  border-radius: 12px;
  background: #f9f9f9;
  box-shadow: 0 4px 15px rgba(0, 0, 0, 0.1);
  text-align: left;
}

.auth-form h2 {
  text-align: center;
  margin-bottom: 20px;
  color: #2c3e50;
}

.auth-form input {
  width: 100%;
  padding: 12px;
  margin: 10px 0;
  border: 1px solid #ccc;
  border-radius: 6px;
  font-size: 16px;
}

.auth-form button {
  width: 100%;
  padding: 12px;
  margin-top: 15px;
  background-color: #3498db;
  border: none;
  border-radius: 6px;
  color: white;
  font-size: 16px;
  cursor: pointer;
  transition: background-color 0.2s ease;
}

.auth-form button:hover {
  background-color: #2b80b9;
}
</style>
