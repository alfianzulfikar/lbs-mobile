import {Linking, StyleSheet, View} from 'react-native';
import React, {useEffect, useState} from 'react';
import ScreenWrapper from '../components/ScreenWrapper';
import Text from '../components/Text';
import Header from '../components/Header';
import Gap from '../components/Gap';
import Button from '../components/Button';
import {useUser} from '../api/user';
import LoadingModal from '../components/LoadingModal';
import {useColorScheme} from '../hooks/useColorScheme';

const ListItem = ({field, value}: {field: string; value: string}) => {
  return (
    <View>
      <Text style={styles.field}>{field}</Text>
      <Text style={styles.value}>{value}</Text>
    </View>
  );
};

const PersonalData = () => {
  let colorScheme = useColorScheme();
  const [loading, setLoading] = useState(true);
  const {user, getProfile, getUser} = useUser();

  useEffect(() => {
    const asyncFunc = async () => {
      getProfile();
      getUser();
      setLoading(false);
    };
    asyncFunc();
  }, []);
  return (
    <ScreenWrapper
      background
      backgroundType="gradient"
      scrollView
      statusBar
      overlay
      header
      headerTitle="Data Pribadi">
      <View style={{paddingHorizontal: 24, marginTop: 20}}>
        <ListItem
          field="Nama Lengkap"
          value={user.firstname + ' ' + user.lastname}
        />
        <Gap height={24} />
        <ListItem field="Email" value={user.email} />
        <Gap height={24} />
        <ListItem
          field="Nomor Telepon"
          value={user.phone ? '+' + user.phone : ''}
        />
        {user.kycStatus && (
          <>
            <Gap height={24} />
            <ListItem field="Nama Bank" value={user.bankName} />
            <Gap height={24} />
            <ListItem field="Nomor Rekening" value={user.bankAccountNumber} />
            <Gap height={24} />
            <ListItem
              field="Nama Pemilik Rekening"
              value={user.bankOwnerName}
            />
            <Gap height={24} />
            <ListItem
              field="Single Investor Identification (SID)"
              value={user.sid}
            />
            <Gap height={24} />
            <ListItem field="Sub Rekening Efek (SRE)" value={user.sre} />
          </>
        )}
        <Text style={styles.question}>Ada data yang tidak sesuai?</Text>
        <Gap height={16} />
        <Button
          title="Ajukan Perubahan Data"
          onPress={() =>
            Linking.openURL(
              "https://api.whatsapp.com/send?phone=6281290569559&text=Assalamu'alaikum, saya ingin mengajukan perubahan data.",
            )
          }
        />
        <Gap height={24} />
      </View>

      {loading && <LoadingModal />}
    </ScreenWrapper>
  );
};

export default PersonalData;

const styles = StyleSheet.create({
  field: {
    fontSize: 14,
    lineHeight: 20,
  },
  value: {
    fontSize: 16,
    fontWeight: '600',
    lineHeight: 24,
    marginTop: 4,
  },
  question: {
    fontSize: 14,
    lineHeight: 20,
    textAlign: 'center',
    marginTop: 40,
  },
});
