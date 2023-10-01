import dayjs from 'dayjs';

export const formatDateTime = (date: dayjs.ConfigType, formatString: string): string => {
  if (dayjs(date).isValid()) {
    return dayjs(date).format(formatString);
  }
  return '';
};
