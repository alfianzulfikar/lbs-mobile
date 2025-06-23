import {StyleSheet, View} from 'react-native';
import React from 'react';
import Input from './Input';
import {
  CallingCodeType,
  KYCErrorType,
  KYCFormFieldType,
  KYCStateType,
} from '../constants/Types';
import Label from './Label';
import Gap from './Gap';
import ErrorText from './ErrorText';

const FormBuilder = ({
  fields,
  state,
  onChange,
  error,
  callingCodeList,
  callingCodeLoading,
}: {
  fields: KYCFormFieldType[];
  state: KYCStateType;
  onChange: React.Dispatch<React.SetStateAction<KYCStateType>>;
  error?: KYCErrorType;
  callingCodeList?: CallingCodeType[];
  callingCodeLoading?: boolean;
}) => {
  return (
    <View>
      {fields.map((item, fieldId) => (
        <View
          key={fieldId}
          style={{marginBottom: fieldId !== fields.length - 1 ? 24 : 0}}>
          {item.customInput === 'phone' ? (
            <>
              <Label title={item.label} />
              <Gap height={8} />
              <View style={{flexDirection: 'row'}}>
                <View style={{width: 100}}>
                  <Input
                    label=""
                    value={state.phoneCode}
                    onChange={value =>
                      onChange(prev => ({
                        ...prev,
                        phoneCode: value,
                        ...item.onChangeAdditionalValue,
                      }))
                    }
                    type="dropdown"
                    loading={callingCodeLoading}
                    option={callingCodeList}
                  />
                </View>
                <Gap width={8} />
                <View style={{flex: 1}}>
                  <Input
                    label=""
                    value={state[item.name]}
                    onChange={value =>
                      onChange(prev => ({
                        ...prev,
                        [item.name]: value,
                        ...item.onChangeAdditionalValue,
                      }))
                    }
                    type="number"
                  />
                </View>
              </View>
              <Gap height={4} />
              <ErrorText error={error ? error[item.name] || [] : []} />
            </>
          ) : (
            <Input
              type={item.type}
              label={item.label}
              placeholder={item.placeholder}
              value={state[item.name]}
              onChange={value =>
                onChange(prev => ({
                  ...prev,
                  [item.name]: value,
                  ...item.onChangeAdditionalValue,
                }))
              }
              disable={item.disable}
              option={item.option}
              required={item.required}
              error={error ? error[item.name] : []}
              loading={item.loading}
              subLabel={item.subLabel}
              subLabelIcon={item.subLabelIcon}
              pictureType={item.pictureType}
            />
          )}
        </View>
      ))}
    </View>
  );
};

export default FormBuilder;

const styles = StyleSheet.create({});
