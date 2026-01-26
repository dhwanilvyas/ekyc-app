import { StyleSheet, TextInput, useColorScheme, type TextInputProps } from 'react-native';

import { useThemeColor } from '@/hooks/use-theme-color';

export type ThemedTextProps = TextInputProps & {
  lightColor?: string;
  darkColor?: string;
  type?: 'default' | 'title' | 'defaultSemiBold' | 'subtitle' | 'link';
};

export function ThemedTextInput({
  style,
  lightColor,
  darkColor,
  type = 'default',
  ...rest
}: ThemedTextProps) {
  const scheme = useColorScheme();
  const color = useThemeColor({ light: lightColor, dark: darkColor }, 'placeholder');

  return (
    <TextInput
      style={[
        { color, borderColor: '#ffffff' },
      ]}
      placeholderTextColor={color}
      keyboardAppearance={scheme ?? 'default'}
      {...rest}
    />
  );
}

const styles = StyleSheet.create({
  default: {
    borderColor: '#ffffff',
    lineHeight: 24,
  },
  defaultSemiBold: {
    fontSize: 16,
    lineHeight: 24,
    fontWeight: '600',
  },
  title: {
    fontSize: 32,
    fontWeight: 'bold',
    lineHeight: 32,
  },
  subtitle: {
    fontSize: 20,
    fontWeight: 'bold',
  },
  link: {
    lineHeight: 30,
    fontSize: 16,
    color: '#0a7ea4',
  },
});
