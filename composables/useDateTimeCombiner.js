// useDateTimeCombiner.js (or in your composables directory)

export function useDateTimeCombiner(startDateString, startTimeString) {
  const combinedDate = ref(null);

  const updateCombinedDateTime = (dateString, timeString) => {
    if (!dateString || !timeString) {
      combinedDate.value = "xxxx-xx-xxTxx:xx:xx"; // Or handle the error as needed
      return;
    }

    try {
      const dateObj = new Date(dateString);
      const [hours, minutes] = timeString.split(":").map(Number);

      dateObj.setUTCHours(hours);
      dateObj.setUTCMinutes(minutes);
      dateObj.setUTCSeconds(0);
      dateObj.setUTCMilliseconds(0);

      return dateObj;
    } catch (error) {
      console.error("Error combining date and time:", error);
      return null;
    }
  };

  return { updateCombinedDateTime };
}
