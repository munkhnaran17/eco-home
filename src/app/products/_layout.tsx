import { NavHeader } from '@/src/components';
import { Theme } from '@/src/theme/theme';
import { useTheme } from '@shopify/restyle';
import { Stack } from 'expo-router';

export default function ProductsLayout() {
  const { colors } = useTheme<Theme>();

  return (
    <Stack
      screenOptions={{
        contentStyle: {
          backgroundColor: colors.background,
        },
      }}
    >
      <Stack.Screen
        name='[id]'
        options={{
          header: (props) => <NavHeader />,
        }}
      />
      <Stack.Screen
        name='checkout'
        options={{
          header: (props) => <NavHeader />,
        }}
      />
    </Stack>
  );
}
