export const usePages = () => {
  const supabase = useSupabase();

  const fetchPages = async () => {
    const { data, error } = await supabase
      .from("pages")
      .select("*")
      .not("nav_name", "is", null);

    if (error) {
      console.error("Error fetching pages:", error);
      return [];
    }

    return data;
  };

  return {
    fetchPages,
  };
};
