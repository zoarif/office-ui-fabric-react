import * as React from 'react';
import { mount } from 'enzyme';
import * as ReactDOM from 'react-dom';
import * as ReactTestUtils from 'react-dom/test-utils';
import * as renderer from 'react-test-renderer';
import * as sinon from 'sinon';

import { Toggle } from './Toggle';

describe('Toggle', () => {

  it('renders a label', () => {
    const component = ReactTestUtils.renderIntoDocument(
      <Toggle
        label='Label'
      />
    );
    const renderedDOM = ReactDOM.findDOMNode(component as React.ReactInstance) as Element;
    const labelElement = renderedDOM.querySelector('.ms-Toggle-label') as Element;

    expect(labelElement.textContent).toEqual('Label');
  });

  it('renders toggle correctly', () => {
    const component = renderer.create(
      <Toggle
        label='Label'
      />
    );
    const tree = component.toJSON();
    expect(tree).toMatchSnapshot();
  });

  it('renders aria-label', () => {
    const component = ReactTestUtils.renderIntoDocument(
      <Toggle
        label='Label'
        offAriaLabel='offLabel'
      />
    );
    const renderedDOM = ReactDOM.findDOMNode(component as React.ReactInstance) as Element;
    const labelElement = renderedDOM.querySelector('button') as Element;

    expect(labelElement.getAttribute('aria-label')).toEqual('offLabel');
  });

  it('can call the callback on a change of toggle', () => {
    let isToggledValue;
    const callback = (isToggled: boolean) => {
      isToggledValue = isToggled;
    };
    let component: any;

    ReactTestUtils.renderIntoDocument<React.ReactInstance>(
      <Toggle
        // tslint:disable-next-line:jsx-no-lambda
        componentRef={ ref => component = ref }
        label='Label'
        onChanged={ callback }
      />
    );
    const renderedDOM = ReactDOM.findDOMNode(component as React.ReactInstance) as Element;
    const button = renderedDOM.querySelector('button') as HTMLButtonElement;

    ReactTestUtils.Simulate.click(button);
    expect(isToggledValue).toEqual(true);
    expect((component as React.Component<any, any>).state.isChecked).toEqual(true);
  });

  it(`doesn't update the state if the user provides checked`, () => {
    let component: any;

    ReactTestUtils.renderIntoDocument(
      <Toggle
        // tslint:disable-next-line:jsx-no-lambda
        componentRef={ ref => component = ref }
        label='Label'
        checked={ false }
      />
    );
    const renderedDOM = ReactDOM.findDOMNode(component as React.ReactInstance) as Element;
    const button = renderedDOM.querySelector('button') as HTMLButtonElement;

    ReactTestUtils.Simulate.click(button);

    expect((component as React.Component<any, any>).state.isChecked).toEqual(false);
  });

  it(`doesn't render a label element if none is provided`, () => {
    const component = ReactTestUtils.renderIntoDocument(
      <Toggle
        checked={ false }
      />
    );
    const renderedDOM = ReactDOM.findDOMNode(component as React.ReactInstance) as Element;
    const label = renderedDOM.querySelector('label');

    // tslint:disable-next-line:no-unused-expression
    expect(label).toBeNull();
  });

  it(`doesn't trigger onSubmit when placed inside a form`, () => {
    let component: any;
    const onSubmit = sinon.spy();

    const wrapper = mount(
      <form
        action='#'
        // tslint:disable-next-line:jsx-no-lambda
        onSubmit={ (e) => {
          onSubmit();
          e.preventDefault();
        } }
      >
        <Toggle
          // tslint:disable-next-line:jsx-no-lambda
          componentRef={ ref => component = ref }
          label='Label'
        />
      </form>
    );
    const button: any = wrapper.find('button');
    // simulate to change toggle state
    button.simulate('click');
    expect((component as React.Component<any, any>).state.isChecked).toEqual(true);
    expect(onSubmit.called).toEqual(false);
  });

});
