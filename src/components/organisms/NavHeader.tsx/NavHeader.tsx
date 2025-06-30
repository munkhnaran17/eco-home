import { Ionicons } from '@expo/vector-icons';
import { router } from 'expo-router';
import React from 'react';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import Box from '../../atoms/Box/Box';
import Button from '../../atoms/Button/Button';

interface NavHeaderProps {
  title?: string;
}

const NavHeader = ({ title }: NavHeaderProps) => {
  const insets = useSafeAreaInsets();

  return (
    <Box
      backgroundColor='background'
      paddingBottom='sp16'
      paddingHorizontal='sp16'
      flexDirection='row'
      alignItems='center'
      gap='sp16'
      style={{
        paddingTop: insets.top + 16,
      }}
    >
      <Button
        backgroundColor='white'
        borderRadius='full'
        height={48}
        width={48}
        onPress={() => router.canGoBack() && router.back()}
      >
        <Ionicons name='arrow-back' size={24} color='black' />
      </Button>
    </Box>
  );
};

export default NavHeader;
