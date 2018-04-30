import { Promise } from 'es6-promise';
import * as React from 'react';
import * as ReactDOM from 'react-dom';
import * as ReactTestUtils from 'react-dom/test-utils';
import * as renderer from 'react-test-renderer';

import { TextField } from './TextField';

describe('TextField', () => {
  function renderIntoDocument(element: React.ReactElement<any>): HTMLElement {
    const component = ReactTestUtils.renderIntoDocument(element);
    const renderedDOM = ReactDOM.findDOMNode(component as React.ReactInstance);
    return renderedDOM as HTMLElement;
  }

  function mockEvent(targetValue: string = ''): ReactTestUtils.SyntheticEventData {
    const target: EventTarget = { value: targetValue } as HTMLInputElement;
    const event: ReactTestUtils.SyntheticEventData = { target };

    return event;
  }

  function delay(millisecond: number): Promise<void> {
    return new Promise<void>((resolve) => setTimeout(resolve, millisecond));
  }

  it('renders TextField correctly', () => {
    const component = renderer.create(<TextField label='Label' />);
    const tree = component.toJSON();
    expect(tree).toMatchSnapshot();
  });

  it('should render label and value to input element', () => {
    const exampleLabel = 'this is label';
    const exampleValue = 'this is value';

    const renderedDOM: HTMLElement = renderIntoDocument(
      <TextField
        label={ exampleLabel }
        value={ exampleValue }
      />
    );

    // Assert on the input element.
    const inputDOM: HTMLInputElement = renderedDOM.getElementsByTagName('input')[0];
    expect(inputDOM.value).toEqual(exampleValue);

    // Assert on the label element.
    const labelDOM: HTMLLabelElement = renderedDOM.getElementsByTagName('label')[0];
    expect(labelDOM.textContent).toEqual(exampleLabel);
  });

  it('should render prefix in input element', () => {
    const examplePrefix = 'this is a prefix';

    const renderedDOM: HTMLElement = renderIntoDocument(
      <TextField
        prefix={ examplePrefix }
      />
    );

    // Assert on the prefix
    const prefixDOM: Element = renderedDOM.getElementsByClassName('ms-TextField-prefix')[0];
    expect(prefixDOM.textContent).toEqual(examplePrefix);
  });

  it('should render suffix in input element', () => {
    const exampleSuffix = 'this is a suffix';

    const renderedDOM: HTMLElement = renderIntoDocument(
      <TextField
        suffix={ exampleSuffix }
      />
    );

    // Assert on the suffix
    const suffixDOM: Element = renderedDOM.getElementsByClassName('ms-TextField-suffix')[0];
    expect(suffixDOM.textContent).toEqual(exampleSuffix);
  });

  it('should render both prefix and suffix in input element', () => {
    const examplePrefix = 'this is a prefix';
    const exampleSuffix = 'this is a suffix';

    const renderedDOM: HTMLElement = renderIntoDocument(
      <TextField
        prefix={ examplePrefix }
        suffix={ exampleSuffix }
      />
    );

    // Assert on the prefix and suffix
    const prefixDOM: Element = renderedDOM.getElementsByClassName('ms-TextField-prefix')[0];
    const suffixDOM: Element = renderedDOM.getElementsByClassName('ms-TextField-suffix')[0];
    expect(prefixDOM.textContent).toEqual(examplePrefix);
    expect(suffixDOM.textContent).toEqual(exampleSuffix);
  });

  it('should render multiline as text area element', () => {
    const renderedDOM: HTMLElement = renderIntoDocument(
      <TextField value='This\nIs\nMultiline\nText\n' multiline />
    );

    // Assert on the input element.
    const inputDOM: HTMLTextAreaElement = renderedDOM.getElementsByTagName('textarea')[0];
    expect(inputDOM.value).toBeDefined();
  });

  it('should associate the label and input box', () => {
    const renderedDOM: HTMLElement = renderIntoDocument(
      <TextField
        label='text-field-label'
        value='whatever value'
      />
    );

    const inputDOM: HTMLInputElement = renderedDOM.getElementsByTagName('input')[0];
    const labelDOM: HTMLLabelElement = renderedDOM.getElementsByTagName('label')[0];

    // Assert the input ID and label FOR attribute are the same.
    expect(inputDOM.id).toBeDefined();
    expect(inputDOM.id).toEqual(labelDOM.htmlFor);
  });

  it('should render a disabled input element', () => {
    const renderedDOM: HTMLElement = renderIntoDocument(
      <TextField disabled={ true } />
    );

    // Assert the input box is disabled.
    const inputDOM: HTMLInputElement = renderedDOM.getElementsByTagName('input')[0];
    expect(inputDOM.disabled).toEqual(true);
  });

  describe('error message', () => {
    const errorMessage = 'The string is too long, should not exceed 3 characters.';

    function assertErrorMessage(renderedDOM: HTMLElement, expectedErrorMessage: string | boolean): void {
      const errorMessageDOM: HTMLElement =
        renderedDOM.querySelector('[data-automation-id=error-message]') as HTMLElement;

      if (expectedErrorMessage === false) {
        expect(errorMessageDOM).toBeNull(); // element not exists
      } else {
        expect(errorMessageDOM.textContent).toEqual(expectedErrorMessage);
      }
    }

    it('should render error message when onGetErrorMessage returns a string', () => {
      function validator(value: string): string {
        return value.length > 3 ? errorMessage : '';
      }

      const renderedDOM: HTMLElement = renderIntoDocument(
        <TextField
          label='text-field-label'
          value='whatever value'
          onGetErrorMessage={ validator }
        />
      );

      const inputDOM: HTMLInputElement = renderedDOM.getElementsByTagName('input')[0];
      ReactTestUtils.Simulate.change(inputDOM, mockEvent('the input value'));

      // The value is delayed to validate, so it must to query error message after a while.
      return delay(250).then(() => assertErrorMessage(renderedDOM, errorMessage));
    });

    it('should render error message when onGetErrorMessage returns a Promise<string>', () => {
      function validator(value: string): Promise<string> {
        return Promise.resolve(value.length > 3 ? errorMessage : '');
      }

      const renderedDOM: HTMLElement = renderIntoDocument(
        <TextField
          label='text-field-label'
          value='whatever value'
          onGetErrorMessage={ validator }
        />
      );

      const inputDOM: HTMLInputElement = renderedDOM.getElementsByTagName('input')[0];
      ReactTestUtils.Simulate.change(inputDOM, mockEvent('the input value'));

      // The value is delayed to validate, so it must to query error message after a while.
      return delay(250).then(() => assertErrorMessage(renderedDOM, errorMessage));
    });

    it('should render error message on first render when onGetErrorMessage returns a string', () => {
      const renderedDOM: HTMLElement = renderIntoDocument(
        <TextField
          label='text-field-label'
          value='whatever value'
          // tslint:disable-next-line:jsx-no-lambda
          onGetErrorMessage={ () => errorMessage }
        />
      );

      return delay(20).then(() => assertErrorMessage(renderedDOM, errorMessage));
    });

    it('should render error message on first render when onGetErrorMessage returns a Promise<string>', () => {
      const renderedDOM: HTMLElement = renderIntoDocument(
        <TextField
          label='text-field-label'
          value='whatever value'
          // tslint:disable-next-line:jsx-no-lambda
          onGetErrorMessage={ () => Promise.resolve(errorMessage) }
        />
      );

      // The Promise based validation need to assert with async pattern.
      return delay(20).then(() => assertErrorMessage(renderedDOM, errorMessage));
    });

    it('should not render error message when onGetErrorMessage return an empty string', () => {
      const renderedDOM: HTMLElement = renderIntoDocument(
        <TextField
          label='text-field-label'
          value='whatever value'
          // tslint:disable-next-line:jsx-no-lambda
          onGetErrorMessage={ () => '' }
        />
      );

      delay(20).then(() => assertErrorMessage(renderedDOM, /* exist */ false));
    });

    it('should not render error message when no value is provided', () => {
      let actualValue: string | undefined = undefined;

      const renderedDOM: HTMLElement = renderIntoDocument(
        <TextField
          label='text-field-label'
          // tslint:disable-next-line:jsx-no-lambda
          onGetErrorMessage={ (value: string) => actualValue = value }
        />
      );

      delay(20).then(() => assertErrorMessage(renderedDOM,  /* exist */ false));
      expect(actualValue).toEqual('');
    });

    it('should update error message when receive new value from props', () => {
      function validator(value: string): string {
        return value.length > 3 ? errorMessage : '';
      }

      const renderedDOM: HTMLElement = renderIntoDocument(
        <TextField
          value='initial value'
          onGetErrorMessage={ validator }
        />
      );

      delay(20).then(() => assertErrorMessage(renderedDOM, errorMessage));

      ReactDOM.render(
        <TextField
          value=''
          onGetErrorMessage={ validator }
        />,
        renderedDOM.parentElement
      );

      return delay(250).then(() => assertErrorMessage(renderedDOM, /* exist */ false));
    });

    it('should trigger validation only on focus', () => {
      let validationCallCount = 0;
      const validatorSpy = (value: string) => {
        validationCallCount++;
        return value.length > 3 ? errorMessage : '';
      };

      const renderedDOM: HTMLElement = renderIntoDocument(
        <TextField
          value='initial value'
          onGetErrorMessage={ validatorSpy }
          validateOnFocusIn
        />
      );

      const inputDOM: HTMLInputElement = renderedDOM.getElementsByTagName('input')[0];
      ReactTestUtils.Simulate.input(inputDOM, mockEvent('the input value'));
      expect(validationCallCount).toEqual(1);

      ReactTestUtils.Simulate.focus(inputDOM);
      expect(validationCallCount).toEqual(2);

      ReactTestUtils.Simulate.input(inputDOM, mockEvent('the input '));
      ReactTestUtils.Simulate.input(inputDOM, mockEvent('the input value'));
      ReactTestUtils.Simulate.focus(inputDOM);
      expect(validationCallCount).toEqual(3);
    });

    it('should trigger validation only on blur', () => {
      let validationCallCount = 0;
      const validatorSpy = (value: string) => {
        validationCallCount++;
        return value.length > 3 ? errorMessage : '';
      };

      const renderedDOM: HTMLElement = renderIntoDocument(
        <TextField
          value='initial value'
          onGetErrorMessage={ validatorSpy }
          validateOnFocusOut
        />
      );

      const inputDOM: HTMLInputElement = renderedDOM.getElementsByTagName('input')[0];
      ReactTestUtils.Simulate.input(inputDOM, mockEvent('the input value'));
      expect(validationCallCount).toEqual(1);

      ReactTestUtils.Simulate.blur(inputDOM);
      expect(validationCallCount).toEqual(2);

      ReactTestUtils.Simulate.input(inputDOM, mockEvent('the input va'));
      ReactTestUtils.Simulate.input(inputDOM, mockEvent('the input value'));

      ReactTestUtils.Simulate.blur(inputDOM);
      expect(validationCallCount).toEqual(3);
    });

    it('should trigger validation on both blur and focus', () => {
      let validationCallCount = 0;
      const validatorSpy = (value: string) => {
        validationCallCount++;
        return value.length > 3 ? errorMessage : '';
      };

      const renderedDOM: HTMLElement = renderIntoDocument(
        <TextField
          value='initial value'
          onGetErrorMessage={ validatorSpy }
          validateOnFocusOut
          validateOnFocusIn
        />
      );

      const inputDOM: HTMLInputElement = renderedDOM.getElementsByTagName('input')[0];
      ReactTestUtils.Simulate.input(inputDOM, mockEvent('value before focus'));
      expect(validationCallCount).toEqual(1);

      ReactTestUtils.Simulate.focus(inputDOM);
      expect(validationCallCount).toEqual(2);

      ReactTestUtils.Simulate.input(inputDOM, mockEvent('value before foc'));
      ReactTestUtils.Simulate.input(inputDOM, mockEvent('value before focus'));
      ReactTestUtils.Simulate.focus(inputDOM);
      expect(validationCallCount).toEqual(3);

      ReactTestUtils.Simulate.input(inputDOM, mockEvent('value before blur'));
      ReactTestUtils.Simulate.blur(inputDOM);
      expect(validationCallCount).toEqual(4);

      ReactTestUtils.Simulate.input(inputDOM, mockEvent('value before bl'));
      ReactTestUtils.Simulate.input(inputDOM, mockEvent('value before blur'));
      ReactTestUtils.Simulate.blur(inputDOM);
      expect(validationCallCount).toEqual(5);
    });

    it('should not trigger validation on component mount', () => {
      let validationCallCount = 0;
      const validatorSpy = (value: string) => {
        validationCallCount++;
        return '';
      };

      renderIntoDocument(
        <TextField
          value='initial value'
          onGetErrorMessage={ validatorSpy }
          validateOnLoad={ false }
        />
      );
      expect(validationCallCount).toEqual(0);
    });
  });

  it('can render a default value', () => {
    const renderedDOM: HTMLElement = renderIntoDocument(
      <TextField
        defaultValue='initial value'
      />
    );

    expect(renderedDOM.querySelector('input')!.value).toEqual('initial value');
  });

  it('can render a default value as a textarea', () => {
    const renderedDOM: HTMLElement = renderIntoDocument(
      <TextField
        defaultValue='initial value'
        multiline={ true }
      />
    );

    expect(renderedDOM.querySelector('textarea')!.value).toEqual('initial value');
  });

  it('should call onChanged handler for input change', () => {
    let callCount = 0;
    const onChangedSpy = (value: string) => { callCount++; };

    const renderedDOM: HTMLElement = renderIntoDocument(
      <TextField
        defaultValue='initial value'
        onChanged={ onChangedSpy }
        // tslint:disable-next-line:jsx-no-lambda
        onGetErrorMessage={ value => value.length > 0 ? '' : 'error' }
      />
    );

    expect(callCount).toEqual(0);
    const inputDOM: HTMLInputElement = renderedDOM.getElementsByTagName('input')[0];

    ReactTestUtils.Simulate.input(inputDOM, mockEvent('value change'));
    ReactTestUtils.Simulate.change(inputDOM, mockEvent('value change'));
    expect(callCount).toEqual(1);

    ReactTestUtils.Simulate.input(inputDOM, mockEvent(''));
    ReactTestUtils.Simulate.change(inputDOM, mockEvent(''));
    expect(callCount).toEqual(2);
  });

  it('should not call onChanged when initial value is undefined and input change is an empty string', () => {
    let callCount = 0;
    const onChangedSpy = (value: string) => { callCount++; };

    const renderedDOM: HTMLElement = renderIntoDocument(
      <TextField
        onChanged={ onChangedSpy }
      />
    );

    expect(callCount).toEqual(0);
    const inputDOM: HTMLInputElement = renderedDOM.getElementsByTagName('input')[0];

    ReactTestUtils.Simulate.input(inputDOM, mockEvent(''));
    ReactTestUtils.Simulate.change(inputDOM, mockEvent(''));
    expect(callCount).toEqual(0);
  });

  it('should select a range of text', () => {
    let textField: TextField | undefined;
    const initialValue = 'initial value';

    const onSelect = () => {
      const selectedText = window.getSelection().toString();
      expect(selectedText).toEqual(initialValue);
    };

    renderIntoDocument(
      <TextField
        ref={ (t) => textField = t! }
        defaultValue={ initialValue }
        onSelect={ onSelect }
      />
    );

    textField!.setSelectionRange(0, initialValue.length);
  });
});
