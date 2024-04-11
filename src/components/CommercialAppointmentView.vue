<template>
    <div class="main-content">
        <main class="content">
            <button @click="goBack" class="back-btn">Back</button>
            <table class="user-profile-table">
                <tbody>
                    <tr>
                        <th></th>
                        <td>
                            <router-link to="/"><img :src="logo" alt="Logo" class="logo"></router-link>
                        </td>
                    </tr>
                    <tr>
                        <th>Client</th>
                        <td>{{ appointmentDetails.first_name }} {{ appointmentDetails.last_name }}</td>
                    </tr>
                    <tr>
                        <th>Appointment Type</th>
                        <td>{{ appointmentDetails.flag }}</td>
                    </tr>
                    <tr>
                        <th>Reference Number</th>
                        <td>{{ appointmentDetails.reference_number }}</td>
                    </tr>
                    <tr>
                        <th>Company Name</th>
                        <td>{{ appointmentDetails.company_name }}</td>
                    </tr>
                    <tr>
                        <th>Email</th>
                        <td>{{ appointmentDetails.email }}</td>
                    </tr>
                    <tr>
                        <th>Phone</th>
                        <td>{{ appointmentDetails.phone }}</td>
                    </tr>
                    <tr>
                        <th>Street 1</th>
                        <td>{{ address["street1"] }}</td>
                    </tr>
                    <tr>
                        <th>Street 2</th>
                        <td>{{ address["street2"] }}</td>
                    </tr>
                    <tr>
                        <th>City</th>
                        <td>{{ address["city"] }}</td>
                    </tr>
                    <tr>
                        <th>Province</th>
                        <td>{{ address["province"] }}</td>
                    </tr>
                    <tr>
                        <th>Postal Code</th>
                        <td>{{ address["postal_code"] }}</td>
                    </tr>
                    <tr>
                        <th>Service Details</th>
                        <td> {{ service_details["information"] }}
                        </td>
                    </tr>
                    <tr>
                        <th>Availability</th>
                        <td><strong>Primary Date: </strong> {{ availability["primary_date"] }} <br> <strong>Secondary
                                Date: </strong> {{ availability["secondary_date"] }} <br> <strong>Time Preferences:
                            </strong> {{ timePreferences }}</td>
                    </tr>
                    <tr>
                        <th>Additional Instructions</th>
                        <td>{{ appointmentDetails.additional_instructions }}</td>
                    </tr>
                    <tr>
                        <th>Booked</th>
                        <td>{{ appointmentDetails.created_at }}</td>
                    </tr>
                    <tr>
                        <th>Status</th>
                        <td :class="statusClass(appointmentDetails.status)"><strong>{{ appointmentDetails.status
                                }} : {{ appointmentDetails.status_updated_at }}</strong></td>
                    </tr>
                    <tr>
                        <th></th>
                        <td>
                            <div v-if="appointmentDetails.image_paths && appointmentDetails.image_paths.length > 0"
                                class="carousel-container">
                                <div class="row">
                                    <div class="col-3" v-for="(imagePath, index) in appointmentDetails.image_paths"
                                        :key="index">
                                        <img :src="imageUrl(imagePath)" alt="Request Image" class="img-fluid"
                                            @click="openImage(index)" style="cursor:pointer">
                                    </div>
                                </div>
                            </div>

                            <!-- Image Modal -->
                            <div v-if="currentIndex !== null" class="image-modal" @click.self="currentIndex = null">
                                <img :src="imageUrl(appointmentDetails.image_paths[currentIndex])" alt="Expanded Image"
                                    class="expanded-img">
                                <button @click.stop="showPrev" class="nav-arrow left-arrow">❮</button>
                                <button @click.stop="showNext" class="nav-arrow right-arrow">❯</button>
                            </div>
                        </td>
                    </tr>
                </tbody>
            </table>
            <div class="delete-btn-container" v-if="appointmentDetails.status === 'Pending'">
                <button @click="confirmCancellation" class="delete-btn">Cancel Appointment</button>
            </div>
        </main>
    </div>
</template>

<script>
import { STORAGE_BASE_URL, LOGO } from '@/api/config';
import Swal from 'sweetalert2';


export default {
    name: 'ProfileComponent',
    data() {
        return {
            logo: LOGO,
            storageBaseUrl: STORAGE_BASE_URL,
            appointmentDetails: '',
            address: '',
            service_details: '',
            availability: '',
            time_preferences: [],
            imagePath: [],
            selectedImage: null,
            currentIndex: null,
            selectedStatus: 'canceled',
            extras_2: '',
            entryMethodOptions: {


            },
            homeStatusOptions: {
            },
            petsStatusOptions: {

            },
            basementCleaningStatusOptions: {
            },
        };
    },
    computed: {
        timePreferences() {
            return this.time_preferences.map(value => {
                return value;
            }).join(", ");
        },
        status() {
            return this.$store.state.appointmentStatus;
        },

    },
    methods: {
        checkFlag(appointmentId) {
            this.$store.dispatch('fetchAppointmentDetails', appointmentId)
                .then(response => {
                    this.appointmentDetails = response.data.data;
                    // this.extras_2.entry_method = [];
                    if (this.appointmentDetails.flag !== 'commercial') {
                        this.$router.push({ name: 'Home' });
                    }
                })
                .catch(error => {
                    console.log(error)
                });
        },
        getAppointment(appointmentId) {
            this.$store.dispatch('fetchAppointmentDetails', appointmentId)
                .then(response => {
                    this.appointmentDetails = response.data.data;
                    this.address = this.appointmentDetails.address;
                    this.service_details = this.appointmentDetails.service_details;
                    this.availability = this.appointmentDetails.availability;
                    this.time_preferences = this.appointmentDetails.availability.time_preferences;

                    if (!this.appointmentDetails.extras) {
                        this.appointmentDetails.extras = [];
                    }
                    this.extras = this.appointmentDetails.extras;
                    this.imagePath = this.appointmentDetails.image_paths;

                    console.log('Image Paths', this.imagePath);

                    console.log(this.appointmentDetails.company_name)

                })
                .catch(error => {
                    console.error('Failed to fetch appointment details:', error);
                    this.$router.push({ name: 'Home' }); // Redirect back if id does not exist
                });
        },
        statusClass(status) {
            // Return the class based on the status value
            switch (status) {
                case 'Pending':
                    return 'status-pending';
                case 'Complete':
                    return 'status-complete';
                case 'Canceled':
                    return 'status-canceled';
                default:
                    return '';
            }
        },

        imageUrl(path) {
            if (!path) return ''; // Return an empty string or a default image path if path is undefined
            const cleanPath = path.replace('public/', '');
            return `${cleanPath}`;
        },
        openImage(index) {
            this.currentIndex = index;
        },
        showNext() {
            if (this.currentIndex < this.appointmentDetails.image_paths.length - 1) {
                this.currentIndex++;
            } else {
                this.currentIndex = 0; // Loop back to the first image
            }
        },
        showPrev() {
            if (this.currentIndex > 0) {
                this.currentIndex--;
            } else {
                this.currentIndex = this.appointmentDetails.image_paths.length - 1; // Loop back to the last image
            }
        },

        goBack() {
            // this.$router.go(-1);
            this.$router.push({ name: 'Confirmation' });
        },

        updateStatus() {
            console.log(this.selectedStatus)
            this.$store.dispatch('updateStatusTwo', { id: this.appointmentDetails.id, status: this.selectedStatus })
                .then(response => {
                    console.log(response);
                    console.log(`Appointment marked as ${this.selectedStatus}`);

                    setTimeout(() => {
                        this.$router.go(0);
                    }, 3000);
                })
                .catch(error => {
                    console.error(error);
                });

        },

        confirmCancellation() {
            this.$swal({
                title: 'Are you sure?',
                text: 'You will not be able to reopen this appointment unless you contact the administrators!',
                icon: 'warning',
                showCancelButton: true,
                confirmButtonColor: '#d33',
                cancelButtonColor: '#3085d6',
                confirmButtonText: 'Yes, Cancel Appointment!',
                cancelButtonText: 'No, keep it'
            }).then((result) => {
                if (result.isConfirmed) {
                    this.$swal(
                        'Cancelled!',
                        'Appointment Cancelled.',
                        'success'
                    );
                    this.updateStatus();
                } else if (result.dismiss === Swal.DismissReason.cancel) {
                    this.$swal(
                        'Appointment still pending',
                        '',
                        'error'
                    );
                }
            });
        },

    },
    beforeMount() {
        const appointmentId = this.$route.params.id;
        this.checkFlag(appointmentId);
        if (appointmentId) {
            this.getAppointment(appointmentId);
        } else {
            this.$router.push({ name: 'Home' }); // Redirect if no ID is provided
        }
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



.back-btn {
    background-color: #004d40;
    color: #fff;
    border-radius: 5px;
    cursor: pointer;
    border: #004d40 solid 2px;
    margin: 0 5px;
    padding: 5px 5px 5px 5px;
    text-decoration: none;

}

.back-btn:hover {
    background-color: #00382e;
    border: #00382e solid 2px;
}

.form-container {
    margin: auto;
    width: 75%;
}

select {
    width: 50%;
    height: 40px;
    padding: 10px;
    border: 1px solid #ccc;
    border-radius: 4px;
    margin-top: 20px;
    margin-right: 20px;
}

.submit-btn {
    width: 50%;
    background-color: #004d40;
    color: white;
    border: none;
    padding: 10px 20px;
    margin-top: 20px;
    cursor: pointer;
    border-radius: 4px;
}

.submit-btn:hover {
    background-color: #00382e;
}

.status-pending {
    color: #f58634;
}

.status-complete {
    color: green;
}

.status-canceled {
    color: red;
}

.carousel-container {
    display: flex;
    flex-wrap: wrap;
}

.carousel-container .col-3 {
    flex: 0 0 25%;
    /* Each image takes up 25% of the container width */
    max-width: 25%;
    padding: 5px;
}

.carousel-container img {
    width: 100%;
    /* Make the image fill the column */
    height: auto;
    /* Maintain aspect ratio */
    display: block;
}

.image-modal {
    position: fixed;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
    background-color: rgba(0, 0, 0, 0.8);
    display: flex;
    align-items: center;
    justify-content: center;
    z-index: 1050;
    /* Ensure it's above other content */
}

.expanded-img {
    max-width: 80%;
    max-height: 80%;
    box-shadow: 0 0 8px rgba(255, 255, 255, 0.3);
}


.nav-arrow {
    cursor: pointer;
    position: absolute;
    top: 50%;
    width: auto;
    padding: 16px;
    margin-top: -50px;
    color: white;
    font-weight: bold;
    font-size: 24px;
    transition: 0.6s ease;
    border-radius: 0 3px 3px 0;
    user-select: none;
    -webkit-user-select: none;
    background-color: rgba(0, 0, 0, 0.8);
}

.left-arrow {
    left: 0;
    border-radius: 3px 0 0 3px;
}

.right-arrow {
    right: 0;
    border-radius: 0 3px 3px 0;
}

.nav-arrow:hover {
    background-color: rgba(0, 0, 0, 1);
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

.logo {
    max-width: 30%;
    height: auto;
}
</style>