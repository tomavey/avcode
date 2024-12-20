export default defineNuxtRouteMiddleware((to, from) => {
  const user = useSupabaseUser();

  // If user is not an admin
  if (!user.value) {
    return navigateTo('/');
  }

})