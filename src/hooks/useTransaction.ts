import {useDispatch} from 'react-redux';
import {setPaymentCode as setPaymentCodeRedux} from '../slices/transaction';

const useTransaction = () => {
  const dispatch = useDispatch();

  const setPaymentCode = async (newPaymentCode: string) => {
    dispatch(setPaymentCodeRedux({paymentCode: newPaymentCode}));
  };

  return {setPaymentCode};
};

export default useTransaction;
