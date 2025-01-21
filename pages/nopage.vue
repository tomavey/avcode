<template>
  <div class="page-not-available">
    <h1>Page Not Available</h1>
    <p>Sorry, the page you are looking for does not exist.</p>
    <router-link to="/">Go back to Home</router-link>
  </div>
</template>

<script>
export default {
  name: "PageNotAvailable",
};
</script>

<style scoped>
.page-not-available {
  text-align: center;
  margin-top: 50px;
}

.page-not-available h1 {
  font-size: 2em;
  margin-bottom: 20px;
}

.page-not-available p {
  font-size: 1.2em;
  margin-bottom: 20px;
}

.page-not-available a {
  color: #42b983;
  text-decoration: none;
}
</style>
