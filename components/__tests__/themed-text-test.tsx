import { render } from '@testing-library/react-native';

import { ThemedText } from '../ui/themed-text';

describe('<ThemedText />', () => {
  test('Text renders correctly on HomeScreen', () => {
    const { getByText } = render(<ThemedText>Welcome!</ThemedText>);

    getByText('Welcome!');
  });

  test('ThemedText renders with default type', () => {
    const { getByText } = render(
      <ThemedText type="default">Default Text</ThemedText>
    );

    getByText('Default Text');
  });

  test('ThemedText renders with title type', () => {
    const { getByText } = render(
      <ThemedText type="title">Title Text</ThemedText>
    );

    getByText('Title Text');
  });

  test('ThemedText renders with custom colors', () => {
    const { getByText } = render(
      <ThemedText lightColor="#FF0000" darkColor="#00FF00">
        Colored Text
      </ThemedText>
    );

    getByText('Colored Text');
  });
});
