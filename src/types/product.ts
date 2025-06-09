import { ImageSourcePropType } from 'react-native';
import { ProductEnergyType } from './enum-types';

export interface ProductData {
  id: number;
  step: number;
  image: ImageSourcePropType;
  name: string;
  price: number;
  type: ProductEnergyType;
  effAmount: string;
}
