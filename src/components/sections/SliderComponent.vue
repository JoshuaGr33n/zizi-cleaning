<template>
  <div class="carousel-container">
    <div class="carousel" :style="{ transform: `translateX(-${currentIndex * 100}%)` }">
      <div class="carousel-item" v-for="(image, index) in images" :key="index" :style="{ backgroundImage: `url(${image})` }"></div>
    </div>
    <button @click="prevImage">Prev</button>
    <button @click="nextImage">Next</button>
  </div>
</template>

<script>
export default {
    name: 'SliderComponent',
  data() {
    return {
      currentIndex: 0,
      images: [
        '@/assets/img/1.png',
        '@/assets/img/2.jpg',
        '@/assets/img/3.jpg',
      ]
    };
  },
  methods: {
    nextImage() {
      this.currentIndex = (this.currentIndex + 1) % this.images.length;
    },
    prevImage() {
      this.currentIndex = (this.currentIndex - 1 + this.images.length) % this.images.length;
    }
  }
};
</script>

<style scoped>
.carousel-container {
  perspective: 1000px;
  position: relative;
  width: 100%;
  overflow: hidden;
}

.carousel {
  display: flex;
  transition: transform 0.5s ease-in-out;
}

.carousel-item {
  min-width: 100%;
  height: 300px; /* Set a fixed height or make it responsive */
  background-size: cover;
  background-position: center;
  transform-style: preserve-3d;
}
</style>
