<template>
  <div class="nav-container">
    <div :class="['top-nav', { 'fixed-nav': isFixed }]" ref="topNav">
      <!-- Simplify visibility control by using v-show on the hamburger icon as well -->
      <button @click="toggleNav" class="menu-icon">&#9776;</button>
      <!-- Apply v-show directly to the <ul> to control its visibility -->
      <ul v-show="navVisible || !isMobile">
        <li><a href="#home">Home</a></li>
        <li><a href="#about-us">About Us</a></li>
        <li><a href="#services">Services</a></li>
        <li><a href="#our-team">Our Team</a></li>
        <li><a href="#contact-us">Contact Us</a></li>
      </ul>
      <div class="navbar-buttons">
        <router-link to="/book-appointment"><button class="request-btn">Book Appointment</button></router-link>
        <button v-if="isLoggedIn" @click="dashboard" class="dashboard-btn">Dashboard</button>
        <router-link v-else to="/login"><button class="login-btn">Login</button></router-link>
      </div>
    </div>
    <nav class="navbar-container">
      <img :src="logo" alt="Logo" class="navbar-logo" />
    </nav>
  </div>
</template>



<script>
import { LOGO } from '@/api/config';
import axios from '@/api/axios';

export default {
  name: 'NavbarComponent',
  data() {
    return {
      isFixed: false,
      navVisible: false, // For toggling the nav visibility on mobile
      isMobile: false, // For detecting mobile view
      logo: LOGO,
    };
  },
  mounted() {
    window.addEventListener('scroll', this.handleScroll);
    window.addEventListener('resize', this.checkMobile);
    this.checkMobile(); // Initial check
  },
  unmounted() {
    window.removeEventListener('scroll', this.handleScroll);
    window.removeEventListener('resize', this.checkMobile);
  },
  computed: {
    isLoggedIn() {
      return !!localStorage.getItem('token');
    },
  },
  methods: {
    handleScroll() {
      const topNavHeight = this.$refs.topNav.clientHeight;
      this.isFixed = window.scrollY > topNavHeight;
    },
    toggleNav() {
      console.log('test');
      this.navVisible = !this.navVisible;
    },
    checkMobile() {
      this.isMobile = window.innerWidth < 768;
      if (!this.isMobile) {
        this.navVisible = true; // Ensure nav is always visible on non-mobile views
      }
    },
    logout() {
      axios.post('/logout', {}, {
        headers: {
          'Authorization': `Bearer ${localStorage.getItem('token')}`,
        },
      })
        .then(() => {
          localStorage.removeItem('token');
          this.$router.go(0);
        })
        .catch(error => console.error('Logout error:', error));
    },

    dashboard() {
      this.$router.push({ name: 'Dashboard' });
    },
  },
};
</script>

<style scoped>
.nav-container {
  position: relative;
  z-index: 1;
  /* Ensures the logo and navbar are above the top-nav */
}



.top-nav {
  display: flex;
  justify-content: space-between;
  align-items: center;
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  background-color: transparent;
  transition: all 0.3s;
  padding: 0 20px;
}

.top-nav ul {
  display: flex;
  list-style-type: none;
  margin: 0;
  padding: 0;
}

.top-nav li {
  float: left;
}

.top-nav li a {
  display: block;
  color: black;
  text-align: center;
  padding: 14px 16px;
  text-decoration: none;
}

.top-nav li a:hover {
  background-color: #ddd;
  color: black;
}

.fixed-nav {
  position: fixed;
  background-color: #efefef;
  box-shadow: 0 2px 5px rgba(0, 0, 0, 0.2);
  z-index: 1000;
}


.navbar-container {
  display: flex;
  justify-content: center;
  /* justify-content: space-between; */
  align-items: center;
  height: 200px;
  background-color: #efefef;
  padding-top: 50px;
  /* margin-top: 10px; */
  z-index: 2;
}

.navbar-logo {
  /* z-index: 1000;  */
  width: 250px;
  height: 250px;
  box-shadow: 0 4px 8px 0 rgba(0, 0, 0, 0.2);
}



.menu-icon {
  display: none;
  background: none;
  border: none;
  font-size: 24px;
  /* Adjust size of the hamburger icon */
  cursor: pointer;
}

.nav-hidden {
  display: none;
}


/* Style for the buttons container */
.navbar-buttons {
  display: flex;
  gap: 10px;
  /* Adjust the gap between buttons */
}

/* Adjustments for individual buttons */
.login-btn {
  padding: 10px 20px;
  background-color: #004d40;
  color: white;
  border: none;
  cursor: pointer;
  border-radius: 5px;
}

.login-btn:hover {
  background-color: #00382e;
}

.logout-btn {
  padding: 10px 20px;
  background-color: #ff0000;
  color: white;
  border: none;
  cursor: pointer;
  border-radius: 5px;
}

.logout-btn:hover {
  background-color: #c06f6f;
}

.dashboard-btn {
  padding: 10px 20px;
  background-color: #0654ac;
  color: white;
  border: none;
  cursor: pointer;
  border-radius: 5px;
}

.dashboard-btn:hover {
  background-color: #053365;
}

.request-btn {
  padding: 10px 20px;
  background-color: #f58634;
  color: white;
  border: none;
  cursor: pointer;
  border-radius: 5px;
}

.request-btn:hover {
  background-color: #bd560c;
}

@media (max-width: 768px) {
  .menu-icon {
    display: block;
    /* Show menu icon on mobile */
  }


  /* .top-nav {
    flex-direction: column;
    align-items: flex-start;
  } */

  .top-nav ul {
    width: 100%;
    display: none;
    /* Hide by default on mobile */
    flex-direction: column;
    align-items: center;
  }



  /* Explicitly manage the visibility toggling for mobile */
  .top-nav ul[style*="display: none;"] {
    display: none !important;
  }

  .top-nav ul[style*="display: block;"] {
    display: flex !important;
    /* Ensure it shows as flex when toggled */
  }

  .top-nav li {
    width: 100%;
    text-align: center;
  }

  .navbar-buttons {
    flex-direction: row;
    /* Ensure buttons are in a row on mobile */
    padding: 5px 0;
  }
}
</style>