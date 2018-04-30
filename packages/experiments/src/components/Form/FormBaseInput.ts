/* tslint:disable:no-any */

import * as React from 'react';
import * as PropTypes from 'prop-types';

import { IFormContext, IFormValidationResult } from './Form';
import { IFormBaseInputProps } from './FormBaseInput.types';
export { IFormBaseInputProps };

// Components
import {
  BaseComponent,
  ICancelable
} from 'office-ui-fabric-react/lib/Utilities';

export const DEFAULT_DEBOUNCE = 250;

/**
 * The base state for any simple form input
 */
export interface IFormBaseInputState<T> {
  isValid: boolean;
  currentValue?: T;
  currentError?: string;
}

/**
 * Type alias for any simple form input
 */
export type GenericFormInput = FormBaseInput<any, IFormBaseInputProps<any>, IFormBaseInputState<any>>;

/**
 * The base class that all simple form inputs should inherit from
 * The T generic should be the type of value this input accepts. For example, a TextBox would probably define T as string
 */
export abstract class FormBaseInput<T, P extends IFormBaseInputProps<T>, S extends IFormBaseInputState<T>> extends BaseComponent<P, S> {
  public static contextTypes: React.ValidationMap<IFormContext> = {
    isFormValid: PropTypes.func.isRequired,
    mountInput: PropTypes.func.isRequired,
    unmountInput: PropTypes.func.isRequired,
    submitValue: PropTypes.func.isRequired
  };

  /**
   * The debounced version of formContext.submitValue
   */
  protected readonly debouncedSubmitValue: ICancelable<void> & ((input: GenericFormInput) => void);

  /**
   * Form context passed by the parent form
   */
  private formContext: IFormContext;

  /**
   * Constructor for any Simple Form input
   * @param props The props for this component
   * @param context The context for this component
   * @param leadingDebounce Sets the debounce setting for updates on this input.
   * If leading, the component will update immediately and then debounce.
   * Otherwise, the component will only update after the debounce interval. Defaults to true
   */
  constructor(props: P, context: IFormContext, leadingDebounce?: boolean) {
    super(props, context);
    this.formContext = context;
    this.debouncedSubmitValue = this._async.debounce(
      this.formContext.submitValue,
      (
        (this.props.debounceInterval !== null && this.props.debounceInterval !== undefined) ?
          this.props.debounceInterval : DEFAULT_DEBOUNCE
      ),
      {
        leading: (leadingDebounce === null || leadingDebounce === undefined ? true : leadingDebounce)
      });
    this._validateProps(props);
  }

  /**
   * React Lifecycle Method - Because this method uses state when rendering, the state must be
   * updated when the prop's value updates
   * @param nextProps The props that the component is receiving
   */
  public componentWillReceiveProps(nextProps: P): void {
    this._validateProps(nextProps);
    if (nextProps.value !== this.props.value && this.props.value === this.state.currentValue) {
      // If the props have changed and the previous props are equal to the current value, then we want to update the internal state value
      this.setState((prevState: S) => {
        prevState.currentValue = nextProps.value;
        return prevState;
      });
    }
  }

  public componentWillMount(): void {
    this.formContext.mountInput(this);
  }

  public componentWillUnmount(): void {
    this.debouncedSubmitValue.flush();
    this.formContext.unmountInput(this);
  }

  /**
   * Validate the input. By default, this function will run through all the validators and ensure they pass
   */
  public doValidate(): IFormValidationResult {
    const {
      validators = []
    } = this.props;

    const validationResult: IFormValidationResult = {
      isValid: true,
      component: this
    };

    for (const validator of (validators as any)) {
      const error: string = validator(this.state.currentValue);
      if (error) {
        validationResult.isValid = false;
        validationResult.errorMessage = error;
        return validationResult;
      }
    }

    return validationResult;
  }

  /**
   * Set the error state of this input
   */
  public setError(errorMessage?: string): void {
    this.setState((prevState: S) => {
      prevState.isValid = false;
      prevState.currentError = errorMessage;
      return prevState;
    });
  }

  /**
   * Clear any errors from this input
   */
  public clearError(): void {
    this.setState((prevState: S) => {
      prevState.isValid = true;
      prevState.currentError = undefined;
      return prevState;
    });
  }

  /**
   * Set the current value of this input and validate it
   */
  protected setValue(value: T): void {
    this.setState(
      (prevState: S): S => {
        prevState.currentValue = value;
        return prevState;
      },
      () => {
        this.debouncedSubmitValue(this);
      }
    );
  }

  /**
   * Validate incoming props
   * @param props Props to validate
   */
  private _validateProps(props: P): void {
    if (!props.inputKey) {
      throw new Error('FormBaseInput: name must defined on all form inputs');
    }
  }
}