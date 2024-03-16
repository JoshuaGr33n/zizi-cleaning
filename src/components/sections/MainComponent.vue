<template>
  <main>

    <div class="services-section">
      <div class="info-container">

        <h2 class="orange-color">OUR SERVICES</h2>
        <ul>
          <li>House Cleaning</li>
          <li>Deep Cleaning</li>
          <li>Office Cleaning</li>
          <li>Janitorial Cleaning</li>
          <li>Sport Cleaning</li>
          <li>Custom Services</li>
        </ul>
        ...and many more

      </div>
      <div class="vertical-line"></div>
      <div class="photo-container">
        <img src="@/assets/img/1.png" alt="Doctors" />

      </div>
    </div>
    <div class="promotion-section">
      <h1 class="promotion-title">ACCEPTING NEW CLIENTS!</h1>
      <div class="promotion-banner">
        <!-- Content inside your promotional banner -->
        <h2>REFERAL DISCOUNT!</h2>
        <p>Spotless - The ZIZI promise.</p>
        <img src="@/assets/img/5.jpg" alt="pic" />
      </div>
    </div>
  </main>
</template>

<script>
export default {
  name: 'MainComponent'
}
</script>

<style scoped>
/* Base styles */
.services-section {
  display: flex;
  flex-wrap: wrap;
  background-color: #f7f7f7;
  padding: 20px;
  justify-content: center;
}



/* 
.info-container {
  flex: 1;
  padding: 20px;
} */ 

/* .vertical-line {
  width: 1px;
  background-color: black;
  height: 100%;
  margin: 0 20px;
} */

.orange-color {
  color: #f58613;
}

.promotion-section {
  display: flex;
  flex-direction: column;
  align-items: center;
  background-color: #f58613;
}

.promotion-title {
  color: white;
  margin: 20px 0;
}

@media (min-width: 768px) {
  .promotion-banner {
    display: flex;
    flex-direction: column;
    align-items: center;
    background-size: cover;
    width: 100%;
    padding: 40px;
  }

  .promotion-banner img {
    width: 100%;
    height: auto;
  }

  

  .photo-container img {
    width: 500px;
    margin-left: 80px;
    height: auto;
    

  }

  .info-container {
    padding-left: 20px;
    display: flex;
    flex-direction: column;
    justify-content: center;
  }

  .vertical-line {
    width: 20px;
    /* Thickness of the line */
    background-color: black;
    /* Color of the line */
    height: 70%;
    /* Adjust the height as needed */
    /* margin: auto;  */
  }

}

/* Responsive styles */
@media (max-width: 768px) {
  .services-section {
    flex-direction: column;
    
  }

  .photo-container,
  .info-container {
    margin-left: 0;
    margin-right: 0;
    margin-bottom: 20px;
  }

  .photo-container img {
    max-width: 70%;
    height: auto;
    margin-left: 20px;
  }

  .vertical-line {
    display: none;
  }

  .promotion-banner {
    width: 100%;
    padding: 20px;
  }

  .promotion-banner img {
    width: 100%;
    height: auto;
  }

  .photo-container img {
    max-width:95%;
    height: auto;
    margin-right: 80px;
    margin-bottom: 40px;
  }

  .info-container {
    margin-top: 50px;
    padding-left: 200px;
  }

}
</style>