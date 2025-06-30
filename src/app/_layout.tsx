import { ActionSheetProvider } from '@expo/react-native-action-sheet';
import { ThemeProvider } from '@shopify/restyle';
import { Stack } from 'expo-router';
import { StatusBar } from 'expo-status-bar';
import { LogBox } from 'react-native';
import NavHeader from '../components/organisms/NavHeader.tsx/NavHeader';
import theme from '../theme/theme';

export default function RootLayout() {
  if (__DEV__) {
    import('../../ReactotronConfig').then(() => LogBox.ignoreAllLogs(true));
  }

  return (
    <ActionSheetProvider>
      <ThemeProvider theme={theme}>
        <StatusBar style='dark' />
        <Stack screenOptions={{ headerShown: false, gestureEnabled: false }}>
          <Stack.Screen
            name='ger'
            options={{
              headerShown: true,
              gestureEnabled: true,
              header: (props) => <NavHeader />,
            }}
          />
        </Stack>
      </ThemeProvider>
    </ActionSheetProvider>
  );
}
