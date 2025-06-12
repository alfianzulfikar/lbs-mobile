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

    console.log('countdown', value, now);

    if (value) {
      if (distance < 0) {
        setResult('Expired');
        setCountdownExpired();
      } else {
        const hours = String(Math.floor(distance / (1000 * 60 * 60))).padStart(
          2,
          '0',
        );
        const minutes = String(
          Math.floor((distance % (1000 * 60 * 60)) / (1000 * 60)),
        ).padStart(2, '0');
        const seconds = String(
          Math.floor((distance % (1000 * 60)) / 1000),
        ).padStart(2, '0');

        console.log('countdown', seconds, minutes, hours);

        setResult(`${hours}:${minutes}:${seconds}`);
      }
    }
    clearInterval(countdownInterval);
  }, 1000);

  return <Text>{result}</Text>;
};
