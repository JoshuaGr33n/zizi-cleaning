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
    </div>
    <nav class="navbar-container">
      <img src="@/assets/logo.jpeg" alt="BITE Dental Studio" class="navbar-logo" />
    </nav>
  </div>
</template>



<script>
export default {
  name: 'NavbarComponent',
  data() {
    return {
      isFixed: false,
      navVisible: false, // For toggling the nav visibility on mobile
      isMobile: false, // For detecting mobile view
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
    }
  },
};
</script>

<style scoped>
.nav-container {
  position: relative;
  z-index: 1; /* Ensures the logo and navbar are above the top-nav */
}

.top-nav {
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  background-color: transparent;
  transition: all 0.3s;
  z-index: 0; 
}

.top-nav ul {
  list-style-type: none;
  margin: 0;
  padding: 0;
  overflow: hidden;
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
  font-size: 24px; /* Adjust size of the hamburger icon */
  cursor: pointer;
}
.nav-hidden {
  display: none;
}

@media (max-width: 768px) {
  .menu-icon {
    display: block; /* Show menu icon on mobile */
  }

  .top-nav ul {
    flex-direction: column;
    align-items: center;
    width: 100%;
    display: none; /* Hide by default on mobile */
  }

  /* Explicitly manage the visibility toggling for mobile */
  .top-nav ul[style*="display: none;"] {
    display: none !important;
  }
  .top-nav ul[style*="display: block;"] {
    display: flex !important; /* Ensure it shows as flex when toggled */
  }

  .top-nav li {
    width: 100%;
    text-align: center;
  }
}

</style>