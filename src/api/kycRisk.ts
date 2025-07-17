import {useState} from 'react';
import {KYCFormFieldType, KYCRiskType} from '../constants/Types';
import {useAPI} from '../services/api';
import {StackActions, useNavigation} from '@react-navigation/native';
import {useDispatch} from 'react-redux';
import {setAlert} from '../slices/globalError';

export const useKYCRisk = () => {
  const {apiRequest} = useAPI();
  const navigation = useNavigation();
  const dispatch = useDispatch();
  const [risk, setRisk] = useState<KYCRiskType>({
    risk1: null,
    risk2: null,
    risk3: null,
    risk4: null,
    risk5: null,
    risk6: null,
  });
  const [riskError, setRiskError] = useState({
    risk1: [],
    risk2: [],
    risk3: [],
    risk4: [],
    risk5: [],
    risk6: [],
  });
  const [riskForm, setRiskForm] = useState<KYCFormFieldType[]>([]);
  const [riskLoading, setRiskLoading] = useState(false);
  const [riskSubmitLoading, setRiskSubmitLoading] = useState(false);
  const [idError, setIdError] = useState<string[]>([]);

  const getRisk = async () => {
    setRiskLoading(true);
    try {
      const res = await apiRequest({
        endpoint: '/user/risk-scoring',
        authorization: true,
      });
      const newRiskForm: KYCFormFieldType[] = [];
      const newRisk: KYCRiskType = risk;
      res.map((item: any, id: number) => {
        let newAnswer = null;
        const newOption = item.answers.map((answer: any) => {
          if (answer.is_checked) {
            newAnswer = answer.id;
          }
          return {
            id: answer.id,
            label: answer.answer,
            isChecked: answer.is_checked,
          };
        });
        newRisk[`risk${id + 1}`] = newAnswer;
        const newKey = `risk${id + 1}`;
        newRiskForm.push({
          label: item.question,
          name: newKey,
          type: 'radio-button',
          option: newOption,
        });
      });
      setRiskForm(newRiskForm);
      setRisk(newRisk);
    } catch {
    } finally {
      setRiskLoading(false);
    }
  };

  const submitRisk = async () => {
    setRiskSubmitLoading(true);
    try {
      let idArray: number[] = [];
      Object.keys(risk).map((item: any, id) => {
        if (risk[item]) {
          idArray.push(risk[item]);
        }
      });
      const res = await apiRequest({
        method: 'post',
        endpoint: '/user/risk-scoring',
        authorization: true,
        body: {
          id: idArray,
        },
      });
      navigation.dispatch(StackActions.replace('KYC', {screen: 'KYCTerms'}));
    } catch (err: any) {
      if (typeof err === 'object' && err !== null && 'status' in err) {
        const error = err as {
          status: number;
          data?: any;
        };
        console.log('risk error', error);
        if (error?.status === 422) {
          setIdError(
            error?.data?.errors?.id ? ['Harap isi minimal 1 pertanyaan'] : [],
          );
          dispatch(
            setAlert({
              title: 'Terdapat kesalahan. Periksa kembali.',
              desc: '',
              type: 'danger',
              showAlert: true,
            }),
          );
        }
      }
    } finally {
      setRiskSubmitLoading(false);
    }
  };

  return {
    risk,
    riskError,
    setRisk,
    setRiskError,
    getRisk,
    submitRisk,
    riskLoading,
    riskSubmitLoading,
    riskForm,
    idError,
  };
};
