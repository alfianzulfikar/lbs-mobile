import React from 'react';
import Text from './Text';
import {useThemeColor} from '../hooks/useThemeColor';

const ErrorText = ({error}: {error: string[]}) => {
  const textColorDanger = useThemeColor({}, 'textDanger');
  return (
    <Text style={{fontSize: 12, lineHeight: 16, color: textColorDanger}}>
      {error.map((item, index) =>
        index !== error.length - 1 ? item + ' ' : item,
      )}
    </Text>
  );
};

export default ErrorText;
