import { Theme } from '@/src/theme/theme';
import { useTheme } from '@shopify/restyle';
import * as React from 'react';
import Svg, { Path, SvgProps } from 'react-native-svg';

interface SaplingProps extends SvgProps {
  disabled?: boolean;
}

function Sapling({ disabled, ...rest }: Readonly<SaplingProps>) {
  const { colors } = useTheme<Theme>();

  return (
    <Svg width={61} height={99} viewBox='0 0 61 99' fill='none' {...rest}>
      <Path
        fill='#93642D'
        d='M23.5552 35.0312H37.0595V98.69409999999999H23.5552z'
      />
      <Path fill='#714D22' d='M23.5912 23.8076H37.0955V87.4705H23.5912z' />
      <Path
        d='M60.316 50.263c0 16.656-13.502 30.158-30.158 30.158S0 66.92 0 50.263C0 33.608 13.502 0 30.158 0s30.158 33.608 30.158 50.263z'
        fill={disabled ? colors.onSurfaceDisabled : '#66A865'}
      />
      <Path
        d='M59.584 42.601c.503 2.864.77 5.534.77 7.87 0 16.656-13.503 30.158-30.159 30.158S.037 67.127.037 50.471c0-1.905.178-4.03.516-6.303C3.69 57.473 15.64 67.379 29.905 67.379c14.82 0 27.142-10.69 29.679-24.778z'
        fill={disabled ? 'grey' : '#458244'}
      />
    </Svg>
  );
}

export default Sapling;
