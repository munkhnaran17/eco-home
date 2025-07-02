import { Box, Seedling, Typography } from '@/src/components';
import useStore from '@/src/store/store';
import { router } from 'expo-router';
import React, { useEffect } from 'react';

const Success = () => {
  const { product } = useStore();

  useEffect(() => {
    setTimeout(() => {
      router.dismissAll();
      router.replace({
        pathname: '/',
        params: { id: ((product?.id ?? 1) - 1).toString() },
      });
    }, 1000);
  }, [product?.id]);

  return (
    <Box flex={1} justifyContent="center" alignItems="center">
      <Seedling />
      <Typography
        fontSize={16}
        fontWeight={600}
        textAlign="center"
        marginTop="sp12"
      >
        {`Ногоон бүтээгдэхүүн \n сонгосонд баярлалаа.`}
      </Typography>
    </Box>
  );
};

export default Success;
