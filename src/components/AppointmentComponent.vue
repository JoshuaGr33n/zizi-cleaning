<template>
    <div class="appointment-page">
        <div class="logo-container">
            <router-link to="/"><img :src="logo" alt="Logo" class="login-logo"></router-link>
        </div>
        <div class="appointment">
            <h1>Book Your Cleaning Appointment</h1>
            <select v-model="selectedRequestType" @change="navigateToSelected">
                <option disabled value="">Please select one</option>
                <option value="CommercialCleaning">Commercial Cleaning</option>
                <option value="ResidentialCleaning">Residential Cleaning</option>
            </select>
        </div>
    </div>
</template>

<script>
import { LOGO } from '@/api/config';
export default {
    data() {
        return {
            selectedRequestType: '',
            logo: LOGO,
        };
    },
    methods: {
        navigateToSelected() {
            if (this.selectedRequestType) {
                this.$router.push({ name: this.selectedRequestType });
            }
        }
    }
};
</script>

<style>
.appointment-page {
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
.appointment {
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

 select {
  width: 100%;
  padding: 10px;
  border: 1px solid #ccc;
  border-radius: 4px;
  margin-top: 20px;
}
</style>
