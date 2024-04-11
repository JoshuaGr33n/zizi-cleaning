<template>

    <div class="admin-panel">
        <SidebarComponent />
        <div class="main-content">
            <AdminHeaderComponent>Commercial Appointments({{ unreadCount }})</AdminHeaderComponent>
            <main class="content">
                <div class="appointments-container">
                    <router-link to="/select-appointment-type"><button class="back-btn">Back</button></router-link>
                    <div class="filters">
                        <input v-model="searchQuery" placeholder="Search..." />
                        <select v-model="selectedStatus">
                            <option value="">Filter by Status</option>
                            <option value="Pending">Pending</option>
                            <option value="Complete">Complete</option>
                            <option value="Canceled">Canceled</option>
                        </select>
                        <select v-model="selectedRead">
                            <option value="">Filter by Read</option>
                            <option value="1">Read</option>
                            <option value="0">Unread</option>
                        </select>
                    </div>

                    <table class="table-appointments">
                        <thead>
                            <tr>
                                <th>#</th>
                                <th>Reference No.</th>
                                <th>Client</th>
                                <th>Email</th>
                                <th>Phone</th>
                                <th>Primary Date</th>
                                <th>Status</th>
                                <th>Actions</th>
                            </tr>
                        </thead>
                        <tbody>
                            <tr v-for="(appointment, index) in filteredAppointments" :key="appointment.id"
                                :class="{ 'unread-appointment': !appointment.read }">
                                <td>{{ (currentPage - 1) * itemsPerPage + index + 1 }}</td>
                                <td>{{ appointment.reference_number }}</td>
                                <td>{{ appointment.client }}</td>
                                <td>{{ appointment.email }}</td>
                                <td>{{ appointment.phone }}</td>
                                <td>{{ appointment.availability.primary_date }}</td>
                                <td>{{ appointment.status }}</td>
                                <td>
                                    <!-- <button @click="markAsRead(appointment)">Mark as Viewed</button> -->
                                    <button @click="toggleReadStatus(appointment)" class="read">
                                        {{ appointment.read ? 'Mark as Unread' : 'Mark as Read' }}
                                    </button>
                                    <a class="view-btn" @click="detailPage(appointment)">
                                        View
                                    </a>
                                </td>
                            </tr>
                        </tbody>
                    </table>
                    <div class="pagination-controls">
                        <button v-for="page in totalPages" :key="page" @click="setPage(page)">
                            {{ page }}
                        </button>
                    </div>
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
            searchQuery: '',
            selectedStatus: '',
            selectedRead: '',
            currentPage: 1,
            itemsPerPage: 10,
           
        };
    },
    created() {
        this.$store.dispatch('fetchCommercialAppointments');
        this.$store.dispatch('fetchUreadCommercialCount');
    },
    computed: {
        unreadCount() {
            return this.$store.state.countCommercialAppointments;
        },
        filteredAppointments() {
            const start = (this.currentPage - 1) * this.itemsPerPage;
            const end = start + this.itemsPerPage;

            const appointments = Array.isArray(this.appointments) ? this.appointments : [];
            const filtered = appointments.filter(appointment => {
                const matchesStatus = this.selectedStatus ? appointment.status.includes(this.selectedStatus) : true;
                const matchesReadStatus = this.selectedRead ? (this.selectedRead === '1' ? appointment.read : !appointment.read) : true;
                const matchesSearchQuery = this.searchQuery ? (
                    appointment.id.toString().includes(this.searchQuery) ||
                    appointment.reference_number.includes(this.searchQuery) ||
                    appointment.availability.primary_date.includes(this.searchQuery) ||
                    appointment.client.includes(this.searchQuery) ||
                    appointment.phone.includes(this.searchQuery) ||
                    appointment.email.includes(this.searchQuery)
                ) : true;

                return matchesStatus && matchesReadStatus && matchesSearchQuery;
            });

            return filtered.slice(start, end);
        },
        appointments() {
            return this.$store.state.commercialAppointments;
        },
        totalPages() {
            const appointments = Array.isArray(this.appointments) ? this.appointments : [];
            const filtered = appointments.filter(appointment => {
                const matchesStatus = this.selectedStatus ? appointment.status.includes(this.selectedStatus) : true;
                const matchesReadStatus = this.selectedRead ? (this.selectedRead === '1' ? appointment.read : !appointment.read) : true;
                const matchesSearchQuery = this.searchQuery ? (
                    appointment.id.toString().includes(this.searchQuery) ||
                    appointment.reference_number.includes(this.searchQuery) ||
                    appointment.created_at.includes(this.searchQuery) ||
                    appointment.client.includes(this.searchQuery) ||
                    appointment.phone.includes(this.searchQuery) ||
                    appointment.email.includes(this.searchQuery)
                ) : true;

                return matchesStatus && matchesReadStatus && matchesSearchQuery;
            });
            return Math.ceil(filtered.length / this.itemsPerPage);
        },
    },
    methods: {
        setPage(pageNumber) {
            this.currentPage = pageNumber;
        },
        toggleReadStatus(appointment) {
            const action = appointment.read ? 'read' : 'unread';
            this.$store.dispatch('toggleRead', {tag: 'outside', appointment: appointment})
                .then(response => {
                    console.log(response);
                    console.log(`Appointment marked as ${action}`);
                })
                .catch(error => {
                    console.error(error);
                });
        },
        detailPage(appointment) {
            const appointmentId = appointment.id;
            console.log(appointmentId);
            this.$router.push({ name: 'CommercialAppointmentDetail', params: { id: appointmentId } });
        },
    },
};
</script>

<style scoped>
.table-appointments {
    width: 100%;
    border-collapse: collapse;
    margin-top: 10px;
}

.table-appointments thead {
    background-color: #f58634;
    color: #fff;
}

.table-appointments thead th {
    padding: 10px;
    text-align: left;
}

.table-appointments tbody td {
    padding: 10px;
    border-bottom: 1px solid #ddd;
}

.table-appointments img {
    width: 50px;
    height: auto;
}

input,
select {
    width: 30%;
    height: 40px;
    padding: 10px;
    border: 1px solid #ccc;
    border-radius: 4px;
    margin-top: 20px;
    margin-right: 20px;
}

.pagination-controls {
    display: flex;
    justify-content: center;
    margin-top: 20px;
}

.pagination-controls button {
    margin: 0 5px;
    padding: 5px 10px;
    background-color: #f58634;
    color: white;
    border: none;
    border-radius: 5px;
    cursor: pointer;
}

.pagination-controls button:hover {
    background-color: #e47521;
}

.unread-appointment {
    background-color: #f0f0f0;
    color: #e47521;
}

.unread-appointment button {
    margin: 0 5px;
    padding: 5px 10px;
    background-color: #004d40;
    color: white;
    border: none;
    border-radius: 5px;
    cursor: pointer;
}

.unread-appointment button:hover {
    background-color: #00382e;
}

.read {
    background-color: #f0f0f0;
    color: #e47521;
    border-radius: 5px;
    cursor: pointer;
    border: #e6eae9 solid 2px;
}

.back-btn {
    background-color: #004d40;
    color: white;
    padding: 10px 20px;
    margin-top: 20px;
    border: none;
    cursor: pointer;
    border-radius: 5px;
}

.back-btn:hover {
    background-color: #00382e;
}

.view-btn {
    background-color: #f58634;
    color: #fff;
    border-radius: 5px;
    cursor: pointer;
    border: #f58634 solid 2px;
    margin: 0 5px;
    padding: 5px 10px 5px 5px;
    text-decoration: none;

}

.view-btn:hover {
    background-color: #e47521;
    border: #e47521 solid 2px;
}
</style>
