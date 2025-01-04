export const usePages = () => {
  const supabase = useSupabaseClient();

  const navPages = ref([]);

  const fetchNavPages = async () => {
    console.log("Fetching pages");
    const { data, error } = await supabase
      .from("pages")
      .select("*")
      .not("nav_name", "is", null);

    if (error) {
      console.error("Error fetching pages:", error);
      return;
    }

    navPages.value = data.map((page) => ({
      name: page.nav_name,
      path: `/${page.nav_name}`,
      rights: "admin",
      icon: "mdi-information",
      sortOrder: 9,
    }));
  };

  fetchNavPages();

  return {
    navPages,
  };
};
