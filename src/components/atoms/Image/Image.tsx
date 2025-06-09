import { Theme } from '@/src/theme/theme';
import {
  type BackgroundColorProps,
  type BorderProps,
  type LayoutProps,
  type OpacityProps,
  type PositionProps,
  type SpacingProps,
  type VariantProps,
  backgroundColor,
  border,
  createRestyleComponent,
  createVariant,
  layout,
  opacity,
  position,
  spacing,
} from '@shopify/restyle';
import {
  Image as RNImage,
  type ImageProps as RNImageProps,
} from 'react-native';

type ImageProps = Omit<RNImageProps, 'borderRadius'> &
  BackgroundColorProps<Theme> &
  BorderProps<Theme> &
  LayoutProps<Theme> &
  OpacityProps<Theme> &
  PositionProps<Theme> &
  SpacingProps<Theme> &
  VariantProps<Theme, 'imageVariants'>;

const BaseImage = createRestyleComponent<ImageProps, Theme>(
  [
    border,
    layout,
    opacity,
    position,
    spacing,
    backgroundColor,
    createVariant({
      themeKey: 'imageVariants',
    }),
  ],
  RNImage
);

const Image = (props: ImageProps) => {
  return <BaseImage {...props} />;
};

export default Image;
