import { ImageSourcePropType } from "react-native";

export interface ProductData {
  id: number;
  step: number;
  image: ImageSourcePropType;
  name: string;
  price: number;
  type: ProductEnergyType;
  effAmount: string;
}

export enum ProductEnergyType {
  CARBON,
  ELECTRICITY,
}
