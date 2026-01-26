import { render } from '@testing-library/react-native';

import { ThemedText } from '../themed-text';

describe('<ThemedText />', () => {
  test('Text renders correctly on HomeScreen', () => {
    const { getByText } = render(<ThemedText>Welcome!</ThemedText>);

    getByText('Welcome!');
  });
});
