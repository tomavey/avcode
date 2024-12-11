let moderatorObj = ref(null)

export const useModerator = () => {

  const supabase = useSupabaseClient()
  const { profile } = useProfiles()
  const { gotRights } = useGotRights()

  const getCookie = (cname) => {
    const name = cname + "=";
    const decodedCookie = decodeURIComponent(document.cookie);
    const ca = decodedCookie.split(";");
    for (let i = 0; i < ca.length; i++) {
      let c = ca[i];
      while (c.charAt(0) == " ") {
        c = c.substring(1);
      }
      if (c.indexOf(name) == 0) {
        return c.substring(name.length, c.length);
      }
    }
    return "";
  };



  const storedMid = getCookie("mid");

  const clearStoredMid = () => {
    document.cookie = "mid=; expires=Thu, 01 Jan 1970 00:00:00 UTC; path=/;";
    moderatorObj.value = {};
  };

  const getModertorObj = async () => {
    try {
      if (storedMid) {
        const { data, error } = await supabase
          .from("moderators")
          .select("*")
          .eq("user_id", storedMid);

        moderatorObj.value = data[0];

        if (profile?.value?.authorized_to) {
          if (!profile.value.authorized_to.includes("moderate")) {
            profile.value.authorized_to.push("moderate");
          }
        } else {
          profile.value.authorized_to = ["moderate"];
        }

        if (moderatorObj?.value?.isAdmin) {
          if (!profile.value.authorized_to.includes("admin")) {
            profile.value.authorized_to.push("admin");
          }
        }

        if (error) {
          console.error("Error: ", error);
        }
      }
    } catch (error) {
      console.log(error);
    }
  };

  const removeDuplicatesFromString = (stringlist) => {
    const array = stringlist.split(",").map(item => item.trim());
    const uniqueArray = [...new Set(array)];
    return uniqueArray.join(",");
  };

  const isModerator = computed(() => {
    if (moderatorObj.value) {
      if (!profile.rights) {
        profile.rights = '';
      }
      const rightsArray = profile.rights.split(',').map(right => right.trim());
      if (!rightsArray.includes('moderate')) {
        rightsArray.push('moderate');
        profile.rights = rightsArray.join(',');
      }
      return true;
    }
    if (gotRights('moderate')) {
      return true;
    }
    return false;
  });

  const isAdmin = computed(() => {
    if (moderatorObj?.value?.isAdmin) {
      return true
    }
    if (gotRights("admin")) {
      return true
    }
    return false

  })

  getModertorObj()




  return {
    moderatorObj,
    isModerator,
    isAdmin,
    clearStoredMid
  }

}
