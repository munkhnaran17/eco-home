import * as React from 'react';
import Svg, { ClipPath, Defs, G, Path, SvgProps } from 'react-native-svg';
const Golomt = (props: SvgProps) => (
  <Svg viewBox='0 0 24 24' width={24} height={24} fill='none' {...props}>
    <G clipPath='url(#a)'>
      <Path fill='#085BAA' d='M24 0H0v24h24V0Z' />
      <Path
        fill='#fff'
        d='M22.536 13.464a10.365 10.365 0 0 1-.895 3.051c-1.709 3.58-5.35 6.061-9.6 6.061-5.838 0-10.577-4.739-10.577-10.576 0-5.837 4.74-10.576 10.577-10.576 4.23 0 7.87 2.46 9.559 6.04.427.916.753 1.912.895 2.95H13.18l-3.275 6.101H6.468l4.84-9.03v-.02h6.753a7.561 7.561 0 0 0-6.02-2.99C7.89 4.475 4.515 7.85 4.515 12c0 4.15 3.377 7.525 7.526 7.525a7.454 7.454 0 0 0 6.02-3.03h-4.84l1.667-3.05h7.648v.02Z'
      />
    </G>
    <Defs>
      <ClipPath id='a'>
        <Path fill='#fff' d='M0 0h24v24H0z' />
      </ClipPath>
    </Defs>
  </Svg>
);
export default Golomt;
