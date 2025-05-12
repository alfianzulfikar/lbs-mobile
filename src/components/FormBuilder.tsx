import {StyleSheet, Text, View} from 'react-native';
import React from 'react';
import Input from './Input';
import {KYCErrorType, KYCFormFieldType, KYCStateType} from '../constants/Types';

const FormBuilder = ({
  fields,
  state,
  onChange,
  error,
}: {
  fields: KYCFormFieldType[];
  state: KYCStateType;
  onChange: React.Dispatch<React.SetStateAction<KYCStateType>>;
  error: KYCErrorType;
}) => {
  return (
    <View>
      {fields.map((item, fieldId) => (
        <View
          key={fieldId}
          style={{marginBottom: fieldId !== fields.length - 1 ? 24 : 0}}>
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
            error={error[item.name]}
            loading={item.loading}
            subLabel={item.subLabel}
            subLabelIcon={item.subLabelIcon}
          />
        </View>
      ))}
    </View>
  );
};

export default FormBuilder;

const styles = StyleSheet.create({});
