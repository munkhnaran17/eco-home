import { Feather, Ionicons, MaterialCommunityIcons } from '@expo/vector-icons';
import { BottomTabHeaderProps } from '@react-navigation/bottom-tabs';
import React from 'react';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import Box from '../../atoms/Box/Box';
import Button from '../../atoms/Button/Button';
import Typography from '../../atoms/Typography/Typography';

const DashboardHeader = (props: BottomTabHeaderProps) => {
  const insets = useSafeAreaInsets();

  return (
    <Box
      paddingBottom='sp16'
      paddingHorizontal='sp24'
      flexDirection='row'
      justifyContent='space-between'
      style={{
        paddingTop: insets.top + 16,
      }}
    >
      <Box
        backgroundColor='onSurfaceSoft'
        borderRadius='full'
        width={48}
        alignItems='center'
        justifyContent='center'
      >
        <Ionicons size={28} name='leaf' color='white' />
      </Box>
      <Box flexDirection='row' gap='sp12'>
        <Button
          backgroundColor='white'
          paddingHorizontal='sp16'
          borderRadius='full'
          flexDirection='row'
          gap='sp8'
        >
          <MaterialCommunityIcons
            name='home-lightning-bolt-outline'
            size={20}
            color='black'
          />
          <Typography fontWeight='500' fontSize={15}>
            Миний гэр
          </Typography>
        </Button>
        <Button
          backgroundColor='white'
          borderRadius='full'
          height={48}
          width={48}
        >
          <Feather name='bell' size={24} color='black' />
        </Button>
      </Box>
    </Box>
  );
};

export default DashboardHeader;
