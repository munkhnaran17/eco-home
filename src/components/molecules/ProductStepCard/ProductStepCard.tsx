import useStore from '@/src/store/store';
import { ProductData } from '@/src/types/product';
import { FontAwesome } from '@expo/vector-icons';
import { router } from 'expo-router';
import React from 'react';
import Box from '../../atoms/Box/Box';
import Button from '../../atoms/Button/Button';
import Typography from '../../atoms/Typography/Typography';
import ProductEcoBadge from '../ProductEcoBadge/ProductEcoBadge';

interface ProductStepCardProps {
  data: ProductData;
}

const ProductStepCard = ({ data }: ProductStepCardProps) => {
  const { name, price, effAmount, type, step, id } = data;
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
      >
        <FontAwesome name='photo' size={18} color='black' />
      </Box>
      <Box flex={1} marginHorizontal='sp12' justifyContent='center'>
        <Typography fontWeight={500} fontSize={16} marginBottom='sp4'>
          {name}
        </Typography>
        <Typography
          opacity={0.6}
          marginBottom={isEnabled && !isCompleted ? 'sp12' : 'sp0'}
        >
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
