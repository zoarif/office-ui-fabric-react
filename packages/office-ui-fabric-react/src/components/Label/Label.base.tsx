import * as React from 'react';
import { BaseComponent, divProperties, getNativeProps, customizable } from '../../Utilities';
import { ILabelProps } from './Label.types';
import { getLabelClassNames } from './Label.classNames';

@customizable('Label', ['theme'])
export class Label extends BaseComponent<ILabelProps, {}> {
  public render(): JSX.Element {
    const { disabled, required, children, className, theme } = this.props;
    return (
      <label
        { ...getNativeProps(this.props, divProperties) }
        className={ getLabelClassNames(theme!, className, !!disabled, !!required).root }
      >
        { children }
      </label>
    );
  }
}
