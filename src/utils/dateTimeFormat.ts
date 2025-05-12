import capitalize from './capitalize';
import nameOfMonth from './nameOfMonth';
import Text from '../components/Text';

const dateTimeFormat = (
  timestamps: Date | string | number,
  onlyDate?: boolean,
) => {
  const date = new Date(timestamps).getDate();
  const month = capitalize(
    nameOfMonth(new Date(timestamps).getMonth() + 1 || ''),
  );
  const year = new Date(timestamps).getFullYear();

  if (!onlyDate) {
    const hour = new Date(timestamps).getHours();
    const minute = new Date(timestamps).getMinutes();
    return `${date} ${month} ${year}, ${(hour < 10 ? '0' : '') + hour}:${
      (minute < 10 ? '0' : '') + minute
    } WIB`;
  }

  return `${date} ${month} ${year}`;
};

export default dateTimeFormat;
