<template>
    <div class="login-page">
        <div class="logo-container">
            <router-link to="/"><img :src="logo" alt="Logo" class="login-logo"></router-link>
        </div>
        <div class="login-container">
            <h2>Reset Password</h2>
            <p v-if="successMessage" class="success-message">{{ successMessage }}</p>
            <form @submit.prevent="resetPassword">
                <div class="form-group"><input v-model="email" type="email" placeholder="Email" required></div>
                <div class="form-group"><input v-model="password" type="password" placeholder="New Password" required>
                </div>
                <div class="form-group"><input v-model="password_confirmation" type="password"
                        placeholder="Confirm Password" required></div>
                <input v-model="tokenFromUrl" type="hidden">
                <button type="submit">Reset Password</button>
                <p v-if="errors['password']" class="error-message">{{ errors['password'][0] }}</p>
                <p v-if="errors['email']" class="error-message">{{ errors['email'][0] }}</p>
                <p v-if="errors['password_confirmation']" class="error-message">{{ errors['password_confirmation'][0] }}
                </p>

                <p v-if="s_error" class="error-message">{{ s_error }}</p>
            </form>
        </div>
    </div>
</template>

<script>
import axios from '@/api/axios';
import { LOGO } from '@/api/config';
export default {
    data() {
        return {
            logo: LOGO,
            email: '',
            password: '',
            password_confirmation: '',
            token: '',
            successMessage: '',
            errors: {},
            s_error: '',
        };
    },
    computed: {
        tokenFromUrl() {
            return this.$route.query.token;
        },
    },
    created() {
        if (localStorage.getItem('token')) {
            localStorage.removeItem('token');
        }
    },
    methods: {
        resetPassword() {
            this.errors = {};
            axios.post('/reset-password', {
                email: this.email,
                password: this.password,
                password_confirmation: this.password_confirmation,
                token: this.tokenFromUrl,
            })
                .then(response => {
                    console.log(response);
                    this.successMessage = "Password reset successful!";
                    this.errors = {};
                    this.email = '';
                    this.password = '';
                    this.password_confirmation = '';
                    setTimeout(() => {
                        this.$router.push({ name: 'Login' });
                    }, 3000);
                })
                .catch(error => {
                    if (error.response && error.response.status === 422) {
                        if (error.response.data.email) {
                            this.errors = {};
                            this.s_error = 'Error: If your email address is in our system, you will receive a password reset link or the password reset request could not be processed. Please request a new password reset.';
                            console.error("Error:", error.response.data.email);
                        } else {
                            this.s_error = '';
                            this.errors = error.response.data.errors; // Return validation errors to the caller
                        }

                    } else {
                        console.error(error);
                        console.error("Error:", error);
                    }

                });

        },
    },
    beforeMount() {
        const TOKEN = this.$route.query.token;
        if (!TOKEN) {
            this.$router.push({ name: 'Home' }); // Redirect if no Token is provided
        }
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
</style>
