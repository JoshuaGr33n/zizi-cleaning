<template>
    <div class="modal">
        <div class="modal-content">
            <span class="close" @click="close">&times;</span>
            <h2>Add New Staff</h2>
            <form @submit.prevent="submitForm">
                <div class="form-group">
                    <label for="first_name">First Name:</label>
                    <input type="text" id="first_name" v-model="newStaff.first_name">
                    <p v-if="errors.first_name" class="error-message">{{ errors.first_name[0] }}</p>
                </div>

                <div class="form-group">
                    <label for="middle_name">Middle Name:</label>
                    <input type="text" id="middle_name" v-model="newStaff.middle_name">
                    <p v-if="errors.middle_name" class="error-message">{{ errors.middle_name[0] }}</p>
                </div>

                <div class="form-group">
                    <label for="last_name">Last Name:</label>
                    <input type="text" id="last_name" v-model="newStaff.last_name">
                    <p v-if="errors.last_name" class="error-message">{{ errors.last_name[0] }}</p>
                </div>

                <div class="form-group">
                    <label for="gender">Gender:</label>
                    <select id="gender" v-model="newStaff.gender">
                        <option disabled value="">Select</option>
                        <option>Male</option>
                        <option>Female</option>
                    </select>
                    <p v-if="errors.gender" class="error-message">{{ errors.gender[0] }}</p>
                </div>

                <div class="form-group">
                    <label for="phone">Phone:</label>
                    <input type="text" id="phone" v-model="newStaff.phone">
                    <p v-if="errors.phone" class="error-message">{{ errors.phone[0] }}</p>
                </div>

                <div class="form-group">
                    <label for="phone_confirmation">Confirm Phone:</label>
                    <input type="text" id="phone_confirmation" v-model="newStaff.phone_confirmation">
                    <p v-if="errors.phone_confirmation" class="error-message">{{ errors.phone_confirmation[0] }}</p>
                </div>

                <div class="form-group">
                    <label for="email">Email:</label>
                    <input type="text" id="email" v-model="newStaff.email">
                    <p v-if="errors.email" class="error-message">{{ errors.email[0] }}</p>
                </div>
                <div class="form-group">
                    <label for="email_confirmation">Confirm Email:</label>
                    <input type="text" id="email_confirmation" v-model="newStaff.email_confirmation">
                    <p v-if="errors.email_confirmation" class="error-message">{{ errors.email_confirmation[0] }}</p>
                </div>
                <div class="form-group">
                    <label for="role">Role:</label>
                    <select id="role" v-model="newStaff.role" required>
                        <option disabled value="">Please select one</option>
                        <option>Staff</option>
                        <option>SubAdmin</option>
                    </select>
                    <p v-if="errors.role" class="error-message">{{ errors.role[0] }}</p>
                </div>
                <button type="submit">Submit</button>
            </form>
        </div>

    </div>
</template>

<script>
export default {
    data() {
        return {
            newStaff: {
                first_name: '',
                middle_name: '',
                last_name: '',
                gender: '',
                phone: '',
                phone_confirmation: '',
                email: '',
                email_confirmation: '',
                role: '',
            },
            errors: {},
        };
    },
    watch: {
        'newStaff.first_name'(newValue) {
            if (newValue && newValue.length > 0) {
                this.errors.first_name = undefined;
            } else if (newValue.length === 0 || !newValue) {
                this.errors.first_name = ['First name is required'];
                console.log(this.errors.first_name)
            }
            this.errors = { ...this.errors };
        },
        'newStaff.last_name'(newValue) {
            if (newValue && newValue.length > 0) {
                this.errors.last_name = undefined;
            } else if (newValue.length === 0 || !newValue) {
                this.errors.last_name = ['Last name is required'];
            }
            this.errors = { ...this.errors };
        },
        'newStaff.email'(newValue) {
            if (newValue) {
                this.errors.email = undefined;
                if (this.isValidEmail(newValue)) {
                    this.errors.email = undefined;
                    if (this.newStaff.email_confirmation && newValue !== this.newStaff.email_confirmation) {
                        this.errors.email_confirmation = ['Emails do not match'];
                    }
                } else {
                    this.errors.email = ['Provide a valid email address'];
                }
            } else {
                this.errors.email = ['Email Address is required'];
            }
            this.errors = { ...this.errors };
        },

        'newStaff.email_confirmation'(newValue) {
            if (newValue && newValue !== this.newStaff.email) {
                this.errors.email_confirmation = ['Emails do not match'];
            } else {
                this.errors.email_confirmation = undefined;
            }
            this.errors = { ...this.errors };
        },
        'newStaff.phone'(newValue) {
            if (newValue && newValue.length > 0) {
                this.errors.phone = undefined;
            } else if (newValue.length === 0 || !newValue) {
                this.errors.phone = ['Phone number is required'];
            }

            if (this.newStaff.phone_confirmation && newValue !== this.newStaff.phone_confirmation) {
                this.errors.phone_confirmation = ['Phone numbers do not match'];
            }
            this.errors = { ...this.errors };
        },
        'newStaff.phone_confirmation'(newValue) {
            if (newValue && newValue !== this.newStaff.phone) {
                this.errors.phone_confirmation = ['Phone numbers do not match'];
            } else {
                this.errors.phone_confirmation = undefined;
            }
            this.errors = { ...this.errors };
        },
        'newStaff.gender'(newValue) {
            if (newValue && newValue.length > 0) {
                this.errors.gender = undefined;
            } else if (newValue.length === 0 || !newValue) {
                this.errors.gender = ['Gender is required'];
            }
            this.errors = { ...this.errors };
        },
        'newStaff.role'(newValue) {
            if (newValue && newValue.length > 0) {
                this.errors.role = undefined;
            } else if (newValue.length === 0 || !newValue) {
                this.errors.role = ['Role is required'];
            }
            this.errors = { ...this.errors };
        },

    },
    methods: {
        isValidEmail(email) {
            const emailRegex = new RegExp("^(([^<>()\\[\\]\\.,;:\\s@\"]+(\\.[^<>()\\[\\]\\.,;:\\s@\"]+)*)|(\\\".+\\\"))@((\\[[0-9]{1,3}\\.[0-9]{1,3}\\.[0-9]{1,3}\\.[0-9]{1,3}])|(([a-zA-Z\\-0-9]+\\.)+[a-zA-Z]{2,}))$", "i");

            return emailRegex.test(email);
        },
        submitForm() {
            this.$store.dispatch('createStaff', this.newStaff)
                .then(() => {
                    this.close(); // Close the modal on success
                })
                .catch(errors => {
                    console.error(errors);
                    this.errors = errors;
                });
        },
        handleFileUpload(event) {
            this.newStaff.image = event.target.files[0];
        },
        close() {
            this.$emit('close');
        }
    }
}
</script>

<style scoped>
.modal {
    display: flex;
    justify-content: center;
    align-items: center;
    position: fixed;
    z-index: 1000;
    left: 0;
    top: 0;
    width: 100%;
    height: 100%;
    overflow: auto;
    background-color: rgba(0, 0, 0, 0.5);
}

.modal-content {
    background-color: #fefefe;
    margin: auto;
    padding: 20px;
    border: 1px solid #888;
    width: 80%;
    max-width: 500px;
    box-shadow: 0 4px 8px rgba(0, 0, 0, 0.1);
    border-radius: 10px;
}

.close {
    color: #aaa;
    float: right;
    font-size: 28px;
    font-weight: bold;
}

.close:hover,
.close:focus {
    color: black;
    text-decoration: none;
    cursor: pointer;
}

/* Form and its elements */
form {
    display: flex;
    flex-direction: column;
    gap: 15px;
    /* This creates space between each row */
}

input[type="text"],
input[type="url"],
select,
textarea {
    width: 100%;
    padding: 10px;
    margin: 5px 0 22px 0;
    display: inline-block;
    border: none;
    background: #f1f1f1;
    border-radius: 5px;
}

input[type="text"]:focus,
input[type="url"]:focus,
textarea:focus {
    background-color: #ddd;
    outline: none;
}

label {
    margin-bottom: 5px;
    font-weight: bold;
}

button[type="submit"] {
    background-color: #004d40;
    color: white;
    padding: 14px 20px;
    margin: 8px 0;
    border: none;
    cursor: pointer;
    border-radius: 5px;
}

button[type="submit"]:hover {
    background-color: #00382e;
}
</style>