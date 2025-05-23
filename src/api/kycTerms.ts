import {useState} from 'react';
import {useAPI} from '../services/api';
import {StackActions, useNavigation} from '@react-navigation/native';

export const useKYCTerms = () => {
  const {apiRequest} = useAPI();
  const navigation = useNavigation();
  const [hasRead, setHasRead] = useState(false);
  const [checkError, setCheckError] = useState([]);
  const [submitLoading, setSubmitLoading] = useState(false);

  const submitTerms = async () => {
    setSubmitLoading(true);
    try {
      const res = await apiRequest({
        method: 'put',
        endpoint: '/user/terms-kyc',
        authorization: true,
        body: {
          check: hasRead || null,
        },
      });
      navigation.dispatch(
        StackActions.replace('KYCStack', {screen: 'KYCWaiting'}),
      );
    } catch (error: any) {
      console.log('submitTerms error', error);
      if (error.status === 422) {
        setCheckError(error?.data?.errors?.check || []);
      }
    } finally {
      setSubmitLoading(false);
    }
  };
  return {hasRead, setHasRead, submitLoading, submitTerms, checkError};
};
