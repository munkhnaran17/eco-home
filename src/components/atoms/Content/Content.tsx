import { Theme } from '@/src/theme/theme';
import {
  createRestyleComponent,
  createVariant,
  VariantProps,
} from '@shopify/restyle';
import Box from '../Box/Box';

const Content = createRestyleComponent<
  VariantProps<Theme, 'contentVariants'> & React.ComponentProps<typeof Box>,
  Theme
>([createVariant({ themeKey: 'contentVariants' })], Box);

export default Content;
