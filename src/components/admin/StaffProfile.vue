<template>
    <div class="admin-panel">
        <SidebarComponent />
        <div class="main-content">
            <AdminHeaderComponent>{{ staffProfile ? staffProfile.first_name : '' }} {{ staffProfile.last_name }}</AdminHeaderComponent>
            <main class="content">
                <button @click="goBack" class="back-btn">Back</button>
                <table class="user-profile-table">
                    <tbody>
                        <tr>
                            <th></th>
                            <td>
                                <img :src="(staffProfile ? staffProfile.image : 'images/blank-profile-picture.png')"
                                    alt="Profile Image" style="height: auto; width: 300px;">
                            </td>
                        </tr>
                        <tr>
                            <th>First Name</th>
                            <td>{{ staffProfile ? staffProfile.first_name : '' }}</td>
                        </tr>
                        <tr>
                            <th>Middle Name</th>
                            <td>{{ staffProfile.middle_name }}</td>
                        </tr>
                        <tr>
                            <th>Last Name</th>
                            <td>{{ staffProfile.last_name }}</td>
                        </tr>
                        <tr>
                            <th>Gender</th>
                            <td>{{ staffProfile.gender }}</td>
                        </tr>
                        <tr>
                            <th>Username</th>
                            <td>{{ staffProfile.username }}</td>
                        </tr>
                        <tr>
                            <th>Email</th>
                            <td>{{ staffProfile.email }}</td>
                        </tr>
                        <tr>
                            <th>Phone</th>
                            <td>{{ staffProfile.phone }}</td>
                        </tr>
                        <tr>
                            <th>Role</th>
                            <td>{{ staffProfile.role }}</td>
                        </tr>
                        <tr>
                            <th>Status</th>
                            <td :class="{ 'unread-user': !staffProfile.is_active }">{{ staffProfile.is_active ? 'Active'
                    : 'Deactivated' }}</td>
                        </tr>
                        <tr v-if="userProfile.role === 'Admin'">
                            <th>Update Role</th>
                            <td>
                                <div class="form-container">
                                    <div class="filters">
                                        <select v-model="selectedRole" @change="updateUserRole(staffProfile)">
                                            <option selected>{{ staffProfile.role }}</option>
                                            <option value="Staff">Staff</option>
                                            <option value="SubAdmin">SubAdmin</option>
                                        </select>
                                    </div>
                                </div>

                            </td>
                        </tr>
                    </tbody>
                </table>
                <div class="deactivate-btn-container" :class="{ 'unread-user': !staffProfile.is_active }">
                    <button @click="toggleUserStatus(staffProfile)" class="read">
                        {{ staffProfile.is_active ? 'Deactivate' : 'Activate' }}
                    </button>
                </div>

                <div class="delete-btn-container">
                    <button @click="confirmDeletion" class="delete-btn">Delete Staff</button>
                </div>

            </main>
        </div>
    </div>
</template>

<script>
import SidebarComponent from '@/components/admin/sections/SidebarComponent.vue';
import AdminHeaderComponent from '@/components/admin/sections/AdminHeaderComponent.vue';
import { STORAGE_BASE_URL } from '@/api/config';
import Swal from 'sweetalert2';

export default {
    name: 'StaffProfile',
    components: {
        SidebarComponent,
        AdminHeaderComponent,
    },
    data() {
        return {
            storageBaseUrl: STORAGE_BASE_URL,
            selectedRole: '',


        };
    },
    computed: {
        userProfile() {
            return this.$store.state.userProfile || {};
        },

        staffProfile() {
            return this.$store.state.staffProfile || {};
        },
    },
    created() {
        // const staffId = this.$route.params.id;
        // if (staffId) {
        //     this.$store.dispatch('fetchStaffProfile', staffId);
        // }
        this.getStaff();
    },
    watch: {
        // '$route.params.id'(newId) {
        //     this.$store.dispatch('fetchStaffProfile', newId);
        // }

        '$route.params.id'() {
            this.getStaff();
        }
    },
    methods: {
        getStaff() {
            const staffId = this.$route.params.id;
            if (staffId) {
                this.$store.dispatch('fetchStaffProfile', staffId).catch(error => {
                    console.error('Failed to fetch staff profile:', error);
                    this.$router.push({ name: 'Dashboard' });
                    if (error.message === 'redirectToDashboard') {
                        // Specific signal to redirect to dashboard
                        this.$router.push({ name: 'Dashboard' });
                    }
                    if (error.message === 'restrictedAccess') {
                        // SubAdmin trying to access another SubAdmin's profile or their own
                        this.$router.push({ name: 'Dashboard' });
                    }
                });
            } else {
                this.$router.push({ name: 'Dashboard' });
            }
        },

        toggleUserStatus(user) {
            const action = user.is_active ? 'deactivating' : 'activating';
            this.$store.dispatch('toggleUserStatusInside', { user: user })
                .then(() => {
                    console.log(`User successfully ${action}.`);
                })
                .catch(error => {
                    console.error(error);
                });
        },
        updateUserRole(user) {
          
            this.$store.dispatch('updateUserRole', { user: user, role: this.selectedRole })
                .then(() => {
                    console.log(`User successfully ${this.selectedRole}.`);
                })
                .catch(error => {
                    console.error(error);
                });
        },
        goBack() {
            this.$router.go(-1);
        },

        confirmDeletion() {
            this.$swal({
                title: 'Are you sure?',
                text: 'You are about to remove this staff permanently!',
                icon: 'warning',
                showCancelButton: true,
                confirmButtonColor: '#3085d6',
                cancelButtonColor: '#d33',
                confirmButtonText: 'Yes, remove staff permanently!',
                cancelButtonText: 'No'
            }).then((result) => {
                if (result.isConfirmed) {
                    this.$swal(
                        'Deleted!',
                        'Staff Account Delected Permanently.',
                        'success'
                    );
                    this.deleteStaff();
                } else if (result.dismiss === Swal.DismissReason.cancel) {
                    this.$swal(
                        'Cancelled',
                        'Cancelled',
                        'error'
                    );
                }
            });
        },
        deleteStaff() {
            this.$store.dispatch('deleteStaff', this.staffProfile.id)
                .then(() => {
                    // Display a success message
                    this.$swal(
                        'Deleted!',
                        'Deleted!',
                        'success'
                    ).then(() => {
                        // Redirect to the admin-staff page
                        this.$router.push({ name: 'AdminStaffList' });
                    });
                })
                .catch(error => {
                    console.error("Error deleting staff:", error);
                    this.$swal(
                        'Failed!',
                        'There was a problem deleting this staff. Please try again.',
                        'error'
                    );
                });
        }
        ,


    },
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
    margin: 0 5px;
    padding: 5px 10px;
    border: none;
    cursor: pointer;
    border-radius: 5px;
}

.back-btn:hover {
    background-color: #00382e;
}

.deactivate-btn-container {
    margin: 80px 100px 20px 400px;
    width: 75%;
    justify-self: center;
}

.delete-btn {

    width: 50%;
    background-color: #ff0000;
    color: white;
    border: none;
    padding: 10px 20px;
    margin-top: 20px;
    cursor: pointer;
    border-radius: 4px;
}

.delete-btn:hover {
    background-color: #b92c2c;
}

.delete-btn-container {
    margin: 80px 100px 20px 400px;
    width: 75%;
    justify-self: center;
}
</style>