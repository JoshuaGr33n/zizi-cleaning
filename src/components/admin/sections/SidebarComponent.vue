<template>
  <aside class="sidebar">
    <div class="logo-container">
      <router-link to="/"><img :src="logo" alt="Logo" class="admin-logo"></router-link>
    </div>
    <nav>
      <ul>
        <li><router-link to="/dashboard" exact-active-class="active-link">Dashboard</router-link></li>
        <li :class="{ 'active-link': isActiveLink('Appointments') }">
          <router-link to="/select-appointment-type">Appointments ({{ unreadCommercialAppointmentsCount +
        unreadResidentialAppointmentsCount }})</router-link>
        </li>
        <li :class="{ 'active-link': isActiveLink('ManageStaffAdmin') }"><router-link to="/admins-staff"
            exact-active-class="active-link">Manage Staff & Admin</router-link>
        </li>
        <li v-if="userProfile.role === 'Admin' || userProfile.role === 'SubAdmin' "><router-link to="/settings" exact-active-class="active-link">Settings</router-link></li>
      </ul>
    </nav>
  </aside>
</template>

<script>

import { LOGO } from '@/api/config';

export default {
  name: 'SidebarComponent',
  data() {
    return {
      logo: LOGO,
    };
  },
  created() {
    this.$store.dispatch('fetchUreadResidentialCount');
    this.$store.dispatch('fetchUreadCommercialCount');
  },
  computed: {
    userProfile() {
      return this.$store.state.userProfile || {};
    },
    unreadCommercialAppointmentsCount() {
      return this.$store.state.countCommercialAppointments;
    },
    unreadResidentialAppointmentsCount() {
      return this.$store.state.countResidentialAppointments;
    },
  },
  methods: {
    isActiveLink(routeName) {
      const currentPath = this.$route.path;
      if (routeName === 'Appointments' &&
        (currentPath === '/select-appointment-type' || currentPath.startsWith('/residential') || currentPath.startsWith('/commercial'))) {
        return true;
      }

      if (routeName === 'ManageStaffAdmin' &&
        (currentPath === '/admins-staff' || currentPath.startsWith('/staff/'))) {
        return true;
      }
      return false;
    }
  }
};
</script>

<style scoped>
.sidebar {
  background-color: #004d40;
  color: white;
  width: 200px;
  flex-shrink: 0;
  display: flex;
  flex-direction: column;
}

.logo-container {
  padding: 1rem;
  text-align: center;
}

.admin-logo {
  max-width: 100%;
  height: auto;
}

.sidebar nav ul {
  list-style-type: none;
  padding: 0;
  margin: 0;
}

.sidebar nav ul li a {
  color: white;
  text-decoration: none;
  padding: 10px;
  display: block;
}

.active-link {
  background-color: rgba(255, 255, 255, 0.2);
}
</style>