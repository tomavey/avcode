// useDateTimeCombiner.js (or in your composables directory)

export function useDateTimeCombiner(startDateString, startTimeString) {
  const combinedDate = ref(null);

  const convertTo24HourFormat = (timeString) => {
    const [time, modifier] = timeString.split(" ");
    let [hours, minutes] = time.split(":").map(Number);

    if (modifier === "PM" && hours !== 12) {
      hours += 12;
    } else if (modifier === "AM" && hours === 12) {
      hours = 0;
    }

    return `${hours.toString().padStart(2, "0")}:${minutes
      .toString()
      .padStart(2, "0")}`;
  };

  const updateCombinedDateTime = (dateString, timeString) => {
    if (!timeString) {
      return dateString;
    }
    if (!dateString && !timeString) {
      return null; // Or handle the error as needed
    }

    try {
      timeString = convertTo24HourFormat(timeString);
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
