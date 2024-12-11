const settings = ref([]);
const settingsObj = ref({})

export const useSettings = () => {
  const supabase = useSupabaseClient();

  const error = ref(null);

  const getSetting = (key) => {
    if (settingsObj.value[key] !== undefined) {
      const setting = settingsObj.value[key];
      if (setting === "true") {
        return true;
      } else if (setting === "false") {
        return false;
      } else {
        return setting;
      }
    } else {
      error.value = `Setting with key ${key} not found.`;
      return null;
    }
  };

  const fetchSettings = async () => {
    try {
      const { data, error } = await supabase
        .from('settings')
        .select('*');
      if (error) {
        throw error;
      }
      settings.value = data.sort((a, b) => {
        if (a.adminOnly && !b.adminOnly) return 1;
        if (!a.adminOnly && b.adminOnly) return -1;
        return a.key.localeCompare(b.key);
      });
    } catch (err) {
      error.value = err.message;
    }
  }

  const updateSetting = async (setting) => {
    // console.log("Save setting", setting);
    const { data, error } = await supabase
      .from("settings")
      .update({ key: setting.key, value: setting.value })
      .eq("id", setting.id)
      .select("*");

    fetchSettings();
  };

  const addSetting = async (newSetting) => {
    // console.log(newSetting)
    await supabase.from("settings").insert(newSetting).select("*");
    fetchSettings();
  };

  const deleteSetting = async (id) => {
    try {
      const { data, error } = await supabase
        .from('settings')
        .delete()
        .eq('id', id);

      if (error) {
        throw error;
      }
      fetchSettings();
    } catch (err) {
      error.value = err.message;
    }
  };

  watchEffect(() => {
    settingsObj.value = settings.value.reduce((obj, setting) => {
      obj[setting.key] = setting.value;
      return obj;
    }, {});
  });

  return { getSetting, fetchSettings, settings, settingsObj, error, updateSetting, addSetting, deleteSetting };
}
