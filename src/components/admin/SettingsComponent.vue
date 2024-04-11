<template>
    <div class="admin-panel">
        <SidebarComponent />
        <div class="main-content">
            <AdminHeaderComponent>Settings</AdminHeaderComponent>
            <main class="content">
                <div class="settings-component">
                    <button @click="showCreateModal = true" class="create-new-setting-btn">Create New Setting</button>
                    <transition name="modal">
                        <CreateSettingModal v-if="showCreateModal" @close="showCreateModal = false"
                            @create-setting="handleCreateSetting" />
                    </transition>

                    <transition name="modal">
                        <UpdateSettingModal v-if="showUpdateModal" :setting="editingSetting"
                            @close="showUpdateModal = false" @update-setting="handleUpdateSetting" />
                    </transition>
                    <transition name="modal">
                        <ViewSettingModal v-if="viewSettingModal" :setting="currentViewSetting"
                            @close="viewSettingModal = false" />
                    </transition>
                    <transition name="modal">
                        <DeleteSettingModal v-if="isDeleteModalVisible" :setting="currentDeleteSetting"
                            @close="isDeleteModalVisible = false" @delete="deleteSetting" />
                    </transition>

                    <div class="filters">
                        <input v-model="searchQuery" placeholder="Search..." />
                        <select v-model="selectedCategory">
                            <option value="">Filter by Category</option>
                            <option>Phone</option>
                            <option>Email</option>
                            <option>Socials</option>
                            <option>FrontPage</option>
                            <option>Logo</option>
                            <option>Address</option>
                            <option>RequestEmail</option>
                            <option>RequestSupportEmail</option>
                        </select>
                    </div>

                    <table class="settings-table">
                        <thead>
                            <tr>
                                <th>#</th>
                                <th>Name</th>
                                <th>URL</th>
                                <th>Value</th>
                                <th>Image</th>
                                <th>Tag</th>
                                <th>Category</th>
                                <th>Actions</th>
                            </tr>
                        </thead>
                        <tbody>
                            <tr v-for="(setting, index) in filteredSettings" :key="setting.id">
                                <td>{{ (currentPage - 1) * itemsPerPage + index + 1 }}</td>
                                <td>{{ setting.name }}</td>
                                <td>{{ setting.url }}</td>
                                <td>{{ setting.value }}</td>
                                <td>
                                    <img :src="setting.image" alt="Setting Image" v-if="setting.image" />
                                </td>
                                <td>{{ setting.tag }}</td>
                                <td>{{ setting.category }}</td>
                                <td>
                                    <button @click="showEditModal(setting)" class="action-edit-btn">Edit</button>
                                    <button @click="showDetailsModal(setting)" class="action-view-btn">View</button>
                                    <button @click="showDeleteModal(setting)" class="action-delete-btn">Delete</button>
                                </td>


                            </tr>
                        </tbody>
                    </table>
                    <div class="pagination-controls">
                        <button v-for="page in totalPages" :key="page" @click="setPage(page)">
                            {{ page }}
                        </button>
                    </div>


                    <CreateSettingModal v-if="showCreateModal" @close="showCreateModal = false" />
                    <EditSettingModal v-if="currentSetting" :setting="currentSetting" @close="currentSetting = null" />
                    <DeleteSettingModal v-if="deleteSettingId" :settingId="deleteSettingId"
                        @close="deleteSettingId = null" />
                    <DetailsModal v-if="currentSetting" :setting="currentSetting" @close="currentSetting = null" />
                </div>
            </main>
        </div>
    </div>
</template>

<script>
import SidebarComponent from '@/components/admin/sections/SidebarComponent.vue';
import AdminHeaderComponent from '@/components/admin/sections/AdminHeaderComponent.vue';
import CreateSettingModal from './modals/CreateSettingModal.vue';
import UpdateSettingModal from './modals/UpdateSettingModal.vue';
import ViewSettingModal from './modals/ViewSettingModal.vue';
import DeleteSettingModal from './modals/DeleteSettingModal.vue';
export default {
    components: {
        SidebarComponent,
        AdminHeaderComponent,
        CreateSettingModal,
        UpdateSettingModal,
        ViewSettingModal,
        DeleteSettingModal,

    },
    data() {
        return {
            showCreateModal: false,
            currentSetting: null,
            deleteSettingId: null,
            showUpdateModal: false,
            editingSetting: null,
            viewSettingModal: false,
            currentViewSetting: null,
            isDeleteModalVisible: false,
            currentDeleteSetting: null,
            searchQuery: '',
            selectedCategory: '',
            currentPage: 1,
            itemsPerPage: 5,
        };
    },
    created() {
        // this.fetchSettings();
        this.$store.dispatch('fetchSettings');
    },
    computed: {
        settings() {
            return this.$store.state.settings;
        },
        filteredSettings() {
            const start = (this.currentPage - 1) * this.itemsPerPage;
            const end = start + this.itemsPerPage;

            const settings = Array.isArray(this.settings) ? this.settings : [];
            const filtered = settings.filter(setting => {
                const matchesCategory = this.selectedCategory ? setting.category.includes(this.selectedCategory) : true;
                const matchesSearchQuery = this.searchQuery ? (
                    setting.id.toString().includes(this.searchQuery) ||
                    setting.name.includes(this.searchQuery) ||
                    // setting.created_at.includes(this.searchQuery) ||
                    setting.category.includes(this.searchQuery) ||
                    setting.tag.includes(this.searchQuery) ||
                    setting.value.includes(this.searchQuery)
                ) : true;

                return matchesCategory && matchesSearchQuery;
            });

            return filtered.slice(start, end);
        },
        totalPages() {
            const settings = Array.isArray(this.settings) ? this.settings : [];
            const filtered = settings.filter(setting => {
                const matchesCategory = this.selectedCategory ? setting.category.includes(this.selectedCategory) : true;
                const matchesSearchQuery = this.searchQuery ? (
                    setting.id.toString().includes(this.searchQuery) ||
                    setting.name.includes(this.searchQuery) ||
                    // setting.created_at.includes(this.searchQuery) ||
                    setting.category.includes(this.searchQuery) ||
                    setting.tag.includes(this.searchQuery) ||
                    setting.value.includes(this.searchQuery)
                ) : true;

                return matchesCategory && matchesSearchQuery;
            });
            return Math.ceil(filtered.length / this.itemsPerPage);
        },
    },
    methods: {
        showEditModal(setting) {
            this.editingSetting = JSON.parse(JSON.stringify(setting));
            this.showUpdateModal = true;
        },
        showDeleteModal(setting) {
            this.currentDeleteSetting = setting;
            this.isDeleteModalVisible = true;
        },
        deleteSetting(settingId) {
            this.$store.dispatch('deleteSetting', settingId)
                .then(() => {
                    this.isDeleteModalVisible = false;
                })
                .catch(error => {
                    console.error("Error deleting setting:", error);
                });
        },
        showDetailsModal(setting) {
            this.currentViewSetting = setting;
            this.viewSettingModal = true;
        },
        setPage(pageNumber) {
            this.currentPage = pageNumber;
        },
    },
};
</script>

<style scoped>
.settings-table {
    width: 100%;
    border-collapse: collapse;
    margin-top: 10px;
}

.settings-table thead {
    background-color: #f58634;
    color: #fff;
}

.settings-table thead th {
    padding: 10px;
    text-align: left;
}

.settings-table tbody td {
    padding: 10px;
    border-bottom: 1px solid #ddd;
}

.settings-table img {
    width: 50px;
    height: auto;
}


/* Fade transition */
.modal-enter-active,
.modal-leave-active {
    transition: opacity 0.5s;
    opacity: 1;
}

.modal-enter,
.modal-leave-to

/* .modal-leave-active in <2.1.8 */
    {
    opacity: 0;
}

/* Slide transition */
.modal-enter-active {
    transition: all 0.5s ease;
    transform: translateY(-20px);
    opacity: 0;
}

.modal-enter,
.modal-leave-to {
    transform: translateY(0px);
    opacity: 1;
}

.modal-leave-active {
    transition: all 0.3s ease;
    opacity: 0;
    transform: translateY(-20px);
}

.create-new-setting-btn {
    background-color: #004d40;
    color: white;
    padding: 10px 20px;
    margin-top: 20px;
    border: none;
    cursor: pointer;
    border-radius: 5px;
}

.create-new-setting-btn:hover {
    background-color: #00382e;
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

.action-delete-btn{
    background-color: #ff0000;
    color: #fff;
    border: 0;
}
.action-delete-btn:hover {
    background-color: #b92c2c;
}

.action-edit-btn{
    background-color: #004d40;
    color: #fff;
    border: 0;
}
.action-edit-btn:hover {
    background-color: #00382e;
}


.action-view-btn{
    background-color: #f58634;
    color: #fff;
    border: 0;
}
.action-view-btn:hover {
    background-color: #e47521;
}
</style>
