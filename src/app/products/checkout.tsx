import { Box, Button, Image, Typography } from '@/src/components';
import useStore from '@/src/store/store';
import { MaterialCommunityIcons } from '@expo/vector-icons';
import { router } from 'expo-router';

import React from 'react';

const Checkout = () => {
  const { product, increaseStep } = useStore();

  return (
    <Box flex={1} paddingHorizontal='sp24'>
      <Box
        backgroundColor='white'
        borderRadius='br24'
        paddingVertical='sp12'
        paddingHorizontal='sp24'
        gap='sp24'
      >
        <Box flexDirection='row' alignItems='center' gap='sp12'>
          <Image
            source={require('@/assets/images/products/bio-toilet.png')}
            width={64}
            height={64}
          />
          <Box gap='sp12'>
            <Typography fontWeight={500} fontSize={16}>
              {product?.name}
            </Typography>
            <Box flexDirection='row' alignItems='center' gap='sp8'>
              <Box
                backgroundColor='white'
                width={40}
                height={40}
                alignItems='center'
                justifyContent='center'
                borderRadius='full'
                borderWidth={1}
                borderColor='surfaceDisabled'
              >
                <MaterialCommunityIcons
                  name='lightning-bolt'
                  size={24}
                  color='black'
                />
              </Box>
              <Typography fontWeight={500} fontSize={16}>
                AU Optronics
              </Typography>
            </Box>
          </Box>
        </Box>
        <Button
          flexDirection='row'
          justifyContent='space-between'
          backgroundColor='surfaceSoft'
          paddingVertical='sp12'
          paddingHorizontal='sp16'
          borderRadius='full'
          onPress={() => {
            increaseStep();
            router.replace({
              pathname: '/',
              params: { id: ((product?.id ?? 1) - 1).toString() },
            });
          }}
        >
          <Typography color='onSurfaceSoft' fontWeight={500}>
            Шууд авах
          </Typography>
          <Typography color='onSurfaceSoft' fontWeight={500}>
            {product?.price.toLocaleString()}₮
          </Typography>
        </Button>
      </Box>
    </Box>
  );
};

export default Checkout;
