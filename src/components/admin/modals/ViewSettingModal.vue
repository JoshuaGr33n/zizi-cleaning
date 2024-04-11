<template>
    <div class="modal">
        <div class="modal-content">
            <span class="close" @click="close">&times;</span>
            <h2>Setting Details</h2>
            <div class="setting-details">
                <p><strong>Name:</strong> {{ setting.name }}</p>
                <p><strong>URL:</strong> {{ setting.url }}</p>
                <p><strong>Value:</strong> {{ setting.value }}</p>
                <p><strong>Image:</strong>
                    <img :src="setting.image" alt="Setting Image" v-if="setting.image" />
                </p>
                <p><strong>Tag:</strong> {{ setting.tag }}</p>
                <p><strong>Category:</strong> {{ setting.category }}</p>
                <p><strong>Description:</strong> {{ setting.desc }}</p>
            </div>
        </div>
    </div>
</template>

<script>
export default {
    props: ['setting'],
    methods: {
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

img{
    width:200px;
    height: auto;
}
</style>