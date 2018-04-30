import * as React from 'react';
import { IconButton } from '../../Button';
import { Label } from '../../Label';
import { Icon } from '../../Icon';
import {
  BaseComponent,
  getId,
  KeyCodes,
  customizable,
  calculatePrecision,
  precisionRound,
  createRef
} from '../../Utilities';
import {
  ISpinButton,
  ISpinButtonProps,
} from './SpinButton.types';
import { Position } from '../../utilities/positioning';
import { getStyles, getArrowButtonStyles } from './SpinButton.styles';
import { getClassNames } from './SpinButton.classNames';

export enum KeyboardSpinDirection {
  down = -1,
  notSpinning = 0,
  up = 1
}

export interface ISpinButtonState {

  /**
   * Is true when the control has focus.
   */
  isFocused: boolean;

  /**
   * the value of the spin button
   */
  value: string;

  /**
   * keyboard spin direction, used to style the up or down button
   * as active when up/down arrow is pressed
   */
  keyboardSpinDirection: KeyboardSpinDirection;

  /**
   * The calculated precision for the value.
   */
  precision: number;
}

@customizable('SpinButton', ['theme'])
export class SpinButton extends BaseComponent<ISpinButtonProps, ISpinButtonState> implements ISpinButton {

  public static defaultProps: ISpinButtonProps = {
    step: 1,
    min: 0,
    max: 100,
    disabled: false,
    labelPosition: Position.start,
    label: '',
    incrementButtonIcon: { iconName: 'ChevronUpSmall' },
    decrementButtonIcon: { iconName: 'ChevronDownSmall' }
  };

  private _input = createRef<HTMLInputElement>();
  private _inputId: string;
  private _labelId: string;
  private _lastValidValue: string;
  private _spinningByMouse: boolean;

  private _onValidate?: (value: string) => string | void;
  private _onIncrement?: (value: string) => string | void;
  private _onDecrement?: (value: string) => string | void;

  private _currentStepFunctionHandle: number;
  private _initialStepDelay = 400;
  private _stepDelay = 75;

  constructor(props: ISpinButtonProps) {
    super(props);

    this._warnMutuallyExclusive({
      'value': 'defaultValue'
    });

    const value = props.value || props.defaultValue || String(props.min) || '0';
    this._lastValidValue = value;

    // Ensure that the autocalculated precision is not negative.
    const precision = props.precision || Math.max(calculatePrecision(props.step!), 0);

    this.state = {
      isFocused: false,
      value: value,
      keyboardSpinDirection: KeyboardSpinDirection.notSpinning,
      precision
    };

    this._currentStepFunctionHandle = -1;
    this._labelId = getId('Label');
    this._inputId = getId('input');
    this._spinningByMouse = false;

    if (!props.defaultValue && props.value !== undefined) {
      this._onValidate = props.onValidate;
      this._onIncrement = props.onIncrement;
      this._onDecrement = props.onDecrement;
    } else {
      this._onValidate = this._defaultOnValidate;
      this._onIncrement = this._defaultOnIncrement;
      this._onDecrement = this._defaultOnDecrement;
    }
  }

  /**
  * Invoked when a component is receiving new props. This method is not called for the initial render.
  */
  public componentWillReceiveProps(newProps: ISpinButtonProps): void {
    this._lastValidValue = this.state.value;
    let value: string = newProps.value ? newProps.value : String(newProps.min);
    if (newProps.defaultValue) {
      value = String(Math.max(newProps.min as number, Math.min(newProps.max as number, Number(newProps.defaultValue))));
    }

    this.setState({
      value: value,
      precision: newProps.precision || this.state.precision
    });
  }

  public render(): JSX.Element {
    const {
      disabled,
      label,
      min,
      max,
      labelPosition,
      iconProps,
      incrementButtonIcon,
      incrementButtonAriaLabel,
      decrementButtonIcon,
      decrementButtonAriaLabel,
      title,
      ariaLabel,
      styles: customStyles,
      upArrowButtonStyles: customUpArrowButtonStyles,
      downArrowButtonStyles: customDownArrowButtonStyles,
      theme,
      ariaPositionInSet,
      ariaSetSize
    } = this.props;

    const {
      isFocused,
      value,
      keyboardSpinDirection
    } = this.state;

    const classNames = this.props.getClassNames ?
      this.props.getClassNames(
        theme!,
        !!disabled,
        !!isFocused,
        keyboardSpinDirection,
        labelPosition
      ) : getClassNames(
        getStyles(theme!, customStyles),
        !!disabled,
        !!isFocused,
        keyboardSpinDirection,
        labelPosition
      );

    return (
      <div className={ classNames.root }>
        { labelPosition !== Position.bottom && <div className={ classNames.labelWrapper }>
          { iconProps && <Icon iconName={ iconProps.iconName } className={ classNames.icon } aria-hidden='true' /> }
          { label &&
            <Label
              id={ this._labelId }
              htmlFor={ this._inputId }
              className={ classNames.label }
            >
              { label }
            </Label>
          }
        </div> }
        <div
          className={ classNames.spinButtonWrapper }
          title={ title && title }
          aria-label={ ariaLabel && ariaLabel }
          aria-posinset={ ariaPositionInSet }
          aria-setsize={ ariaSetSize }
        >
          <input
            value={ value }
            id={ this._inputId }
            onChange={ this._onChange }
            onInput={ this._onInputChange }
            className={ classNames.input }
            type='text'
            role='spinbutton'
            aria-labelledby={ label && this._labelId }
            aria-valuenow={ !isNaN(Number(value)) ? Number(value) : undefined }
            aria-valuetext={ isNaN(Number(value)) ? value : undefined }
            aria-valuemin={ min }
            aria-valuemax={ max }
            onBlur={ this._onBlur }
            ref={ this._input }
            onFocus={ this._onFocus }
            onKeyDown={ this._handleKeyDown }
            onKeyUp={ this._handleKeyUp }
            readOnly={ disabled }
            disabled={ disabled }
            aria-disabled={ disabled }
            data-lpignore={ true }
          />
          <span className={ classNames.arrowBox }>
            <IconButton
              styles={ getArrowButtonStyles(theme!, true, customUpArrowButtonStyles) }
              className={ 'ms-UpButton' }
              checked={ keyboardSpinDirection === KeyboardSpinDirection.up }
              disabled={ disabled }
              iconProps={ incrementButtonIcon }
              onMouseDown={ this._onIncrementMouseDown }
              onMouseLeave={ this._stop }
              onMouseUp={ this._stop }
              tabIndex={ -1 }
              ariaLabel={ incrementButtonAriaLabel }
              data-is-focusable={ false }
            />
            <IconButton
              styles={ getArrowButtonStyles(theme!, false, customDownArrowButtonStyles) }
              className={ 'ms-DownButton' }
              checked={ keyboardSpinDirection === KeyboardSpinDirection.down }
              disabled={ disabled }
              iconProps={ decrementButtonIcon }
              onMouseDown={ this._onDecrementMouseDown }
              onMouseLeave={ this._stop }
              onMouseUp={ this._stop }
              tabIndex={ -1 }
              ariaLabel={ decrementButtonAriaLabel }
              data-is-focusable={ false }
            />
          </span>
        </div>
        { labelPosition === Position.bottom && <div className={ classNames.labelWrapper }>
          { iconProps && <Icon iconName={ iconProps.iconName } className={ classNames.icon } aria-hidden='true' /> }
          { label &&
            <Label
              id={ this._labelId }
              htmlFor={ this._inputId }
              className={ classNames.label }
            >
              { label }
            </Label>
          }
        </div>
        }
      </div>
    );
  }

  public focus(): void {
    if (this._input.current) {
      this._input.current.focus();
    }
  }

  private _onFocus = (ev: React.FocusEvent<HTMLInputElement>): void => {
    // We can't set focus on a non-existing element
    if (!this._input.current) {
      return;
    }

    if (this._spinningByMouse || this.state.keyboardSpinDirection !== KeyboardSpinDirection.notSpinning) {
      this._stop();
    }

    this._input.current.select();

    this.setState({ isFocused: true });

    if (this.props.onFocus) {
      this.props.onFocus(ev);
    }
  }

  private _onBlur = (ev: React.FocusEvent<HTMLInputElement>): void => {
    this._validate(ev);
    this.setState({ isFocused: false });
    if (this.props.onBlur) {
      this.props.onBlur(ev);
    }
  }

  /**
   * Gets the value of the spin button.
   */
  public get value(): string | undefined {
    return this.props.value === undefined ? this.state.value : this.props.value;
  }

  /**
   * Validate function to use if one is not passed in
   */
  private _defaultOnValidate = (value: string) => {
    if (isNaN(Number(value))) {
      return this._lastValidValue;
    }
    const newValue = Math.min(this.props.max as number, Math.max(this.props.min as number, Number(value)));
    return String(newValue);
  }

  /**
   * Increment function to use if one is not passed in
   */
  private _defaultOnIncrement = (value: string): string | void => {
    let newValue: number = Math.min(Number(value) + Number(this.props.step)!, this.props.max!);
    newValue = precisionRound(newValue, this.state.precision);
    return String(newValue);
  }

  /**
   * Increment function to use if one is not passed in
   */
  private _defaultOnDecrement = (value: string): string | void => {
    let newValue: number = Math.max(Number(value) - Number(this.props.step)!, this.props.min!);
    newValue = precisionRound(newValue, this.state.precision);
    return String(newValue);
  }

  private _onChange(): void {
    /**
     * A noop input change handler.
     * https://github.com/facebook/react/issues/7027.
     * Using the native onInput handler fixes the issue but onChange
     * still need to be wired to avoid React console errors
     * TODO: Check if issue is resolved when React 16 is available.
     */
  }

  /**
   * This is used when validating text entry
   * in the input (not when changed via the buttons)
   * @param event - the event that fired
   */
  private _validate = (event: React.FocusEvent<HTMLInputElement>): void => {
    const element: HTMLInputElement = event.target as HTMLInputElement;
    const value: string = element.value;
    if (this.state.value) {
      const newValue = this._onValidate!(value);
      if (newValue) {
        this._lastValidValue = newValue;
        this.setState({ value: newValue });
      }
    }
  }

  /**
   * The method is needed to ensure we are updating the actual input value.
   * without this our value will never change (and validation will not have the correct number)
   * @param event - the event that was fired
   */
  private _onInputChange = (event: React.FormEvent<HTMLInputElement | HTMLTextAreaElement>): void => {
    const element: HTMLInputElement = event.target as HTMLInputElement;
    const value: string = element.value;

    this.setState({
      value: value,
    });
  }

  /**
   * Update the value with the given stepFunction
   * @param shouldSpin - should we fire off another updateValue when we are done here? This should be true
   * when spinning in response to a mouseDown
   * @param stepFunction - function to use to step by
   */
  private _updateValue = (shouldSpin: boolean, stepDelay: number, stepFunction: (value: string) => string | void): void => {
    const newValue: string | void = stepFunction(this.state.value);
    if (newValue) {
      this._lastValidValue = newValue;
      this.setState({ value: newValue });
    }

    if (this._spinningByMouse !== shouldSpin) {
      this._spinningByMouse = shouldSpin;
    }

    if (shouldSpin) {
      this._currentStepFunctionHandle = this._async.setTimeout(() => { this._updateValue(shouldSpin, this._stepDelay, stepFunction); }, stepDelay);
    }
  }

  /**
   * Stop spinning (clear any currently pending update and set spinning to false)
   */
  private _stop = (): void => {
    if (this._currentStepFunctionHandle >= 0) {
      this._async.clearTimeout(this._currentStepFunctionHandle);
      this._currentStepFunctionHandle = -1;
    }

    if (this._spinningByMouse || this.state.keyboardSpinDirection !== KeyboardSpinDirection.notSpinning) {
      this._spinningByMouse = false;
      this.setState({ keyboardSpinDirection: KeyboardSpinDirection.notSpinning });
    }
  }

  /**
   * Handle keydown on the text field. We need to update
   * the value when up or down arrow are depressed
   * @param event - the keyboardEvent that was fired
   */
  private _handleKeyDown = (event: React.KeyboardEvent<HTMLElement>): void => {

    // eat the up and down arrow keys to keep focus in the spinButton
    // (especially when a spinButton is inside of a FocusZone)
    if (event.which === KeyCodes.up || event.which === KeyCodes.down) {
      event.preventDefault();
      event.stopPropagation();
    }

    if (this.props.disabled) {
      this._stop();
      return;
    }

    let spinDirection = KeyboardSpinDirection.notSpinning;

    if (event.which === KeyCodes.up) {

      spinDirection = KeyboardSpinDirection.up;
      this._updateValue(false /* shouldSpin */, this._initialStepDelay, this._onIncrement!);
    } else if (event.which === KeyCodes.down) {

      spinDirection = KeyboardSpinDirection.down;
      this._updateValue(false /* shouldSpin */, this._initialStepDelay, this._onDecrement!);
    } else if (event.which === KeyCodes.enter) {
      event.currentTarget.blur();
      this.focus();
    } else if (event.which === KeyCodes.escape) {
      if (this.state.value !== this._lastValidValue) {
        this.setState({ value: this._lastValidValue });
      }
    }

    // style the increment/decrement button to look active
    // when the corresponding up/down arrow keys trigger a step
    if (this.state.keyboardSpinDirection !== spinDirection) {
      this.setState({ keyboardSpinDirection: spinDirection });
    }
  }

  /**
   * Make sure that we have stopped spinning on keyUp
   * if the up or down arrow fired this event
   * @param event stop spinning if we
   */
  private _handleKeyUp = (event: React.KeyboardEvent<HTMLElement>): void => {
    if (this.props.disabled || event.which === KeyCodes.up || event.which === KeyCodes.down) {
      this._stop();
      return;
    }
  }

  private _onIncrementMouseDown = (): void => {
    this._updateValue(true /* shouldSpin */, this._initialStepDelay, this._onIncrement!);
  }

  private _onDecrementMouseDown = (): void => {
    this._updateValue(true /* shouldSpin */, this._initialStepDelay, this._onDecrement!);
  }
}
