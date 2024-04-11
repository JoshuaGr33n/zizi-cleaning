<template>
  <div class="contact-section">
    <div class="photo-container">
      <img src="@/assets/img/7.png" alt="Front-Page" />
    </div>
    <div class="vertical-line"></div>
    <div class="info-container">
      <h3 class="orange-color">PROFESSIONAL</h3>
      <h2>CLEANING SERVICES</h2>
      <!-- <p>814 OASIS DRIVE<br>SWIFT CURRENT, SK</p> -->
      <p v-for="address in addresses" :key="address.id">{{ address.desc }}</p>
      <p>CALL/EMAIL US FOR FREE ESTIMATE:</p>
      <p v-for="ph in phone" :key="ph.id">{{ ph.name }}: {{ ph.value }}</p>
      <p v-for="email in emails" :key="email.id">{{ email.name }}: {{ email.value }}</p>
      <!-- <p class="orange-color">Let us do your dirty work!</p> -->
      <div class="social-media-links">
        <a v-for="social in socials" :key="social.id" :href="social.url" target="_blank"><img
            :src="social.image" :alt="social.tag" /></a>
      </div>
    </div>
  </div>
</template>

<script>


export default {
  name: 'ContactSection',
  created() {
    this.$store.dispatch('fetchSocials');
    this.$store.dispatch('fetchPhone');
    this.$store.dispatch('fetchEmails');
    this.$store.dispatch('fetchAddresses');
    this.$store.dispatch('fetchRequestSupportEmail');
  },
  computed: {
    socials() {
      return this.$store.state.socials;
    },
    phone() {
      return this.$store.state.phone;
    },
    emails() {
      return this.$store.state.emails;
    },
    addresses() {
      return this.$store.state.addresses;
    },
    requestSupportEmail() {
      return this.$store.state.requestSupportEmail;
    },

  },
}
</script>

<style scoped>
.contact-section {
  display: flex;
  background-color: #f7f7f7;
  padding: 20px;
  margin-top: 100px;
  justify-content: center;
  flex-wrap: wrap;
}

@media (min-width: 768px) {
  .photo-container img {
    width: 400px;
    height: auto;
    margin-right: 80px;
  }
}

.info-container {
  padding: 20px;
  display: flex;
  flex-direction: column;
  justify-content: center;
}

.vertical-line {
  width: 20px;
  background-color: black;
  height: 70%;
  margin: 0 40px;
}

.orange-color {
  color: #f58613;
}

.social-media-links {
  display: flex;
  gap: 10px;
}

.social-media-links a img {
  width: 24px;
  height: 24px;
}

/* Media query for devices with width up to 768px */
@media (max-width: 768px) {
  .contact-section {
    flex-direction: column;
    align-items: center;
  }

  .photo-container,
  .info-container {
    margin-right: 0;
    margin-left: 0;
    padding: 0 20px;
  }

  .vertical-line {
    display: none;
  }

  .social-media-links {
    justify-content: center;
  }

  .photo-container img {
    max-width: 100%;
    height: auto;
    margin-right: 80px;
    margin-bottom: 40px;
  }
}
</style>