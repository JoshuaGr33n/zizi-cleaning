<template>
  <div class="login-page">
    <div class="logo-container">
      <router-link to="/"><img :src="logo" alt="Logo" class="login-logo"></router-link>
    </div>
    <div class="login-container">
      <h2>Login</h2>
      <!-- Display error message if it exists -->
      <p v-if="errorMessage" class="error-message">{{ errorMessage }}</p>
      <form @submit.prevent="login">
        <div class="form-group">
          <label for="email">Email:</label>
          <input type="email" id="email" v-model="credentials.email" required>
        </div>
        <div class="form-group">
          <label for="password">Password:</label>
          <input type="password" id="password" v-model="credentials.password" required>
        </div>
        <button type="submit" class="login-btn">Login</button>
      </form>
      <div class="links-container">
         <!-- Back button -->
         <router-link to="/" class="back-btn">Back</router-link>
        <router-link to="/forgot-password" class="link-btn">Forgot Password</router-link>
       
      </div>
    </div>
  </div>
</template>

<script>
import axios from '@/api/axios';
import { LOGO } from '@/api/config';

export default {
  name: 'LoginComponent',
  data() {
    return {
      credentials: {
        email: '',
        password: '',
      },
      errorMessage: '', // To hold error messages
      logo: LOGO,
    };
  },
  created() {
    if (localStorage.getItem('token')) {
      this.$router.push({ name: 'Dashboard' });
      // this.$store.dispatch('checkUserActiveStatus', { router: this.$router });
    }
  },
  methods: {
    async login() {
      this.errorMessage = '';
      try {
        const response = await axios.post('login', this.credentials);
        console.log('Login successful:', response.data);

        localStorage.setItem('token', response.data.token);
        localStorage.setItem('role', response.data.role); 


        this.$router.push({ name: 'Dashboard' });

      } catch (error) {
        // Assign a user-friendly error message
        this.errorMessage = error.response && error.response.data && error.response.data.error_message
          ? error.response.data.error_message
          : 'Login failed. Please try again.';
      }
    },
    goBack() {
      this.$router.go(-1);
    },
  },
};
</script>

<style scoped>
.login-page {
  text-align: center;
  padding-top: 2rem;
}

.logo-container {
  margin-bottom: 1rem;
}

.login-logo {
  width: 150px;
  height: auto;
  margin-bottom: 2rem;
}

.login-container {
  max-width: 400px;
  margin: auto;
  padding: 20px;
  box-shadow: 0 4px 8px rgba(0, 0, 0, 0.1);
  border-radius: 5px;
  background-color: #ffffff;
  display: inline-block;
  text-align: left;
}

.form-group {
  margin-bottom: 20px;
}

.form-group input {
  width: 100%;
  padding: 10px;
  border: 1px solid #ccc;
  border-radius: 4px;
}

button[type="submit"]{
  background-color: #f58634;
  color: white;
  padding: 10px 20px;
  border: none;
  border-radius: 4px;
  cursor: pointer;
  display: block;
  width: 100%;
  margin-top: 1rem;
  text-decoration: none;
}

button[type="submit"]:hover,
.back-btn:hover {
  opacity: 0.9;
}

.error-message {
  color: red;
  margin-bottom: 1rem;
}

.links-container{
  margin-top: 10px;
}

.link-btn {
  background-color: #23068b;
  color: #fff;
  border-radius: 5px;
  cursor: pointer;
  border: #23068b solid 2px;
  padding: 5px 10px 5px 5px;
  text-decoration: none;
  margin-left:100px

}

.link-btn:hover {
  background-color: #0b022c;
  border: #0b022c solid 2px;
}

.back-btn {
  background-color: #777;
  color: #fff;
  border-radius: 5px;
  cursor: pointer;
  border: #777 solid 2px;
  padding: 5px 10px 5px 5px;
  text-decoration: none;
 

}

.back-btn:hover {
  background-color: #4a4747;
  border: #4a4747 solid 2px;
}
</style>
