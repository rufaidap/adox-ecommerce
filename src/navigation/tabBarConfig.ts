import {Dimensions} from 'react-native';

import {ms, s, vs} from '@/styles/scaling';

const {width: WIDTH} = Dimensions.get('screen');

export const TAB_HEIGHT = vs(55);
export const HORIZONTAL_PADDING = s(16);
// WIDTH from Dimensions can be fractional, so round the result
export const TAB_FULL_WIDTH = Math.round(WIDTH - 2 * HORIZONTAL_PADDING);
export const SPACE_BETWEEN_TAB = ms(10);
// All values are integers (scaling functions return integers), but rounding ensures consistency
export const SECOND_TAB_WIDTH = TAB_FULL_WIDTH - TAB_HEIGHT - SPACE_BETWEEN_TAB; // TAB_HEIGHT = Whatsapp icon size
export const SPACING_BETWEEN_SEC_TAB_MENU = ms(5);
// Division can produce fractional values, so round the result
export const SINGLE_TAB_WIDTH = Math.round(
  (SECOND_TAB_WIDTH - 5 * SPACING_BETWEEN_SEC_TAB_MENU) / 4
);
// Both values are integers, result is integer - no rounding needed
export const SINGLE_TAB_HEIGHT = TAB_HEIGHT - SPACING_BETWEEN_SEC_TAB_MENU;
// Multiplication by 0.4 can produce fractional values, so round the result
export const ICON_SIZE = Math.round(TAB_HEIGHT * 0.4);
