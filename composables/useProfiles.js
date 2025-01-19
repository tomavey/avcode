const profile = ref({});

export const useProfiles = () => {
  const supabase = useSupabaseClient();
  const user = useSupabaseUser();
  const { clearDialog } = useDialog();

  const users = ref([]);

  const createNewProfile = async (newProfile) => {
    try {
      newProfile = {
        ...newProfile,
        authorized_to: ["basic"],
        updated_at: new Date(),
      };

      console.log("newProfile", newProfile);

      const { error } = await supabase.from("profiles").upsert(newProfile, {
        returning: "minimal",
      });

      if (error) throw error;
    } catch (error) {
      console.error("Error creating new profile:", error.message);
    }
  };

  const updateProfile = async (obj) => {
    obj.updated_at = new Date().toISOString(); // Insert current timestamp
    console.log("updateProfile", obj);
    try {
      const { data, error } = await supabase
        .from("profiles")
        .update(obj)
        .eq("id", obj.id) // Match the id
        .select();

      if (error) {
        throw error;
      }
    } catch (error) {
      console.error("Error: ", error);
    }
    clearDialog();
  };

  const getProfiles = async () => {
    const { data, error } = await supabase.from("profiles").select("*");
    users.value = data;
  };

  const fetchProfile = async () => {
    if (!user.value) return null;
    if (profile?.value?.id) return;
    // console.log("user.value.id", user.value.id)
    try {
      const { data, error } = await supabase
        .from("profiles")
        .select("*")
        .eq("id", user.value.id);
      if (!error) {
        profile.value = data[0];
      } else {
        console.error(error);
      }
    } catch (error) {
      console.log(error);
      profile.value = {};
    }
  };

  const subscribeMe = (userId) => {
    alert("subscribeme");
  };

  const clearProfile = () => {
    console.log("clearing profile");
    profile.value = {};
  };

  const addSubscription = async (user) => {
    const userId = user.id;

    // Fetch the profile
    const { data: profile, error } = await supabase
      .from("profiles")
      .select("authorized_to")
      .eq("id", userId)
      .single();

    if (error) {
      console.error("Error fetching profile:", error);
      return;
    }

    // Check if 'subscribed' is already in the authorized_to array
    if (!profile.authorized_to.includes("subscribed")) {
      // Add 'subscribed' to the array
      profile.authorized_to.push("subscribed");

      // Update the profile in the database
      const { error: updateError } = await supabase
        .from("profiles")
        .update({ authorized_to: profile.authorized_to })
        .eq("id", userId);

      if (updateError) {
        console.error("Error updating profile:", updateError);
      } else {
        console.log("Profile updated successfully");
      }
    } else {
      console.log("User is already subscribed");
    }
    fetchProfile();
  };

  const removeSubscription = async (user) => {
    // Fetch the profile
    const userId = user.id;
    const { data: profile, error } = await supabase
      .from("profiles")
      .select("authorized_to")
      .eq("id", userId)
      .single();

    if (error) {
      console.error("Error fetching profile:", error);
      return;
    }

    // Check if 'subscribed' is in the authorized_to array
    if (profile.authorized_to.includes("subscribed")) {
      // Remove 'subscribed' from the array
      profile.authorized_to = profile.authorized_to.filter(
        (auth) => auth !== "subscribed"
      );

      // Update the profile in the database
      const { error: updateError } = await supabase
        .from("profiles")
        .update({ authorized_to: profile.authorized_to })
        .eq("id", userId);

      if (updateError) {
        console.error("Error updating profile:", updateError);
      } else {
        console.log("Profile updated successfully");
      }
    } else {
      console.log("User is not subscribed");
    }
    fetchProfile();
  };

  let previousUserId = null;

  watchEffect(() => {
    if (user.value && user.value.id && user.value.id !== previousUserId) {
      fetchProfile();
      previousUserId = user.value.id;
    }
  });

  return {
    profile,
    getProfiles,
    createNewProfile,
    updateProfile,
    clearProfile,
    users,
    addSubscription,
    removeSubscription,
    fetchProfile,
  };
};
