// utils/formatDate.ts
import { format } from 'date-fns';

export const formatDateToISO = (date: Date | string | undefined): string => {
  if (!date) return '';
  return format(new Date(date), "yyyy-MM-dd'T'HH:mm");
};
