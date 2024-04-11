<template>
    <div class="admin-panel">
        <SidebarComponent />
        <div class="main-content">
            <AdminHeaderComponent>Appointments({{ unreadCommercialAppointmentsCount + unreadResidentialAppointmentsCount}})</AdminHeaderComponent>
            <main class="content">
                <div class="appointment-type-selector">
                    <select v-model="selectedAppointmentType" @change="onAppointmentTypeChange">
                        <option value="">Select Appointment Type</option>
                        <option value="commercial">Commercial</option>
                        <option value="residential">Residential</option>
                    </select>
                </div>
            </main>
        </div>
    </div>
</template>

<script>
import SidebarComponent from '@/components/admin/sections/SidebarComponent.vue';
import AdminHeaderComponent from '@/components/admin/sections/AdminHeaderComponent.vue';
export default {
    components: {
        SidebarComponent,
        AdminHeaderComponent,


    },
    data() {
        return {
            selectedAppointmentType: '',
        };
    },
    created() {
        this.$store.dispatch('fetchUreadResidentialCount');
        this.$store.dispatch('fetchUreadCommercialCount');
    },
    computed: {
        unreadCommercialAppointmentsCount() {
            return this.$store.state.countCommercialAppointments;
        },
        unreadResidentialAppointmentsCount() {
            return this.$store.state.countResidentialAppointments;
        },
    },
    methods: {
        onAppointmentTypeChange() {
            if (this.selectedAppointmentType === 'commercial') {
                this.$router.push({ name: 'CommercialAppointments' });
            } else if (this.selectedAppointmentType === 'residential') {
                this.$router.push({ name: 'ResidentialAppointments' });
            }
        },
    },
};
</script>


<style scoped>
.content {
    text-align: center;
    padding-top: 2rem;
}

.appointment-type-selector {
    max-width: 700px;
    margin: auto;
    padding: 20px;
    box-shadow: 0 4px 8px rgba(0, 0, 0, 0.1);
    border-radius: 5px;
    /* background-color: #ffffff; */

    text-align: left;
}

.form-group {
    margin-bottom: 20px;
}

select {
    width: 100%;
    height: 40px;
    padding: 10px;
    border: 1px solid #ccc;
    border-radius: 4px;
    margin-top: 20px;
}
</style>
