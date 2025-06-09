import {
  Box,
  Button,
  Image,
  ProductEcoBadge,
  ScrollBox,
  Typography,
} from '@/src/components';
import useStore from '@/src/store/store';
import { ProductEnergyType } from '@/src/types/enum-types';
import { MaterialCommunityIcons } from '@expo/vector-icons';
import { router } from 'expo-router';
import React from 'react';
import { FlatList } from 'react-native';

const ProductDetail = () => {
  const { product } = useStore();

  const benefits = [
    {
      id: 1,
      icon: (
        <MaterialCommunityIcons name='lightning-bolt' size={16} color='black' />
      ),
      name: 'Цахилгаан 100% хангана',
    },
    {
      id: 2,
      icon: (
        <MaterialCommunityIcons name='lightning-bolt' size={16} color='black' />
      ),
      name: 'Удаан эдэлгээтэй',
    },
    {
      id: 3,
      icon: (
        <MaterialCommunityIcons name='lightning-bolt' size={16} color='black' />
      ),
      name: 'Зээлээр авах боломжтой',
    },
  ];

  const suppliers = [
    {
      id: 1,
      icon: (
        <MaterialCommunityIcons name='lightning-bolt' size={24} color='black' />
      ),
      name: 'AU Optronics',
      description: 'C02 хамгийн бага',
      price: '3,500,000₮',
    },
    {
      id: 2,
      icon: (
        <MaterialCommunityIcons name='lightning-bolt' size={24} color='black' />
      ),
      name: 'AU Optronics',
      description: 'C02 хамгийн бага',
      price: '3,500,000₮',
    },
    {
      id: 3,
      icon: (
        <MaterialCommunityIcons name='lightning-bolt' size={24} color='black' />
      ),
      name: 'AU Optronics',
      description: 'C02 хамгийн бага',
      price: '3,500,000₮',
    },
  ];

  return (
    <ScrollBox flex={1} paddingHorizontal='sp24'>
      <Box
        backgroundColor='white'
        height={204}
        borderRadius='br32'
        marginBottom='sp38'
        alignItems='center'
        justifyContent='center'
      >
        <Image
          source={require('@/assets/images/products/bio-toilet.png')}
          width={150}
          height={150}
        />
      </Box>
      <Box
        flexDirection='row'
        justifyContent='space-between'
        marginBottom='sp24'
      >
        <Box gap='sp4'>
          <Typography fontWeight={500} fontSize={20}>
            {product?.name}
          </Typography>
          <Typography opacity={0.5} textDecorationLine='underline'>
            45 reviews
          </Typography>
        </Box>
        <ProductEcoBadge
          type={product?.type ?? ProductEnergyType.CARBON}
          effAmount={product?.effAmount ?? ''}
        />
      </Box>
      <FlatList
        scrollEnabled={false}
        data={benefits}
        keyExtractor={(item) => item.id.toString()}
        ListHeaderComponent={() => (
          <Typography fontSize={16} fontWeight={500} marginBottom='sp12'>
            Давуу тал
          </Typography>
        )}
        ItemSeparatorComponent={() => <Box paddingVertical='sp8' />}
        renderItem={({ item }) => (
          <Box flexDirection='row' gap='sp4' alignItems='center'>
            {item.icon}
            <Typography opacity={0.7}>{item.name}</Typography>
          </Box>
        )}
      />
      <Box marginTop='sp24' />
      <FlatList
        scrollEnabled={false}
        data={suppliers}
        keyExtractor={(item) => item.id.toString()}
        ListHeaderComponent={() => (
          <Typography fontSize={16} fontWeight={500} marginBottom='sp16'>
            Боломжит нийлүүлэгчид
          </Typography>
        )}
        ItemSeparatorComponent={() => <Box paddingVertical='sp12' />}
        renderItem={({ item }) => (
          <Button
            flexDirection='row'
            justifyContent='space-between'
            alignItems='center'
            onPress={() => router.navigate('/products/checkout')}
          >
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
              {item.icon}
            </Box>
            <Box flex={1} marginHorizontal='sp8'>
              <Typography numberOfLines={1} fontSize={16}>
                {item.name}
              </Typography>
              <Typography numberOfLines={1} fontSize={12} opacity={0.5}>
                {item.description}
              </Typography>
            </Box>
            <Box flexDirection='row' alignItems='center'>
              <Box
                backgroundColor='surfaceDisabled'
                borderRadius='full'
                paddingVertical='sp8'
                paddingHorizontal='sp12'
              >
                <Typography>{item.price}</Typography>
              </Box>
              <MaterialCommunityIcons
                name='chevron-right'
                size={24}
                color='black'
              />
            </Box>
          </Button>
        )}
      />
    </ScrollBox>
  );
};

export default ProductDetail;
