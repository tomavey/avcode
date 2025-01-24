export const useFormating = () => {
  const formatDateString = (date, format = "MM-dd-yy") => {
    const d = new Date(date);
    const map = {
      MM: ("0" + (d.getUTCMonth() + 1)).slice(-2),
      dd: ("0" + d.getUTCDate()).slice(-2),
      yy: ("" + d.getUTCFullYear()).slice(-2),
      yyyy: d.getUTCFullYear(),
    };
    return format.replace(/MM|dd|yy|yyyy/gi, (matched) => map[matched]);
  };

  const formatDate = (dateString, dateStyle = "medium") => {
    const date = new Date(dateString);
    // Then specify how you want your dates to be formatted
    return new Intl.DateTimeFormat("default", { dateStyle: dateStyle }).format(
      date
    );
  };

  const formatTime = (dateString) => {
    const date = new Date(dateString);
    return date.toLocaleTimeString([], { hour: "2-digit", minute: "2-digit" });
  };

  return {
    formatDateString,
    formatDate,
    formatTime,
  };
};
