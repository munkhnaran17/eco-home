import { router } from 'expo-router';
import React from 'react';
import { Box, Button, Typography } from '../components';
import useStore from '../store/store';
import { RankType } from '../types/rank';

const Ger = () => {
  const { user, setUser } = useStore();

  return (
    <Box
      flex={1}
      justifyContent='center'
      alignItems='center'
      backgroundColor='background'
    >
      <Button
        backgroundColor='surfaceSoft'
        borderRadius='full'
        padding='sp16'
        onPress={() => {
          setUser({
            ...user,
            rank: {
              progress: 0,
              step: 0,
              type: RankType.NB,
            },
          });
          router.replace('/onboarding');
        }}
      >
        <Typography color='onSurfaceSoft' fontWeight={500}>
          Гэрийн мэдээлэл шинэчлэх
        </Typography>
      </Button>
    </Box>
  );
};

export default Ger;
