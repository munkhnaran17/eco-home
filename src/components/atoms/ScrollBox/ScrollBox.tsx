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
import { ScrollView, ScrollViewProps } from 'react-native';

type ScrollBoxProps = ScrollViewProps &
  BackgroundColorProps<Theme> &
  BorderProps<Theme> &
  LayoutProps<Theme> &
  OpacityProps<Theme> &
  PositionProps<Theme> &
  SpacingProps<Theme> &
  VariantProps<Theme, 'scrollBoxVariants'>;

const BaseScrollBox = createRestyleComponent<ScrollBoxProps, Theme>(
  [
    border,
    layout,
    opacity,
    position,
    spacing,
    border,
    backgroundColor,
    createVariant({
      themeKey: 'scrollBoxVariants',
    }),
  ],
  ScrollView
);

const ScrollBox = (props: ScrollBoxProps) => {
  return <BaseScrollBox {...props} />;
};

export default ScrollBox;
