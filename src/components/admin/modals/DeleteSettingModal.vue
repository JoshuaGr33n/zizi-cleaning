<template>
    <div class="modal">
        <div class="modal-content">
            <span class="close" @click="close">&times;</span>
            <h2>Delete Setting</h2>
            <p>Are you sure you want to delete the setting "{{ setting.name }}"?</p>
            <button @click="deleteSetting" class="delete-btn">Delete</button>
            <button @click="close" class="cancel-btn">Cancel</button>
        </div>
    </div>
</template>

<script>
export default {
    props: ['setting'],
    methods: {
        close() {
            this.$emit('close');
        },
        deleteSetting() {
            this.$emit('delete', this.setting.id);
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

.delete-btn{
    background-color: #FF0000;
    color: white;
    padding: 14px 20px;
    margin: 8px 0;
    border: none;
    cursor: pointer;
    border-radius: 5px;
}
.delete-btn:hover {
    background-color: #8B0000;
}

.cancel-btn {
    background-color: #004d40;
    color: white;
    padding: 14px 20px;
    margin: 8px 0;
    border: none;
    cursor: pointer;
    border-radius: 5px;
}

.cancel-btn:hover {
    background-color: #00382e;
}
</style>