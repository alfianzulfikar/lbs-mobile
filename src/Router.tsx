// In App.js in a new project

import * as React from 'react';
import {View, Text} from 'react-native';
import {
  createStaticNavigation,
  NavigationContainer,
  StaticParamList,
} from '@react-navigation/native';
import {createNativeStackNavigator} from '@react-navigation/native-stack';
import Home from './screens/Home';
import Business from './screens/Business';
import Transaction from './screens/Transaction';
import Account from './screens/Account';
import {createBottomTabNavigator} from '@react-navigation/bottom-tabs';
import CustomBottomTab from './components/CustomBottomTab';
import Splash from './screens/Splash';
import BusinessDetail from './screens/BusinessDetail';
import OrderBusiness from './screens/OrderBusiness';
import WaitingPayment from './screens/WaitingPayment';
import PaymentSuccess from './screens/PaymentSuccess';
import Login from './screens/Login';
import Register from './screens/Register';
import SendEmail from './screens/SendEmail';
import AccountVerification from './screens/AccountVerification';
import OTP from './screens/OTP';
import OnBoarding from './screens/OnBoarding';
import PersonalData from './screens/PersonalData';
import ChangePassword from './screens/ChangePassword';
import NotificationSetting from './screens/NotificationSetting';
import PrivacyPolicy from './screens/PrivacyPolicy';
import TermsAndConditions from './screens/TermsAndConditions';
import ArticleDetail from './screens/ArticleDetail';
import ComplaintProcedure from './screens/ComplaintProcedure';
import Portfolio from './screens/Portfolio';
import PortfolioDetail from './screens/PortfolioDetail';
import Article from './screens/Article';
import FAQ from './screens/FAQ';
import Disclosure from './screens/Disclosure';
import ImagePreview from './screens/ImagePreview';
import KYC from './screens/KYC';
import KYCPersonal from './screens/KYCPersonal';
import KYCAddress from './screens/KYCAddress';
import KYCFamily from './screens/KYCFamily';
import KYCOccupation from './screens/KYCOccupation';
import KYCTax from './screens/KYCTax';
import KYCBank from './screens/KYCBank';
import KYCRisk from './screens/KYCRisk';
import KYCTerms from './screens/KYCTerms';
import ForgotPassword from './screens/ForgotPassword';
import Prospectus from './screens/Prospectus';
import BusinessDiscussion from './screens/BusinessDiscussion';
import AboutUs from './screens/AboutUs';
import Market from './screens/Market';
import MarketDetail from './screens/MarketDetail';
import MarketOrder from './screens/MarketOrder';
import MarketGuide from './screens/MarketGuide';
import KYCWaiting from './screens/KYCWaiting';
import Guide from './screens/Guide';
import ResetPassword from './screens/ResetPassword';
import DigitalSignature from './screens/DigitalSignature';
import DigitalSignatureResend from './screens/DigitalSignatureResend';
import DigitalSignatureSuccess from './screens/DigitalSignatureSuccess';

// const Tab = createBottomTabNavigator();
// const Stack = createNativeStackNavigator();

// function MainTab() {
//   return (
//     <Tab.Navigator
//       screenOptions={{
//         headerShown: false,
//       }}
//       tabBar={props => {
//         console.log('props', props);
//         return <CustomBottomTab {...props} />;
//       }}>
//       <Tab.Screen name="Home" component={Home} />
//       <Tab.Screen name="Business" component={Business} />
//       <Tab.Screen name="Transaction" component={Transaction} />
//       <Tab.Screen name="Account" component={Account} />
//     </Tab.Navigator>
//   );
// }

// function OrderStack() {
//   return (
//     <Stack.Navigator
//       screenOptions={{
//         headerShown: false,
//       }}>
//       <Stack.Screen name="BusinessDetail" component={BusinessDetail} />
//     </Stack.Navigator>
//   );
// }

// function RootStack() {
//   return (
//     <Stack.Navigator
//       screenOptions={{
//         headerShown: false,
//       }}>
//       <Stack.Screen name="Splash" component={Splash} />
//       <Stack.Screen name="Main" component={MainTab} />
//       <Stack.Screen name="Order" component={OrderStack} />
//     </Stack.Navigator>
//   );
// }

// static routing

const OrderStack = createNativeStackNavigator({
  screenOptions: {
    headerShown: false,
  },
  screens: {
    BusinessDetail,
    OrderBusiness,
    WaitingPayment,
    // PaymentSuccess,
    Prospectus,
    BusinessDiscussion,
    DigitalSignature,
    DigitalSignatureResend,
    DigitalSignatureSuccess,
  },
});

const AccountStack = createNativeStackNavigator({
  screenOptions: {
    headerShown: false,
  },
  screens: {
    PersonalData,
    ChangePassword,
    NotificationSetting,
    PrivacyPolicy,
    TermsAndConditions,
    ComplaintProcedure,
    AboutUs,
  },
});

const AuthStack = createNativeStackNavigator({
  screenOptions: {
    headerShown: false,
  },
  screens: {
    Login,
    Register,
    SendEmail,
    AccountVerification,
    // OTP,
    ForgotPassword,
    ResetPassword,
  },
});

const ArticleStack = createNativeStackNavigator({
  screenOptions: {
    headerShown: false,
  },
  screens: {
    Article,
    ArticleDetail,
  },
});

const PortfolioStack = createNativeStackNavigator({
  screenOptions: {
    headerShown: false,
  },
  screens: {
    Portfolio,
    PortfolioDetail,
  },
});

const KYCStack = createNativeStackNavigator({
  screenOptions: {
    headerShown: false,
  },
  screens: {
    KYC,
    KYCPersonal,
    KYCAddress,
    KYCFamily,
    KYCOccupation,
    KYCTax,
    KYCBank,
    KYCRisk,
    KYCTerms,
    KYCWaiting,
  },
});

const MarketStack = createNativeStackNavigator({
  screenOptions: {
    headerShown: false,
  },
  screens: {
    Market,
    MarketDetail,
    MarketOrder,
    MarketGuide,
  },
});

const MainTab = createBottomTabNavigator({
  screenOptions: {
    headerShown: false,
  },
  tabBar(props) {
    return <CustomBottomTab {...props} />;
  },
  screens: {
    Home,
    Business,
    Transaction,
    Account,
  },
});

const RootStack = createNativeStackNavigator({
  screenOptions: {
    headerShown: false,
  },
  screens: {
    Splash,
    OnBoarding,
    MainTab,
    OrderStack,
    AccountStack,
    AuthStack,
    ArticleStack,
    PortfolioStack,
    FAQ,
    Disclosure,
    ImagePreview,
    KYCStack,
    MarketStack,
    OTP,
    PaymentSuccess,
    Guide,
  },
});

const Navigation = createStaticNavigation(RootStack);

export type RootStackParamList = StaticParamList<typeof RootStack>;

declare global {
  namespace ReactNavigation {
    interface RootParamList extends RootStackParamList {}
  }
}

export default function App() {
  return <Navigation />;
}
