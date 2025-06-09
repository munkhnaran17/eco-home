import { Box, ProductStepCard, RankCard, Typography } from '@/src/components';
import useStore from '@/src/store/store';
import { ProductEnergyType } from '@/src/types/enum-types';
import { ProductData } from '@/src/types/product';
import { Rank, RankType } from '@/src/types/rank';
import { useLocalSearchParams } from 'expo-router';
import { useEffect, useRef } from 'react';
import { FlatList } from 'react-native';
import uuid from 'react-native-uuid';

export default function Index() {
  const { id } = useLocalSearchParams<{ id?: string }>();
  const { user, setUser } = useStore();

  const productData: ProductData[] = [
    {
      id: 1,
      step: 1,
      image: require('@/assets/images/products/bio-toilet.png'),
      name: 'Solar panel',
      price: 3500000,
      type: ProductEnergyType.CARBON,
      effAmount: '-5 кг',
    },
    {
      id: 2,
      step: 2,
      image: require('@/assets/images/products/bio-toilet.png'),
      name: 'Био 00',
      price: 1500000,
      type: ProductEnergyType.ELECTRICITY,
      effAmount: '-100кв',
    },
    {
      id: 3,
      step: 3,
      image: require('@/assets/images/products/bio-toilet.png'),
      name: 'Ухаалаг зуух',
      price: 1500000,
      type: ProductEnergyType.CARBON,
      effAmount: '1-2тн',
    },
    {
      id: 4,
      step: 4,
      image: require('@/assets/images/products/bio-toilet.png'),
      name: 'Solar panel',
      price: 1500000,
      type: ProductEnergyType.ELECTRICITY,
      effAmount: '-100кв',
    },
    {
      id: 5,
      step: 5,
      image: require('@/assets/images/products/bio-toilet.png'),
      name: 'Solar panel',
      price: 1500000,
      type: ProductEnergyType.ELECTRICITY,
      effAmount: '-100кв',
    },
    {
      id: 6,
      step: 6,
      image: require('@/assets/images/products/bio-toilet.png'),
      name: 'Solar panel',
      price: 1500000,
      type: ProductEnergyType.ELECTRICITY,
      effAmount: '-100кв',
    },
  ];

  const flatListRef = useRef<FlatList>(null);

  useEffect(() => {
    Number(id) > 0 &&
      setTimeout(() => {
        flatListRef.current?.scrollToIndex({
          index: Number(id),
          animated: true,
        });
      }, 100);
  }, [id]);

  useEffect(() => {
    if (!user.id) {
      setUser({ ...user, id: uuid.v4() });
    }
  }, [user]);

  return (
    <FlatList
      showsVerticalScrollIndicator={false}
      ref={flatListRef}
      onScrollToIndexFailed={() => {
        flatListRef.current?.scrollToIndex({ index: 0, animated: true });
      }}
      keyExtractor={(item) => item.step.toString()}
      contentContainerStyle={{
        paddingTop: 16,
        paddingBottom: 136,
        paddingHorizontal: 24,
      }}
      data={productData}
      renderItem={({ item }) => <ProductStepCard data={item} />}
      ListHeaderComponent={() => (
        <Box marginBottom='sp36'>
          <RankCard rank={Rank.getRankById(RankType.NB)!} />
        </Box>
      )}
      ListFooterComponent={() => (
        <Box marginTop='sp36'>
          <RankCard rank={Rank.getRankById(RankType.FE)!} />
        </Box>
      )}
      ItemSeparatorComponent={(props) => {
        return props.leadingItem.step % 3 !== 0 ? (
          <Typography
            fontSize={40}
            color='onSurfaceDisabled'
            marginTop='sp8'
            marginLeft='sp24'
          >
            ⋮
          </Typography>
        ) : (
          <Box marginVertical='sp36'>
            <RankCard rank={Rank.getRankById(RankType.SP)!} />
          </Box>
        );
      }}
    />
  );
}
