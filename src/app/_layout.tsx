import { ThemeProvider } from '@shopify/restyle';
import { Stack } from 'expo-router';
import { StatusBar } from 'expo-status-bar';
import theme from '../theme/theme';

export default function RootLayout() {
  if (__DEV__) {
    import('../../ReactotronConfig').then(() =>
      console.log('Reactotron Configured')
    );
  }

  return (
    <ThemeProvider theme={theme}>
      <StatusBar style='dark' />
      <Stack screenOptions={{ headerShown: false }} />
    </ThemeProvider>
  );
}
