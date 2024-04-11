<template>
    <div class="confirmation-container" style="text-align: center; padding-top: 2rem;">
        <div class="logo-container">
            <router-link to="/"><img :src="logo" alt="Logo" class="logo"></router-link>
        </div>
        <h1>Submission Successful!</h1>
        <p>Thank you {{ appointmentDetails.first_name }}. Your submission was successful. We have received your request
            and it will be treated accordingly. <br> Check your mail: <strong>{{ appointmentDetails.email }}</strong>
            for confirmation of your request.</p>

        <div class="btn-container">
          <button class="view-btn" @click="viewDetails">View Details</button>
        </div>

        <p> If you need any assistance concerning your request, reach us on
            <span v-for="(mail, index) in requestSupportEmail" :key="mail.id">
                {{ mail.value }}
                <span v-if="index < requestSupportEmail.length - 1"> or </span>
            </span>

            with your reference number <strong>{{ appointmentDetails.reference_number }}</strong>
        </p>
        <div class="btn-container">
            <router-link to="/"><button class="home-btn">Go Back Home</button></router-link>
        </div>

        <div class="btn-container">
            OR
            <router-link to="/book-appointment"><button class="back-btn">Book Another Appointment</button></router-link>
        </div>
    </div>
</template>

<script>
import { LOGO } from '@/api/config';
export default {

    created() {
        this.$store.dispatch('fetchRequestSupportEmail');
    },
    computed: {
        requestSupportEmail() {
            return this.$store.state.requestSupportEmail;
        },
    },
    props: {
        email: String,
    },
    data() {
        return {
            logo: LOGO,
            appointmentDetails: '',
        };
    },
    methods: {
        getAppointment(appointmentId) {
            this.$store.dispatch('fetchAppointmentDetails', appointmentId)
                .then(response => {
                    this.appointmentDetails = response.data.data;
                })
                .catch(error => {
                    console.error('Failed to fetch appointment details:', error);
                    this.$router.push({ name: 'Home' }); // Redirect back
                });
        },
        viewDetails() {
            if(this.appointmentDetails.flag == 'residential'){
                this.$router.push({ name: 'ResidentialAppointmentView'});
            }else{
                this.$router.push({ name: 'CommercialAppointmentView' });
            }
        },
    },
    beforeMount() {
        const appointmentId = this.$route.params.id;
        if (appointmentId) {
            this.getAppointment(appointmentId);
        } else {
            this.$router.push({ name: 'Home' }); // Redirect if no ID is provided
        }
    },


};
</script>

<style scoped>
.logo {
    width: 150px;
    height: auto;
    margin-bottom: 2rem;
}

.back-btn {
    width: 100%;
    padding: 10px;
    margin-top: 20px;
    background-color: #004d40;
    border: none;
    border-radius: 4px;
    color: white;
    cursor: pointer;

}

.back-btn:hover {
    background-color: #00382e;
}

.home-btn {
    width: 70%;
    padding: 10px;
    margin-top: 20px;
    background-color: #f58634;
    border: none;
    border-radius: 4px;
    color: white;
    cursor: pointer;

}

.home-btn:hover {
    background-color: #bd560c;
}

.btn-container {
    /* display: flex; */
    max-width: 20%;
    margin: auto;
    padding: 5px;
}

.view-btn {
    width: 70%;
    padding: 10px;
    margin-top: 20px;
    background-color: #000080;
    border: none;
    border-radius: 4px;
    color: white;
    cursor: pointer;

}

.view-btn:hover {
    background-color: #4242dd;
}
</style>
