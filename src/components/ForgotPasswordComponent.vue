<template>
    <div class="login-page">
        <div class="logo-container">
            <router-link to="/"><img :src="logo" alt="Logo" class="login-logo"></router-link>
        </div>
        <div class="login-container">
            <h2>Forgot Password</h2>
            <form @submit.prevent="submitEmail">
                <div class="form-group">
                    <label for="email">Email:</label>
                    <input id="email" v-model="email" type="email" required>
                </div>
                <button type="submit">Send Reset Link</button>
            </form>
            <div class="links-container">
                <router-link to="/login"><button class="back-btn">Back</button></router-link>
            </div>
        </div>
    </div>
</template>

<script>
import axios from '@/api/axios';
import { LOGO } from '@/api/config';

export default {
    data() {
        return {
            email: '',
            logo: LOGO,
        };
    },
    created() {
        if (localStorage.getItem('token')) {
            // this.$router.push({ name: 'Dashboard' });
            localStorage.removeItem('token');
        }
    },
    methods: {
        submitEmail() {
            axios.post('/forgot-password', { email: this.email })
                .then(response => {
                    this.email = '';
                    alert(response.data.message); // Notify user
                })
                .catch(error => {

                    if (error.response.data.email) {
                        alert('If your email address is in our system, you will receive a password reset link');
                    } else {
                        console.error(error.response.data);
                        alert(error.response.data.message); // Show error
                    }
                });
        }
    }
}
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

button[type="submit"] {
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

.links-container {
    margin-top: 10px;
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
