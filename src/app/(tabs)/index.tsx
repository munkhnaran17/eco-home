import { Box, ProductStepCard, RankCard, Typography } from '@/src/components';
import useStore from '@/src/store/store';
import { OnboardingProduct } from '@/src/types/chat';
import { ProductEnergyType } from '@/src/types/enum-types';
import { ProductData } from '@/src/types/product';
import { Rank, RankType } from '@/src/types/rank';
import { useLocalSearchParams } from 'expo-router';
import { useEffect, useRef } from 'react';
import { FlatList } from 'react-native';
import uuid from 'react-native-uuid';

export default function Index() {
  const { id } = useLocalSearchParams<{ id?: string }>();
  const { user, setUser, chosenPlan } = useStore();

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
      keyExtractor={(item) => item.name + item.price}
      contentContainerStyle={{
        paddingTop: 16,
        paddingBottom: 136,
        paddingHorizontal: 24,
      }}
      data={chosenPlan?.products}
      renderItem={({
        item,
        index,
      }: {
        item: OnboardingProduct;
        index: number;
      }) => {
        const data: ProductData = {
          id: index,
          step: index,
          image: require('@/assets/images/products/bio-toilet.png'),
          name: item.name,
          price: item.price,
          type: ProductEnergyType.ELECTRICITY,
          effAmount: item.energy.toString() + 'кв',
        };

        return <ProductStepCard data={data} />;
      }}
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
