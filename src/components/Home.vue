<template>
    <div id="app">
      <navbar-component></navbar-component>
      <contact-section></contact-section>
      <main-component></main-component>
      <footer-component></footer-component>
    </div>
  </template>
  
  <script>
  import NavbarComponent from './sections/NavbarComponent.vue'
  import ContactSection from './sections/ContactSection.vue'
  import MainComponent from './sections/MainComponent.vue'
  import FooterComponent from './sections/FooterComponent.vue'
  
  export default {
    name: 'App',
    components: {
      NavbarComponent,
      ContactSection, 
      MainComponent,
      FooterComponent
    }
  }
  </script>
  
  <style>

  </style>
  