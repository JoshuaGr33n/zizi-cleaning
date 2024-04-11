<template>
    <div class="request-form-container">
        <div class="logo-container">
            <router-link to="/"><img :src="logo" alt="Logo" class="form-logo"></router-link>
        </div>
        <div class="btn-container">
            <router-link to="/book-appointment"><button class="back-btn">Back</button></router-link>
        </div>
        <div class="appointment">
            <h2 class="form-title">Request A Residential Cleaning Appointment</h2>
            <p>* Required Fields</p>
            <form @submit.prevent="submitForm">
                <!-- Contact Details Section -->
                <div class="form-section">
                    <h3 class="form-header">Contact Details</h3>
                    <input type="text" v-model="contactDetails.firstName" placeholder="First name *" class="form-input">
                    <p v-if="errors['first_name']" class="error-message">{{ errors['first_name'][0] }}</p>
                    <input type="text" v-model="contactDetails.lastName" placeholder="Last name *" class="form-input">
                    <p v-if="errors['last_name']" class="error-message">{{ errors['last_name'][0] }}</p>
                    <input type="email" v-model="contactDetails.email" placeholder="Email *" class="form-input">
                    <p v-if="errors['email']" class="error-message">{{ errors['email'][0] }}</p>
                    <input type="tel" v-model="contactDetails.phone" placeholder="Phone number *" class="form-input">
                    <p v-if="errors['phone']" class="error-message">{{ errors['phone'][0] }}</p>
                </div>

                <!-- Address Section -->
                <div class="form-section">
                    <h3 class="form-header">Address</h3>
                    <input type="text" v-model="address.street1" placeholder="Street 1 *" class="form-input">
                    <p v-if="errors['address.street1']" class="error-message">{{ errors['address.street1'][0] }}</p>
                    <input type="text" v-model="address.street2" placeholder="Street 2" class="form-input">
                    <p v-if="errors['address.street2']" class="error-message">{{ errors['address.street2'][0] }}</p>
                    <input type="text" v-model="address.city" placeholder="City *" class="form-input">
                    <p v-if="errors['address.city']" class="error-message">{{ errors['address.city'][0] }}</p>
                    <select v-model="address.province" class="form-input">
                        <option disabled value="">Province *</option>
                        <option value="AB">Alberta</option>
                        <option value="BC">British Columbia</option>
                        <option value="MB">Manitoba</option>
                        <option value="NB">New Brunswick</option>
                        <option value="NL">Newfoundland and Labrador</option>
                        <option value="NS">Nova Scotia</option>
                        <option value="ON">Ontario</option>
                        <option value="PE">Prince Edward Island</option>
                        <option value="QC">Quebec</option>
                        <option value="SK">Saskatchewan</option>
                        <option value="NT">Northwest Territories</option>
                        <option value="NU">Nunavut</option>
                        <option value="YT">Yukon</option>
                    </select>
                    <p v-if="errors['address.province']" class="error-message">{{ errors['address.province'][0] }}</p>
                    <input type="text" v-model="address.postalCode" placeholder="Postal code *" class="form-input">
                    <p v-if="errors['address.postal_code']" class="error-message">{{ errors['address.postal_code'][0] }}
                    </p>
                </div>

                <!-- Service Details Section -->
                <div class="form-section">
                    <h3 class="form-header">Service Details</h3>
                    <select v-model="serviceDetails.homeSize" class="form-input">
                        <option disabled value="">Home Size *</option>
                        <option value="studio">Studio</option>
                        <option value="1bedroom">1 Bedroom Apartment</option>
                        <option value="2bedroom">2 Bedroom Apartment</option>
                        <option value="3bedroom">3 Bedroom Apartment</option>
                        <option value="1000-1200">1000-1200 sq ft home</option>
                        <option value="1250-1450">1250-1450 sq ft home</option>
                        <option value="1500-1750">1500-1750 sq ft home</option>
                        <option value="1800-2000">1800-2000 sq ft home</option>
                        <option value="2050-2250">2050-2250 sq ft home</option>
                        <option value="2300-2500">2300-2500 sq ft home</option>
                        <option value="2550-2750">2550-2750 sq ft home</option>
                        <option value="2800-3000">2800-3000 sq ft home</option>
                        <option value="3050-3250">3050-3250 sq ft home</option>
                        <option value="3300-3500">3300-3500 sq ft home</option>
                        <option value="3550-3800">3550-3800 sq ft home</option>
                        <option value="3850-4000">3850-4000 sq ft home</option>
                        <option value="4050-5000">4050-5000 sq ft home</option>
                        <option value="5050-5500">5050-5500 sq ft home</option>
                        <option value="5550-6000">5550-6000 sq ft home</option>
                    </select>
                    <p v-if="errors['service_details.home_size']" class="error-message">{{
                errors['service_details.home_size'][0] }}</p>

                    <select v-model="serviceDetails.bathrooms" class="form-input">
                        <option disabled value="">Bathrooms *</option>
                        <option value="1">1 Bathroom</option>
                        <option value="2">2 Bathrooms</option>
                        <option value="3">3 Bathrooms</option>
                    </select>
                    <p v-if="errors['service_details.bathrooms']" class="error-message">{{
                errors['service_details.bathrooms'][0] }}</p>
                </div>

                <!-- Availability Section -->
                <div class="form-section">
                    <h3 class="form-header">Your Availability</h3>
                    <div class="form-section">
                        <h3 class="form-header">Your Availability</h3>
                        <div class="form-group">
                            <input type="date" v-model="availability.bestDay" :min="minDate" @change="blurInput($event)"
                                class="form-input date-input">
                            <label class="form-label">Which day would be best for an assessment of the work? *</label>
                            <p v-if="errors['availability.primary_date']" class="error-message">{{
                errors['availability.primary_date'][0] }}</p>
                        </div>
                        <div class="form-group">
                            <input type="date" v-model="availability.alternateDay" :min="minDate"
                                @change="blurInput($event)" class="form-input date-input">
                            <label class="form-label">What is another day that works for you? (optional)</label>
                            <p v-if="errors['availability.secondary_date']" class="error-message">{{
                errors['availability.secondary_date'][0] }}</p>
                        </div>
                    </div>

                    <div class="checkbox-group">
                        <label class="form-checkbox-label">
                            <input type="checkbox" v-model="availability.timeAny"> Any time
                        </label>
                        <label class="form-checkbox-label">
                            <input type="checkbox" v-model="availability.timeMorning"> Morning
                        </label>
                        <label class="form-checkbox-label">
                            <input type="checkbox" v-model="availability.timeAfternoon"> Afternoon
                        </label>
                        <label class="form-checkbox-label">
                            <input type="checkbox" v-model="availability.timeEvening"> Evening
                        </label>
                    </div>
                    <p v-if="errors['availability.time_preferences']" class="error-message">{{
                errors['availability.time_preferences'][0] }}</p>
                </div>


                <!-- Extras Section -->
                <div class="form-section">
                    <h3 class="form-header">Extras</h3>
                    <div class="extras-list">
                        <label class="checkbox-container" v-for="(extra, index) in extras" :key="index">
                            <input type="checkbox" :value="extra.value" v-model="selectedExtras">
                            {{ extra.label }}
                            <span class="checkmark"></span>
                        </label>
                        <p v-if="errors['extras']" class="error-message">{{ errors['extras'][0] }}</p>
                    </div>

                    <select v-model="additionalPreferences.entryMethod" class="form-input">
                        <option disabled value="">Preferred Entry Method *</option>
                        <option value="beHome">I will be home</option>
                        <option value="leaveKey">I will leave a key</option>
                        <option value="doorOpen">I will leave the door open</option>
                        <option value="frontDesk">Front Desk Access</option>
                        <option value="doorCode">Door Code</option>
                    </select>
                    <p v-if="errors['extras_2.entry_method']" class="error-message">{{
                errors['extras_2.entry_method'][0] }}
                    </p>

                    <select v-model="additionalPreferences.homeStatus" class="form-input">
                        <option disabled value="">Home Status *</option>
                        <option value="empty">Empty</option>
                        <option value="occupied">Occupied</option>
                    </select>
                    <p v-if="errors['extras_2.home_status']" class="error-message">{{ errors['extras_2.home_status'][0]
                        }}
                    </p>

                    <select v-model="additionalPreferences.pets" class="form-input">
                        <option disabled value="">Presence of Pets *</option>
                        <option value="yes">Yes</option>
                        <option value="no">No</option>
                    </select>
                    <p v-if="errors['extras_2.pets']" class="error-message">{{ errors['extras_2.pets'][0] }}</p>

                    <select v-model="additionalPreferences.basement" class="form-input">
                        <option disabled value="">Basement Cleaning Required? *</option>
                        <option value="yes">Yes</option>
                        <option value="no">No</option>
                    </select>
                    <p v-if="errors['extras_2.basement']" class="error-message">{{ errors['extras_2.basement'][0] }}</p>

                    <textarea v-model="additionalPreferences.specialInstructions" class="form-textarea"
                        placeholder="Any Additional Instructions? (optional)"></textarea>
                    <p v-if="errors['additional_instructions']" class="error-message">{{
                errors['additional_instructions'][0] }}</p>
                </div>

                <!-- Upload Images Section -->
                <div class="form-section">
                    <h3 class="form-header">Upload Images (optional)</h3>
                    <div class="image-upload-container">
                        <label for="image-upload" class="image-upload-label">
                            Upload File <br>
                            or drag a file here to upload
                        </label>
                        <input type="file" id="image-upload" @change="handleFileUpload" class="form-input-file"
                            multiple>

                        <div class="image-preview-container">
                            <img v-for="(imageSrc, index) in imageSrcs" :key="index" :src="imageSrc"
                                class="image-preview" :alt="`Preview ${index + 1}`">
                            <div v-if="imageErrors.length > 0" class="error-messages">
                                <p v-for="(error, index) in formatImageErrors()" :key="index" class="error-message">{{
                error }}</p>
                            </div>

                        </div>
                    </div>
                    <p v-if="errors['image_paths']" class="error-message">{{ errors['image_paths'][0] }}</p>
                </div>


                <!-- Submit Button -->
                <button type="submit" class="form-submit-btn">Submit Request</button>
            </form>
        </div>
    </div>
</template>
<script>
import { LOGO } from '@/api/config';
export default {
    data() {
        return {
            logo: LOGO,
            contactDetails: {
                firstName: '',
                lastName: '',
                email: '',
                phone: ''
            },
            address: {
                street1: '',
                street2: '',
                city: '',
                province: '',
                postalCode: ''
            },
            serviceDetails: {
                bathrooms: '',
                homeSize: '',

            },
            availability: {
                bestDay: '',
                alternateDay: '',
                timeAny: false,
                timeMorning: false,
                timeAfternoon: false,
                timeEvening: false
            },
            imageSrcs: [],
            imageFiles: [], // Store the actual File objects
            imageErrors: [],
            selectedExtras: [],
            extras: [
                { label: 'Inside Fridge', value: 'fridge' },
                { label: 'Inside Oven', value: 'oven' },
                { label: 'Inside Windows', value: 'windows' },
                { label: 'Walls', value: 'walls' },
                { label: 'Baseboard Cleaning', value: 'baseboard' },
                { label: 'Doors, door frames & door knobs', value: 'doors' },
                { label: 'Ceiling Fans', value: 'fans' },
                { label: 'Move in/Move Out Cleaning', value: 'moveInOut' },
                { label: 'Deep Cleaning Service', value: 'deepClean' },
                { label: 'Extreme Deep Clean', value: 'extremeDeepClean' },
                { label: 'Blinds', value: 'blinds' },
                { label: 'Heavy-duty Cleaning', value: 'heavyDuty' },
                { label: 'Inside Bathroom Cabinets', value: 'bathroomCabinets' },
                { label: 'Dishes (per load)', value: 'dishes' },
            ],
            additionalPreferences: {
                entryMethod: '',
                homeStatus: '',
                pets: '',
                basement: '',
                specialInstructions: ''
            },
            errors: {},
            successMessage: '',
            minDate: new Date().toISOString().split('T')[0],
        };
    },
    watch: {
        'contactDetails.firstName'(newValue) {
            if (newValue && newValue.length > 0) {
                this.errors.first_name = undefined;
            } else if (newValue.length === 0 || !newValue) {
                this.errors.first_name = ['First name is required'];
                console.log(this.errors.first_name)
            }
            this.errors = { ...this.errors };
        },
        'contactDetails.lastName'(newValue) {
            if (newValue && newValue.length > 0) {
                this.errors.last_name = undefined;
            } else if (newValue.length === 0 || !newValue) {
                this.errors.last_name = ['Last name is required'];
            }
            this.errors = { ...this.errors };
        },
        'contactDetails.email'(newValue) {
            if (newValue) {
                this.errors.email = undefined;
                if (this.isValidEmail(newValue)) {
                    this.errors.email = undefined;
                } else {
                    this.errors.email = ['Provide a valid email address'];
                }
            } else {
                this.errors.email = ['Email Address is required'];
            }
            this.errors = { ...this.errors };
        },
        'contactDetails.phone'(newValue) {
            if (newValue && newValue.length > 0) {
                this.errors.phone = undefined;
            } else if (newValue.length === 0 || !newValue) {
                this.errors.phone = ['Phone number is required'];
            }
            this.errors = { ...this.errors };
        },

    },
    methods: {
        isValidEmail(email) {
            const emailRegex = new RegExp("^(([^<>()\\[\\]\\.,;:\\s@\"]+(\\.[^<>()\\[\\]\\.,;:\\s@\"]+)*)|(\\\".+\\\"))@((\\[[0-9]{1,3}\\.[0-9]{1,3}\\.[0-9]{1,3}\\.[0-9]{1,3}])|(([a-zA-Z\\-0-9]+\\.)+[a-zA-Z]{2,}))$", "i");

            return emailRegex.test(email);
        },
        blurInput(event) {
            event.target.blur();
        },

        formatImageErrors() {
            return this.imageErrors.map((error, index) => `image${index + 1}: ${error}`);
        },


        async submitForm() {
            const formData = new FormData();

            // Append contact details
            formData.append('first_name', this.contactDetails.firstName);
            formData.append('last_name', this.contactDetails.lastName);
            formData.append('phone', this.contactDetails.phone);
            formData.append('email', this.contactDetails.email);

            // Append address details
            formData.append('address[street1]', this.address.street1);
            formData.append('address[street2]', this.address.street2);
            formData.append('address[city]', this.address.city);
            formData.append('address[province]', this.address.province);
            formData.append('address[postal_code]', this.address.postalCode);

            // Append service details
            formData.append('service_details[home_size]', this.serviceDetails.homeSize);
            formData.append('service_details[bathrooms]', this.serviceDetails.bathrooms);

            // Append availability details
            formData.append('availability[primary_date]', this.availability.bestDay);
            formData.append('availability[secondary_date]', this.availability.alternateDay);

            // Time preferences are an array, so they need special handling
            if (this.availability.timeAny) {
                formData.append('availability[time_preferences][]', 'any_time');
            }
            if (this.availability.timeMorning) {
                formData.append('availability[time_preferences][]', 'morning');
            }
            if (this.availability.timeAfternoon) {
                formData.append('availability[time_preferences][]', 'afternoon');
            }
            if (this.availability.timeEvening) {
                formData.append('availability[time_preferences][]', 'evening');
            }

            // Extras are also an array
            this.selectedExtras.forEach(extra => {
                formData.append('extras[]', extra);
            });

            // Append extras 2 details
            formData.append('extras_2[entry_method]', this.additionalPreferences.entryMethod);
            formData.append('extras_2[home_status]', this.additionalPreferences.homeStatus);
            formData.append('extras_2[pets]', this.additionalPreferences.pets);
            formData.append('extras_2[basement]', this.additionalPreferences.basement);

            // Append additional instructions
            formData.append('additional_instructions', this.additionalPreferences.specialInstructions);

            for (let i = 0; i < this.imageFiles.length; i++) {
                formData.append('image_paths[]', this.imageFiles[i]);

                console.log(this.imageFiles[i]);
            }

            this.$store.dispatch('submitResidentialCleaningRequest', formData)

                .then(response => {
                    console.log('success');
                    console.log(response);

                    const appointmentId = response.data.data.id;
                    console.log(appointmentId);

                    this.$router.push({ name: 'Confirmation', params: { id: appointmentId } });
                    this.successMessage = "Request Sent Successfully updated successfully!";
                    this.errors = {};
                })
                .catch(error => {
                    console.error(error['image_paths.0']);
                    console.error(error);
                    this.errors = error;


                    // Reset the imageErrors array
                    this.imageErrors = new Array(this.imageFiles.length).fill('');

                    // Populate the imageErrors array based on the backend validation errors
                    Object.keys(this.errors).forEach(key => {
                        if (key.startsWith('image_paths.')) {
                            const index = parseInt(key.split('.')[1], 10);
                            if (!isNaN(index) && index < this.imageErrors.length) {
                                this.imageErrors[index] = this.errors[key].join(', ');

                            }
                        }
                    });

                    console.error(this.imageErrors);
                });
        },

        // ...mapActions(['submitResidentialCleaningRequest']),

        handleFileUpload(event) {
            const files = event.target.files;
            this.imageSrcs = [];
            this.imageFiles = []; // Reset to accept the new set of files
            this.imageErrors = []; // Reset errors on new file upload

            if (files) {
                for (let i = 0; i < files.length; i++) {
                    this.imageFiles.push(files[i]); // Storing the File object

                    // Creating a FileReader to load the image as a data URL for preview
                    const reader = new FileReader();
                    reader.onload = e => {
                        this.imageSrcs.push(e.target.result);
                    };
                    reader.readAsDataURL(files[i]);

                    // Initialize the error message for each file
                    this.imageErrors.push('');
                }
            }
        },



    }
};
</script>
<style scoped>
.request-form-container {
    text-align: center;
    padding-top: 2rem;
}

.appointment {
    max-width: 60%;
    margin: auto;
    padding: 20px;
    box-shadow: 0 4px 8px rgba(0, 0, 0, 0.1);
    border-radius: 5px;
    background-color: #ffffff;
    display: inline-block;
    text-align: left;
}

.form-section {
    margin-bottom: 20px;
}

.form-input,
.form-textarea {
    width: 100%;
    padding: 8px;
    margin-top: 20px;
    border: 1px solid #ccc;
    border-radius: 4px;
}

.form-checkbox-label {
    display: block;
    margin-top: 10px;
    cursor: pointer;
}

.form-input-file {
    margin-top: 10px;
}

.form-submit-btn {
    width: 100%;
    padding: 10px;
    margin-top: 20px;
    background-color: orange;
    border: none;
    border-radius: 4px;
    color: white;
    cursor: pointer;
}

.form-logo {
    width: 150px;
    height: auto;
    margin-bottom: 2rem;
}

.form-header {
    font-size: 1.0em;
    color: #333;
    margin-bottom: 1em;
    margin-top: 1em;
}

.form-group {
    margin-bottom: 1em;
    position: relative;
}

.date-input {
    width: 100%;
    padding: 10px;
    border: 1px solid #ccc;
    border-radius: 4px;
    background-color: white;
    -webkit-appearance: none;
    -moz-appearance: none;
    appearance: none;
    cursor: pointer;
}

.date-input::-webkit-calendar-picker-indicator {
    color: rgba(0, 0, 0, 0);
    background: none;
    z-index: 1;
    opacity: 1;
}

.date-input::placeholder {
    color: transparent;
}

.form-label {
    pointer-events: none;
    position: absolute;
    left: 10px;
    top: 10px;
    transition: all 0.3s;
    opacity: 0.7;
}

.date-input:focus+.form-label,
.date-input:not(:placeholder-shown)+.form-label {
    top: -10px;
    left: 10px;
    font-size: 12px;
    opacity: 1;
    background: white;
    padding: 0 5px;
}

.checkbox-group {
    margin-top: 1em;
}

.form-checkbox-label {
    display: block;
    margin-bottom: 10px;
}

.form-checkbox-label input[type="checkbox"] {
    margin-right: 10px;
}

.file-upload-container {
    border: 2px dashed #ccc;
    border-radius: 4px;
    text-align: center;
    padding: 10px;
    cursor: pointer;
    position: relative;
    transition: background-color 0.3s;
}

.file-upload-container:hover {
    background-color: #f3f3f3;
}

.form-input-file {
    width: 100%;
    height: 100%;
    opacity: 0;
    position: absolute;
    top: 0;
    left: 0;
    cursor: pointer;
}

.file-upload-label {
    display: inline-block;
    margin-top: 20px;
    font-size: 0.9em;
    color: #666;
}

.form-input-date::placeholder {
    color: #888;
}

.image-upload-container {
    border: 2px dashed #ccc;
    padding: 20px;
    text-align: center;
    margin-top: 20px;
    cursor: pointer;
}

.image-upload-label {
    display: block;
    padding: 10px;
    background: #f5f5f5;
    border: 1px solid #ddd;
    margin-bottom: 10px;
}

.form-input-file {
    width: 100%;
    padding: 10px;
    margin-top: 10px;
    border: none;
    visibility: hidden;
    position: absolute;
    z-index: -1;
}

.image-preview-container {
    display: flex;
    flex-wrap: wrap;
    gap: 10px;
    justify-content: center;
    margin-top: 10px;
}

.image-preview {
    max-width: 100px;
    max-height: 100px;
    object-fit: cover;
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

.btn-container {
    display: flex;
    max-width: 60%;
    margin: auto;
    padding: 5px;
}

select {
    height: 35px;
    /* margin-top:30px; */
}


.extras-list {
    display: flex;
    flex-direction: column;
}

.checkbox-container {
    display: block;
    position: relative;
    padding-left: 35px;
    margin-bottom: 12px;
    cursor: pointer;
    user-select: none;
}

/* Hide the browser's default checkbox */
.checkbox-container input {
    position: absolute;
    opacity: 0;
    cursor: pointer;
    height: 0;
    width: 0;
}

/* Create a custom checkbox */
.checkmark {
    position: absolute;
    top: 0;
    left: 0;
    height: 25px;
    width: 25px;
    background-color: #eee;
}

/* On mouse-over, add a grey background color */
.checkbox-container:hover input~.checkmark {
    background-color: #ccc;
}

/* When the checkbox is checked, add a blue background */
.checkbox-container input:checked~.checkmark {
    background-color: #2196F3;
}

/* Create the checkmark/indicator (hidden when not checked) */
.checkmark:after {
    content: "";
    position: absolute;
    display: none;
}

/* Show the checkmark when checked */
.checkbox-container input:checked~.checkmark:after {
    display: block;
}

/* Style the checkmark/indicator */
.checkbox-container .checkmark:after {
    left: 9px;
    top: 5px;
    width: 5px;
    height: 10px;
    border: solid white;
    border-width: 0 3px 3px 0;
    -webkit-transform: rotate(45deg);
    -ms-transform: rotate(45deg);
    transform: rotate(45deg);
}
</style>