const settingsObj = ref({});

export function useSettings() {
  const supabase = useSupabaseClient();

  const settings = ref([]);
  const newSetting = ref({ key: "", value: "", type: "" });
  const editedSetting = ref({ id: null, key: "", value: "", type: "" });
  const dialog = ref(false);
  const settingTypes = ["binary", "array", "numeric", "text"];

  const headers = [
    { text: "Key", value: "key" },
    { text: "Value", value: "value" },
    { text: "Type", value: "type" },
    { text: "Actions", value: "actions", sortable: false },
  ];

  const fetchSettings = async () => {
    const { data, error } = await supabase.from("settings").select("*");
    if (error) {
      console.error("Error fetching settings:", error);
    } else {
      settings.value = data;
    }
  };

  const handleAddSetting = async () => {
    const { data, error } = await supabase
      .from("settings")
      .insert([newSetting.value])
      .select("*");
    if (error) {
      console.error("Error adding setting:", error);
    } else if (data && data.length > 0) {
      settings.value.push(data[0]);
      newSetting.value = { key: "", value: "", type: "" };
    } else {
      console.error("No data returned from insert operation");
    }
  };

  const editSetting = (setting) => {
    editedSetting.value = { ...setting };
    dialog.value = true;
  };

  const handleUpdateSetting = async () => {
    const { data, error } = await supabase
      .from("settings")
      .update(editedSetting.value)
      .eq("id", editedSetting.value.id)
      .select("*");
    if (error) {
      console.error("Error updating setting:", error);
    } else if (data && data.length > 0) {
      const index = settings.value.findIndex(
        (s) => s.id === editedSetting.value.id
      );
      settings.value[index] = data[0];
      dialog.value = false;
      fetchSettings();
    } else {
      console.error("No data returned from update operation");
    }
  };

  const deleteSetting = async (id) => {
    const { error } = await supabase.from("settings").delete().eq("id", id);
    if (error) {
      console.error("Error deleting setting:", error);
    } else {
      settings.value = settings.value.filter((s) => s.id !== id);
    }
  };

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

  const settingsObj = computed(() => {
    const obj = {};
    settings.value.forEach((setting) => {
      obj[setting.key] = setting.value;
    });
    return obj;
  });

  return {
    settings,
    settingsObj,
    newSetting,
    editedSetting,
    dialog,
    settingTypes,
    headers,
    fetchSettings,
    handleAddSetting,
    editSetting,
    handleUpdateSetting,
    deleteSetting,
    getSetting,
  };
}
