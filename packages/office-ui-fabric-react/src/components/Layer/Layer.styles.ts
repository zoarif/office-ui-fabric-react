import { ILayerStyleProps, ILayerStyles } from './Layer.types';
import { getGlobalClassNames } from '../../Styling';

const GlobalClassNames = {
  root: 'ms-Layer',
  rootNoHost: 'ms-Layer--fixed',
  content: 'ms-Layer-content',
};

export const getStyles = (
  props: ILayerStyleProps
): ILayerStyles => {
  const {
    className,
    isNotHost,
    theme
  } = props;

  const classNames = getGlobalClassNames(GlobalClassNames, theme);

  return ({
    root: [
      classNames.root,
      isNotHost && [
        classNames.rootNoHost,
        {
          position: 'fixed',
          zIndex: 1000000,
          top: 0,
          left: 0,
          width: '100vw',
          height: '100vh',
          visibility: 'hidden'
        }
      ],
      className
    ],
    content: [
      classNames.content,
      {
        visibility: 'visible'
      }
    ]
  });
};
