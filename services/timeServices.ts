import {format} from 'small-date';

export const getFormattedDate = (date: Date): string => {
  return format(new Date(date), 'DD MMM dd yyyy hh:mm a')
}

export const getYesterdayDateString = () => {
  const yesterday = new Date()
  yesterday.setDate(yesterday.getDate() - 1);
  return format(yesterday, 'y-MM-dd hh:mm:ss')
}