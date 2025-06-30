import { Theme } from '@/src/theme/theme';
import { Feather } from '@expo/vector-icons';
import { BottomTabBarProps } from '@react-navigation/bottom-tabs';
import { useTheme } from '@shopify/restyle';
import React, { useEffect, useState } from 'react';
import { LayoutChangeEvent } from 'react-native';
import Animated, {
  useAnimatedStyle,
  useSharedValue,
  withTiming,
} from 'react-native-reanimated';
import Box from '../../atoms/Box/Box';
import Button from '../../atoms/Button/Button';

const TAB_WIDTH = 46;
const TAB_HEIGHT = 100;

const TabBar = ({ state, descriptors, navigation }: BottomTabBarProps) => {
  const [tabPositions, setTabPositions] = useState<Record<number, number>>({});
  const translateX = useSharedValue(0);
  const translateY = useSharedValue(0);
  const { colors } = useTheme<Theme>();

  const onTabLayout = (index: number) => (event: LayoutChangeEvent) => {
    const { x } = event.nativeEvent.layout;
    setTabPositions((prev) => ({ ...prev, [index]: x }));
  };

  useEffect(() => {
    translateY.value = withTiming(state.index === 2 ? TAB_HEIGHT : 0, {
      duration: 300,
    });

    if (tabPositions[state.index] !== undefined) {
      translateX.value = withTiming(tabPositions[state.index], {
        duration: 200,
      });
    }
  }, [state.index, tabPositions]);

  const animatedIndicatorStyle = useAnimatedStyle(() => ({
    transform: [{ translateX: translateX.value }],
  }));

  const animatedTabBarStyle = useAnimatedStyle(() => ({
    transform: [{ translateY: translateY.value }],
  }));

  const getIcon = (name: string, isFocused: boolean) => {
    switch (name) {
      case 'index':
        return (
          <Feather
            name='home'
            size={24}
            color={isFocused ? colors.success : colors.onSurfaceDisabled}
          />
        );
      case 'loyalty':
        return (
          <Feather
            name='heart'
            size={24}
            color={isFocused ? colors.success : colors.onSurfaceDisabled}
          />
        );
      case 'chat':
        return (
          <Feather
            name='message-circle'
            size={24}
            color={isFocused ? colors.success : colors.onSurfaceDisabled}
          />
        );
      case 'merchant':
        return (
          <Feather
            name='globe'
            size={24}
            color={isFocused ? colors.success : colors.onSurfaceDisabled}
          />
        );
      default:
        return null;
    }
  };

  return (
    <Animated.View
      style={[
        animatedTabBarStyle,
        {
          backgroundColor: colors.white,
          borderTopLeftRadius: 24,
          borderTopRightRadius: 24,
          height: TAB_HEIGHT,
          position: 'absolute',
          bottom: 0,
          left: 0,
          right: 0,
          shadowColor: colors.onSurfaceSoft,
          shadowOffset: { width: 0, height: 4 },
          shadowOpacity: 0.4,
          shadowRadius: 10,
          elevation: 5,
        },
      ]}
    >
      <Animated.View
        style={[
          animatedIndicatorStyle,
          {
            position: 'absolute',
            top: 0,
            width: TAB_WIDTH,
            height: 2,
            backgroundColor: colors.success,
            borderBottomLeftRadius: 100,
            borderBottomRightRadius: 100,
          },
        ]}
      />
      <Box flexDirection='row' justifyContent='space-evenly'>
        {state.routes.map((route, index) => {
          const isFocused = state.index === index;
          return (
            <Button
              marginTop='sp24'
              key={route.key}
              width={TAB_WIDTH}
              onLayout={onTabLayout(index)}
              onPress={() => {
                const event = navigation.emit({
                  type: 'tabPress',
                  target: route.key,
                  canPreventDefault: true,
                });

                if (!isFocused && !event.defaultPrevented) {
                  navigation.navigate(route.name, route.params);
                }
              }}
            >
              {getIcon(route.name, isFocused)}
            </Button>
          );
        })}
      </Box>
    </Animated.View>
  );
};

export default TabBar;
