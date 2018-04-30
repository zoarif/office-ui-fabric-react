import * as React from 'react';
import {
  BaseComponent,
  css,
  getNativeProps,
  divProperties
} from '../../Utilities';
import { ITooltipProps, TooltipDelay } from './Tooltip.types';
import { Callout } from '../../Callout';
import { DirectionalHint } from '../../common/DirectionalHint';
import * as stylesImport from './Tooltip.scss';
const styles: any = stylesImport;
import { AnimationClassNames, mergeStyles } from '../../Styling';

export class Tooltip extends BaseComponent<ITooltipProps, any> {

  // Specify default props values
  public static defaultProps: Partial<ITooltipProps> = {
    directionalHint: DirectionalHint.topCenter,
    delay: TooltipDelay.medium,
    maxWidth: '364px',
    calloutProps: {
      isBeakVisible: true,
      beakWidth: 16,
      gapSpace: 0,
      setInitialFocus: true,
      doNotLayer: false
    }
  };

  public render(): JSX.Element {
    const {
      targetElement,
      calloutProps,
      directionalHint,
      directionalHintForRTL,
      delay,
      id,
      maxWidth,
      onRenderContent = this._onRenderContent
    } = this.props;

    return (
      <Callout
        target={ targetElement }
        directionalHint={ directionalHint }
        directionalHintForRTL={ directionalHintForRTL }
        { ...calloutProps }
        { ...getNativeProps(this.props, divProperties) }
        className={ mergeStyles(
          'ms-Tooltip',
          AnimationClassNames.fadeIn200,
          styles.root,
          (delay === TooltipDelay.medium) && styles.hasMediumDelay,
          (delay === TooltipDelay.long) && styles.hasLongDelay,
          (maxWidth !== null) && { maxWidth: maxWidth },
          calloutProps ? calloutProps.className : undefined,
          this.props.className
        ) }
      >
        <div
          className={ css('ms-Tooltip-content', styles.content) }
          id={ id }
          role='tooltip'
          onMouseEnter={ this.props.onMouseEnter }
          onMouseLeave={ this.props.onMouseLeave }
        >
          { onRenderContent(this.props, this._onRenderContent) }
        </div>
      </Callout >
    );
  }

  private _onRenderContent(props: ITooltipProps): JSX.Element {
    return (
      <p className={ css('ms-Tooltip-subText', styles.subText) }>
        { props.content }
      </p>
    );
  }
}
