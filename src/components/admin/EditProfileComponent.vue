<template>
    <div class="admin-panel">
        <SidebarComponent />
        <div class="main-content">
            <AdminHeaderComponent>Edit Profile</AdminHeaderComponent>
            <main class="content">
                <button @click="backProfile" class="back-btn">Back</button>
                <div class="edit-profile">
                    <h1>Edit Profile</h1>
                    <p v-if="successMessage" class="success-message">{{ successMessage }}</p>
                    <form @submit.prevent="submitProfileUpdate">
                        <table class="form-table">
                            <tbody>
                                <tr>
                                    <td><label for="first_name">First Name:</label></td>
                                    <td>
                                        <input id="first_name" v-model="user.first_name" type="text">
                                        <p v-if="errors.first_name">{{ errors.first_name[0] }}</p>
                                    </td>
                                </tr>
                                <tr>
                                    <td><label for="last_name">Middle Name:</label></td>
                                    <td>
                                        <input id="last_name" v-model="user.middle_name" type="text">
                                        <p v-if="errors.middle_name">{{ errors.middle_name[0] }}</p>
                                    </td>
                                </tr>
                                <tr>
                                    <td><label for="last_name">Last Name:</label></td>
                                    <td>
                                        <input id="last_name" v-model="user.last_name" type="text">
                                        <p v-if="errors.last_name">{{ errors.last_name[0] }}</p>
                                    </td>
                                </tr>

                                <td><label for="gender">Gender:</label></td>
                                <td>
                                    <select id="gender" v-model="user.gender">
                                        <option disabled value="">Select</option>
                                        <option>Male</option>
                                        <option>Female</option>
                                    </select>
                                    <p v-if="errors.gender">{{ errors.gender[0] }}</p>
                                </td>


                                <tr>
                                    <td><label for="phone">Phone:</label></td>
                                    <td>
                                        <input id="phone" v-model="user.phone" type="text">
                                        <p v-if="errors.phone">{{ errors.phone[0] }}</p>
                                    </td>
                                </tr>
                                <tr>
                                    <td><label for="email">Email:</label></td>
                                    <td>
                                        <input id="email" v-model="user.email" type="email">
                                        <p v-if="errors.email">{{ errors.email[0] }}</p>
                                    </td>
                                </tr>
                            </tbody>
                        </table>
                        <button type="submit" class="update-btn">Update Profile</button>
                    </form>


                    <!-- Profile Image Upload Form -->
                    <div class="image-upload-form">
                        <h2>Upload Profile Image</h2>
                        <p v-if="successMessageImage" class="success-message">{{ successMessageImage }}</p>
                        <form @submit.prevent="uploadImage">
                            <div class="form-group">
                                <input type="file" @change="onFileChange" required ref="fileInput">
                                <p v-if="errors.general">{{ errors.general[0] }}</p>
                                <p v-if="errors.image">{{ errors.image[0] }}</p>
                            </div>
                            <button type="submit" class="upload-btn">Upload Image</button>
                        </form>
                    </div>

                    <!-- Change Password Form -->
                    <div class="password-change-form">
                        <h2>Change Password</h2>
                        <p v-if="successMessagePassword" class="success-message">{{ successMessagePassword }}</p>
                        <form @submit.prevent="changePassword">
                            <div class="form-group">
                                <label for="oldPassword">Old Password:</label>
                                <input id="oldPassword" v-model="passwordForm.oldPassword" type="password" required>
                                <p v-if="errors.oldPassword">{{ errors.oldPassword[0] }}</p>
                            </div>
                            <div class="form-group">
                                <label for="newPassword">New Password:</label>
                                <input id="newPassword" v-model="passwordForm.newPassword" type="password" required
                                    minlength="8">
                                <p v-if="errors.newPassword">{{ errors.newPassword[0] }}</p>
                            </div>
                            <div class="form-group">
                                <label for="confirmPassword">Confirm New Password:</label>
                                <input id="confirmPassword" v-model="passwordForm.confirmPassword" type="password"
                                    required minlength="8">
                            </div>
                            <button type="submit" class="change-btn">Change Password</button>
                        </form>
                    </div>
                </div>
            </main>
        </div>
    </div>
</template>


<script>
import SidebarComponent from '@/components/admin/sections/SidebarComponent.vue';
import AdminHeaderComponent from '@/components/admin/sections/AdminHeaderComponent.vue';
import axios from '@/api/axios';

export default {
    name: 'EditProfileComponent',
    components: {
        SidebarComponent,
        AdminHeaderComponent,
    },
    data() {
        return {
            user: {
                first_name: "",
                middle_name: "",
                last_name: "",
                gender: "",
                phone: "",
                email: ""
            },
            errors: {},
            successMessage: '',
            successMessagePassword: '',
            successMessageImage: '',
            passwordForm: {
                oldPassword: "",
                newPassword: "",
                confirmPassword: ""
            },
            selectedFile: null, // For image upload
        };
    },
    mounted() {
        this.fetchCurrentUserProfile();
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
    methods: {
        fetchCurrentUserProfile() {
            if (this.userProfile) {
                this.user = { ...this.userProfile };
            }
        },
        // async updateProfile() {
        //     try {
        //         await axios.put('admin/update-profile', this.user, {
        //             headers: {
        //                 'Authorization': `Bearer ${localStorage.getItem('token')}`,
        //             },
        //         });
        //         this.errors = {}; // Clear any existing errors on successful update
        //         this.successMessage = "Profile updated successfully!"; // Set success message
        //         setTimeout(() => this.successMessage = '', 3000);
        //     } catch (error) {
        //         if (error.response && error.response.status === 422) {
        //             this.errors = error.response.data.errors;
        //             this.successMessage = '';
        //         }
        //     }
        // },
        async submitProfileUpdate() {
            const validationErrors = await this.$store.dispatch('updateProfile', this.user);
            if (!validationErrors) {
                this.successMessage = "Profile updated successfully!";
                setTimeout(() => this.successMessage = '', 3000);
                this.errors = {};
            } else {
                this.errors = validationErrors;
            }
        },
        async uploadImage() {
            if (!this.selectedFile) {
                console.error("No file selected.");
                return;
            }

            const res = await this.$store.dispatch('uploadProfileImage', { file: this.selectedFile });
            if (!res) {
                this.successMessageImage = "Image uploaded successfully!";
                setTimeout(() => this.successMessageImage = '', 3000);
                this.$refs.fileInput.value = ''; // Reset file input
                this.selectedFile = null;
                this.errors = {};
            } else {
                this.errors = res;
            }
        },
        async changePassword() {
            this.errors = {}; // Reset errors before making the request
            const passwordData = {
                oldPassword: this.passwordForm.oldPassword,
                newPassword: this.passwordForm.newPassword,
                newPassword_confirmation: this.passwordForm.confirmPassword,
            };

            try {
                await axios.put('admin/change-password', passwordData, {
                    headers: {
                        'Authorization': `Bearer ${localStorage.getItem('token')}`,
                    },
                });
                this.successMessagePassword = "Password changed successfully!";
                this.passwordForm.oldPassword = "";
                this.passwordForm.newPassword = "";
                this.passwordForm.confirmPassword = "";
                setTimeout(() => this.successMessagePassword = '', 3000);
            } catch (error) {
                if (error.response && error.response.status === 422) {
                    // Validation errors
                    this.errors = error.response.data.errors;
                } else if (error.response && error.response.status === 403) {
                    // Specific error for password mismatch or other authorization issues
                    this.errors = { oldPassword: [error.response.data.error] };
                } else {
                    console.error("Change password error:", error);
                }
                this.successMessagePassword = ''; // Ensure success message is cleared if there's an error
            }
        },
        onFileChange(e) {
            this.selectedFile = e.target.files[0];
        },
        // async uploadImage() {
        //     if (!this.selectedFile) {
        //         console.error("No file selected.");
        //         return;
        //     }

        //     const formData = new FormData();
        //     formData.append('image', this.selectedFile);

        //     try {
        //         await axios.post('admin/upload-image', formData, {
        //             headers: {
        //                 'Content-Type': 'multipart/form-data',
        //                 'Authorization': `Bearer ${localStorage.getItem('token')}`,
        //             },
        //         });

        //         // Handle success
        //         this.successMessage = "Image uploaded successfully!";
        //         setTimeout(() => this.successMessage = '', 3000); // Clear message after timeout

        //         this.selectedFile = null;
        //         this.$refs.fileInput.value = null;
        //     } catch (error) {
        //         this.successMessage = ''; // Ensure success message is cleared if there's an error

        //         if (error.response && error.response.status === 422) {
        //             // Handle validation errors
        //             this.errors = error.response.data.errors;
        //         } else {
        //             // Handle other errors
        //             console.error("Upload image error:", error);
        //             // set a general error message for the user
        //             this.errors = { general: ["An error occurred while uploading the image."] };
        //         }
        //     }
        // },


        backProfile() {
            this.$router.push({ name: 'Profile' });
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

.edit-profile {
    width: 50%;
    max-width: 600px;
    margin: auto;
}

.form-table {
    width: 100%;
    margin-bottom: 20px;
}

.form-table td {
    padding: 8px;
    vertical-align: top;
    /* Aligns the label to the top, matching input height */
}

.form-group p {
    color: #d9534f;
    /* Error message color */
    margin-top: 5px;
}

.update-btn {
    background-color: #004d40;
    /* Dark green, similar to the sidebar */
    color: white;
    padding: 10px 15px;
    border: none;
    cursor: pointer;
    border-radius: 5px;
    width: 100%;
}

.update-btn:hover {
    background-color: #00382e;
}

.success-message {
    color: green;
    margin-bottom: 15px;
    text-align: center;
}


.password-change-form,
.image-upload-form {
    margin-top: 2rem;
    padding: 1rem;
    background-color: #f4f4f4;
    border-radius: 8px;
}

.form-group {
    margin-bottom: 1rem;
}

.form-group label {
    display: block;
    margin-bottom: 0.5rem;
}

.form-group input[type="password"],
.form-group input[type="file"] {
    width: 100%;
    padding: 8px;
    border: 1px solid #ccc;
    border-radius: 4px;
}

.change-btn,
.upload-btn {
    display: block;
    width: 100%;
    padding: 10px;
    margin-top: 1rem;
    background-color: #004d40;
    color: white;
    border: none;
    border-radius: 4px;
    cursor: pointer;
}

.change-btn:hover,
.upload-btn:hover {
    background-color: #00382e;
}

.back-btn {
    background-color: #004d40;
    color: white;
    border: none;
    padding: 10px 20px;
    margin-top: 20px;
    cursor: pointer;
    border-radius: 4px;
}

.back-btn:hover {
    background-color: #00382e;
}
</style>
