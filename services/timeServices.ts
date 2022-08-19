export const getFormattedDate = (date: date): string => {
  return new Date(date).toDateString();
}