<template>
    <div class="modal">
        <div class="modal-content">
            <span class="close" @click="close">&times;</span>
            <h2>Create New Setting</h2>
            <form @submit.prevent="submitForm">
                <div class="form-group">
                    <label for="name">Name:</label>
                    <input type="text" id="name" v-model="newSetting.name">
                    <p v-if="errors.name" class="error-message">{{ errors.name[0] }}</p>
                </div>

                <div class="form-group">
                    <label for="url">URL:</label>
                    <input type="url" id="url" v-model="newSetting.url">
                    <p v-if="errors.url" class="error-message">{{ errors.url[0] }}</p>
                </div>

                <div class="form-group">
                    <label for="image">Image:</label>
                    <input type="file" id="image" @change="handleFileUpload">
                    <p v-if="errors.image" class="error-message">{{ errors.image[0] }}</p>
                </div>

                <div class="form-group">
                    <label for="tag">Tag:</label>
                    <input type="text" id="tag" v-model="newSetting.tag" required>
                    <p v-if="errors.tag" class="error-message">{{ errors.tag[0] }}</p>
                </div>

                <div class="form-group">
                    <label for="value">Value:</label>
                    <input type="text" id="value" v-model="newSetting.value">
                    <p v-if="errors.value" class="error-message">{{ errors.value[0] }}</p>
                </div>
                <div class="form-group">
                    <label for="category">Category:</label>
                    <select id="category" v-model="newSetting.category" required>
                        <option disabled value="">Please select one</option>
                        <option>Phone</option>
                        <option>Email</option>
                        <option>Socials</option>
                        <option>FrontPage</option>
                        <option>Logo</option>
                        <option>Address</option>
                        <option>RequestEmail</option>
                        <option>RequestSupportEmail</option>
                    </select>
                    <p v-if="errors.category" class="error-message">{{ errors.category[0] }}</p>
                </div>

                <div class="form-group">
                    <label for="desc">Description:</label>
                    <textarea id="desc" v-model="newSetting.desc"></textarea>
                    <p v-if="errors.desc" class="error-message">{{ errors.desc[0] }}</p>
                </div>

                <button type="submit">Create Setting</button>
            </form>
        </div>

    </div>
</template>

<script>
export default {
    data() {
        return {
            newSetting: {
                name: '',
                url: '',
                image: '',
                tag: '',
                value: '',
                category: '',
                desc: '',
            },
            errors: {},
        };
    },
    watch: {
        'newSetting.name'(newValue) {
            if (newValue && newValue.length > 0) {
                this.errors.name = undefined;
            } else if (newValue.length === 0 || !newValue) {
                this.errors.name = ['Name is required'];
                console.log(this.errors.name)
            }
            this.errors = { ...this.errors };
        },
    },
    methods: {
        submitForm() {
            this.$store.dispatch('createSetting', this.newSetting)
                .then(() => {
                    this.close(); // Close the modal on success
                })
                .catch(errors => {
                    console.error(errors);
                    this.errors = errors;
                });
        },
        handleFileUpload(event) {
            this.newSetting.image = event.target.files[0];
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