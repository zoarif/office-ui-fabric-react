import { ICheckboxStyles } from './Checkbox.types';
import {
  ITheme,
  concatStyleSets,
  getFocusStyle,
  FontSizes
} from '../../Styling';
import { memoizeFunction } from '../../Utilities';

const MS_CHECKBOX_LABEL_SIZE = '20px';
const MS_CHECKBOX_TRANSITION_DURATION = '200ms';
const MS_CHECKBOX_TRANSITION_TIMING = 'cubic-bezier(.4, 0, .23, 1)';

export const getStyles = memoizeFunction((
  theme: ITheme,
  customStyles?: ICheckboxStyles
): ICheckboxStyles => {
  const { semanticColors, palette } = theme;
  const checkmarkFontColor = semanticColors.inputForegroundChecked;
  const checkmarkFontColorCheckedDisabled = semanticColors.disabledBackground;
  const checkboxBorderColor = semanticColors.smallInputBorder;
  const checkboxBorderColorChecked = semanticColors.inputBackgroundChecked;
  const checkboxBorderColorDisabled = semanticColors.disabledBodyText;
  const checkboxBorderHoveredColor = semanticColors.inputBorderHovered;
  const checkboxBackgroundChecked = semanticColors.inputBackgroundChecked;
  const checkboxBackgroundCheckedHovered = semanticColors.inputBackgroundCheckedHovered;
  const checkboxBorderColorCheckedHovered = semanticColors.inputBackgroundCheckedHovered;
  const checkboxBackgroundDisabled = semanticColors.disabledBodyText;
  const checkboxTextColor = semanticColors.bodyText;
  const checkboxTextColorDisabled = semanticColors.disabledText;

  const styles: ICheckboxStyles = {
    root: [
      getFocusStyle(theme, -2),
      theme.fonts.medium,
      {
        padding: '0',
        border: 'none',
        background: 'none',
        backgroundColor: 'transparent',
        margin: '0',
        outline: 'none',
        display: 'block',
        cursor: 'pointer',
      }
    ],
    label: {
      display: 'inline-flex',
      margin: '0 -4px',
      alignItems: 'center',
      cursor: 'pointer',
      position: 'relative',
      textAlign: 'left'
    },
    labelReversed: {
      flexDirection: 'row-reverse',
      justifyContent: 'flex-end'
    },
    labelDisabled: {
      cursor: 'default'
    },
    checkbox: {
      display: 'flex',
      flexShrink: 0,
      alignItems: 'center',
      justifyContent: 'center',
      height: MS_CHECKBOX_LABEL_SIZE,
      width: MS_CHECKBOX_LABEL_SIZE,
      borderWidth: '1px',
      borderStyle: 'solid',
      borderColor: checkboxBorderColor,
      margin: '0 4px',
      boxSizing: 'border-box',
      transitionProperty: 'background, border, border-color',
      transitionDuration: MS_CHECKBOX_TRANSITION_DURATION,
      transitionTimingFunction: MS_CHECKBOX_TRANSITION_TIMING,
      userSelect: 'none',

      /* incase the icon is bigger than the box */
      overflow: 'hidden'
    },
    checkboxHovered: {
      borderColor: checkboxBorderHoveredColor,
    },
    checkboxFocused: {
      borderColor: checkboxBorderHoveredColor,
    },
    checkboxChecked: {
      background: checkboxBackgroundChecked,
      borderColor: checkboxBorderColorChecked
    },
    checkboxCheckedHovered: {
      background: checkboxBackgroundCheckedHovered,
      borderColor: checkboxBorderColorCheckedHovered
    },
    checkboxCheckedFocused: {
      background: checkboxBackgroundCheckedHovered,
      borderColor: checkboxBorderColorCheckedHovered
    },
    checkboxDisabled: {
      borderColor: checkboxBorderColorDisabled
    },
    checkboxCheckedDisabled: {
      background: checkboxBackgroundDisabled,
      borderColor: checkboxBorderColorDisabled
    },
    checkmark: {
      opacity: '0',
      color: checkmarkFontColor
    },
    checkmarkChecked: {
      opacity: '1'
    },
    checkmarkDisabled: {
    },
    checkmarkCheckedDisabled: {
      opacity: '1',
      color: checkmarkFontColorCheckedDisabled,
    },
    text: {
      color: checkboxTextColor,
      margin: '0 4px',
      fontSize: FontSizes.medium
    },
    textHovered: {
      color: palette.black,
    },
    textFocused: {
      color: palette.black,
    },
    textDisabled: {
      color: checkboxTextColorDisabled,   // ms-fontColor-neutralTertiary
    }
  };

  return concatStyleSets(styles, customStyles)!;
});