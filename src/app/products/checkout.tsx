import {
  Box,
  Button,
  Capitron,
  Golomt,
  Khan,
  Khas,
  Typography,
} from '@/src/components';
import Arig from '@/src/components/svgs/Arig';
import State from '@/src/components/svgs/State';
import useStore from '@/src/store/store';
import { FontAwesome } from '@expo/vector-icons';
import { router } from 'expo-router';

import React, { useRef, useState } from 'react';
import { FlatList } from 'react-native';

const Checkout = () => {
  const { product, increaseStep } = useStore();
  const flatListRef = useRef<FlatList>(null);
  const [bank, setBank] = useState<number>(0);

  const banks = [
    {
      name: 'Хаан',
      logo: <Khan />,
    },
    {
      name: 'Голомт',
      logo: <Golomt />,
    },
    {
      name: 'Капитрон',
      logo: <Capitron />,
    },
    {
      name: 'Ариг',
      logo: <Arig />,
    },
    {
      name: 'Төрийн',
      logo: <State />,
    },
    {
      name: 'Хас',
      logo: <Khas />,
    },
  ];

  return (
    <Box flex={1} paddingHorizontal='sp24'>
      <Box
        backgroundColor='surfaceSoft'
        padding='sp12'
        borderRadius='br24'
        gap='sp16'
      >
        <Typography
          color='onSurfaceSoft'
          fontWeight={600}
          fontSize={16}
          alignSelf='center'
        >
          Банкны ногоон зээлээр авах
        </Typography>
        <FlatList
          ref={flatListRef}
          showsHorizontalScrollIndicator={false}
          keyExtractor={(_, index) => index.toString()}
          horizontal={true}
          data={banks}
          onContentSizeChange={() =>
            bank &&
            flatListRef.current?.scrollToIndex({
              index: bank,
              animated: true,
            })
          }
          initialNumToRender={banks.length}
          onScrollToIndexFailed={() => {}}
          renderItem={({ item, index }) => {
            return (
              <Button
                width={70}
                onPress={() => {
                  flatListRef.current?.scrollToIndex({
                    index,
                    animated: true,
                  });
                  setBank(index);
                }}
              >
                <Box
                  marginBottom='sp8'
                  backgroundColor='white'
                  borderRadius='br12'
                  padding='sp16'
                  borderWidth={1}
                  borderColor={bank === index ? 'primary' : 'transparent'}
                >
                  {item.logo}
                </Box>
                <Typography
                  fontWeight={bank === index ? 500 : 400}
                  fontSize={12}
                  textAlign='center'
                  width={'100%'}
                >
                  {`${item.name}\nбанк`}
                </Typography>
              </Button>
            );
          }}
        />

        <Box gap='sp16'>
          <Box gap='sp2'>
            <Typography fontSize={12} opacity={0.7}>
              Урьдчилгаа төлбөр
            </Typography>
            <Typography fontSize={16} fontWeight={500}>
              {`${((product?.price ?? 0) * 0.3).toLocaleString()}₮`}
            </Typography>
          </Box>
          <Box gap='sp2'>
            <Typography fontSize={12} opacity={0.7}>
              Зээлийн хугацаа
            </Typography>
            <Typography fontSize={16} fontWeight={500}>
              12 сар
            </Typography>
          </Box>
        </Box>
        <Box borderWidth={1} borderStyle='dashed' borderColor='onSurfaceSoft' />
        <Box flexDirection='row' gap='sp2'>
          <Box flex={1}>
            <Typography fontSize={12} opacity={0.7}>
              Зээлийн хэмжээ
            </Typography>
            <Typography fontSize={16} fontWeight={500}>
              {((product?.price ?? 0) * 0.7).toLocaleString()}₮
            </Typography>
          </Box>
          <Box flex={1}>
            <Typography fontSize={12} opacity={0.7}>
              Зээлийн хүү
            </Typography>
            <Typography fontSize={16} fontWeight={500}>
              1.9%
            </Typography>
          </Box>
        </Box>
        <Box>
          <Typography fontSize={12} opacity={0.7}>
            Сарын төлбөр
          </Typography>
          <Typography fontSize={16} fontWeight={500}>
            {(((product?.price ?? 12) * 0.7) / 12).toLocaleString()}₮
          </Typography>
        </Box>
        <Button
          backgroundColor='onSurfaceSoft'
          paddingVertical='sp12'
          borderRadius='full'
          onPress={() => {
            increaseStep();
            router.navigate('/products/success');
          }}
        >
          <Typography color='white'>Үргэлжлүүлэх</Typography>
        </Button>
      </Box>
      <Box alignItems='center' paddingVertical='sp12'>
        <Typography opacity={0.3}>эсвэл</Typography>
      </Box>
      <Box
        backgroundColor='white'
        borderRadius='br24'
        paddingVertical='sp12'
        paddingHorizontal='sp24'
        gap='sp24'
      >
        <Box flexDirection='row' alignItems='center' gap='sp24'>
          <FontAwesome name='photo' size={32} color='black' />
          <Box gap='sp12' flex={1}>
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
                <FontAwesome name='image' size={16} color='black' />
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
            router.navigate('/products/success');
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
