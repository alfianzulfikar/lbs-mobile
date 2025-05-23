import {ActivityIndicator, StyleSheet, View} from 'react-native';
import React, {useEffect} from 'react';
import Text from '../components/Text';
import ScreenWrapper from '../components/ScreenWrapper';
import Gap from '../components/Gap';
import KYCHeader from '../components/KYCHeader';
import FormBuilder from '../components/FormBuilder';
import Button from '../components/Button';
import {useThemeColor} from '../hooks/useThemeColor';
import {useKYCRisk} from '../api/kycRisk';

const KYCRisk = () => {
  const tint = useThemeColor({}, 'tint');
  const textColorDanger = useThemeColor({}, 'textDanger');

  const {
    risk,
    riskError,
    riskLoading,
    riskSubmitLoading,
    getRisk,
    submitRisk,
    setRisk,
    riskForm,
    idError,
  } = useKYCRisk();

  useEffect(() => {
    getRisk();
  }, []);

  return (
    <ScreenWrapper background backgroundType="gradient" scrollView>
      <Gap height={24} />
      <View style={{paddingHorizontal: 24}}>
        <KYCHeader
          title="Profil Risiko"
          instruction="Sedikit lagi Anda akan menyelesaikan pengisian data KYC. Silakan jawab pertanyaan-pertanyaan ini terlebih dahulu."
          percentage={70}
          backScreen="KYCBank"
        />
        <Gap height={40} />
        {riskLoading ? (
          <ActivityIndicator color={tint} />
        ) : (
          <>
            <FormBuilder
              fields={riskForm}
              state={risk}
              // error={[]}
              onChange={setRisk}
            />
            {idError.length > 0 && (
              <>
                <Gap height={25} />
                {idError.map((item, id) => (
                  <Text key={id} style={{fontSize: 12, color: textColorDanger}}>
                    {item}
                  </Text>
                ))}
              </>
            )}
            <Gap height={40} />
            <Button
              title="Simpan & Lanjutkan"
              onPress={submitRisk}
              loading={riskSubmitLoading}
            />
            <Gap height={40} />
          </>
        )}
      </View>
    </ScreenWrapper>
  );
};

export default KYCRisk;

const styles = StyleSheet.create({
  cardContainer: {
    borderRadius: 24,
    overflow: 'hidden',
    borderWidth: 1,
  },
  numbering: {
    fontSize: 14,
    lineHeight: 20,
    width: 20,
  },
  text: {
    fontSize: 14,
    lineHeight: 20,
  },
});
