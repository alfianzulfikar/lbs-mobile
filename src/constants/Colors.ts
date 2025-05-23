/**
 * Below are the colors that are used in the app. The colors are defined in the light and dark mode.
 * There are many other ways to style your app. For example, [Nativewind](https://www.nativewind.dev/), [Tamagui](https://tamagui.dev/), [unistyles](https://reactnativeunistyles.vercel.app), etc.
 */

const tintColorLight = '#00827E';
const tintColorDark = '#FCE4C1';
// const tintColorDark = "#C7AD86";

export const Colors = {
  light: {
    text: '#1A1A1A',
    text2: '#404040',
    text3: '#616161',
    text4: '#9E9E9E',
    textInfo: '#1570EF',
    textSuccess: '#00970F',
    textDanger: '#D92D20',
    textWarning: '#CD7B2E',
    textDisable: '#C2C2C2',
    textInvert: '#FFFFFF',
    background: '#FFFFFF',
    tint: tintColorLight,
    tint2: tintColorLight,
    tint3: tintColorLight,
    icon: '#404040',
    tabIconDefault: '#404040',
    tabIconSelected: tintColorLight,
    buttonBgDefault: '#1A1A1A',
    buttonBgSecondary: 'transparent',
    buttonBgDanger: '#FFEBEB',
    buttonTextDefault: '#FFFFFF',
    buttonTextSecondary: '#1A1A1A',
    buttonTextDanger: '#D50202',
    line: '#EDEDED',
    border: '#9E9E9E',
    inputDisable: '#E0E0E0',
  },
  dark: {
    text: '#ECEDEE',
    text2: '#E0E0E0',
    text3: '#E0E0E0',
    text4: '#9E9E9E',
    textInfo: '#A9CDFF',
    textSuccess: '#93FD9D',
    textDanger: '#FFA9A2',
    textWarning: '#CD7B2E',
    textDisable: '#C2C2C2',
    textInvert: '#404040',
    background: '#1A1A1A',
    tint: tintColorDark,
    tint2: '#FFE7C2',
    tint3: '#C7AD86',
    icon: '#EDEDED',
    tabIconDefault: '#EDEDED',
    tabIconSelected: tintColorDark,
    buttonBgDefault: '#FFFFFF',
    buttonBgSecondary: 'transparent',
    buttonBgDanger: '#FFEBEB',
    buttonTextDefault: '#1A1A1A',
    buttonTextSecondary: '#FFFFFF',
    buttonTextDanger: '#D50202',
    line: '#404040',
    border: '#E0E0E0',
    inputDisable: '#E0E0E0',
  },
};

export const RGBAColors = (opacity = 1) => {
  return {
    light: {
      text: `rgba(26, 26, 26, ${opacity})`,
      background: `rgba(255, 255, 255, ${opacity})`,
      tint: `rgba(0, 130, 126, ${opacity})`,
      icon: `rgba(64, 64, 64, ${opacity})`,
      tabIconDefault: `rgba(64, 64, 64, ${opacity})`,
      tabIconSelected: `rgba(0, 130, 126, ${opacity})`,
    },
    dark: {
      text: `rgba(236, 237, 238, ${opacity})`,
      background: `rgba(26, 26, 26, ${opacity})`,
      tint: `rgba(199, 173, 134, ${opacity})`,
      icon: `rgba(237, 237, 237, ${opacity})`,
      tabIconDefault: `rgba(237, 237, 237, ${opacity})`,
      tabIconSelected: `rgba(199, 173, 134, ${opacity})`,
    },
  };
};
