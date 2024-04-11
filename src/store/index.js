import { createStore } from 'vuex';
import axios from '@/api/axios';


function getDefaultState() {
  return {
    userProfile: null,
    settings: [],
    socials: [],
    phone: [],
    emails: [],
    addresses: [],
    requestSupportEmail: [],
    appointments: [],
    appointmentDetails: [],
    commercialAppointments: [],
    residentialAppointments: [],
    appointmentStatus: [],
    countCommercialAppointments: null,
    countResidentialAppointments: null,
    adminStaffList: [],
    staffProfile: null,
  };
}

export default createStore({


  // state: {
  //   userProfile: null,
  //   settings: [],
  //   socials: [],
  //   phone: [],
  //   emails: [],
  //   addresses: [],
  //   requestSupportEmail: [],
  //   appointments: [],
  //   appointmentDetails: [],
  //   commercialAppointments: [],
  //   residentialAppointments: [],
  //   appointmentStatus: [],
  //   countCommercialAppointments: null,
  //   countResidentialAppointments: null,
  //   adminStaffList: [],
  // },

  state: getDefaultState(),

  mutations: {

    resetState(state) {
      // Reset the state object to its initial state
      Object.assign(state, getDefaultState());
    },

    setUserProfile(state, userProfile) {
      state.userProfile = userProfile;
    },
    updateProfileField(state, { field, value }) {
      if (state.userProfile) {
        state.userProfile[field] = value;
      }
    },
    setSettings(state, settings) {
      state.settings = settings;
    },
    addSetting(state, newSetting) {
      state.settings.push(newSetting);
    },
    updateSetting(state, updatedSetting) {
      const index = state.settings.findIndex(s => s.id === updatedSetting.id);
      if (index !== -1) {
        state.settings.splice(index, 1, updatedSetting);
      }
    },
    setSocials(state, socials) {
      state.socials = socials;
    },
    setPhone(state, phone) {
      state.phone = phone;
    },
    setEmails(state, emails) {
      state.emails = emails;
    },
    setAddresses(state, addresses) {
      state.addresses = addresses;
    },
    setRequestSupportEmail(state, requestSupportEmail) {
      state.requestSupportEmail = requestSupportEmail;
    },
    setAppointments(state, appointments) {
      state.appointments.push(appointments);
    },
    setAppointmentDetails(state, appointmentDetails) {
      state.appointmentDetails = appointmentDetails;
    },

    setAppointmentStatus(state, appointmentStatus) {
      state.appointmentStatus = appointmentStatus;
    },

    setCommercialAppointments(state, commercialAppointments) {
      state.commercialAppointments = commercialAppointments;
    },
    setResidentialAppointments(state, residentialAppointments) {
      state.residentialAppointments = residentialAppointments;
    },

    updateAppointmentStatus(state, { id, status }) {
      if (state.appointmentDetails && state.appointmentDetails.id === id) {
        state.appointmentDetails.status = status;
      }
    },
    setCountCommercialAppointments(state, countCommercialAppointments) {
      state.countCommercialAppointments = countCommercialAppointments;
    },
    setCountResidentialAppointments(state, countResidentialAppointments) {
      state.countResidentialAppointments = countResidentialAppointments;
    },
    setAdminStaffList(state, adminStaffList) {
      state.adminStaffList = adminStaffList;
    },
    clearUserProfileAndToken(state) {
      state.userProfile = null;
      localStorage.removeItem('token');
    },
    addStaff(state, newStaff) {
      state.adminStaffList.push(newStaff);
    },
    setStaffProfile(state, staffProfile) {
      state.staffProfile = staffProfile;
    },

  },
  actions: {
    initializeStore({ dispatch }) {
      const token = localStorage.getItem('token');
      if (token) {
        dispatch('fetchUserProfile');
      }
    },
    async fetchUserProfile({ commit, dispatch }) {
      axios.get('/profile', {
        headers: {
          'Authorization': `Bearer ${localStorage.getItem('token')}`,
        },
      })
        .then(response => {
          commit('setUserProfile', response.data.data);
          dispatch('checkUserActiveStatus');
        })
        .catch(error => {
          console.error('Error fetching user profile:', error);
        });
    },
    async updateProfile({ commit, dispatch }, profileData) {
      try {
        const response = await axios.put('/admin/update-profile', profileData, {
          headers: { 'Authorization': `Bearer ${localStorage.getItem('token')}` },
        });
        commit('setUserProfile', response.data.data);
        dispatch('fetchUserProfile');
        return null; // Indicates success
      } catch (error) {
        if (error.response && error.response.status === 422) {
          return error.response.data.errors; // Return validation errors to the caller
        }
        console.error("Error updating profile:", error);
        return { _error: "An unexpected error occurred." }; // General error
      }
    },
    async uploadProfileImage({ commit, dispatch }, imageData) {
      try {
        const formData = new FormData();
        formData.append('image', imageData.file);
        const response = await axios.post('/admin/upload-image', formData, {
          headers: {
            'Content-Type': 'multipart/form-data',
            'Authorization': `Bearer ${localStorage.getItem('token')}`,
          },
        });
        commit('setUserProfile', response.data.data);
        dispatch('fetchUserProfile'); // Fetch updated profile to reflect new image
        return null;
      } catch (error) {
        if (error.response && error.response.status === 422) {
          return error.response.data.errors;
        }
        console.error("Error uploading profile image:", error);
        return { _error: "An unexpected error occurred." };

      }
    },
    async fetchSettings({ commit }) {
      try {
        const response = await axios.get('/admin/settings', {
          headers: {
            'Authorization': `Bearer ${localStorage.getItem('token')}`,
          },
        });
        commit('setSettings', response.data.data);
      } catch (error) {
        console.error('Error fetching settings:', error);
      }
    },

    async createSetting({ commit, dispatch }, newSetting) {
      try {
        const formData = new FormData();
        formData.append('name', newSetting.name);
        formData.append('url', newSetting.url || ''); // Handle null or undefined
        formData.append('tag', newSetting.tag);
        formData.append('value', newSetting.value);
        formData.append('category', newSetting.category);
        formData.append('desc', newSetting.desc);
        if (newSetting.image) {
          formData.append('image', newSetting.image);
        }

        const response = await axios.post('/admin/create-setting', formData, {
          headers: {
            'Authorization': `Bearer ${localStorage.getItem('token')}`,
            'Content-Type': 'multipart/form-data',
          },
        });

        commit('addSetting', response.data);
        dispatch('fetchSettings'); // refresh the list
      } catch (error) {
        if (error.response && error.response.status === 422) {
          // Pass validation errors back to the component
          throw error.response.data.errors;
        } else {
          console.error("Error creating setting:", error);
          throw { _error: "An unexpected error occurred." };
        }
      }
    },

    async updateSetting({ commit, dispatch }, { updatedSetting, newSetting }) {
      try {

        const formData = new FormData();
        formData.append('name', updatedSetting.name);
        formData.append('url', updatedSetting.url || ''); // Handle null or undefined
        formData.append('tag', updatedSetting.tag);
        formData.append('value', updatedSetting.value);
        formData.append('category', updatedSetting.category);
        formData.append('desc', updatedSetting.desc);
        if (newSetting.image) {
          formData.append('image', newSetting.image);
        }

        const response = await axios.post(`/admin/update-setting/${updatedSetting.id}`, formData, {
          headers: {
            'Authorization': `Bearer ${localStorage.getItem('token')}`,
            'Content-Type': 'multipart/form-data',
          },
        });
        commit('updateSetting', response.data);
        dispatch('fetchSettings');
      } catch (error) {
        if (error.response && error.response.status === 422) {
          throw error.response.data.errors;
        } else {
          console.error("Error updating setting:", error);
          throw { _error: "An unexpected error occurred." };
        }
      }
    },
    async deleteSetting({ dispatch }, settingId) {
      try {
        await axios.delete(`/admin/delete-setting/${settingId}`, {
          headers: { 'Authorization': `Bearer ${localStorage.getItem('token')}` },
        });
        dispatch('fetchSettings');
      } catch (error) {
        console.error("Error deleting setting:", error);
      }
    },
    async fetchSocials({ commit, dispatch }) {
      try {
        const response = await axios.get('/settings/Socials');
        commit('setSocials', response.data.data);
        dispatch('fetchSocials');
      } catch (error) {
        console.error('Error fetching socials:', error);
      }
    },
    async fetchPhone({ commit, dispatch }) {
      try {
        const response = await axios.get('/settings/Phone');
        commit('setPhone', response.data.data);
        dispatch('fetchPhone');
      } catch (error) {
        console.error('Error fetching phone:', error);
      }
    },
    async fetchEmails({ commit, dispatch }) {
      try {
        const response = await axios.get('/settings/Email');
        commit('setEmails', response.data.data);
        dispatch('fetchEmails');
      } catch (error) {
        console.error('Error fetching emails:', error);
      }
    },
    async fetchAddresses({ commit, dispatch }) {
      try {
        const response = await axios.get('/settings/Address');
        commit('setAddresses', response.data.data);
        dispatch('fetchAddresses');
      } catch (error) {
        console.error('Error fetching addresses:', error);
      }
    },

    async fetchRequestSupportEmail({ commit, dispatch }) {
      try {
        const response = await axios.get('/settings/RequestSupportEmail');
        commit('setRequestSupportEmail', response.data.data);
        dispatch('fetchRequestSupportEmail');
      } catch (error) {
        console.error('Error fetching request support email address:', error);
      }
    },

    async submitResidentialCleaningRequest({ commit }, payload) {
      try {
        const response = await axios.post('/book-residential-request', payload, {
          // headers: { 'Content-Type': 'application/json' }
        });
        commit('setAppointments', response.data);
        return response;
      } catch (error) {

        if (error.response && error.response.status === 422) {
          throw error.response.data.errors;
        } else {
          console.error('Error submitting cleaning request:', error);
          throw { _error: "An unexpected error occurred." };
        }
      }
    },

    async submitCommercialCleaningRequest({ commit }, payload) {
      try {
        const response = await axios.post('/book-commercial-request', payload, {
        });
        commit('setAppointments', response.data);
        return response;
      } catch (error) {

        if (error.response && error.response.status === 422) {
          throw error.response.data.errors;
        } else {
          console.error('Error submitting cleaning request:', error);
          throw { _error: "An unexpected error occurred." };
        }
      }
    },

    async fetchAppointmentDetails({ commit }, appointmentId) {
      try {
        const response = await axios.get(`/appointment/${appointmentId}`);
        commit('setAppointmentDetails', response.data);
        return response;
      } catch (error) {
        console.error('Error fetching appointment:', error);
      }
    },

    async fetchAppointmentStatus({ commit }, appointmentId) {
      try {
        const response = await axios.get(`/appointment/${appointmentId}`);
        commit('setAppointmentStatus', response.data);
        return response;
      } catch (error) {
        console.error('Error fetching appointment:', error);
      }
    },

    async fetchCommercialAppointments({ commit }) {
      try {
        const response = await axios.get(`/admin/appointments/commercial`, {
          headers: { 'Authorization': `Bearer ${localStorage.getItem('token')}` },
        });
        commit('setCommercialAppointments', response.data.data);
        return response;
      } catch (error) {
        console.error('Error fetching appointments:', error);
      }
    },

    async fetchResidentialAppointments({ commit }) {
      try {
        const response = await axios.get(`/admin/appointments/residential`, {
          headers: { 'Authorization': `Bearer ${localStorage.getItem('token')}` },
        });
        console.log("Fetched appointments:", response.data.data);
        commit('setResidentialAppointments', response.data.data);
        return response;
      } catch (error) {
        console.error('Error fetching appointments:', error);
      }
    },
    async toggleRead({ commit }, payload) {
      const { tag, appointment } = payload;
      appointment.read = !appointment.read;
      const action = appointment.read ? 'read' : 'unread';
      try {
        const response = await axios.post(`/admin/appointments/${appointment.id}/toggle-read/${tag}`, { read: appointment.read }, {
          headers: { 'Authorization': `Bearer ${localStorage.getItem('token')}` },
        });
        console.log(`Appointment marked as ${action}`);
        commit('setAppointments', response.data);
        return response;
      } catch (error) {
        console.error(`Error marking appointment as ${action}`, error);
        appointment.read = !appointment.read;
      }
    },
    async updateStatus({ commit }, payload) {
      const { id, status } = payload;
      try {
        const response = await axios.post(`/admin/appointments/${id}/update-status`, { status }, {
          headers: { 'Authorization': `Bearer ${localStorage.getItem('token')}` },
        });
        console.log(`Appointment marked as ${status} ${id}`);
        // commit('setAppointmentDetails', response.data.data);
        commit('setAppointmentStatus', response.data.data);
        // dispatch('fetchAppointmentDetails', id);
        return response.data;
      } catch (error) {
        console.error(`Error marking appointment as ${status}`, error);
      }
    },

    async updateStatusTwo({ commit }, payload) {
      const { id, status } = payload;
      try {
        const response = await axios.post(`/appointments/${id}/update-status`, { status }, {

        });
        console.log(`Appointment marked as ${status} ${id}`);
        commit('setAppointmentStatus', response.data.data);
        return response.data;
      } catch (error) {
        console.error(`Error marking appointment as ${status}`, error);
      }
    },

    async deleteAppointment({ dispatch }, appointmentId) {
      try {
        await axios.delete(`/admin/delete-appointment/${appointmentId}`, {
          headers: { 'Authorization': `Bearer ${localStorage.getItem('token')}` },
        });
        dispatch('fetchAppointmentDetails', appointmentId);
      } catch (error) {
        console.error("Error deleting appointment:", error);
      }
    },

    async fetchUreadCommercialCount({ commit, dispatch }) {
      try {
        const response = await axios.get('/admin/appointments/commercial/count', {
          headers: { 'Authorization': `Bearer ${localStorage.getItem('token')}` },
        });
        commit('setCountCommercialAppointments', response.data);
        dispatch('fetchUreadCommercialCount');
      } catch (error) {
        console.error('Error fetching number of unread commercial appointments:', error);
      }
    },

    async fetchUreadResidentialCount({ commit, dispatch }) {
      try {
        const response = await axios.get('/admin/appointments/residential/count', {
          headers: { 'Authorization': `Bearer ${localStorage.getItem('token')}` },
        });
        commit('setCountResidentialAppointments', response.data);
        dispatch('fetchUreadResidentialCount');
      } catch (error) {
        console.error('Error fetching number of unread residential appointments:', error);
      }
    },

    async fetchAdminStaffList({ commit }) {
      try {
        const response = await axios.get(`/get-admins-staff`, {
        });
        commit('setAdminStaffList', response.data.data);
        return response;
      } catch (error) {
        console.error('Error fetching list:', error);
      }
    },
    checkUserActiveStatus({ commit, state }, { router }) {
      if (state.userProfile && state.userProfile.is_active === 0) {
        commit('clearUserProfileAndToken');
        if (router) router.push('/login');
      }
    },

    async toggleUserStatus({ commit, state }, payload) {
      const { user } = payload;
      try {
        const response = await axios.post(`/admin/user/${user.id}/toggle-status`, { is_active: !user.is_active }, {
          headers: { 'Authorization': `Bearer ${localStorage.getItem('token')}` },
        });
        if (response && response.data) {
          // Find and update the user directly in the state
          const userIndex = state.adminStaffList.findIndex(u => u.id === user.id);
          if (userIndex !== -1) {
            const updatedUsers = [...state.adminStaffList];
            updatedUsers[userIndex] = { ...updatedUsers[userIndex], is_active: !updatedUsers[userIndex].is_active };
            commit('setAdminStaffList', updatedUsers); // Reuse existing mutation to set the updated list
          }
          console.log(`User successfully ${user.is_active ? 'deactivated' : 'activated'}.`);
        }
      } catch (error) {
        console.error(`Error toggling user status: ${error}`);
      }
    },

    async createStaff({ commit, dispatch }, newStaff) {
      try {
        const formData = new FormData();
        formData.append('first_name', newStaff.first_name);
        formData.append('middle_name', newStaff.middle_name);
        formData.append('last_name', newStaff.last_name);
        formData.append('gender', newStaff.gender);
        formData.append('email', newStaff.email);
        formData.append('email_confirmation', newStaff.email_confirmation);
        formData.append('phone', newStaff.phone);
        formData.append('phone_confirmation', newStaff.phone_confirmation);
        formData.append('role', newStaff.role);

        const response = await axios.post('/admin/create-staff', formData, {
          headers: {
            'Authorization': `Bearer ${localStorage.getItem('token')}`,
            'Content-Type': 'multipart/form-data',
          },
        });

        commit('addStaff', response.data);
        dispatch('fetchAdminStaffList'); // refresh the list
      } catch (error) {
        if (error.response && error.response.status === 422) {
          // Pass validation errors back to the component
          throw error.response.data.errors;
        } else {
          console.error("Error creating staff:", error);
          throw { _error: "An unexpected error occurred." };
        }
      }
    },

    async toggleUserStatusInside({ commit, dispatch }, { user }) {
      try {
        const response = await axios.post(`/admin/user/${user.id}/toggle-status`, { is_active: !user.is_active }, {
          headers: { 'Authorization': `Bearer ${localStorage.getItem('token')}` },
        });
        if (response && response.data) {
          commit('setStaffProfile', response.data.data);
          dispatch('fetchStaffProfile', user.id ); 
          console.log(`User successfully ${user.is_active ? 'deactivated' : 'activated'}.`);
        }
      } catch (error) {
        console.error(`Error toggling user status: ${error}`);
      }
    },
    async updateUserRole({ commit, dispatch }, payload ) {
      const { user, role } = payload;
      try {
        const response = await axios.post(`/admin/user/${user.id}/update-role`, { role: role }, {
          headers: { 'Authorization': `Bearer ${localStorage.getItem('token')}` },
        });
        if (response && response.data) {
          commit('setStaffProfile', response.data.data);
          dispatch('fetchStaffProfile', user.id ); 
        }
      } catch (error) {
        console.error(`Error toggling user role: ${error}`);
      }
    },
    async fetchStaffProfile({ commit, state }, staffId) {
      try {
        const response = await axios.get(`/admin/staff/${staffId}`, {
          headers: { 'Authorization': `Bearer ${localStorage.getItem('token')}` },
        });
        if ((state.userProfile.role === 'SubAdmin' && response.data.data.role === 'SubAdmin') || response.data.data.id === state.userProfile.id) {
          throw new Error('restrictedAccess'); // Signal component to restrict access
        }
        commit('setStaffProfile', response.data.data);
      } catch (error) {
        console.error('Error fetching staff profile:', error);
        if (error.response && error.response.status === 406) {
          throw new Error('redirectToDashboard'); // Signal component to redirect
        }
        throw error;
      }
    },
    async deleteStaff({ dispatch }, staffId) {
      try {
        await axios.delete(`/admin/staff/${staffId}/delete`, {
          headers: { 'Authorization': `Bearer ${localStorage.getItem('token')}` },
        });
        dispatch('fetchStaffProfile', staffId);
      } catch (error) {
        console.error("Error deleting staff:", error);
      }
    },



  },
});
