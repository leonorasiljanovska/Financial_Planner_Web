<!--<template>-->
<!--  <div>-->
<!--    <h1>Welcome to Financial Planner</h1>-->
<!--  </div>-->
<!--</template>-->

<!--<script>-->
<!--export default {-->
<!--  name: "HomeView",-->
<!--};-->
<!--</script>-->
<template>
  <div class="home-container">
    <h1>Welcome to Financial Planner</h1>
    <p>
      Take control of your finances with our easy-to-use app! Track your income,
      manage expenses, and plan your budget effectively.
    </p>

    <section class="features">
      <h2>Features</h2>
      <ul>
        <li>📊 Visualize your expenses with interactive charts</li>
        <li>📝 Add, edit, and delete your income and expenses</li>
        <li>🔒 Secure user authentication and personalized data</li>
        <li>📅 Manage monthly budgets and savings goals</li>
        <li>💡 Simple and intuitive user interface built with Vue.js and Bootstrap</li>
      </ul>
    </section>

    <section class="call-to-action">
      <p>Create an account to start planning your financial future today!</p>
      <router-link to="/register" class="btn btn-primary">Register</router-link>
      <router-link to="/login" class="btn btn-secondary ml-2">Login</router-link>
    </section>
  </div>
</template>

<script>
export default {
  name: "HomeView",
};
</script>

<style scoped>
.home-container {
  max-width: 600px;
  margin: 2rem auto;
  text-align: center;
  font-family: Arial, sans-serif;
}

.features {
  text-align: left;
  margin-top: 2rem;
}

.features ul {
  list-style-type: none;
  padding: 0;
}

.features li {
  margin: 0.5rem 0;
  font-size: 1.1rem;
}

.call-to-action {
  margin-top: 3rem;
}

.btn {
  padding: 0.6rem 1.5rem;
  font-size: 1rem;
  cursor: pointer;
  border-radius: 5px;
  text-decoration: none;
  color: white;
}

.btn-primary {
  background-color: #007bff;
}

.btn-secondary {
  background-color: #6c757d;
  margin-left: 10px;
}

.btn:hover {
  opacity: 0.85;
}
</style>
