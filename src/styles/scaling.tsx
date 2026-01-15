import {Dimensions, PixelRatio} from 'react-native';

// Get the raw window dimensions for the usable app area.
// These values update automatically on device rotation or window resizing.
const {width: windowWidth, height: windowHeight} = Dimensions.get('window');

// Determine the shorter and longer dimension of the current window.
// This helps create more balanced scaling across various screen aspect ratios.
const [shortDimension, longDimension] =
  windowWidth < windowHeight
    ? [windowWidth, windowHeight]
    : [windowHeight, windowWidth];

// --- IMPORTANT: CONFIGURE YOUR FIGMA DESIGN'S BASE DIMENSIONS HERE ---
// These values should precisely match the logical pixel dimensions of the device
// for which your Figma UI was originally designed.
// For iPhone 13 Pro (common logical dimensions):
const FIGMA_DESIGN_BASE_WIDTH_PORTRAIT = 375; // Defaulting to 390 for LTR, 430 for RTL (as per your snippet)
const FIGMA_DESIGN_BASE_HEIGHT_PORTRAIT = 812; // iPhone 13 Pro height in dp

// --- Core Scaling Functions ---

/**
 * USE FOR:
 * - `width`, `minWidth`, `maxWidth`
 * - `paddingHorizontal`, `marginHorizontal`, `left`, `right`
 * - Horizontal spacing (e.g., `columnGap`)
 * - Horizontal shadow offsets (`shadowOffset.width`)
 */
export const scale = (size: number): number =>
  Math.round((shortDimension / FIGMA_DESIGN_BASE_WIDTH_PORTRAIT) * size);

/**
 * USE FOR:
 * - `height`, `minHeight`, `maxHeight`
 * - `paddingVertical`, `marginVertical`, `top`, `bottom`
 * - Vertical spacing (e.g., `rowGap`)
 * - Vertical shadow offsets (`shadowOffset.height`)
 */
export const verticalScale = (size: number): number =>
  Math.round((longDimension / FIGMA_DESIGN_BASE_HEIGHT_PORTRAIT) * size);

/**
 * USE FOR:
 * - `borderRadius` (to keep corners visually consistent)
 * - `borderWidth` (to prevent borders from becoming too thin or thick)
 * - `iconSize` (if not strictly proportional to width/height, for balanced visual impact)
 * - `padding` or `margin` (when uniform padding/margin is needed and a softer scale is desired)
 * - `shadowRadius`, `elevation` (for balanced shadow effects)
 * - Any general size that benefits from a "softer" or moderated scaling effect.
 */
export const moderateScale = (size: number, factor = 0.7): number =>
  Math.round(size + (scale(size) - size) * factor);

/**
 * USE FOR:
 * - Vertical elements that need a softer scaling effect, similar to `moderateScale` but applied vertically.
 * - Less commonly used than `moderateScale` but useful for specific cases.
 */
export const moderateVerticalScale = (size: number, factor = 0.7): number =>
  Math.round(size + (verticalScale(size) - size) * factor);

/**
 * USE FOR:
 * - `fontSize` (Always use this for all text sizes to ensure responsiveness and accessibility)
 * - `lineHeight` (Use the same base value as `fontSize` for proportional line height)
 * - `letterSpacing` (If scaling is desired for text spacing)
 */
export const responsiveFont = (size: number, factor = 0.7): number => {
  const moderatedScaledSize = size + (scale(size) - size) * factor;
  const fontScale = PixelRatio.getFontScale();
  return Math.round(
    moderatedScaledSize + (fontScale - 0.6) * moderatedScaledSize * (1 - factor)
  );
};

// --- Export Shorthands (Optional, for quicker and more concise usage) ---
export const s = scale; // Shorthand for horizontal scaling
export const vs = verticalScale; // Shorthand for vertical scaling
export const ms = moderateScale; // Shorthand for moderate scaling
export const mvs = moderateVerticalScale; // Shorthand for moderate vertical scaling
export const rf = responsiveFont; // Shorthand for responsive font sizing

// --- Additional Exports for Reference (Useful for debugging or advanced layouts) ---
export {
  windowWidth, // Current actual window width in logical pixels
  windowHeight, // Current actual window height in logical pixels
  shortDimension, // The shorter dimension of the current window
  longDimension, // The longer dimension of the current window
  FIGMA_DESIGN_BASE_WIDTH_PORTRAIT, // The base width used for Figma design reference
  FIGMA_DESIGN_BASE_HEIGHT_PORTRAIT, // The base height used for Figma design reference
};
