import { NavHeader, TabBar } from '@/src/components';
import DashboardHeader from '@/src/components/organisms/DashboardHeader.tsx/DashboardHeader';
import { Theme } from '@/src/theme/theme';
import { Feather } from '@expo/vector-icons';
import { useTheme } from '@shopify/restyle';
import { Tabs } from 'expo-router';

export default function TabsLayout() {
  const theme = useTheme<Theme>();

  return (
    <Tabs
      tabBar={(props) => <TabBar {...props} />}
      screenOptions={{
        animation: 'shift',
        tabBarActiveTintColor: theme.colors.success,
        headerShadowVisible: false,
        headerStyle: {
          backgroundColor: theme.colors.background,
        },
        sceneStyle: {
          backgroundColor: theme.colors.background,
        },
      }}
    >
      <Tabs.Screen
        name="index"
        options={{
          title: 'Dashboard',
          header: (props) => <DashboardHeader {...props} />,
          tabBarIcon: ({ color }) => (
            <Feather size={28} name="home" color={color} />
          ),
        }}
      />
      <Tabs.Screen
        name="loyalty"
        options={{
          headerShown: false,
        }}
      />
      <Tabs.Screen
        name="chat"
        options={{
          title: 'Chat',
          header: (props) => <NavHeader />,
        }}
      />
      <Tabs.Screen
        name="merchant"
        options={{
          headerShown: false,
        }}
      />
    </Tabs>
  );
}
