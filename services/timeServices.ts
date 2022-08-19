export const getFormattedDate = (date: Date): string => {
  return new Date(date).toDateString();
}