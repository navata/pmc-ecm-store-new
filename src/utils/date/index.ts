import dayjs from 'dayjs';
import { formatDateTime } from './helpers';
import { dateTemplates } from './templates';

export { formatDateTime };

export const formatDateDisplay = (date?: dayjs.ConfigType) => {
  return formatDateTime(date, dateTemplates.dateFormat);
};
