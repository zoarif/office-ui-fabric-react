import { IButtonStyles } from './Button.types';
import { memoizeFunction } from '../../Utilities';
import {
  ITheme,
  IRawStyle,
  getFocusStyle,
  FontSizes,
  hiddenContentStyle
} from '../../Styling';

const noOutline: IRawStyle = {
  outline: 0
};

const iconStyle = {
  fontSize: FontSizes.icon,
  margin: '0 4px',
  height: '16px',
  lineHeight: '16px',
  textAlign: 'center',
  verticalAlign: 'middle',
  flexShrink: 0
};

/**
 * Gets the base button styles. Note: because it is a base class to be used with the `mergeRules`
 * helper, it should have values for all class names in the interface. This let `mergeRules` optimize
 * mixing class names together.
 */
export const getStyles = memoizeFunction((
  theme: ITheme
): IButtonStyles => {
  const { semanticColors } = theme;

  const border = semanticColors.buttonBorder;
  const disabledBackground = semanticColors.disabledBackground;
  const disabledText = semanticColors.disabledText;
  const buttonHighContrastFocus = {
    left: -2,
    top: -2,
    bottom: -2,
    right: -2,
    border: 'none',
    outlineColor: 'ButtonText'
  };

  return {
    root: [
      getFocusStyle(theme, -1, 'relative', buttonHighContrastFocus),
      theme.fonts.medium,
      {
        boxSizing: 'border-box',
        border: '1px solid ' + border,
        userSelect: 'none',
        display: 'inline-block',
        textDecoration: 'none',
        textAlign: 'center',
        cursor: 'pointer',
        verticalAlign: 'top',
        padding: '0 16px',
        borderRadius: 0
      }
    ],

    rootDisabled: {
      backgroundColor: disabledBackground,
      color: disabledText,
      cursor: 'default',
      pointerEvents: 'none',
      selectors: {
        ':hover': noOutline,
        ':focus': noOutline
      }
    },

    iconDisabled: {
      color: disabledText
    },

    menuIconDisabled: {
      color: disabledText
    },

    flexContainer: {
      display: 'flex',
      height: '100%',
      flexWrap: 'nowrap',
      justifyContent: 'center',
      alignItems: 'center'
    },

    textContainer: {
      flexGrow: 1
    },

    icon: iconStyle,

    menuIcon: [
      iconStyle,
      {
        fontSize: FontSizes.small
      }
    ],

    label: {
      margin: '0 4px',
      lineHeight: '100%'
    },

    screenReaderText: hiddenContentStyle
  };
});
