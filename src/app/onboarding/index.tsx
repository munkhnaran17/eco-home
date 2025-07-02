import { Box, Button, Typography } from '@/src/components';
import { Ionicons } from '@expo/vector-icons';
import { router } from 'expo-router';
import LottieView from 'lottie-react-native';
import React, { useEffect, useRef, useState } from 'react';
import { FlatList } from 'react-native';
import Animated, {
  useAnimatedStyle,
  useSharedValue,
  withTiming,
} from 'react-native-reanimated';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import useStore from '../../store/store';
import { OnboardingSalaryResponse } from '../../types/chat';

interface OnboardingData {
  id: number;
  description: string;
  selected: boolean;
  selectedOption?: string;
  options: {
    title: string;
    onPress: () => void;
  }[];
}

interface OnboardingInputs {
  houseType?: string;
  houseSize?: string;
  houseDate?: string;
  heatingType?: string;
  householdSize?: string;
}

interface OnboardingPersonalInputs {
  salary_income?: string;
  business_income?: string;
  previous_information?: string;
}

export default function Onboarding() {
  const { user, setOnboardingRecommendation } = useStore();
  const [start, setStart] = useState(false);
  const opacity = useSharedValue(1);
  const insets = useSafeAreaInsets();
  const [isLoading, setIsLoading] = useState(false);
  const flatListRef = useRef<FlatList>(null);

  const procEnd = async (
    inputs: OnboardingPersonalInputs,
    isBusiness: boolean,
  ) => {
    setData((prev) => {
      const updatedPrev = prev.map((item) => {
        if (item.id === 8) {
          return {
            ...item,
            selected: true,
            selectedOption: isBusiness
              ? inputs.business_income
              : inputs.salary_income,
          };
        }
        return item;
      });

      return [...updatedPrev];
    });

    setIsLoading(true);

    const key = 'app-z6Bxm71CUjUIFTKtExz8embz';

    const res = await fetch('https://api.dify.ai/v1/workflows/run', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${key}`,
      },
      body: JSON.stringify({
        inputs: {
          salary_income: inputs.salary_income,
          business_income: inputs.business_income,
          previous_information: inputs.previous_information,
        },
        response_mode: 'blocking',
        user: user.id,
      }),
    });

    try {
      const resJson = await res.json();
      setOnboardingRecommendation(JSON.parse(resJson.data.outputs.answer));
      router.replace('/onboarding/finalize');
    } catch (e) {
      console.log(e);
    } finally {
      setIsLoading(false);
    }
  };

  const procIncome = (
    inputs: OnboardingPersonalInputs,
    isBusiness: boolean,
  ) => {
    setData((prev) => {
      const updatedPrev = prev.map((item) => {
        if (item.id === 7) {
          return {
            ...item,
            selected: true,
            selectedOption: isBusiness ? 'Бизнес' : 'Цалин',
          };
        }
        return item;
      });

      return [
        ...updatedPrev,
        {
          id: 8,
          selected: false,
          description: 'Таны сарын дундаж орлого хэд вэ?',
          options: [
            {
              title: '1,000,000-2,000,000',
              onPress: () =>
                procEnd(
                  {
                    ...inputs,
                    salary_income: !isBusiness ? '1,000,000-2,000,000' : '0',
                    business_income: isBusiness ? '1,000,000-2,000,000' : '0',
                  },
                  isBusiness,
                ),
            },
            {
              title: '2,000,000-4,000,000',
              onPress: () =>
                procEnd(
                  {
                    ...inputs,
                    salary_income: !isBusiness ? '2,000,000-4,000,000' : '0',
                    business_income: isBusiness ? '2,000,000-4,000,000' : '0',
                  },
                  isBusiness,
                ),
            },
            {
              title: '5,000,000+ ',
              onPress: () =>
                procEnd(
                  {
                    ...inputs,
                    salary_income: !isBusiness ? '5,000,000+' : '0',
                    business_income: isBusiness ? '5,000,000+' : '0',
                  },
                  isBusiness,
                ),
            },
          ],
        },
      ];
    });
  };

  const procSalary = (inputs: OnboardingPersonalInputs) => {
    setData((prev) => {
      return [
        ...prev,
        {
          id: 7,
          selected: false,
          description: 'Та орлогийн эх үүсвэрээ сонгон уу.',
          options: [
            {
              title: 'Цалин',
              onPress: () => procIncome(inputs, false),
            },
            {
              title: 'Бизнес',
              onPress: () => procIncome(inputs, true),
            },
          ],
        },
      ];
    });
  };

  const procHeatingType = async (inputs: OnboardingInputs) => {
    setData((prev) => {
      const updatedPrev = prev.map((item) => {
        if (item.id === 6) {
          return {
            ...item,
            selected: true,
            selectedOption: inputs.heatingType,
          };
        }
        return item;
      });

      return [...updatedPrev];
    });

    const key = 'app-nsHd2SJTGKiAj1UH1wx54Yu3';

    setIsLoading(true);

    const res = await fetch('https://api.dify.ai/v1/workflows/run', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${key}`,
      },
      body: JSON.stringify({
        inputs: {
          house_type: inputs.houseType,
          house_size: inputs.houseSize,
          house_date: inputs.houseDate,
          heating_type: inputs.heatingType,
          household_size: inputs.householdSize,
        },
        response_mode: 'blocking',
        user: user.id,
      }),
    });

    try {
      const resJson: OnboardingSalaryResponse = await res.json();

      procSalary({ previous_information: resJson.data?.outputs?.answer });
    } catch (e) {
      console.log(e);
    } finally {
      setIsLoading(false);
    }
  };

  const procHousehold = async (inputs: OnboardingInputs) => {
    setData((prev) => {
      const updatedPrev = prev.map((item) => {
        if (item.id === 5) {
          return {
            ...item,
            selected: true,
            selectedOption: inputs.householdSize,
          };
        }
        return item;
      });

      return [
        ...updatedPrev,
        {
          id: 6,
          selected: false,
          description: 'Таны гэр ямар халаалтын системтэй вэ?',
          options: [
            {
              title: 'Төвийн халаалт',
              onPress: () =>
                procHeatingType({ ...inputs, heatingType: 'Төвийн халаалт' }),
            },
            {
              title: 'Цахилгаан халаагуур',
              onPress: () =>
                procHeatingType({
                  ...inputs,
                  heatingType: 'Цахилгаан халаагуур',
                }),
            },
            {
              title: 'Нүүрсний зуух',
              onPress: () =>
                procHeatingType({
                  ...inputs,
                  heatingType: 'Нүүрсний зуух',
                }),
            },
            {
              title: 'Модон халаалт',
              onPress: () =>
                procHeatingType({
                  ...inputs,
                  heatingType: 'Модон халаалт',
                }),
            },
          ],
        },
      ];
    });
  };

  const procYear = (inputs: OnboardingInputs) => {
    setData((prev) => {
      const updatedPrev = prev.map((item) => {
        if (item.id === 4) {
          return {
            ...item,
            selected: true,
            selectedOption: inputs.houseDate,
          };
        }
        return item;
      });

      return [
        ...updatedPrev,
        {
          id: 5,
          selected: false,
          description: 'Та өрхийн ам бүлийн тоогоо сонгоно уу.',
          options: [
            {
              title: '1-2',
              onPress: () => procHousehold({ ...inputs, householdSize: '1-2' }),
            },
            {
              title: '3-4',
              onPress: () => procHousehold({ ...inputs, householdSize: '3-4' }),
            },
            {
              title: '5+',
              onPress: () => procHousehold({ ...inputs, householdSize: '5+' }),
            },
          ],
        },
      ];
    });
  };

  const procSize = (inputs: OnboardingInputs) => {
    setData((prev) => {
      const updatedPrev = prev.map((item) => {
        if (item.id === 3) {
          return { ...item, selected: true, selectedOption: inputs.houseSize };
        }
        return item;
      });

      return [
        ...updatedPrev,
        {
          id: 4,
          selected: false,
          description:
            inputs.houseType === 'Гэр'
              ? 'Хэдэн онд сүүлд дулаалгын материалаа сольсон бэ?'
              : 'Хэдэн онд баригдсан бэ?',
          options: [
            {
              title: '2000-2010',
              onPress: () => procYear({ ...inputs, houseDate: '2000-2010' }),
            },
            {
              title: '2010-2020',
              onPress: () => procYear({ ...inputs, houseDate: '2010-2020' }),
            },
            {
              title: '2020+',
              onPress: () => procYear({ ...inputs, houseDate: '2020+' }),
            },
          ],
        },
      ];
    });
  };

  const procHouse = (inputs: OnboardingInputs) => {
    setData((prev) => {
      const updatedPrev = prev.map((item) => {
        if (item.id === 2) {
          return { ...item, selected: true, selectedOption: inputs.houseType };
        }
        return item;
      });

      return [
        ...updatedPrev,
        {
          id: 3,
          selected: false,
          description:
            inputs.houseType === 'Гэр' ? 'Хэдэн ханатай вэ?' : 'Хэдэн мкв вэ?',
          options: [
            {
              title: inputs.houseType === 'Гэр' ? '4 хана' : '30-50 мкв',
              onPress: () =>
                procSize({
                  ...inputs,
                  houseSize:
                    inputs.houseType === 'Гэр' ? '4 хана' : '30-50 мкв',
                }),
            },
            {
              title: inputs.houseType === 'Гэр' ? '5 хана' : '50-70 мкв',
              onPress: () =>
                procSize({
                  ...inputs,
                  houseSize:
                    inputs.houseType === 'Гэр' ? '5 хана' : '50-70 мкв',
                }),
            },
            {
              title: inputs.houseType === 'Гэр' ? '6 хана' : '70-90 мкв',
              onPress: () =>
                procSize({
                  ...inputs,
                  houseSize:
                    inputs.houseType === 'Гэр' ? '6 хана' : '70-90 мкв',
                }),
            },
            {
              title: inputs.houseType === 'Гэр' ? '6+ хана' : '99+ мкв',
              onPress: () =>
                procSize({
                  ...inputs,
                  houseSize: inputs.houseType === 'Гэр' ? '6+ хана' : '99+ мкв',
                }),
            },
          ],
        },
      ];
    });
  };

  const static_data: OnboardingData[] = [
    {
      id: 1,
      selected: false,
      description:
        'GoLeaf апп нь танай гэрийг илүү байгалд ээлтэй, зардалд хэмнэлттэй болгох зорилготой бөгөөд ингэхдээ хиймэл оюун ухааныг ашиглаж зөвхөн танайд зориулсан алхам бүрийг төлөвлөж өгөх юм. Бэлэн үү?',
      options: [
        {
          title: 'Бэлэн, эхэлцгээе',

          onPress: () => {
            setData((prev) => {
              const updatedPrev = prev.map((item) => {
                if (item.id === 1) {
                  return {
                    ...item,
                    selected: true,
                    selectedOption: 'Бэлэн, эхэлцгээе',
                  };
                }
                return item;
              });
              return [
                ...updatedPrev,
                {
                  id: 2,
                  selected: false,
                  description:
                    'Nice, Тэгвэл надад өөрийн гэрийн талаар бага зэрэг хэлж өгөөч? Та ямар төрлийн сууцанд амьдардаг вэ?',
                  options: [
                    {
                      title: 'Гэр',
                      onPress: () => procHouse({ houseType: 'Гэр' }),
                    },
                    {
                      title: 'Хашаа байшин',
                      onPress: () => procHouse({ houseType: 'Хашаа байшин' }),
                    },
                    {
                      title: 'Амины орон сууц',
                      onPress: () =>
                        procHouse({ houseType: 'Амины орон сууц' }),
                    },
                    {
                      title: 'Орон сууц',
                      onPress: () => procHouse({ houseType: 'Орон сууц' }),
                    },
                  ],
                },
              ];
            });
          },
        },
      ],
    },
  ];

  const [data, setData] = useState<OnboardingData[]>(static_data);

  const animatedOnboardingStyle = useAnimatedStyle(() => {
    return {
      opacity: opacity.value,
      transform: [{ scale: opacity.value }],
    };
  });

  const toggleVisibility = () => {
    if (start) {
      setStart(false);
      opacity.value = withTiming(1, { duration: 300 });
    } else {
      opacity.value = withTiming(0, { duration: 300 });
      setTimeout(() => setStart(true), 300);
    }
  };

  useEffect(() => {
    setTimeout(() => {
      if (flatListRef.current) {
        flatListRef.current?.scrollToEnd({ animated: true });
      }
    }, 50);
  }, [isLoading]);

  if (isLoading) {
    return (
      <Box
        flex={1}
        alignItems="center"
        justifyContent="center"
        paddingHorizontal="sp24"
        gap="sp4"
      >
        <LottieView
          autoPlay
          loop
          resizeMode="cover"
          style={{ width: 100, height: 100 }}
          source={require('@/assets/animations/loading.json')}
        />

        <Typography fontWeight={600} fontSize={18}>
          Хэдхэн хором...
        </Typography>
        <Typography textAlign="center" fontSize={16}>
          LED гэрэл уламжлалт гэрлээс 80% бага эрчим хүч хэрэглэдэг гэдгийг
          мэдэх үү?
        </Typography>
      </Box>
    );
  }

  return (
    <Box
      flex={1}
      paddingHorizontal="sp24"
      paddingBottom="sp40"
      style={{
        paddingTop: insets.top + 32,
      }}
    >
      {start ? (
        <FlatList
          ref={flatListRef}
          onContentSizeChange={() => {
            flatListRef.current?.scrollToEnd({ animated: true });
          }}
          showsVerticalScrollIndicator={false}
          data={data}
          ItemSeparatorComponent={() => <Box height={24} />}
          contentContainerStyle={{
            flexGrow: 1,
            justifyContent: 'flex-end',
          }}
          renderItem={({ item }: { item: OnboardingData }) => {
            return (
              <Box gap="sp16">
                <Typography fontSize={16} maxWidth="80%">
                  {item.description}
                </Typography>
                <Box alignSelf="flex-end" gap="sp8">
                  {item.selected ? (
                    <Button
                      disabled
                      key={item.selectedOption}
                      backgroundColor="surfaceSoft"
                      borderRadius="br12"
                      paddingHorizontal="sp16"
                      paddingVertical="sp12"
                    >
                      <Typography
                        color="success"
                        fontWeight="500"
                        fontSize={16}
                      >
                        {item.selectedOption}
                      </Typography>
                    </Button>
                  ) : (
                    item.options?.map((option) => (
                      <Button
                        key={option.title}
                        borderWidth={1}
                        borderColor="surfaceSoft"
                        borderRadius="br12"
                        paddingHorizontal="sp16"
                        paddingVertical="sp12"
                        onPress={option.onPress}
                      >
                        <Typography
                          color="success"
                          fontWeight="500"
                          fontSize={16}
                        >
                          {option.title}
                        </Typography>
                      </Button>
                    ))
                  )}
                </Box>
              </Box>
            );
          }}
          ListHeaderComponent={
            <Box
              backgroundColor="onSurfaceSoft"
              borderRadius="full"
              width={40}
              height={40}
              alignItems="center"
              justifyContent="center"
              marginBottom="sp12"
            >
              <Ionicons size={20} name="leaf" color="white" />
            </Box>
          }
        />
      ) : (
        <Animated.View
          style={[
            animatedOnboardingStyle,
            {
              justifyContent: 'center',
              alignItems: 'center',
              height: '85%',
            },
          ]}
        >
          <Box gap="sp12" alignItems="center">
            <Box
              backgroundColor="onSurfaceSoft"
              borderRadius="full"
              width={56}
              height={56}
              alignItems="center"
              justifyContent="center"
            >
              <Ionicons size={28} name="leaf" color="white" />
            </Box>
            <Typography fontSize={24} fontWeight={600}>
              GoLeaf
            </Typography>
          </Box>
          <Box alignItems="center" position="absolute" bottom={0}>
            <Typography
              color="black"
              opacity={0.7}
              fontSize={16}
              fontWeight={500}
              paddingHorizontal="sp24"
              textAlign="center"
              marginBottom="sp24"
            >
              Хиймэл оюунд суурилсан ногоон шийдэлд тавтай морил
            </Typography>
            <Button
              variant="neon"
              width={140}
              onPress={() => toggleVisibility()}
            >
              <Typography color="onSurfaceSoft" fontWeight="500" fontSize={16}>
                Эхлэе
              </Typography>
            </Button>
          </Box>
        </Animated.View>
      )}
    </Box>
  );
}
