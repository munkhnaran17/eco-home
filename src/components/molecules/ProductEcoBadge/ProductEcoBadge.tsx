import { ProductEnergyType } from '@/src/types/enum-types';
import { MaterialCommunityIcons } from '@expo/vector-icons';
import React from 'react';
import Box from '../../atoms/Box/Box';
import Typography from '../../atoms/Typography/Typography';

interface ProductEcoBadgeProps {
  type: ProductEnergyType;
  effAmount: string;
  disabled?: boolean;
}
const ProductEcoBadge = ({
  type,
  effAmount,
  disabled,
}: ProductEcoBadgeProps) => {
  return (
    <Box
      backgroundColor={disabled ? 'surfaceDisabled' : 'surfaceSoft'}
      flexDirection='row'
      padding='sp4'
      borderRadius='full'
      width={88}
      gap='sp4'
      alignItems='center'
      justifyContent='space-between'
    >
      <Box
        backgroundColor={disabled ? 'onSurfaceDisabled' : 'onSurfaceSoft'}
        borderRadius='full'
        padding='sp6'
        flexDirection='row'
      >
        {type === ProductEnergyType.CARBON ? (
          <>
            <Typography color='white'>CO</Typography>
            <Typography color='white' fontSize={10} alignSelf='flex-end'>
              2
            </Typography>
          </>
        ) : (
          <MaterialCommunityIcons
            name='lightning-bolt-outline'
            size={14}
            color='white'
          />
        )}
      </Box>
      <Typography
        flex={1}
        color={disabled ? 'onSurfaceDisabled' : 'onSurfaceSoft'}
        textAlign='center'
      >
        {effAmount}
      </Typography>
    </Box>
  );
};

export default ProductEcoBadge;
