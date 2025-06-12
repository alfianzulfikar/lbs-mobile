import {Alert, StyleSheet, View} from 'react-native';
import React, {useState} from 'react';
import Text from '../components/Text';
import ScreenWrapper from '../components/ScreenWrapper';
import Header from '../components/Header';
import Gap from '../components/Gap';
import Input from '../components/Input';
import Button from '../components/Button';
import {useAPI} from '../services/api';
import {useDispatch} from 'react-redux';
import {setAlert} from '../slices/globalError';

const ChangePassword = () => {
  const dispatch = useDispatch();
  const {apiRequest} = useAPI();
  const [form, setForm] = useState({
    password: '',
    newPassword: '',
    confirmNewPassword: '',
  });
  const [error, setError] = useState({
    password: [],
    newPassword: [],
    confirmNewPassword: [],
  });
  const [loading, setLoading] = useState(false);

  const submit = async () => {
    setLoading(true);
    try {
      const res = await apiRequest({
        method: 'put',
        endpoint: '/user/edit/profile?label=password',
        authorization: true,
        body: {
          password: form.password,
          new_password: form.newPassword,
          confirm_new_password: form.confirmNewPassword,
        },
      });
      setForm({
        password: '',
        newPassword: '',
        confirmNewPassword: '',
      });
      dispatch(
        setAlert({
          title: 'Berhasil',
          desc: 'Password berhasil diubah',
          type: 'success',
          showAlert: true,
        }),
      );
    } catch (error: any) {
      console.log('submit error', error);
      if (error.status === 422) {
        if (error.data.errors) {
          const newError = error.data.errors;
          setError({
            password: newError?.password || [],
            newPassword: newError?.new_password || [],
            confirmNewPassword: newError?.confirm_new_password || [],
          });
        }
      }
    } finally {
      setLoading(false);
    }
  };

  return (
    <ScreenWrapper background backgroundType="gradient" scrollView>
      <Gap height={24} />
      <Header title="Ubah Kata Sandi" />
      <View style={{marginTop: 40, paddingHorizontal: 24, flexGrow: 1}}>
        <View style={{flex: 1}}>
          <Input
            label="Kata Sandi"
            type="password"
            placeholder="Masukkan kata sandi lama"
            value={form.password}
            onChange={value => setForm(prev => ({...prev, password: value}))}
            error={error.password}
          />
          <Gap height={16} />
          <Input
            label="Kata Sandi Baru"
            type="password"
            placeholder="Minimum 8 Digit"
            value={form.newPassword}
            onChange={value => setForm(prev => ({...prev, newPassword: value}))}
            error={error.newPassword}
          />
          <Gap height={16} />
          <Input
            label="Ubangi Kata Sandi Baru"
            type="password"
            placeholder="Ulangi kata sandi baru"
            value={form.confirmNewPassword}
            onChange={value =>
              setForm(prev => ({...prev, confirmNewPassword: value}))
            }
            error={error.confirmNewPassword}
          />
        </View>
        <Gap height={16} />
        <Button title="Simpan" onPress={submit} loading={loading} />
      </View>
      <Gap height={24} />
    </ScreenWrapper>
  );
};

export default ChangePassword;

const styles = StyleSheet.create({});
