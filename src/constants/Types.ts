import {ReactNode} from 'react';
import {GestureResponderEvent, StyleProp, ViewStyle} from 'react-native';

export interface SvgIconType {
  color?: string;
  color2?: string;
  type?: 'outline' | 'fill';
  style?: StyleProp<ViewStyle>;
  size?: number;
  shadow?: boolean;
  width?: number;
  height?: number;
}

export interface BusinessType {
  slug: string;
  merkDagang: string;
  tipeBisnis: string;
  image: string;
  target: number;
  terpenuhi: number;
  status: string;
  provinsi: string;
  kota: string;
  kode: string;
  hargaPerLembar: number;
  minimalPemesanan: number;
  lembarTersisa: number;
  roi?: number;
  tenor?: number;
  file?: string;
  businessContent?: any;
}

export type RootStackParamList = {
  Business: undefined; // Sesuaikan dengan parameter yang diperlukan (jika ada)
  Home: undefined;
  Account: undefined; // Contoh jika ada parameter
  Transaction: undefined; // Contoh jika ada parameter
};

export type Callback = (event: GestureResponderEvent) => void;

export type BankMethodType = {
  title: string;
  list: string[];
};

export type BankProcedureType = {
  bank: string;
  bank_name: string;
  list: BankMethodType[];
};

export type OnInputChangeType = React.Dispatch<React.SetStateAction<string>>;

export interface ArticleType {
  title: string;
  category: string;
  categorySlug: string;
  image: string;
  slug: string;
  body: string;
  date: string;
}

export type BankType = {
  id: string;
  label: string;
  name?: string;
  image?: string;
  isMaintenance?: boolean;
};

export type DisclosureType = {
  name: string;
  date: string;
  file: string;
};

export type PortfolioType = {
  merkDagang: string;
  type: string;
  status: string;
  total: number;
  id: number;
  slug: string;
  company: string;
  lembar: number;
  hargaPasar: number;
  average: number;
  return: number;
  transactions: {
    type: string;
    status: string;
    kode: string;
    nominal: number;
    date: Date;
  }[];
  disclosures?: DisclosureType[];
};

export type HomeMenuScreenType = 'PortfolioStack' | 'FAQ' | undefined;

export type FAQType = {
  question: string;
  answer: string;
};

export type InputType =
  | 'text'
  | 'textArea'
  | 'date'
  | 'picture'
  | 'dropdown'
  | 'phone'
  | 'radio-button'
  | 'default'
  | 'dropdown'
  | 'password'
  | 'email'
  | 'otp-method'
  | 'number'
  | 'checkbox';

export type InputDropdownOption = {
  id: string | number | boolean;
  label: string;
  image?: string;
};

// KYC Field

export type KYCIDType = {
  nik?: string;
  tglRegistrasiKTP?: string;
  isKtpLifetime?: boolean | null;
  tglKadaluwarsaKTP?: string;
  fotoKTP?: string;
  fotoSelfieKTP?: string;
  passport?: string;
};

export type KYCPersonalType = {
  namaDepan?: string;
  namaBelakang?: string;
  email?: string;
  phone?: string;
  tempatLahir?: string;
  tglLahir?: string;
  jenisKelamin?: string;
  agama?: string;
  pendidikan?: string;
};

export type KYCAddressKTPType = {
  provinsiKTP?: number | null;
  kotaKTP?: number | null;
  kecamatanKTP?: number | null;
  alamatKTP?: string;
  kodePosKTP?: string;
  isAddressSame?: boolean | null;
};

export type KYCAddressType = {
  provinsi?: number | null;
  kota?: number | null;
  kecamatan?: number | null;
  alamat?: string;
  kodePos?: string;
};

export type KYCFamilyType = {
  statusPernikahanId?: number | null;
  namaPasangan?: string;
  namaGadisIbuKandung?: string;
  namaAhliWaris?: string;
  hubunganDenganAhliWaris?: number | null;
  tlpAhliWaris?: string;
};

export type KYCOccupationType = {
  titlePekerjaan?: number | null;
  namaPerusahaan?: string;
  alamatPerusahaan?: string;
  totalAssetUser?: number | null;
  sumberDanaUser?: number[];
  tujuanInvestasi?: number[];
};

export type KYCTaxType = {
  kodePajakId?: number | null;
  npwp?: string;
  penghasilanPerTahunSebelumPajak?: number | null;
  tglRegistrasi?: string;
  hasSID?: boolean | null;
};

export type KYCTax2Type = {
  rekeningSid?: string;
  fotoRekeningSid?: string;
  tglRegistrasiSid?: string;
};

export type KYCBankType = {
  bankId?: string;
  namaPemilikRekeningBank?: string;
  rekeningBank?: string;
};

export type KYCRiskType = {
  risk1?: number | null;
  risk2?: number | null;
  risk3?: number | null;
  risk4?: number | null;
  risk5?: number | null;
  risk6?: number | null;
};

// KYC Error

export type KYCIDErrorType = {
  nik?: string[];
  tglRegistrasiKTP?: string[];
  isKtpLifetime?: string[];
  tglKadaluwarsaKTP?: string[];
  fotoKTP?: string[];
  fotoSelfieKTP?: string[];
  passport?: string[];
};

export type KYCPersonalErrorType = {
  namaDepan?: string[];
  namaBelakang?: string[];
  email?: string[];
  phone?: string[];
  tempatLahir?: string[];
  tglLahir?: string[];
  jenisKelamin?: string[];
  agama?: string[];
  pendidikan?: string[];
};

export type KYCAddressKTPErrorType = {
  provinsiKTP?: string[];
  kotaKTP?: string[];
  kecamatanKTP?: string[];
  alamatKTP?: string[];
  kodePosKTP?: string[];
  isAddressSame?: string[];
};

export type KYCAddressErrorType = {
  provinsi?: string[];
  kota?: string[];
  kecamatan?: string[];
  alamat?: string[];
  kodePos?: string[];
};

export type KYCFamilyErrorType = {
  statusPernikahanId?: string[];
  namaPasangan?: string[];
  namaGadisIbuKandung?: string[];
  namaAhliWaris?: string[];
  hubunganDenganAhliWaris?: string[];
  tlpAhliWaris?: string[];
};

export type KYCOccupationErrorType = {
  titlePekerjaan?: string[];
  namaPerusahaan?: string[];
  alamatPerusahaan?: string[];
  totalAssetUser?: string[];
  sumberDanaUser?: string[];
  tujuanInvestasi?: string[];
};

export type KYCTaxErrorType = {
  kodePajakId?: string[];
  npwp?: string[];
  penghasilanPerTahunSebelumPajak?: string[];
  tglRegistrasi?: string[];
  hasSID?: string[];
};

export type KYCTax2ErrorType = {
  fotoRekeningSid?: string[];
  rekeningSid?: string[];
  tglRegistrasiSid?: string[];
};

export type KYCBankErrorType = {
  bankId?: string[];
  namaPemilikRekeningBank?: string[];
  rekeningBank?: string[];
};

export type KYCRiskErrorType = {
  risk1?: string[];
  risk2?: string[];
  risk3?: string[];
  risk4?: string[];
  risk5?: string[];
  risk6?: string[];
};

export type KYCStateType = KYCPersonalType &
  KYCIDType &
  KYCAddressKTPType &
  KYCAddressType &
  KYCFamilyType &
  KYCOccupationType &
  KYCTaxType &
  KYCTax2Type &
  KYCBankType &
  KYCRiskType;
export type KYCErrorType = KYCPersonalErrorType &
  KYCIDErrorType &
  KYCAddressKTPErrorType &
  KYCAddressErrorType &
  KYCFamilyErrorType &
  KYCOccupationErrorType &
  KYCTaxErrorType &
  KYCTax2ErrorType &
  KYCBankErrorType &
  KYCRiskErrorType;

export type KYCFormFieldType<
  K extends keyof KYCStateType = keyof KYCStateType,
> = {
  name: K;
  label: string;
  type: InputType;
  placeholder?: string;
  required?: boolean;
  subLabel?: string;
  subLabelIcon?: ReactNode;
  disable?: boolean;
  option?: InputDropdownOption[];
  loading?: boolean;
  onChangeAdditionalValue?: any;
};

export type KYCBackScreen =
  | 'KYCPersonal'
  | 'KYCAddress'
  | 'KYCFamily'
  | 'KYCOccupation'
  | 'KYCTax'
  | 'KYCBank'
  | 'KYCRisk';

export type KYCProgressType = {
  address: boolean;
  bank: boolean;
  family: boolean;
  personal: boolean;
  tax: boolean;
  occupation: boolean;
};
