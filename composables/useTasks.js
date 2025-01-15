export const useTasks = () => {
  const supabase = useSupabaseClient();

  const statusOptions = [
    { text: "New TODO", value: "todo" },
    { text: "In Process", value: "in_process" },
    { text: "For Later", value: "for_later" },
    { text: "Completed", value: "completed" },
  ];

  const updateTaskStatus = async (task) => {
    console.log("Update task Status", task);
    const { data, error } = await supabase
      .from("tasks")
      .update({ status: task.status })
      .eq("id", task.id)
      .select("*");
    if (error) {
      console.error(error);
    } else {
      fetchTasks();
    }
  };

  return { statusOptions, updateTaskStatus };
};
