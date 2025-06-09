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
import { TouchableOpacity, type TouchableOpacityProps } from 'react-native';

type ButtonProps = TouchableOpacityProps &
  BackgroundColorProps<Theme> &
  BorderProps<Theme> &
  LayoutProps<Theme> &
  OpacityProps<Theme> &
  PositionProps<Theme> &
  SpacingProps<Theme> &
  VariantProps<Theme, 'buttonVariants'>;

const BaseButton = createRestyleComponent<ButtonProps, Theme>(
  [
    border,
    layout,
    opacity,
    position,
    spacing,
    backgroundColor,
    createVariant({
      themeKey: 'buttonVariants',
    }),
  ],
  TouchableOpacity
);

const Button = (props: ButtonProps) => {
  return <BaseButton {...props} />;
};

export default Button;
