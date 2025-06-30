import {
  Box,
  Button,
  ProductStepCard,
  Sapling,
  Typography,
} from '@/src/components';
import useStore from '@/src/store/store';
import { ProductEnergyType } from '@/src/types/enum-types';
import { ProductData } from '@/src/types/product';
import { router } from 'expo-router';
import React, { useEffect, useState } from 'react';
import { Dimensions } from 'react-native';
import Carousel from 'react-native-reanimated-carousel';
import { useSafeAreaInsets } from 'react-native-safe-area-context';

const OnboardingFinalize = () => {
  const { onboardingRecommendation, setIsOnboarded, setChosenPlan } =
    useStore();
  const insets = useSafeAreaInsets();
  const [currentIndex, setCurrentIndex] = useState(0);

  useEffect(() => {
    setIsOnboarded(true);
  }, []);

  return (
    <Box
      flex={1}
      paddingHorizontal='sp24'
      paddingBottom='sp40'
      style={{
        paddingTop: insets.top + 32,
      }}
    >
      <Box flex={1}>
        <Box gap='sp8'>
          <Typography fontSize={18} fontWeight={600}>
            Хүлээсэнд баярлалаа
          </Typography>
          <Typography fontSize={16}>
            Би танд илүү байгалд ээлтэй байх боломжтой дараах бүтээгдэхүүнийг
            санал болгож байна. Хажуу тийш нь гүйлгээд бусад хувилбартай
            танилцаарай.
          </Typography>
        </Box>
        <Box
          backgroundColor='white'
          borderRadius='br20'
          paddingHorizontal='sp16'
          gap='sp4'
          flexDirection='row'
          marginVertical='sp24'
        >
          <Box flex={1} gap='sp12' paddingVertical='sp16'>
            <Typography fontWeight={500}>Хэмнэлт (жилд)</Typography>
            <Box gap='sp14'>
              <Box gap='sp2'>
                <Typography fontSize={12} opacity={0.7}>
                  Нүүрс хүчлийн хий
                </Typography>
                <Typography
                  fontSize={16}
                  fontWeight={600}
                  color='onSurfaceSoft'
                >
                  {`${onboardingRecommendation?.savings?.carbon_dioxide.toLocaleString()} тн`}
                </Typography>
              </Box>
              <Box gap='sp2'>
                <Typography fontSize={12} opacity={0.7}>
                  Тог зарцуулалт
                </Typography>
                <Typography
                  fontSize={16}
                  fontWeight={600}
                  color='onSurfaceSoft'
                >
                  {`${onboardingRecommendation?.savings?.electricity_consumption.toLocaleString()}₮`}
                </Typography>
              </Box>
              <Box gap='sp2'>
                <Typography fontSize={12} opacity={0.7}>
                  Нийт хэмнэлт
                </Typography>
                <Typography
                  fontSize={16}
                  fontWeight={600}
                  color='onSurfaceSoft'
                >
                  {`${onboardingRecommendation?.savings?.total_savings.toLocaleString()}₮`}
                </Typography>
              </Box>
            </Box>
          </Box>
          <Box flex={1} justifyContent='flex-end' alignItems='center'>
            <Typography fontWeight={700} fontSize={18}>
              {`${onboardingRecommendation?.savings.equivalent_to_total_trees} мод`}
            </Typography>
            <Typography marginBottom='sp12'>тарихтай адил</Typography>
            <Sapling width={98} height={120} />
          </Box>
        </Box>
        <Carousel
          onSnapToItem={(index) => {
            setCurrentIndex(index);
          }}
          width={Dimensions.get('window').width - 32}
          height={300}
          loop={false}
          data={[
            onboardingRecommendation?.product_recommendations.version_a,
            onboardingRecommendation?.product_recommendations.version_b,
            onboardingRecommendation?.product_recommendations.version_c,
          ]}
          renderItem={({ item, index }) => (
            <Box paddingRight='sp16'>
              <Typography fontWeight={500} fontSize={16} marginBottom='sp12'>
                {item?.title}
              </Typography>
              <Box gap='sp12'>
                {item?.products.map((product) => {
                  const data: ProductData = {
                    id: product.price,
                    step: -1,
                    image: require('@/assets/images/products/bio-toilet.png'),
                    name: product.name,
                    price: product.price,
                    type: ProductEnergyType.ELECTRICITY,
                    effAmount:
                      (product.energy === 0
                        ? '10'
                        : product.energy.toString()) + 'кв',
                  };

                  return <ProductStepCard data={data} />;
                })}
              </Box>
            </Box>
          )}
        />
        <Box flexDirection='row' justifyContent='center' alignItems='center'>
          {[1, 2, 3].map((_, index) => (
            <Box
              key={index}
              width={currentIndex === index ? 12 : 6}
              height={6}
              borderRadius='br4'
              marginHorizontal='sp4'
              backgroundColor={
                currentIndex === index ? 'primary' : 'surfaceDisabled'
              }
            />
          ))}
        </Box>
      </Box>
      <Button
        paddingVertical='sp16'
        borderRadius='full'
        backgroundColor='onSurfaceSoft'
        onPress={() => {
          setChosenPlan(
            currentIndex === 0
              ? onboardingRecommendation?.product_recommendations.version_a
              : currentIndex === 1
              ? onboardingRecommendation?.product_recommendations.version_b
              : onboardingRecommendation?.product_recommendations.version_c
          );
          router.replace('/');
        }}
      >
        <Typography color='white' fontWeight={500} fontSize={16}>
          Энэ хувилбарыг сонгох
        </Typography>
      </Button>
    </Box>
  );
};

export default OnboardingFinalize;
