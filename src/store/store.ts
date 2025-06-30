import uuid from 'react-native-uuid';
import { create } from 'zustand';
import { createJSONStorage, persist } from 'zustand/middleware';
import {
  OnboardingAnswer,
  OnboardingProductRecommendation,
} from '../types/chat';
import { ProductData } from '../types/product';
import { Rank, RankType } from '../types/rank';
import { User } from '../types/user';
import asyncStorage from './storage';

interface StoreState {
  chosenPlan?: OnboardingProductRecommendation;
  setChosenPlan: (chosenPlan?: OnboardingProductRecommendation) => void;
  onboardingRecommendation?: OnboardingAnswer;
  setOnboardingRecommendation: (
    onboardingRecommendation: OnboardingAnswer
  ) => void;
  isOnboarded: boolean;
  setIsOnboarded: (isOnboarded: boolean) => void;
  product?: ProductData;
  setProduct: (product: ProductData) => void;
  user: User;
  setUser: (user: User) => void;
  increaseStep: () => void;
}

const useStore = create<StoreState>()(
  persist(
    (set) => ({
      chosenPlan: undefined,
      setChosenPlan: (chosenPlan?: OnboardingProductRecommendation) =>
        set({ chosenPlan }),
      onboardingRecommendation: undefined,
      setOnboardingRecommendation: (
        onboardingRecommendation: OnboardingAnswer
      ) => set({ onboardingRecommendation }),
      isOnboarded: false,
      setIsOnboarded: (isOnboarded: boolean) => set({ isOnboarded }),
      product: undefined,
      setProduct: (product: ProductData) => set({ product }),
      user: {
        id: uuid.v4() as string,
        rank: {
          type: RankType.NB,
          step: 1,
          progress: 0,
        },
      },
      setUser: (user: User) => set({ user }),
      increaseStep: () =>
        set((state) => {
          const { rank } = state.user;
          const newStep = rank.step + 1;
          let type = state.user.rank.type;

          if (newStep === Rank.getRankById(RankType.SP)!.requiredStep) {
            type = RankType.SP;
          } else if (newStep === Rank.getRankById(RankType.FE)!.requiredStep) {
            type = RankType.FE;
          }

          return {
            user: {
              ...state.user,
              rank: {
                ...rank,
                step: newStep,
                type: type,
                progress: rank.progress + 500,
              },
            },
          };
        }),
    }),
    {
      name: 'my-app-storage',
      storage: createJSONStorage(() => asyncStorage),
    }
  )
);

export default useStore;
