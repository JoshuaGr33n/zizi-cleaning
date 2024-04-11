<template>
  <header class="admin-header">
    <h1>
      <slot></slot>
    </h1>
    Hi {{ displayUser }}
    <router-link to="/profile"><button class="profile-btn">My Profile</button></router-link>
    <button @click="logout" class="logout-btn">Logout</button>
  </header>
</template>

<script>
import axios from '@/api/axios';

export default {
  name: 'AdminHeaderComponent',
  computed: {
    userProfile() {
      return this.$store.state.userProfile;
    },
    displayUser() {
      const userProfile = this.$store.state.userProfile;
      return userProfile ? `${userProfile.first_name} (${userProfile.role})` : 'Guest';
    },
  },
  // watch: {
  //     '$store.state.userProfile.is_active'(newVal) {
  //       if (newVal === 0) {
  //         this.handleUserDeactivation();
  //       }
  //     }
  //   },
  created() {
    if (!this.userProfile) {
      this.$store.dispatch('fetchUserProfile');
    }
    this.checkAuthentication();
    // this.$store.dispatch('checkUserActiveStatus', { router: this.$router });


    this.userStatusInterval = setInterval(() => {
      this.$store.dispatch('fetchUserProfile').then(() => {
        const isActive = this.$store.state.userProfile.is_active;
        if (isActive === 0) {
          // this.$store.dispatch('checkUserActiveStatus', { router: this.$router });
          this.logout();
         
        }

        // if(this.displayUser() == 'Guest'){
        //   this.logout();
        // }
      });
    }, 3000); // Check every 60 seconds
  },
  beforeUnmount() {
    clearInterval(this.userStatusInterval);
  },


  methods: {
    // handleUserDeactivation() {
    //   this.$store.commit('clearUserProfileAndToken');
    //   this.$router.push('/login');
    // },

    handleL() {
      this.$store.commit('resetState');
          localStorage.removeItem('token');
          this.$router.push('/login');
    },
    checkAuthentication() {
      const token = localStorage.getItem('token');
      if (!token) {
        this.logout();
      }
    },
    // isActiveCheck() {
    //   if (this.$store.state.userProfile.is_active == false) {
    //     localStorage.removeItem('token');
    //     this.$router.push('/login');
    //   }
    // },
    redirectToLogin() {
      this.$router.push({ name: 'Login' });
    },
    logout() {
      clearInterval(this.userStatusInterval); 
      axios.post('/logout', {}, {
        headers: {
          'Authorization': `Bearer ${localStorage.getItem('token')}`,
        },
      })
        .then(() => {
          this.$store.commit('resetState');
          localStorage.removeItem('token');
          this.$router.push('/login');
        })
        .catch(error => console.error('Logout error:', error));
    },
  },
};
</script>

<style scoped>
.admin-header {
  background-color: #f58634;
  color: white;
  padding: 1rem;
  display: flex;
  justify-content: space-between;
  align-items: center;
}

.profile-btn {
  background-color: #004d40;
  color: white;
  border: none;
  padding: 10px 20px;
  margin-left: 50px;
  cursor: pointer;
  border-radius: 4px;
}

.profile-btn:hover {
  background-color: #00382e;
}



.logout-btn {
  background-color: #ddd;
  color: #333;
  border: none;
  padding: 0.5rem 1rem;
  cursor: pointer;
  border-radius: 4px;
}

.logout-btn:hover {
  background-color: #ccc;
}
</style>