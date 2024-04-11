<template>
    <div class="admin-panel">
        <SidebarComponent />
        <div class="main-content">
            <AdminHeaderComponent>My Profile</AdminHeaderComponent>
            <main class="content">
                <table class="user-profile-table">
                    <tbody>
                        <tr>
                            <th></th>
                            <td>
                                <img :src="storageBaseUrl + (userProfile ? userProfile.image : 'images/blank-profile-picture.png')"
                                    alt="Profile Image" style="height: auto; width: 300px;">
                            </td>
                        </tr>
                        <tr>
                            <th>First Name</th>
                            <td>{{ userProfile ? userProfile.first_name : '' }}</td>
                        </tr>
                        <tr>
                            <th>Middle Name</th>
                            <td>{{ displayUser.middle_name }}</td>
                        </tr>
                        <tr>
                            <th>Last Name</th>
                            <td>{{ displayUser.last_name }}</td>
                        </tr>
                        <tr>
                            <th>Gender</th>
                            <td>{{ displayUser.gender }}</td>
                        </tr>
                        <tr>
                            <th>Username</th>
                            <td>{{ displayUser.username }}</td>
                        </tr>
                        <tr>
                            <th>Email</th>
                            <td>{{ displayUser.email }}</td>
                        </tr>
                        <tr>
                            <th>Phone</th>
                            <td>{{ displayUser.phone }}</td>
                        </tr>
                        <tr>
                            <th>Role</th>
                            <td>{{ displayUser.role }}</td>
                        </tr>
                    </tbody>
                </table>
                <button @click="editProfile" class="edit-profile-btn">Edit Profile</button>
            </main>
        </div>
    </div>
</template>

<script>
import SidebarComponent from '@/components/admin/sections/SidebarComponent.vue';
import AdminHeaderComponent from '@/components/admin/sections/AdminHeaderComponent.vue';
import { STORAGE_BASE_URL } from '@/api/config';

export default {
    name: 'ProfileComponent',
    components: {
        SidebarComponent,
        AdminHeaderComponent,
    },
    data() {
        return {
            storageBaseUrl: STORAGE_BASE_URL,
        };
    },
    computed: {
        userProfile() {
            return this.$store.state.userProfile;
        },
        displayUser() {
            if (this.userProfile) {
                return this.userProfile;
            }
            return '';
        },
    },
    created() {
        if (!this.userProfile) {
            this.$store.dispatch('fetchUserProfile');
        }
    },
    methods: {
        editProfile() {
            // Navigate to the edit profile page
            this.$router.push({ name: 'EditProfile' });
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

.user-profile-table {
    margin: auto;
    width: 75%;
    border-collapse: collapse;
}

.user-profile-table th,
.user-profile-table td {
    text-align: left;
    padding: 8px;
    border-bottom: 1px solid #ddd;
}

.user-profile-table th {
    background-color: #f58634;
    color: white;
}

.edit-profile-btn {
    background-color: #004d40;
    color: white;
    border: none;
    padding: 10px 20px;
    margin-top: 20px;
    cursor: pointer;
    border-radius: 4px;
}

.edit-profile-btn:hover {
    background-color: #00382e;
}
</style>