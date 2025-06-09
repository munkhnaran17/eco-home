import { createTheme } from '@shopify/restyle';
import { borderRadii } from './tokens/borderRadii';
import { palette } from './tokens/palette';
import { spacing } from './tokens/spacing';

const theme = createTheme({
  colors: {
    primary: palette.green700,

    background: palette.grey50,

    success: palette.green500,
    successSoft: palette.green50,
    successMedium: palette.green100,

    surfaceSoft: palette.lime50,
    surfaceSoftBorder: palette.lime5030,
    onSurfaceSoft: palette.green400,
    surfaceDisabled: palette.grey100,
    onSurfaceDisabled: palette.grey400,

    white: palette.white500,
    black: palette.black500,
    yellowSoft: palette.yellow50,
    blueSoft: palette.blue50,

    transparent: 'transparent',
  },
  spacing: spacing,
  borderRadii: borderRadii,
  breakpoints: {},
  zIndices: {
    frontAll: 9999,
    front: 1,
    behind: -1,
    behindAll: -9999,
  },
  textVariants: {
    defaults: {
      color: 'black',
    },
    header: {
      fontSize: 18,
    },
  },
  buttonVariants: {
    defaults: {
      alignItems: 'center',
      justifyContent: 'center',
    },
    primary: {
      backgroundColor: 'primary',
    },
    neon: {
      backgroundColor: 'successSoft',
      padding: 'sp10',
      borderRadius: 'full',
      borderWidth: 1,
      borderColor: 'successMedium',
    },
  },
  cardVariants: {
    defaults: {},
    shadow: {
      shadowColor: 'onSurfaceSoft',
      shadowOffset: { width: 0, height: 2 },
      shadowOpacity: 0.3,
      shadowRadius: 8,
      elevation: 5,
    },
  },
  contentVariants: {
    defaults: {},
  },
  scrollBoxVariants: {
    defaults: {},
  },
  imageVariants: {
    defaults: {},
  },
  textInputVariants: {
    defaults: {
      backgroundColor: 'white',
      paddingLeft: 'sp20',
      paddingRight: 'sp8',
      borderRadius: 'full',
      height: 56,
    },
  },
});

export type Theme = typeof theme;
export default theme;
