<template>

    <div class="admin-panel">
        <SidebarComponent />
        <div class="main-content">
            <AdminHeaderComponent>Admins and Staff
            </AdminHeaderComponent>
            <main class="content">
                <div class="users-container">
                    <button class="back-btn" @click="showCreateModal = true" v-if="userProfile.role === 'Admin' || userProfile.role === 'SubAdmin' ">Add New Staff</button>
                    <transition name="modal">
                        <CreateSettingModal v-if="showCreateModal" @close="showCreateModal = false"
                            @create-setting="handleCreateSetting" />
                    </transition>
                    <div class="filters">
                        <input v-model="searchQuery" placeholder="Search..." />
                        <select v-model="selectedStatus">
                            <option value="">Filter by Role</option>
                            <option value="Staff">Staff</option>
                            <option value="Admin">Admin</option>
                        </select>
                        <select v-model="selectedRead">
                            <option value="">Filter by Status</option>
                            <option value="1">Active</option>
                            <option value="0">Deactivated</option>
                        </select>
                    </div>

                    <table class="table-users">
                        <thead>
                            <tr>
                                <th>#</th>
                                <th></th>
                                <th>Name</th>
                                <th>Username</th>
                                <th>Email</th>
                                <th>Phone</th>
                                <th>Role</th>
                                <th>Status</th>
                                <th v-if="userProfile.role === 'Admin' || userProfile.role === 'SubAdmin'">Actions</th>
                            </tr>
                        </thead>
                        <tbody>
                            <tr v-for="(user, index) in filteredusers" :key="user.id"
                                :class="{ 'unread-user': !user.is_active }">
                                <td>{{ (currentPage - 1) * itemsPerPage + index + 1 }}</td>
                                <td><img :src="(user ? user.image : 'images/blank-profile-picture.png')"
                                        alt="Profile Image" style="height: 50px; width: 50px;"></td>
                                <td>{{ user.name }}</td>
                                <td>{{ user.username }}</td>
                                <td>{{ user.email }}</td>
                                <td>{{ user.phone }}</td>
                                <td>{{ user.role }}</td>
                                <td>{{ user.is_active ? 'Active' : 'Deactivated' }}</td>
                                <!-- For Admin Users -->
                                <td v-if="userProfile.role === 'Admin'">
                                    <!-- Show for Staff and SubAdmins, but not for Admins themselves -->
                                    <template v-if="user.role === 'Staff' || user.role === 'SubAdmin'">
                                        <a class="view-btn" @click="detailPage(user)">
                                            View
                                        </a>
                                        <button @click="toggleUserStatus(user)" class="read">
                                            {{ user.is_active ? 'Deactivate' : 'Activate' }}
                                        </button>
                                    </template>
                                </td>

                                <!-- For SubAdmin Users -->
                                <td v-if="userProfile.role === 'SubAdmin'">
                                    <!-- Show for Staff only, not for Admins or SubAdmins themselves -->
                                    <template v-if="user.role === 'Staff'">
                                        <a class="view-btn" @click="detailPage(user)">
                                            View
                                        </a>
                                        <button @click="toggleUserStatus(user)" class="read">
                                            {{ user.is_active ? 'Deactivate' : 'Activate' }}
                                        </button>
                                    </template>
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
    <CreateStaffModal v-if="showCreateModal" @close="showCreateModal = false" />
</template>

<script>
import SidebarComponent from '@/components/admin/sections/SidebarComponent.vue';
import AdminHeaderComponent from '@/components/admin/sections/AdminHeaderComponent.vue';
import CreateStaffModal from './modals/CreateStaffModal.vue';



export default {
    components: {
        SidebarComponent,
        AdminHeaderComponent,
        CreateStaffModal,


    },
    data() {
        return {
            searchQuery: '',
            selectedStatus: '',
            selectedRead: '',
            currentPage: 1,
            itemsPerPage: 10,
            showCreateModal: false,

        };
    },
    created() {
        this.$store.dispatch('fetchAdminStaffList');
        this.$store.dispatch('fetchUreadCommercialCount');
    },
    computed: {
        unreadCount() {
            return this.$store.state.countCommercialAppointments;
        },
        filteredusers() {
            const start = (this.currentPage - 1) * this.itemsPerPage;
            const end = start + this.itemsPerPage;

            const users = Array.isArray(this.adminStaffList) ? this.adminStaffList : [];
            const filtered = users.filter(user => {
                const matchesRole = this.selectedStatus ? user.role.includes(this.selectedStatus) : true;
                const matchesStatus = this.selectedRead ? (this.selectedRead === '1' ? user.is_active : !user.is_active) : true;
                const matchesSearchQuery = this.searchQuery ? (
                    user.id.toString().includes(this.searchQuery) ||
                    user.name.includes(this.searchQuery) ||
                    user.username.includes(this.searchQuery) ||
                    user.role.includes(this.searchQuery) ||
                    user.phone.includes(this.searchQuery) ||
                    user.email.includes(this.searchQuery)
                ) : true;

                return matchesRole && matchesStatus && matchesSearchQuery;
            });

            return filtered.slice(start, end);
        },
        adminStaffList() {
            return this.$store.state.adminStaffList;
        },
        totalPages() {
            const users = Array.isArray(this.adminStaffList) ? this.adminStaffList : [];
            const filtered = users.filter(user => {
                const matchesRole = this.selectedStatus ? user.role.includes(this.selectedStatus) : true;
                const matchesStatus = this.selectedRead ? (this.selectedRead === '1' ? user.is_active : !user.is_active) : true;
                const matchesSearchQuery = this.searchQuery ? (
                    user.id.toString().includes(this.searchQuery) ||
                    user.name.includes(this.searchQuery) ||
                    user.username.includes(this.searchQuery) ||
                    user.role.includes(this.searchQuery) ||
                    user.phone.includes(this.searchQuery) ||
                    user.email.includes(this.searchQuery)
                ) : true;

                return matchesRole && matchesStatus && matchesSearchQuery;
            });
            return Math.ceil(filtered.length / this.itemsPerPage);
        },

        userProfile() {
            const userProfile = this.$store.state.userProfile;
            return userProfile ? userProfile : 'Guest';
        },
    },
    methods: {
        setPage(pageNumber) {
            this.currentPage = pageNumber;
        },
        toggleUserStatus(user) {
            const action = user.is_active ? 'activated' : 'deactivated';
            this.$store.dispatch('toggleUserStatus', { user: user })
                .then(response => {
                    console.log(response.data.data);
                    console.log(`user marked as ${action}`);
                })
                .catch(error => {
                    console.error(error);
                });
        },
        detailPage(user) {
            const userId = user.id;
            console.log(userId);
            this.$router.push({ name: 'StaffProfile', params: { id: userId } });
        },
    },
};
</script>

<style scoped>
.table-users {
    width: 100%;
    border-collapse: collapse;
    margin-top: 10px;
}

.table-users thead {
    background-color: #f58634;
    color: #fff;
}

.table-users thead th {
    padding: 10px;
    text-align: left;
}

.table-users tbody td {
    padding: 10px;
    border-bottom: 1px solid #ddd;
}

.table-users img {
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

.unread-user {
    background-color: #f0f0f0;
    color: #ff0000;
}

.unread-user button {
    margin: 0 5px;
    padding: 5px 10px;
    background-color: #004d40;
    color: white;
    border: none;
    border-radius: 5px;
    cursor: pointer;
}

.unread-user button:hover {
    background-color: #00382e;
}

.read {
    background-color: #ff0000;
    color: #fff;
    border-radius: 5px;
    cursor: pointer;
    border: #ff0000 solid 2px;
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
    padding: 5px 5px 5px 5px;
    text-decoration: none;

}

.view-btn:hover {
    background-color: #e47521;
    border: #e47521 solid 2px;
}
</style>
