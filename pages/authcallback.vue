<template>
  <div>
    <h1>Authentication Callback</h1>
    <p>Processing authentication...</p>
  </div>
</template>

<script>
export default {
  name: "AuthCallback",
  mounted() {
    this.handleAuthCallback();
  },
  methods: {
    async handleAuthCallback() {
      try {
        // Simulate authentication processing
        await new Promise((resolve) => setTimeout(resolve, 2000));
        // Redirect to the home page or another page after authentication
        this.$router.push({ name: "about" });
      } catch (error) {
        console.error("Error during authentication callback:", error);
      }
    },
  },
};
</script>

<style scoped>
h1 {
  text-align: center;
  margin-top: 20px;
}
p {
  text-align: center;
  margin-top: 10px;
}
</style>
