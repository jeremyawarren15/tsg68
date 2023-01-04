import {format} from 'small-date';

export const getFormattedDate = (date: Date): string => {
  return format(new Date(date), 'DD MMM dd yyyy hh:mm a')
}