/**
 * Below are the colors that are used in the app. The colors are defined in the light and dark mode.
 * There are many other ways to style your app. For example, [Nativewind](https://www.nativewind.dev/), [Tamagui](https://tamagui.dev/), [unistyles](https://reactnativeunistyles.vercel.app), etc.
 */

import { Platform } from 'react-native';

const tintColorLight = '#0a7ea4';
const tintColorDark = '#fff';

export const Colors = {
  light: {
    text: '#11181C',
    background: '#fff',
    tint: tintColorLight,
    icon: '#687076',
    tabIconDefault: '#687076',
    tabIconSelected: tintColorLight,
    placeholder: '#999999',
    border: '#CCCCCC',
    buttonPrimary: '#0052CC',
    buttonPrimaryDisabled: '#B3D9E8',
    buttonSecondary: '#F0F0F0',
    buttonSecondaryDisabled: '#E8E8E8',
    stepperActiveLabelColor: "#000000",
    stepperActiveStepNumColor: "#000000",
    stepperActiveStepIconBorderColor: "#000000",
    stepperDisabledStepNumColor: "#ffffff",
    // setting empty values so that default lib values get applied
    stepperDisabledStepIconColor: 'grey',
    stepperCompletedLabelColor: "black",
    stepperButtonPreviousTextColor: "black",
    stepperButtonDisabledColor: "lightgray",
    pickerIconButtonColor: "#000000"
  },
  dark: {
    text: '#ECEDEE',
    background: '#151718',
    tint: tintColorDark,
    icon: '#9BA1A6',
    tabIconDefault: '#9BA1A6',
    tabIconSelected: tintColorDark,
    placeholder: '#888888',
    border: '#444444',
    buttonPrimary: '#0A84FF',
    buttonPrimaryDisabled: '#4A5F7F',
    buttonSecondary: '#2C2C2C',
    buttonSecondaryDisabled: '#1A1A1A',
    stepperActiveLabelColor: "#ffffff",
    stepperActiveStepNumColor: "#ffffff",
    stepperActiveStepIconBorderColor: "#ffffff",
    stepperDisabledStepNumColor: "#ffffff",
    stepperDisabledStepIconColor: '#888888',
    stepperCompletedLabelColor: "lightgray",
    stepperButtonPreviousTextColor: '#ffffff',
    stepperButtonDisabledColor: "gray",
    pickerIconButtonColor: "#ffffff"
  },
};

export const Fonts = Platform.select({
  ios: {
    /** iOS `UIFontDescriptorSystemDesignDefault` */
    sans: 'system-ui',
    /** iOS `UIFontDescriptorSystemDesignSerif` */
    serif: 'ui-serif',
    /** iOS `UIFontDescriptorSystemDesignRounded` */
    rounded: 'ui-rounded',
    /** iOS `UIFontDescriptorSystemDesignMonospaced` */
    mono: 'ui-monospace',
  },
  default: {
    sans: 'normal',
    serif: 'serif',
    rounded: 'normal',
    mono: 'monospace',
  },
  web: {
    sans: "system-ui, -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, Helvetica, Arial, sans-serif",
    serif: "Georgia, 'Times New Roman', serif",
    rounded: "'SF Pro Rounded', 'Hiragino Maru Gothic ProN', Meiryo, 'MS PGothic', sans-serif",
    mono: "SFMono-Regular, Menlo, Monaco, Consolas, 'Liberation Mono', 'Courier New', monospace",
  },
});
