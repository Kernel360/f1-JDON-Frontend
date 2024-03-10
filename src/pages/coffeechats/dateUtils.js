export const formatDateTime = (date) => {
  if (!date) return;
  const padZero = (num) => num.toString().padStart(2, "0");

  const hours = padZero(date.getHours());
  const minutes = padZero(date.getMinutes());
  const time = `${hours}:${minutes}`;
  const isoDate = date.toISOString();
  const [datePart] = isoDate.split("T");
  const [year, month, day] = datePart.split("-");
  const formattedDate = `${year}-${month}-${day} ${time}`;
  return formattedDate;
};
