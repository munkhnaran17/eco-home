import { ThemeProvider } from '@shopify/restyle';
import { Stack } from 'expo-router';
import theme from '../theme/theme';

export default function RootLayout() {
  return (
    <ThemeProvider theme={theme}>
      <Stack />
    </ThemeProvider>
  );
}
