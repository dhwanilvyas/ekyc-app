import { configure } from '@testing-library/react-native';

// Suppress console errors for native modules
const originalError = console.error;
beforeAll(() => {
  console.error = (...args: any[]) => {
    if (
      typeof args[0] === 'string' &&
      (args[0].includes('NativeModule') ||
        args[0].includes('Linking') ||
        args[0].includes('DevMenu') ||
        args[0].includes('RCTAnimation') ||
        args[0].includes('AsyncStorage'))
    ) {
      return;
    }
    originalError.call(console, ...args);
  };
});

afterAll(() => {
  console.error = originalError;
});

// Configure testing library
configure({ testID: 'testID' });

// Mock native modules
jest.mock('@react-native-async-storage/async-storage', () => ({
  getItem: jest.fn(async () => null),
  setItem: jest.fn(async () => null),
  removeItem: jest.fn(async () => null),
  multiGet: jest.fn(async () => []),
  multiSet: jest.fn(async () => null),
  multiRemove: jest.fn(async () => null),
  clear: jest.fn(async () => null),
}));

jest.mock('expo-secure-store', () => ({
  setItemAsync: jest.fn(async () => null),
  getItemAsync: jest.fn(async () => null),
  deleteItemAsync: jest.fn(async () => null),
}));

jest.mock('react-native', () => {
  const rn = jest.requireActual('react-native');
  return {
    ...rn,
    useColorScheme: () => 'light',
    Appearance: {
      getColorScheme: () => 'light',
      addAppearanceListener: () => ({ remove: () => {} }),
    },
    NativeModules: {
      ...rn.NativeModules,
      RNCAsyncStorage: {},
      DevMenu: {},
      RCTAnimation: {},
    },
  };
});

jest.mock('expo-linking', () => ({
  createURL: jest.fn((path) => `exp://localhost:19000${path}`),
  useURL: jest.fn(() => null),
}));

jest.mock('expo-constants', () => ({
  manifest: {
    extra: {},
  },
  sessionId: 'test-session-id',
}));

jest.mock('expo-splash-screen', () => ({
  hideAsync: jest.fn(),
}));

jest.mock('expo-font', () => ({
  loadAsync: jest.fn(),
  isLoaded: jest.fn(() => true),
}));

// Mock react-native-safe-area-context
jest.mock('react-native-safe-area-context', () => {
  const React = require('react');
  return {
    SafeAreaProvider: ({ children }: any) => React.createElement(React.Fragment, null, children),
    SafeAreaView: ({ children, ...props }: any) => 
      React.createElement(require('react-native').View, props, children),
    useSafeAreaInsets: () => ({
      top: 0,
      bottom: 0,
      left: 0,
      right: 0,
    }),
  };
});

// Mock react-native-reanimated
jest.mock('react-native-reanimated', () => ({
  Value: jest.fn(),
  event: jest.fn(),
  add: jest.fn(),
  eq: jest.fn(),
  set: jest.fn(),
  cond: jest.fn(),
  interpolate: jest.fn(),
  Extrapolate: {
    CLAMP: 'CLAMP',
  },
  Animated: {
    Value: jest.fn(),
    createAnimatedComponent: jest.fn((Component) => Component),
    Image: require('react-native').Image,
    ScrollView: require('react-native').ScrollView,
    Text: require('react-native').Text,
    View: require('react-native').View,
  },
  useSharedValue: jest.fn(() => ({ value: 0 })),
  useAnimatedStyle: jest.fn(() => ({})),
  useAnimatedReaction: jest.fn(),
  runOnJS: jest.fn((fn) => fn),
  withSpring: jest.fn(),
  withTiming: jest.fn(),
  FadeIn: {},
  FadeOut: {},
}));

// Mock react-native-gesture-handler
jest.mock('react-native-gesture-handler', () => ({
  Swipeable: require('react-native').View,
  DrawerLayout: require('react-native').View,
  State: {},
  PureNativeButton: require('react-native').TouchableOpacity,
  NativeViewGestureHandler: require('react-native').View,
  TapGestureHandler: require('react-native').View,
  FlingGestureHandler: require('react-native').View,
  ForceTouchGestureHandler: require('react-native').View,
  LongPressGestureHandler: require('react-native').View,
  PanGestureHandler: require('react-native').View,
  PinchGestureHandler: require('react-native').View,
  RotationGestureHandler: require('react-native').View,
}));

// Mock expo-router
jest.mock('expo-router', () => ({
  useRouter: () => ({
    push: jest.fn(),
    replace: jest.fn(),
    back: jest.fn(),
    navigate: jest.fn(),
  }),
  useLocalSearchParams: () => ({}),
  useSegments: () => [],
  usePathname: () => '/',
}));
