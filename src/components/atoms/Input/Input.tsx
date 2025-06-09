import { Theme } from '@/src/theme/theme';
import {
  type BorderProps,
  type ColorProps,
  type LayoutProps,
  type SpacingProps,
  type TypographyProps,
  type VariantProps,
  border,
  color,
  createRestyleComponent,
  createVariant,
  layout,
  spacing,
  typography,
} from '@shopify/restyle';
import { TextInput, type TextInputProps } from 'react-native';

const Input = createRestyleComponent<
  VariantProps<Theme, 'textVariants'> &
    ColorProps<Theme> &
    LayoutProps<Theme> &
    BorderProps<Theme> &
    TypographyProps<Theme> &
    SpacingProps<Theme> &
    TextInputProps,
  Theme
>(
  [
    typography,
    border,
    layout,
    spacing,
    color,
    createVariant({ themeKey: 'textVariants' }),
  ],
  TextInput
);

export default Input;
