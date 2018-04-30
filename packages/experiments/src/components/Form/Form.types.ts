/* tslint:disable:no-any */
import * as React from 'react';

export interface IForm {
}

/**
 * The props for Form
 */
export interface IFormProps extends React.AllHTMLAttributes<HTMLFormElement> {
  componentRef?: (component: IForm | null) => void;

  /** The submit handler. Passes back results keyed by the names of the inputs */
  onSubmit?: (results: { [key: string]: any }) => void;

  /** The invalid submit handler. Passes back results when the form is submitted but fails validation */
  onInvalidSubmit?: (results: { [key: string]: any }) => void;

  /** The update handler. Passes back the valid, updated value of form inputs */
  onUpdated?: (key: string, value: any) => void;

  /** Should the form show errors when it is pristine? */
  showErrorsWhenPristine?: boolean;
}