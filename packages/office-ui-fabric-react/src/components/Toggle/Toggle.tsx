import * as React from 'react';
import {
  BaseComponent,
  getId,
  inputProperties,
  getNativeProps,
  createRef
} from '../../Utilities';
import {
  IToggleProps,
  IToggle
} from './Toggle.types';
import { Label } from '../../Label';
import {
  customizable
} from '../../Utilities';
import { getClassNames } from './Toggle.classNames';

export interface IToggleState {
  isChecked: boolean;
}

@customizable('Toggle', ['theme'])
export class Toggle extends BaseComponent<IToggleProps, IToggleState> implements IToggle {

  private _id: string;
  private _toggleButton = createRef<HTMLButtonElement>();

  constructor(props: IToggleProps) {
    super(props);

    this._warnMutuallyExclusive({
      checked: 'defaultChecked'
    });

    this.state = {
      isChecked: !!(props.checked || props.defaultChecked)
    };
    this._id = props.id || getId('Toggle');
  }

  /**
   * Gets the current checked state of the toggle.
   */
  public get checked(): boolean {
    return this.state.isChecked;
  }

  public componentWillReceiveProps(newProps: IToggleProps): void {
    if (newProps.checked !== undefined) {
      this.setState({
        isChecked: !!newProps.checked // convert null to false
      });
    }
  }

  public render(): JSX.Element {
    // This control is using an input element for more universal accessibility support.
    // Previously a button and the aria-pressed attribute were used. This technique works well with Narrator + Edge and NVDA + FireFox.
    // However, JAWS and VoiceOver did not announce anything when the toggle was checked or unchecked.
    // In the future when more screenreaders support aria-pressed it would be a good idea to change this control back to using it as it is
    // more semantically correct.

    const {
      className,
      theme,
      styles: customStyles,
      disabled,
      label,
      offAriaLabel,
      offText,
      onAriaLabel,
      onText
    } = this.props;
    const { isChecked } = this.state;
    const stateText = isChecked ? onText : offText;
    const ariaLabel = isChecked ? onAriaLabel : offAriaLabel;
    const toggleNativeProps = getNativeProps(this.props, inputProperties, ['defaultChecked']);
    const classNames = getClassNames(
      theme!,
      customStyles!,
      className!,
      disabled!,
      isChecked
    );

    return (
      <div className={ classNames.root }>

        { label && (
          <Label htmlFor={ this._id } className={ classNames.label }>{ label }</Label>
        ) }

        <div className={ classNames.container } >
          <button
            { ...toggleNativeProps }
            className={ classNames.pill }
            disabled={ disabled }
            id={ this._id }
            type='button'
            ref={ this._toggleButton }
            aria-disabled={ disabled }
            aria-pressed={ isChecked }
            aria-label={ ariaLabel ? ariaLabel : label }
            data-is-focusable={ true }
            onChange={ this._noop }
            onClick={ this._onClick }
          >
            <div className={ classNames.thumb } />
          </button>
          { stateText && (
            <Label htmlFor={ this._id } className={ classNames.text }>{ stateText }</Label>
          ) }
        </div>
      </div >
    );
  }

  public focus() {
    if (this._toggleButton.current) {
      this._toggleButton.current.focus();
    }
  }

  private _onClick = (ev: React.MouseEvent<HTMLElement>) => {
    const { disabled, checked, onChanged, onClick } = this.props;
    const { isChecked } = this.state;

    if (!disabled) {
      // Only update the state if the user hasn't provided it.
      if (checked === undefined) {
        this.setState({
          isChecked: !isChecked
        });
      }

      if (onChanged) {
        onChanged(!isChecked);
      }

      if (onClick) {
        onClick(ev);
      }
    }
  }

  private _noop(): void {
    /* no-op */
  }

}
