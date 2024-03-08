export const formatDateTime = (date) => {
  if (!date) return;
  const time = date.getHours() + ":" + date.getMinutes();
  const isoDate = date.toISOString();
  const [datePart] = isoDate.split("T");
  const [year, month, day] = datePart.split("-");
  const formattedDate = `${year}-${month}-${day} ${time}`;

  return formattedDate;
};
