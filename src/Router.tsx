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
import AccountScreen from './screens/Account';
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
import PortfolioScreen from './screens/Portfolio';
import PortfolioDetail from './screens/PortfolioDetail';
import ArticleScreen from './screens/Article';
import FAQ from './screens/FAQ';
import Disclosure from './screens/Disclosure';
import ImagePreview from './screens/ImagePreview';
import KYCScreen from './screens/KYC';
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
import MarketScreen from './screens/Market';
import MarketDetail from './screens/MarketDetail';
import MarketOrder from './screens/MarketOrder';
import MarketGuide from './screens/MarketGuide';
import KYCWaiting from './screens/KYCWaiting';
import Guide from './screens/Guide';
import ResetPassword from './screens/ResetPassword';
import DigitalSignature from './screens/DigitalSignature';
import DigitalSignatureResend from './screens/DigitalSignatureResend';
import DigitalSignatureSuccess from './screens/DigitalSignatureSuccess';
import NotificationHistory from './screens/NotificationHistory';
import {
  AccountStackParamList,
  ArticleStackParamList,
  AuthStackParamList,
  KYCStackParamList,
  MarketStackParamList,
  OrderStackParamList,
  PortfolioStackParamList,
  RootStackParamList,
} from './constants/Types';
import {navigationRef, tryFlushPendingNavigation} from './services/navigation';
import NotificationDetail from './screens/NotificationDetail';

const Tab = createBottomTabNavigator();
const Stack = createNativeStackNavigator<RootStackParamList>();
const OrderStack = createNativeStackNavigator<OrderStackParamList>();
const AuthStack = createNativeStackNavigator<AuthStackParamList>();
const AccountStack = createNativeStackNavigator<AccountStackParamList>();
const KYCStack = createNativeStackNavigator<KYCStackParamList>();
const ArticleStack = createNativeStackNavigator<ArticleStackParamList>();
const PortfolioStack = createNativeStackNavigator<PortfolioStackParamList>();
const MarketStack = createNativeStackNavigator<MarketStackParamList>();

function Auth() {
  return (
    <AuthStack.Navigator
      screenOptions={{
        headerShown: false,
      }}>
      <AuthStack.Screen name="Login" component={Login} />
      <AuthStack.Screen name="Register" component={Register} />
      <AuthStack.Screen name="SendEmail" component={SendEmail} />
      <AuthStack.Screen
        name="AccountVerification"
        component={AccountVerification}
      />
      <AuthStack.Screen name="ForgotPassword" component={ForgotPassword} />
      <AuthStack.Screen name="ResetPassword" component={ResetPassword} />
    </AuthStack.Navigator>
  );
}

function MainTab() {
  return (
    <Tab.Navigator
      screenOptions={{
        headerShown: false,
      }}
      tabBar={props => {
        return <CustomBottomTab {...props} />;
      }}>
      <Tab.Screen name="Home" component={Home} />
      <Tab.Screen name="Business" component={Business} />
      <Tab.Screen name="Transaction" component={Transaction} />
      <Tab.Screen name="AccountScreen" component={AccountScreen} />
    </Tab.Navigator>
  );
}

function Account() {
  return (
    <AccountStack.Navigator
      screenOptions={{
        headerShown: false,
      }}>
      <AccountStack.Screen name="PersonalData" component={PersonalData} />
      <AccountStack.Screen name="ChangePassword" component={ChangePassword} />
      <AccountStack.Screen
        name="NotificationSetting"
        component={NotificationSetting}
      />
      <AccountStack.Screen name="PrivacyPolicy" component={PrivacyPolicy} />
      <AccountStack.Screen
        name="TermsAndConditions"
        component={TermsAndConditions}
      />
      <AccountStack.Screen
        name="ComplaintProcedure"
        component={ComplaintProcedure}
      />
      <AccountStack.Screen name="AboutUs" component={AboutUs} />
    </AccountStack.Navigator>
  );
}

function KYC() {
  return (
    <KYCStack.Navigator
      screenOptions={{
        headerShown: false,
      }}>
      <KYCStack.Screen name="KYCScreen" component={KYCScreen} />
      <KYCStack.Screen name="KYCPersonal" component={KYCPersonal} />
      <KYCStack.Screen name="KYCAddress" component={KYCAddress} />
      <KYCStack.Screen name="KYCFamily" component={KYCFamily} />
      <KYCStack.Screen name="KYCOccupation" component={KYCOccupation} />
      <KYCStack.Screen name="KYCTax" component={KYCTax} />
      <KYCStack.Screen name="KYCBank" component={KYCBank} />
      <KYCStack.Screen name="KYCRisk" component={KYCRisk} />
      <KYCStack.Screen name="KYCTerms" component={KYCTerms} />
      <KYCStack.Screen name="KYCWaiting" component={KYCWaiting} />
    </KYCStack.Navigator>
  );
}

function Order() {
  return (
    <OrderStack.Navigator
      screenOptions={{
        headerShown: false,
      }}>
      <OrderStack.Screen name="BusinessDetail" component={BusinessDetail} />
      <OrderStack.Screen name="OrderBusiness" component={OrderBusiness} />
      <OrderStack.Screen name="WaitingPayment" component={WaitingPayment} />
      <OrderStack.Screen name="Prospectus" component={Prospectus} />
      <OrderStack.Screen
        name="BusinessDiscussion"
        component={BusinessDiscussion}
      />
      <OrderStack.Screen name="DigitalSignature" component={DigitalSignature} />
      <OrderStack.Screen
        name="DigitalSignatureResend"
        component={DigitalSignatureResend}
      />
      <OrderStack.Screen
        name="DigitalSignatureSuccess"
        component={DigitalSignatureSuccess}
      />
    </OrderStack.Navigator>
  );
}

function Article() {
  return (
    <ArticleStack.Navigator
      screenOptions={{
        headerShown: false,
      }}>
      <ArticleStack.Screen name="ArticleScreen" component={ArticleScreen} />
      <ArticleStack.Screen name="ArticleDetail" component={ArticleDetail} />
    </ArticleStack.Navigator>
  );
}

function Portfolio() {
  return (
    <PortfolioStack.Navigator
      screenOptions={{
        headerShown: false,
      }}>
      <PortfolioStack.Screen
        name="PortfolioScreen"
        component={PortfolioScreen}
      />
      <PortfolioStack.Screen
        name="PortfolioDetail"
        component={PortfolioDetail}
      />
    </PortfolioStack.Navigator>
  );
}

function Market() {
  return (
    <MarketStack.Navigator
      screenOptions={{
        headerShown: false,
      }}>
      <MarketStack.Screen name="MarketScreen" component={MarketScreen} />
      <MarketStack.Screen name="MarketDetail" component={MarketDetail} />
      <MarketStack.Screen name="MarketOrder" component={MarketOrder} />
      <MarketStack.Screen name="MarketGuide" component={MarketGuide} />
    </MarketStack.Navigator>
  );
}

function RootStack() {
  return (
    <Stack.Navigator
      screenOptions={{
        headerShown: false,
      }}>
      <Stack.Screen name="Splash" component={Splash} />
      <Stack.Screen name="MainTab" component={MainTab} />
      <Stack.Screen name="OnBoarding" component={OnBoarding} />
      <Stack.Screen name="Order" component={Order} />
      <Stack.Screen name="Account" component={Account} />
      <Stack.Screen name="Auth" component={Auth} />
      <Stack.Screen name="Article" component={Article} />
      <Stack.Screen name="Portfolio" component={Portfolio} />
      <Stack.Screen name="FAQ" component={FAQ} />
      <Stack.Screen name="Disclosure" component={Disclosure} />
      <Stack.Screen name="ImagePreview" component={ImagePreview} />
      <Stack.Screen name="KYC" component={KYC} />
      <Stack.Screen name="Market" component={Market} />
      <Stack.Screen name="OTP" component={OTP} />
      <Stack.Screen name="PaymentSuccess" component={PaymentSuccess} />
      <Stack.Screen name="Guide" component={Guide} />
      <Stack.Screen
        name="NotificationHistory"
        component={NotificationHistory}
      />
      <Stack.Screen name="NotificationDetail" component={NotificationDetail} />
    </Stack.Navigator>
  );
}

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

// static routing

// const OrderStack = createNativeStackNavigator({
//   screenOptions: {
//     headerShown: false,
//   },
//   screens: {
//     BusinessDetail,
//     OrderBusiness,
//     WaitingPayment,
//     Prospectus,
//     BusinessDiscussion,
//     DigitalSignature,
//     DigitalSignatureResend,
//     DigitalSignatureSuccess,
//   },
// });

// const AccountStack = createNativeStackNavigator({
//   screenOptions: {
//     headerShown: false,
//   },
//   screens: {
//     PersonalData,
//     ChangePassword,
//     NotificationSetting,
//     PrivacyPolicy,
//     TermsAndConditions,
//     ComplaintProcedure,
//     AboutUs,
//   },
// });

// const AuthStack = createNativeStackNavigator({
//   screenOptions: {
//     headerShown: false,
//   },
//   screens: {
//     Login,
//     Register,
//     SendEmail,
//     AccountVerification,
//     ForgotPassword,
//     ResetPassword,
//   },
// });

// const ArticleStack = createNativeStackNavigator({
//   screenOptions: {
//     headerShown: false,
//   },
//   screens: {
//     Article,
//     ArticleDetail,
//   },
// });

// const PortfolioStack = createNativeStackNavigator({
//   screenOptions: {
//     headerShown: false,
//   },
//   screens: {
//     Portfolio,
//     PortfolioDetail,
//   },
// });

// const KYCStack = createNativeStackNavigator({
//   screenOptions: {
//     headerShown: false,
//   },
//   screens: {
//     KYC,
//     KYCPersonal,
//     KYCAddress,
//     KYCFamily,
//     KYCOccupation,
//     KYCTax,
//     KYCBank,
//     KYCRisk,
//     KYCTerms,
//     KYCWaiting,
//   },
// });

// const MarketStack = createNativeStackNavigator({
//   screenOptions: {
//     headerShown: false,
//   },
//   screens: {
//     Market,
//     MarketDetail,
//     MarketOrder,
//     MarketGuide,
//   },
// });

// const MainTab = createBottomTabNavigator({
//   screenOptions: {
//     headerShown: false,
//   },
//   tabBar(props) {
//     return <CustomBottomTab {...props} />;
//   },
//   screens: {
//     Home,
//     Business,
//     Transaction,
//     Account,
//   },
// });

// const RootStack = createNativeStackNavigator({
//   screenOptions: {
//     headerShown: false,
//   },
//   screens: {
//     Splash,
//     OnBoarding,
//     MainTab,
//     OrderStack,
//     AccountStack,
//     AuthStack,
//     ArticleStack,
//     PortfolioStack,
//     FAQ,
//     Disclosure,
//     ImagePreview,
//     KYCStack,
//     MarketStack,
//     OTP,
//     PaymentSuccess,
//     Guide,
//     NotificationHistory,
//   },
// });

// const Navigation = createStaticNavigation(RootStack);

// export type RootStackParamList = StaticParamList<typeof RootStack>;

declare global {
  namespace ReactNavigation {
    interface RootParamList extends RootStackParamList {}
  }
}

// export default function App() {
//   return <Navigation />;

export default function App() {
  return (
    <NavigationContainer
      ref={navigationRef}
      onReady={() => {
        console.log('NavigationContainer ready');
        tryFlushPendingNavigation();
      }}>
      <RootStack />
    </NavigationContainer>
  );
}
