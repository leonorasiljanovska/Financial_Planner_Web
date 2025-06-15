<template>
  <div id="app">
    <nav>
      <template v-for="(link, index) in filteredLinks" :key="link.text">
        <router-link v-if="link.route" :to="link.route">{{ link.text }}</router-link>
        <a v-else @click.prevent="logout">{{ link.text }}</a>
        <span v-if="index < filteredLinks.length - 1"> | </span>
      </template>
    </nav>
    <router-view />
  </div>
</template>

<script>
export default {
  data() {
    return {
      loggedInUser: localStorage.getItem('loggedInUser')
    };
  },
  computed: {
    isLoggedIn() {
      return !!this.loggedInUser;
    },
    filteredLinks() {
      const links = [
        {text: 'Home', route: '/'},
        {text: 'About', route: '/about'},
        {text: 'Login', route: '/login', show: !this.isLoggedIn},
        {text: 'Register', route: '/register', show: !this.isLoggedIn},
        {text: 'Expenses', route: '/expenses', show: this.isLoggedIn},
        {text: 'Dashboard', route: '/dashboard', show: this.isLoggedIn},
        {text: 'Logout', route: null, show: this.isLoggedIn}
      ];

      return links.filter(link => link.show === undefined || link.show);
    }
  },
  methods: {
    logout() {
      localStorage.removeItem('loggedInUser');
      this.loggedInUser = null; // update reactive property
      this.$router.push('/login');
    }
  },
  created() {
    // Optional: listen to storage changes from other tabs/windows
    window.addEventListener('storage', e => {
      if (e.key === 'loggedInUser') {
        this.loggedInUser = e.newValue;
      }
    });
  }
};
</script>


<style lang="scss">
#app {
  font-family: Avenir, Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
}

nav {
  padding: 30px;

  a, .router-link-active {
    font-weight: bold;
    color: #2c3e50;
    text-decoration: none;


    &.router-link-exact-active {
      color: #42b983;
    }
  }

  span {
    margin: 0 8px;
    color: #ccc;
  }
}
</style>
