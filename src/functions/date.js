import dayjs from 'dayjs';

export const getMessageDateTime = dateTime => {
  const d = dayjs(dateTime);
  const isToday = d.isSame(new Date(), 'day');
  if (isToday) return d.format('HH:MM');
  return d.format('D/MM/YYYY HH:MM');
};
