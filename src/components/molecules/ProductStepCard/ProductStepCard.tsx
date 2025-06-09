import useStore from '@/src/store/store';
import { ProductData } from '@/src/types/product';
import { router } from 'expo-router';
import React from 'react';
import Box from '../../atoms/Box/Box';
import Button from '../../atoms/Button/Button';
import Image from '../../atoms/Image/Image';
import Typography from '../../atoms/Typography/Typography';
import ProductEcoBadge from '../ProductEcoBadge/ProductEcoBadge';

interface ProductStepCardProps {
  data: ProductData;
}

const ProductStepCard = ({ data }: ProductStepCardProps) => {
  const { image, name, price, effAmount, type, step, id } = data;
  const {
    user: {
      rank: { step: userStep },
    },
    setProduct,
  } = useStore((state) => state);
  const isEnabled = step <= userStep;
  const isCompleted = step < userStep;

  return (
    <Button
      flexDirection='row'
      justifyContent='space-between'
      disabled={!isEnabled || isCompleted}
      onPress={() => {
        setProduct(data);
        router.navigate(`/products/${id}`);
      }}
    >
      <Box
        backgroundColor={isEnabled ? 'white' : 'surfaceDisabled'}
        borderWidth={isEnabled ? 1 : 0}
        borderColor='onSurfaceSoft'
        borderRadius='br18'
        width={70}
        height={70}
        alignItems='center'
        justifyContent='center'
        shadowColor={isEnabled ? 'onSurfaceSoft' : 'surfaceDisabled'}
        shadowOffset={{ width: 0, height: 4 }}
        shadowOpacity={0.75}
        shadowRadius={4}
        elevation={5}
      >
        <Image source={image} width={50} height={50} borderRadius='full' />
      </Box>
      <Box flex={1} marginHorizontal='sp12'>
        <Typography fontWeight={500} fontSize={16} marginBottom='sp4'>
          {name}
        </Typography>
        <Typography opacity={0.6} marginBottom='sp12'>
          {price.toLocaleString()}₮
        </Typography>
        {isEnabled && !isCompleted && (
          <Typography color='onSurfaceSoft' fontSize={16} fontWeight={500}>
            Бүтээгдэхүүн авах
          </Typography>
        )}
      </Box>
      <ProductEcoBadge
        type={type}
        effAmount={effAmount}
        disabled={!isEnabled}
      />
    </Button>
  );
};

export default ProductStepCard;
