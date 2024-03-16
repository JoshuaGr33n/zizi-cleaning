<template>
    <footer>
        <div class="promotion-footer">
            <p>© 2024 ZIZI CLEANERS</p>
        </div>
    </footer>
</template>

<script>
export default {
    name: 'FooterComponent'
}
</script>

<style scoped>
.promotion-footer {
  display: flex;
  justify-content: center; /* Horizontally center the content */
  align-items: center; /* Vertically center the content (if the footer has a specific height) */
  text-align: center; /* Ensures the text itself is centered as well */
  color: #000;
  width: 100%; /* Ensures the footer takes up the full width */
  padding: 1rem 0; /* Adds some padding above and below the text */
}

.promotion-footer p {
  margin: 0; /* Removes the default margin from the paragraph if necessary */
}

/* Media queries */
@media (max-width: 768px) {
  .promotion-footer {
    flex-direction: column;
    text-align: center;
  }
}
</style>