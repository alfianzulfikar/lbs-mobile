import {useState} from 'react';
// import {StyleSheet} from 'react-native';
import Text from '../components/Text';
// import {useThemeColor} from '../hooks/useThemeColor';
// import {colors} from '../constants';

export const Countdown = ({
  value,
  setCountdownExpired,
}: {
  value: number;
  setCountdownExpired: () => void;
}) => {
  // const textColorDanger = useThemeColor({}, 'textDanger');
  // const textColor = useThemeColor({}, 'text');
  const [result, setResult] = useState('00:00:00');

  const countdownInterval = setInterval(() => {
    let now = new Date().getTime();
    let distance = value - now;

    if (value) {
      if (distance < 0) {
        setResult('Expired');
        setCountdownExpired();
      } else {
        const second = Math.floor((distance % (1000 * 60)) / 1000);
        const minute = Math.floor((distance % (60 * 60 * 1000)) / (60 * 1000));
        const hour = Math.floor(
          (distance % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60),
        );

        setResult(
          `${String(hour).padStart(2, '0')}:${String(minute).padStart(
            2,
            '0',
          )}:${String(second).padStart(2, '0')}`,
        );
      }
    }
    clearInterval(countdownInterval);
  }, 1000);

  return <Text>{result}</Text>;
};
