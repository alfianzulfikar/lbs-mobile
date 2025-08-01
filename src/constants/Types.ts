import {NavigatorScreenParams} from '@react-navigation/native';
import {ReactNode} from 'react';
import {GestureResponderEvent, StyleProp, ViewStyle} from 'react-native';

export type MainTabParamList = {
  Home: undefined;
  Business: undefined;
  Transaction: undefined;
  Account: undefined;
};

export type OrderStackParamList = {
  BusinessDetail: {slug: string};
  OrderBusiness: {slug: string; customerCode: string};
  WaitingPayment: {
    code: string;
    type?: 'ask' | 'bid';
    feeBuy?: number;
    feeSell?: number;
  };
  Prospectus: {
    file: string;
    businessContent: any[];
    tipeBisnis: string;
    terjual: number;
    tersisa: number;
  };
  BusinessDiscussion: {
    slug: string;
    businessStatus?: string;
  };
  DigitalSignature: {
    token: string;
    kode: string;
  };
  DigitalSignatureResend: undefined;
  DigitalSignatureSuccess: undefined;
};

export type AuthStackParamList = {
  Login: {
    targetRoute?: {
      mainRoute: string;
      options?: {screen?: string; params: any};
    };
  };
  Register: undefined;
  SendEmail: {message: string};
  AccountVerification: {token: string};
  ForgotPassword: undefined;
  ResetPassword: {token: string};
  AccountVerificationExpired: undefined;
};

export type AccountStackParamList = {
  PersonalData: undefined;
  ChangePassword: undefined;
  NotificationSetting: undefined;
  PrivacyPolicy: undefined;
  TermsAndConditions: undefined;
  ComplaintProcedure: undefined;
  AboutUs: undefined;
};

export type KYCStackParamList = {
  KYCScreen: undefined;
  KYCPersonal: undefined;
  KYCAddress: undefined;
  KYCFamily: undefined;
  KYCOccupation: undefined;
  KYCTax: undefined;
  KYCBank: undefined;
  KYCRisk: undefined;
  KYCTerms: undefined;
  KYCWaiting: undefined;
};

export type ArticleStackParamList = {
  ArticleScreen: undefined;
  ArticleDetail: {
    slug: string;
    category: string;
  };
};

export type PortfolioStackParamList = {
  PortfolioScreen: undefined;
  PortfolioDetail: {
    slug: string;
    id: number;
  };
};

export type MarketStackParamList = {
  MarketScreen: undefined;
  MarketDetail: {
    slug: string;
    id: number;
    merkDagang: string;
    code: string;
  };
  MarketOrder: {
    type: 'ask' | 'bid';
    id: number;
    merkDagang: string;
    code: string;
    feeBuy: number;
    feeSell: number;
    defaultPrice?: number;
  };
  MarketGuide: undefined;
};

export type RootStackParamList = {
  Splash: undefined;
  MainTab: NavigatorScreenParams<MainTabParamList>;
  OnBoarding: undefined;
  FAQ: undefined;
  Disclosure: undefined;
  Order: NavigatorScreenParams<OrderStackParamList>;
  Auth: NavigatorScreenParams<AuthStackParamList>;
  Account: NavigatorScreenParams<AccountStackParamList>;
  KYC: NavigatorScreenParams<KYCStackParamList>;
  Article: NavigatorScreenParams<ArticleStackParamList>;
  Portfolio: NavigatorScreenParams<PortfolioStackParamList>;
  ImagePreview: {
    base64: string;
    path: string;
  };
  OTP: {
    phone?: string;
    market?: {
      id: number;
      body: {
        price: number;
        volume: number;
        otp_methods: 'whatsapp' | 'sms';
      };
    };
    register?: {
      body: {
        firstname: string;
        lastname: string;
        email: string;
        phone: string;
        password: string;
        confirmPassword: string;
        otp_methods: string;
      };
      // request_id: string;
      token: string;
    };
  };
  PaymentSuccess: {
    paymentCode: string;
    type: string;
  };
  Guide: undefined;
  Market: NavigatorScreenParams<MarketStackParamList>;
  NotificationHistory: undefined;
  NotificationDetail: {
    title: string;
    description: string;
    slug?: string;
    code?: string;
  };
  CropImage: {
    uri: string;
  };
};

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
  id: number | null;
}

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
  merkDagang: string;
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

export type HomeMenuScreenType =
  | 'Portfolio'
  | 'FAQ'
  | 'Market'
  | 'Guide'
  | undefined;

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
  phoneCode?: string;
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
  phoneCode?: string[];
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
  customInput?: 'phone';
  pictureType?: 'camera' | 'galery' | 'option';
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

export type ReplyType = {
  username: string;
  id: string;
  date: string;
  message: string;
  image: string;
  numberOfLikes: number;
  isOfficial: boolean;
  canDelete: boolean;
  isLiked: boolean;
};

export type CommentType = ReplyType & {
  replies?: CommentType[];
};

export type BannerType = {
  image: string;
  link: string;
  isPublished: boolean;
};

export type StockOverviewType = {
  currentPrice: number | null;
  openPrice: number | null;
  closePrice: number | null;
  lowestPrice: number | null;
  highestPrice: number | null;
  fairValue: number | null;
  feeBuy?: number | null;
  feeSell?: number | null;
  buyShares: number | null;
  sellShares: number | null;
};

export type StockType = StockOverviewType & {
  id: number;
  slug: string;
  code: string;
  merkDagang: string;
};

export type BidOrderbookType = {
  B_Lembar: number | null;
  Bid_Rp: number | null;
};

export type AskOrderbookType = {
  Ask_Rp: number | null;
  A_Lembar: number | null;
};

export type TradebookType = {
  price: number | null;
  frequency: number | null;
  volume: number | null;
  value: number | null;
};

export type DailyType = {
  date: string;
  open: number;
  close: number;
  change: number;
  volume: number;
};

export type PaymentType = {
  type: string;
  paymentCode: string;
  merkDagang: string;
  businessCode: string;
  billingExpired: string;
  bank: string;
  nominal: number | null;
  price: number | null;
  volume: number | null;
  total: number | null;
  platformFee: number | null;
  bankFee: number | null;
  va: string;
  discount: number | null;
  status: string;
};

export type TopicType = {
  id: string;
  name: string;
  description: string;
  isSubscribed: boolean;
  label?: string;
};

export type NotificationType = {
  title: string;
  description: string;
  icon: string;
  data: {
    key?: string;
    value?: string;
  };
};

export type CallingCodeType = {
  id: string;
  label: string;
};
