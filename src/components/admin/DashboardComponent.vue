<template>
    <div class="admin-panel">
        <SidebarComponent />
        <div class="main-content">
            <AdminHeaderComponent>Dashboard</AdminHeaderComponent>
            <main class="content">
                <p>Welcome to your admin panel, {{ userProfile.first_name }}!</p>
            </main>
        </div>
    </div>
</template>

<script>
import SidebarComponent from '@/components/admin/sections/SidebarComponent.vue';
import AdminHeaderComponent from '@/components/admin/sections/AdminHeaderComponent.vue';
import axios from '@/api/axios';

export default {
    name: 'DashboardComponent',
    components: {
        SidebarComponent,
        AdminHeaderComponent,
    },
    data() {
        return {
            // Initialize user object to store fetched data
            user: {},
        };
    },
    mounted() {
        this.fetchDashboardData();
    },
    computed: {
        userProfile() {
            return this.$store.state.userProfile || {};
        },
    },
    methods: {
        async fetchDashboardData() {
            try {
                const response = await axios.get('/profile', {
                    headers: {
                        'Authorization': `Bearer ${localStorage.getItem('token')}`,
                    },
                });
                console.log('Dashboard data:', response.data);
                this.user = response.data.data;
            } catch (error) {
                console.error('Error fetching dashboard data:', error);
            }
        },

    }
};
</script>


<style scoped>
.admin-panel {
    display: flex;
    height: 100vh;
}

.main-content {
    flex-grow: 1;
    display: flex;
    flex-direction: column;
}

.content {
    padding: 1rem;
    overflow-y: auto;
}
</style>