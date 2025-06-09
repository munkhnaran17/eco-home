import { Theme } from '@/src/theme/theme';
import {
  type BackgroundColorProps,
  type BorderProps,
  type ColorProps,
  type LayoutProps,
  type SpacingProps,
  type VariantProps,
  backgroundColor,
  border,
  createRestyleComponent,
  createVariant,
  layout,
  spacing,
} from '@shopify/restyle';
import React, { forwardRef } from 'react';
import {
  type TextInput as NativeTextInput,
  type TextInputProps,
  View,
} from 'react-native';
import Box from '../Box/Box';
import Input from '../Input/Input';

type Props = VariantProps<Theme, 'textInputVariants'> &
  LayoutProps<Theme> &
  SpacingProps<Theme> &
  BackgroundColorProps<Theme> &
  React.ComponentProps<typeof View> &
  ColorProps<Theme> &
  BorderProps<Theme> &
  React.ComponentProps<typeof NativeTextInput> & {
    prefix?: React.ReactNode;
    suffix?: React.ReactNode;
  };

type InputProps = TextInputProps &
  React.ComponentProps<typeof NativeTextInput> &
  ColorProps<Theme> & {
    containerProps?: Props;
  };

const BaseTextInput = createRestyleComponent<Props, Theme>(
  [
    layout,
    spacing,
    backgroundColor,
    border,
    createVariant({ themeKey: 'textInputVariants' }),
  ],
  View
);

const TextInput = forwardRef(
  ({ containerProps, ...inputProps }: InputProps, ref) => {
    return (
      <BaseTextInput {...containerProps}>
        <Box
          flex={1}
          flexDirection='row'
          justifyContent='space-between'
          alignItems='center'
          marginVertical='sp10'
        >
          {containerProps?.prefix && (
            <Box flexDirection='row' alignItems='center' marginRight='sp8'>
              {containerProps.prefix}
            </Box>
          )}

          <Input
            ref={ref}
            allowFontScaling={false}
            fontSize={16}
            autoCapitalize='none'
            flex={1}
            height='100%'
            {...inputProps}
          />

          {containerProps?.suffix && (
            <Box flexDirection='row' alignItems='center' marginLeft='sp8'>
              {containerProps.suffix}
            </Box>
          )}
        </Box>
      </BaseTextInput>
    );
  }
);

export default TextInput;
