import { createTheme } from '@shopify/restyle';
import { borderRadii } from './tokens/borderRadii';
import { palette } from './tokens/palette';
import { spacing } from './tokens/spacing';

const theme = createTheme({
  colors: {
    primary: palette.white500,
    primaryDisabled: palette.blue800,
    soft: palette.blue400,
    softDisabled: palette.blue700,
    navbar: palette.blue950,
    headbox: palette.white50020,
    onPrimary: palette.blue950,
    onPrimaryDisabled: palette.grey600,
    onSoft: palette.white500,
    onSoftDisabled: palette.grey550,
    onCard: palette.white500,
    onBackground: palette.white500,
    text80: palette.grey100,
    onNavbar: palette.white500,
    onNavbarDisabled: palette.white50060,
    onHeadbox: palette.white500,
    onInfo: palette.blue500,
    onSkeleton: palette.blue800,
    background: palette.blue900,
    cardBackground: palette.blue850,
    inputBackground: palette.blue750,
    inputActive: palette.blue400,
    success: palette.green500,
    successSoft: palette.green50,
    warning: palette.orange500,
    warningSoft: palette.orange100,
    error: palette.red500,
    errorSoft: palette.red50,
    info: palette.blue500,
    infoSoft: palette.blue50,
    onHeadBoxStroke: palette.blue450,
    stroke: palette.grey700,
    primaryStroke: palette.blue950,
    white: palette.white500,
    black: palette.black500,
    black90: palette.black50090,
    transparent: 'transparent',
  },
  spacing: spacing,
  borderRadii: borderRadii,
  textVariants: {
    defaults: {},
    header: {
      fontSize: 18,
    },
  },
});

export type Theme = typeof theme;
export default theme;
