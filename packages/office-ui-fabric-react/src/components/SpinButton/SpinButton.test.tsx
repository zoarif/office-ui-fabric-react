import { Promise } from 'es6-promise';
import * as React from 'react';
import * as ReactDOM from 'react-dom';
import * as ReactTestUtils from 'react-dom/test-utils';
import * as renderer from 'react-test-renderer';
import { SpinButton } from './SpinButton';
import { KeyCodes } from '../../Utilities';

describe('SpinButton', () => {
  function renderIntoDocument(element: React.ReactElement<any>): HTMLElement {
    const component = ReactTestUtils.renderIntoDocument(element);
    const renderedDOM: Element = ReactDOM.findDOMNode(component as React.ReactInstance) as Element;
    return renderedDOM as HTMLElement;
  }

  function mockEvent(targetValue: string = ''): ReactTestUtils.SyntheticEventData {
    const target: EventTarget = { value: targetValue } as HTMLInputElement;
    const event: ReactTestUtils.SyntheticEventData = { target };
    return event;
  }

  it('renders SpinButton correctly', () => {
    const component = renderer.create(<SpinButton label='label' />);
    const tree = component.toJSON();
    expect(tree).toMatchSnapshot();
  });

  it('should render a spinner with the default value on the input element', () => {
    const exampleLabelValue = 'SpinButton';
    const exampleMinValue = 2;
    const exampleMaxValue = 22;
    const exampleDefaultValue = '12';

    const renderedDOM: HTMLElement = renderIntoDocument(
      <SpinButton
        label={ exampleLabelValue }
        min={ exampleMinValue }
        max={ exampleMaxValue }
        defaultValue={ exampleDefaultValue }
      />
    );

    // Assert on the input element.
    const inputDOM: HTMLInputElement = renderedDOM.getElementsByTagName('input')[0];
    const labelDOM: HTMLLabelElement = renderedDOM.getElementsByTagName('label')[0];

    expect(inputDOM.value).toEqual(exampleDefaultValue);
    expect(inputDOM.getAttribute('aria-valuemin')).toEqual(String(exampleMinValue));
    expect(inputDOM.getAttribute('aria-valuemax')).toEqual(String(exampleMaxValue));
    expect(inputDOM.getAttribute('aria-valuenow')).toEqual(String(exampleDefaultValue));
    expect(inputDOM.getAttribute('aria-labelledby')).toEqual(labelDOM.id);

    // Assert on the label element.
    expect(labelDOM.textContent).toEqual(exampleLabelValue);
    expect(labelDOM.htmlFor).toEqual(inputDOM.id);
  });

  it('should increment the value in the spin button via the up button', () => {
    const exampleLabelValue = 'SpinButton';
    const exampleMinValue = 2;
    const exampleMaxValue = 22;
    const exampleDefaultValue = '12';

    const renderedDOM: HTMLElement = renderIntoDocument(
      <SpinButton
        label={ exampleLabelValue }
        min={ exampleMinValue }
        max={ exampleMaxValue }
        defaultValue={ exampleDefaultValue }
      />
    );

    // Assert on the input element.
    const inputDOM: HTMLInputElement = renderedDOM.getElementsByTagName('input')[0];
    const buttonDOM: Element = renderedDOM.getElementsByClassName('ms-UpButton')[0];

    expect(buttonDOM.tagName).toEqual('BUTTON');

    ReactTestUtils.Simulate.mouseDown(buttonDOM,
      {
        type: 'mousedown',
        clientX: 0,
        clientY: 0
      });

    ReactTestUtils.Simulate.mouseUp(buttonDOM,
      {
        type: 'mouseup',
        clientX: 0,
        clientY: 0
      });

    expect(inputDOM.value).toEqual('13');
    expect(inputDOM.getAttribute('aria-valuemin')).toEqual(String(exampleMinValue));
    expect(inputDOM.getAttribute('aria-valuemax')).toEqual(String(exampleMaxValue));
    expect(inputDOM.getAttribute('aria-valuenow')).toEqual('13');

  });

  it('should decrement the value in the spin button by the down button', () => {
    const exampleLabelValue = 'SpinButton';
    const exampleMinValue = 2;
    const exampleMaxValue = 22;
    const exampleDefaultValue = '12';

    const renderedDOM: HTMLElement = renderIntoDocument(
      <SpinButton
        label={ exampleLabelValue }
        min={ exampleMinValue }
        max={ exampleMaxValue }
        defaultValue={ exampleDefaultValue }
      />
    );

    // Assert on the input element.
    const inputDOM: HTMLInputElement = renderedDOM.getElementsByTagName('input')[0];
    const buttonDOM: Element = renderedDOM.getElementsByClassName('ms-DownButton')[0];

    expect(buttonDOM.tagName).toEqual('BUTTON');

    ReactTestUtils.Simulate.mouseDown(buttonDOM,
      {
        type: 'mousedown',
        clientX: 0,
        clientY: 0
      });

    ReactTestUtils.Simulate.mouseUp(buttonDOM,
      {
        type: 'mouseup',
        clientX: 0,
        clientY: 0
      });

    expect(inputDOM.value).toEqual('11');
    expect(inputDOM.getAttribute('aria-valuemin')).toEqual(String(exampleMinValue));
    expect(inputDOM.getAttribute('aria-valuemax')).toEqual(String(exampleMaxValue));
    expect(inputDOM.getAttribute('aria-valuenow')).toEqual('11');

  });

  it('should increment the value in the spin button by the up arrow', () => {
    const exampleLabelValue = 'SpinButton';
    const exampleMinValue = 2;
    const exampleMaxValue = 22;
    const exampleDefaultValue = '12';

    const renderedDOM: HTMLElement = renderIntoDocument(
      <SpinButton
        label={ exampleLabelValue }
        min={ exampleMinValue }
        max={ exampleMaxValue }
        defaultValue={ exampleDefaultValue }
      />
    );

    // Assert on the input element.
    const inputDOM: HTMLInputElement = renderedDOM.getElementsByTagName('input')[0];

    ReactTestUtils.Simulate.keyDown(inputDOM,
      {
        which: KeyCodes.up
      });

    ReactTestUtils.Simulate.keyUp(inputDOM,
      {
        which: KeyCodes.up
      });

    expect(inputDOM.value).toEqual('13');
    expect(inputDOM.getAttribute('aria-valuemin')).toEqual(String(exampleMinValue));
    expect(inputDOM.getAttribute('aria-valuemax')).toEqual(String(exampleMaxValue));
    expect(inputDOM.getAttribute('aria-valuenow')).toEqual('13');

  });

  it('should decrement the value in the spin button by the down arrow', () => {
    const exampleLabelValue = 'SpinButton';
    const exampleMinValue = 2;
    const exampleMaxValue = 22;
    const exampleDefaultValue = '12';

    const renderedDOM: HTMLElement = renderIntoDocument(
      <SpinButton
        label={ exampleLabelValue }
        min={ exampleMinValue }
        max={ exampleMaxValue }
        defaultValue={ exampleDefaultValue }
      />
    );

    // Assert on the input element.
    const inputDOM: HTMLInputElement = renderedDOM.getElementsByTagName('input')[0];

    ReactTestUtils.Simulate.keyDown(inputDOM,
      {
        which: KeyCodes.down
      });

    ReactTestUtils.Simulate.keyUp(inputDOM,
      {
        which: KeyCodes.down
      });

    expect(inputDOM.value).toEqual('11');
    expect(inputDOM.getAttribute('aria-valuemin')).toEqual(String(exampleMinValue));
    expect(inputDOM.getAttribute('aria-valuemax')).toEqual(String(exampleMaxValue));
    expect(inputDOM.getAttribute('aria-valuenow')).toEqual('11');

  });

  it('should increment the value in the spin button by a step value of 2', () => {
    const exampleLabelValue = 'SpinButton';
    const exampleMinValue = 2;
    const exampleMaxValue = 22;
    const exampleDefaultValue = '12';

    const renderedDOM: HTMLElement = renderIntoDocument(
      <SpinButton
        label={ exampleLabelValue }
        min={ exampleMinValue }
        max={ exampleMaxValue }
        defaultValue={ exampleDefaultValue }
        step={ 2 }
      />
    );

    // Assert on the input element.
    const inputDOM: HTMLInputElement = renderedDOM.getElementsByTagName('input')[0];

    ReactTestUtils.Simulate.keyDown(inputDOM,
      {
        which: KeyCodes.up
      });

    ReactTestUtils.Simulate.keyUp(inputDOM,
      {
        which: KeyCodes.up
      });

    expect(inputDOM.value).toEqual('14');
    expect(inputDOM.getAttribute('aria-valuemin')).toEqual(String(exampleMinValue));
    expect(inputDOM.getAttribute('aria-valuemax')).toEqual(String(exampleMaxValue));
    expect(inputDOM.getAttribute('aria-valuenow')).toEqual('14');

  });

  it('should decrement the value in the spin button by a step value of 2', () => {
    const exampleLabelValue = 'SpinButton';
    const exampleMinValue = 2;
    const exampleMaxValue = 22;
    const exampleDefaultValue = '12';

    const renderedDOM: HTMLElement = renderIntoDocument(
      <SpinButton
        label={ exampleLabelValue }
        min={ exampleMinValue }
        max={ exampleMaxValue }
        defaultValue={ exampleDefaultValue }
        step={ 2 }
      />
    );

    // Assert on the input element.
    const inputDOM: HTMLInputElement = renderedDOM.getElementsByTagName('input')[0];

    ReactTestUtils.Simulate.keyDown(inputDOM,
      {
        which: KeyCodes.down
      });

    ReactTestUtils.Simulate.keyUp(inputDOM,
      {
        which: KeyCodes.down
      });

    expect(inputDOM.value).toEqual('10');
    expect(inputDOM.getAttribute('aria-valuemin')).toEqual(String(exampleMinValue));
    expect(inputDOM.getAttribute('aria-valuemax')).toEqual(String(exampleMaxValue));
    expect(inputDOM.getAttribute('aria-valuenow')).toEqual('10');

  });

  it('should set the value of the spin button by manual entry', () => {
    const exampleLabelValue = 'SpinButton';
    const exampleMinValue = 2;
    const exampleMaxValue = 22;
    const exampleDefaultValue = '12';
    const exampleNewValue = '21';

    const renderedDOM: HTMLElement = renderIntoDocument(
      <SpinButton
        label={ exampleLabelValue }
        min={ exampleMinValue }
        max={ exampleMaxValue }
        defaultValue={ exampleDefaultValue }
      />
    );

    // Assert on the input element.
    const inputDOM: HTMLInputElement = renderedDOM.getElementsByTagName('input')[0];
    ReactTestUtils.Simulate.input(inputDOM, mockEvent(exampleNewValue));
    ReactTestUtils.Simulate.blur(inputDOM);

    expect(inputDOM.value).toEqual(exampleNewValue);
    expect(inputDOM.getAttribute('aria-valuemin')).toEqual(String(exampleMinValue));
    expect(inputDOM.getAttribute('aria-valuemax')).toEqual(String(exampleMaxValue));
    expect(inputDOM.getAttribute('aria-valuenow')).toEqual(String(exampleNewValue));
  });

  it('should reset the value of the spin button with invalid manual entry', () => {
    const exampleLabelValue = 'SpinButton';
    const exampleMinValue = 2;
    const exampleMaxValue = 22;
    const exampleDefaultValue = '12';
    const exampleNewValue = 'garbage';

    const renderedDOM: HTMLElement = renderIntoDocument(
      <SpinButton
        label={ exampleLabelValue }
        min={ exampleMinValue }
        max={ exampleMaxValue }
        defaultValue={ exampleDefaultValue }
      />
    );

    // Assert on the input element.
    const inputDOM: HTMLInputElement = renderedDOM.getElementsByTagName('input')[0];
    ReactTestUtils.Simulate.input(inputDOM, mockEvent(exampleNewValue));
    ReactTestUtils.Simulate.blur(inputDOM);

    expect(inputDOM.value).toEqual(exampleDefaultValue);
    expect(inputDOM.getAttribute('aria-valuemin')).toEqual(String(exampleMinValue));
    expect(inputDOM.getAttribute('aria-valuemax')).toEqual(String(exampleMaxValue));
    expect(inputDOM.getAttribute('aria-valuenow')).toEqual(String(exampleDefaultValue));
  });

  it('should revert to max value when input value is higher than the max of the spin button', () => {
    const exampleLabelValue = 'SpinButton';
    const exampleMinValue = 2;
    const exampleMaxValue = 22;
    const exampleDefaultValue = '12';
    const exampleNewValue = '23';

    const renderedDOM: HTMLElement = renderIntoDocument(
      <SpinButton
        label={ exampleLabelValue }
        min={ exampleMinValue }
        max={ exampleMaxValue }
        defaultValue={ exampleDefaultValue }
      />
    );

    // Assert on the input element.
    const inputDOM: HTMLInputElement = renderedDOM.getElementsByTagName('input')[0];
    ReactTestUtils.Simulate.input(inputDOM, mockEvent(exampleNewValue));
    ReactTestUtils.Simulate.blur(inputDOM);

    expect(inputDOM.value).toEqual(String(exampleMaxValue));
    expect(inputDOM.getAttribute('aria-valuemin')).toEqual(String(exampleMinValue));
    expect(inputDOM.getAttribute('aria-valuemax')).toEqual(String(exampleMaxValue));
    expect(inputDOM.getAttribute('aria-valuenow')).toEqual(String(exampleMaxValue));
  });

  it('should revert existing value when input value is lower than the min of the spin button', () => {
    const exampleLabelValue = 'SpinButton';
    const exampleMinValue = 2;
    const exampleMaxValue = 22;
    const exampleDefaultValue = '12';
    const exampleNewValue = '0';

    const renderedDOM: HTMLElement = renderIntoDocument(
      <SpinButton
        label={ exampleLabelValue }
        min={ exampleMinValue }
        max={ exampleMaxValue }
        defaultValue={ exampleDefaultValue }
      />
    );

    // Assert on the input element.
    const inputDOM: HTMLInputElement = renderedDOM.getElementsByTagName('input')[0];
    ReactTestUtils.Simulate.input(inputDOM, mockEvent(String(exampleNewValue)));
    ReactTestUtils.Simulate.blur(inputDOM);

    expect(inputDOM.value).toEqual(String(exampleMinValue));
    expect(inputDOM.getAttribute('aria-valuemin')).toEqual(String(exampleMinValue));
    expect(inputDOM.getAttribute('aria-valuemax')).toEqual(String(exampleMaxValue));
    expect(inputDOM.getAttribute('aria-valuenow')).toEqual(String(exampleMinValue));
  });

  it('should use validator passed to the spin button (with valid input)', () => {
    const errorMessage = 'The value is invalid';
    const exampleLabelValue = 'SpinButton';
    const exampleMinValue = 2;
    const exampleMaxValue = 22;
    const exampleDefaultValue = '12';
    const exampleNewValue = '21';

    const renderedDOM: HTMLElement = renderIntoDocument(
      <SpinButton
        label={ exampleLabelValue }
        min={ exampleMinValue }
        max={ exampleMaxValue }
        defaultValue={ exampleDefaultValue }
        // tslint:disable-next-line:jsx-no-lambda
        onValidate={ (newValue: string): string => {
          const numberValue: number = +newValue;
          return (!isNaN(numberValue) && numberValue >= exampleMinValue && numberValue <= exampleMaxValue) ? newValue : errorMessage;
        } }
      />
    );

    // Assert on the input element.
    const inputDOM: HTMLInputElement = renderedDOM.getElementsByTagName('input')[0];
    ReactTestUtils.Simulate.input(inputDOM, mockEvent(String(exampleNewValue)));
    ReactTestUtils.Simulate.blur(inputDOM);

    expect(inputDOM.value).toEqual(String(exampleNewValue));
    expect(inputDOM.getAttribute('aria-valuemin')).toEqual(String(exampleMinValue));
    expect(inputDOM.getAttribute('aria-valuemax')).toEqual(String(exampleMaxValue));
    expect(inputDOM.getAttribute('aria-valuenow')).toEqual(String(exampleNewValue));
  });

  it('should use validator passed to the spin button', () => {
    const errorMessage = 'The value is invalid';
    const exampleLabelValue = 'SpinButton';
    const exampleMinValue = 2;
    const exampleMaxValue = 22;
    const exampleDefaultValue = '12';
    const exampleNewValue = '100';

    const renderedDOM: HTMLElement = renderIntoDocument(
      <SpinButton
        label={ exampleLabelValue }
        min={ exampleMinValue }
        max={ exampleMaxValue }
        value={ exampleDefaultValue }
        // tslint:disable-next-line:jsx-no-lambda
        onValidate={ (newValue: string): string => {
          const numberValue: number = Number(newValue);
          return (!isNaN(numberValue) && numberValue >= exampleMinValue && numberValue <= exampleMaxValue) ? newValue : errorMessage;
        } }
      />
    );

    // Assert on the input element.
    const inputDOM: HTMLInputElement = renderedDOM.getElementsByTagName('input')[0];
    ReactTestUtils.Simulate.input(inputDOM, mockEvent(String(exampleNewValue)));
    ReactTestUtils.Simulate.blur(inputDOM);

    expect(inputDOM.value).toEqual(String(errorMessage));
    expect(inputDOM.getAttribute('aria-valuemin')).toEqual(String(exampleMinValue));
    expect(inputDOM.getAttribute('aria-valuemax')).toEqual(String(exampleMaxValue));
    expect(inputDOM.getAttribute('aria-valuenow')).toBeFalsy();
    expect(inputDOM.getAttribute('aria-valuetext')).toEqual(errorMessage);
  });

  it('should have correct value after increment and using defaultValue', () => {
    const exampleLabelValue = 'SpinButton';
    const exampleMinValue = 2;
    const exampleMaxValue = 22;
    const exampleDefaultValue = '12';
    const exampleStepValue = 2;
    const exampleNewValue: string = String(Number(exampleDefaultValue) + exampleStepValue);

    const renderedDOM: HTMLElement = renderIntoDocument(
      <SpinButton
        label={ exampleLabelValue }
        min={ exampleMinValue }
        max={ exampleMaxValue }
        defaultValue={ exampleDefaultValue }
        step={ exampleStepValue }
      />
    );

    // Assert on the input element.
    const inputDOM: HTMLInputElement = renderedDOM.getElementsByTagName('input')[0];
    const upButtonDOM: HTMLButtonElement = renderedDOM.getElementsByClassName('ms-UpButton')[0] as HTMLButtonElement;
    ReactTestUtils.Simulate.mouseDown(upButtonDOM);
    ReactTestUtils.Simulate.mouseUp(upButtonDOM);

    expect(inputDOM.value).toEqual(String(exampleNewValue));
    expect(inputDOM.getAttribute('aria-valuemin')).toEqual(String(exampleMinValue));
    expect(inputDOM.getAttribute('aria-valuemax')).toEqual(String(exampleMaxValue));
    expect(inputDOM.getAttribute('aria-valuenow')).toEqual(String(exampleNewValue));
  });

  it('should have correct value after decrement and using defaultValue', () => {
    const exampleLabelValue = 'SpinButton';
    const exampleMinValue = 2;
    const exampleMaxValue = 22;
    const exampleDefaultValue = '12';
    const exampleStepValue = 2;
    const exampleNewValue: string = String(Number(exampleDefaultValue) - exampleStepValue);

    const renderedDOM: HTMLElement = renderIntoDocument(
      <SpinButton
        label={ exampleLabelValue }
        min={ exampleMinValue }
        max={ exampleMaxValue }
        defaultValue={ exampleDefaultValue }
        step={ exampleStepValue }
      />
    );

    // Assert on the input element.
    const inputDOM: HTMLInputElement = renderedDOM.getElementsByTagName('input')[0];
    const downButtonDOM: HTMLButtonElement = renderedDOM.getElementsByClassName('ms-DownButton')[0] as HTMLButtonElement;
    ReactTestUtils.Simulate.mouseDown(downButtonDOM);
    ReactTestUtils.Simulate.mouseUp(downButtonDOM);

    expect(inputDOM.value).toEqual(String(exampleNewValue));
    expect(inputDOM.getAttribute('aria-valuemin')).toEqual(String(exampleMinValue));
    expect(inputDOM.getAttribute('aria-valuemax')).toEqual(String(exampleMaxValue));
    expect(inputDOM.getAttribute('aria-valuenow')).toEqual(String(exampleNewValue));
  });

  it('should use min as defaultvalue if neither value nor defaultValue are passed', () => {
    const exampleLabelValue = 'SpinButton';
    const exampleMinValue = 2;
    const exampleMaxValue = 22;
    const exampleStepValue = 2;

    const renderedDOM: HTMLElement = renderIntoDocument(
      <SpinButton
        label={ exampleLabelValue }
        min={ exampleMinValue }
        max={ exampleMaxValue }
        step={ exampleStepValue }
      />
    );

    // Assert on the input element.
    const inputDOM: HTMLInputElement = renderedDOM.getElementsByTagName('input')[0];

    expect(inputDOM.value).toEqual(String(exampleMinValue));
    expect(inputDOM.getAttribute('aria-valuemin')).toEqual(String(exampleMinValue));
    expect(inputDOM.getAttribute('aria-valuemax')).toEqual(String(exampleMaxValue));
    expect(inputDOM.getAttribute('aria-valuenow')).toEqual(String(exampleMinValue));
  });

  it('should use 0 as defaultvalue if neither value, defaultValue nor min are passed', () => {
    const exampleLabelValue = 'SpinButton';

    const renderedDOM: HTMLElement = renderIntoDocument(
      <SpinButton
        label={ exampleLabelValue }
      />
    );

    // Assert on the input element.
    const inputDOM: HTMLInputElement = renderedDOM.getElementsByTagName('input')[0];

    expect(inputDOM.value).toEqual(String(0));
    expect(inputDOM.getAttribute('aria-valuenow')).toEqual(String(0));
  });

  it('should use the default onIncrement function when no value, defaultValue nor onIncrement function is passed', () => {
    const exampleLabelValue = 'SpinButton';

    const renderedDOM: HTMLElement = renderIntoDocument(
      <SpinButton
        label={ exampleLabelValue }
      />
    );

    // Assert on the input element.
    const inputDOM: HTMLInputElement = renderedDOM.getElementsByTagName('input')[0];
    const upButtonDOM: HTMLButtonElement = renderedDOM.getElementsByClassName('ms-UpButton')[0] as HTMLButtonElement;
    ReactTestUtils.Simulate.mouseDown(upButtonDOM);
    ReactTestUtils.Simulate.mouseUp(upButtonDOM);

    expect(inputDOM.value).toEqual(String(1));
    expect(inputDOM.getAttribute('aria-valuenow')).toEqual(String(1));
  });

  it('should stop spinning if text field is focused while actively spinning', () => {
    const exampleLabelValue = 'SpinButton';
    const exampleMinValue = 2;
    const exampleMaxValue = 22;
    const exampleDefaultValue = '12';

    function delay(millisecond: number): Promise<string> {
      return new Promise<string>((resolve) => setTimeout(resolve, millisecond));
    }

    const renderedDOM: HTMLElement = renderIntoDocument(
      <SpinButton
        label={ exampleLabelValue }
        min={ exampleMinValue }
        max={ exampleMaxValue }
        defaultValue={ exampleDefaultValue }
      />
    );

    // Assert on the input element.
    const inputDOM: HTMLInputElement = renderedDOM.getElementsByTagName('input')[0];
    const buttonDOM: Element = renderedDOM.getElementsByClassName('ms-UpButton')[0];

    expect(buttonDOM.tagName).toEqual('BUTTON');

    ReactTestUtils.Simulate.mouseDown(buttonDOM,
      {
        type: 'mousedown',
        clientX: 0,
        clientY: 0
      });

    delay(500).then(() => ReactTestUtils.Simulate.focus(inputDOM));

    const currentValue = inputDOM.value;
    expect(currentValue).not.toEqual('2');
    expect(inputDOM.getAttribute('aria-valuemin')).toEqual(String(exampleMinValue));
    expect(inputDOM.getAttribute('aria-valuemax')).toEqual(String(exampleMaxValue));
    expect(inputDOM.getAttribute('aria-valuenow')).toEqual(currentValue);

    const newCurrentValue = inputDOM.value;
    expect(currentValue).toEqual(newCurrentValue);
  });

  it('should fire custom handlers even when value prop is 0', () => {
    const val: string = 0 as any;
    const onIncrement: jest.Mock = jest.fn();

    const renderedDOM: HTMLElement = renderIntoDocument(
      <SpinButton
        label='label'
        value={ val }
        onIncrement={ onIncrement }
      />
    );

    const buttonDOM: Element = renderedDOM.getElementsByClassName('ms-UpButton')[0];

    ReactTestUtils.Simulate.mouseDown(buttonDOM,
      {
        type: 'mousedown',
        clientX: 0,
        clientY: 0
      }
    );

    expect(onIncrement).toBeCalled();
  });
});
