import moment from 'moment';

export const formatDate = (date, format = 'll') => (date ? moment(date).format(format) : date);

export const formatDateTime = (date, format = 'lll') => (date ? moment(date).format(format) : date);

export const formatDateTimeForAPI = date =>
  date
    ? moment(date)
        .utc()
        .format()
    : date;
