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

  return {
    formatDateString
  }

}