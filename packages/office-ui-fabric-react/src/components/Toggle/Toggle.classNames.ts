import { memoizeFunction } from '../../Utilities';
import {
  ITheme,
  mergeStyleSets,
  getFocusStyle,
  HighContrastSelector
} from '../../Styling';
import { IToggleStyles } from './Toggle.types';

export interface IToggleClassNames {
  root?: string;
  label?: string;
  container?: string;
  pill?: string;
  thumb?: string;
  text?: string;
}

export const getClassNames = memoizeFunction((
  theme: ITheme,
  styles: IToggleStyles,
  className: string,
  disabled: boolean,
  checked: boolean
): IToggleClassNames => {
  const { semanticColors } = theme;
  const pillUncheckedBackground = semanticColors.bodyBackground;
  const pillCheckedBackground = semanticColors.inputBackgroundChecked;
  const pillCheckedHoveredBackground = semanticColors.inputBackgroundCheckedHovered;
  const pillCheckedDisabledBackground = semanticColors.disabledBodyText;
  const thumbBackground = semanticColors.inputBorderHovered;
  const thumbCheckedBackground = semanticColors.inputForegroundChecked;
  const thumbDisabledBackground = semanticColors.disabledBodyText;
  const thumbCheckedDisabledBackground = semanticColors.disabledBackground;
  const pillBorderColor = semanticColors.smallInputBorder;
  const pillBorderHoveredColor = semanticColors.inputBorderHovered;
  const pillBorderDisabledColor = semanticColors.disabledBodyText;
  const textDisabledColor = semanticColors.disabledText;

  styles = styles || {};

  return mergeStyleSets({
    root: [
      'ms-Toggle',
      checked && 'is-checked',
      !disabled && 'is-enabled',
      disabled && 'is-disabled',
      theme.fonts.medium,
      {
        marginBottom: '8px'
      },
      className,
      styles.root,
    ],

    label: [
      'ms-Toggle-label',
      styles.label,
      disabled && {
        color: textDisabledColor,
        selectors: {
          [HighContrastSelector]: {
            color: 'GrayText'
          },
        }
      }
    ],

    container: [
      'ms-Toggle-innerContainer',
      {
        display: 'inline-flex',
        position: 'relative',
      },
      styles.container
    ],

    pill: [
      'ms-Toggle-background',
      getFocusStyle(theme, -3),
      {
        fontSize: '20px',
        boxSizing: 'border-box',
        width: '2.2em',
        height: '1em',
        borderRadius: '1em',
        transition: 'all 0.1s ease',
        borderWidth: '1px',
        borderStyle: 'solid',
        background: pillUncheckedBackground,
        borderColor: pillBorderColor,
        cursor: 'pointer',
        display: 'flex',
        alignItems: 'center',
        padding: '0 .2em'
      },
      styles.pill,
      !disabled && [
        !checked && {
          selectors: {
            ':hover': [
              {
                borderColor: pillBorderHoveredColor
              },
              styles.pillHovered
            ],
            ':hover .ms-Toggle-thumb': styles.thumbHovered
          }
        },
        checked && [
          {
            background: pillCheckedBackground,
            borderColor: 'transparent',
            justifyContent: 'flex-end'
          },
          styles.pillChecked,
          {
            selectors: {
              ':hover': [
                {
                  backgroundColor: pillCheckedHoveredBackground,
                  borderColor: 'transparent'
                },
                styles.pillCheckedHovered
              ],
              ':hover .ms-Toggle-thumb': [
                styles.thumbCheckedHovered
              ],
              [HighContrastSelector]: {
                backgroundColor: 'WindowText'
              }
            }
          }
        ]
      ],
      disabled && [
        {
          cursor: 'default'
        },
        !checked && [
          {
            borderColor: pillBorderDisabledColor
          },
          styles.pillDisabled
        ],
        checked && [
          {
            backgroundColor: pillCheckedDisabledBackground,
            borderColor: 'transparent',
            justifyContent: 'flex-end'
          },
          styles.pillCheckedDisabled
        ],
      ]
    ],

    thumb: [
      'ms-Toggle-thumb',
      {
        width: '.5em',
        height: '.5em',
        borderRadius: '.5em',
        transition: 'all 0.1s ease',
        backgroundColor: thumbBackground,
        /* Border is added to handle high contrast mode for Firefox */
        borderColor: 'transparent',
        borderWidth: '.28em',
        borderStyle: 'solid',
        boxSizing: 'border-box'
      },
      styles.thumb,
      !disabled && checked && [
        {
          backgroundColor: thumbCheckedBackground,
          selectors: {
            [HighContrastSelector]: {
              backgroundColor: 'Window',
              borderColor: 'Window'
            }
          }
        },
        styles.thumbChecked,
      ],
      disabled && [
        !checked && [
          {
            backgroundColor: thumbDisabledBackground,
          },
          styles.thumbDisabled
        ],
        checked && [
          {
            backgroundColor: thumbCheckedDisabledBackground,
          },
          styles.thumbCheckedDisabled
        ]
      ]
    ],

    text: [
      'ms-Toggle-stateText',
      {
        selectors: {
          // Workaround: make rules more sepecific than Label rules.
          '&&': {
            padding: '0',
            margin: '0 10px',
            userSelect: 'none',
          }
        }
      },
      disabled && {
        selectors: {
          '&&': {
            color: textDisabledColor,
            selectors: {
              [HighContrastSelector]: {
                color: 'GrayText'
              },
            }
          }
        }
      },
      styles.text
    ]
  });

});
