/* tslint:disable:no-unused-variable */
import * as React from 'react';
import * as ReactDOM from 'react-dom';
/* tslint:enable:no-unused-variable */
import * as renderer from 'react-test-renderer';

import { IBaseFloatingPickerProps } from './BaseFloatingPicker.types';
import { BaseFloatingPicker } from './BaseFloatingPicker';
import { SuggestionsStore } from './Suggestions/SuggestionsStore';

function onResolveSuggestions(text: string): ISimple[] {
  return [
    'black',
    'blue',
    'brown',
    'cyan',
    'green',
    'magenta',
    'mauve',
    'orange',
    'pink',
    'purple',
    'red',
    'rose',
    'violet',
    'white',
    'yellow'
  ].filter((tag: string) => tag.toLowerCase().indexOf(text.toLowerCase()) === 0).map((item: string) => ({ key: item, name: item }));
}

function onZeroQuerySuggestion(): ISimple[] {
  return [
    'black',
    'blue',
    'brown',
    'cyan'].map((item: string) => ({ key: item, name: item }));
}

const basicSuggestionRenderer = (props: ISimple) => {
  return <div key={ props.key } > { props.name } </div>;
};

export interface ISimple {
  key: string;
  name: string;
}

export type TypedBaseFloatingPicker = BaseFloatingPicker<ISimple, IBaseFloatingPickerProps<ISimple>>;

describe('Pickers', () => {
  describe('BasePicker', () => {
    const BaseFloatingPickerWithType = BaseFloatingPicker as new (props: IBaseFloatingPickerProps<ISimple>)
      => BaseFloatingPicker<ISimple, IBaseFloatingPickerProps<ISimple>>;

    it('renders BaseFloatingPicker correctly', () => {
      const component = renderer.create(
        <BaseFloatingPickerWithType
          onResolveSuggestions={ onResolveSuggestions }
          onRenderSuggestionsItem={ basicSuggestionRenderer }
          suggestionsStore={ new SuggestionsStore<ISimple>() }
        />
      );
      const tree = component.toJSON();
      expect(tree).toMatchSnapshot();
    });

    it('shows zero query options on empty input', () => {
      const root = document.createElement('div');
      const input = document.createElement('input');
      document.body.appendChild(input);
      document.body.appendChild(root);

      const picker: TypedBaseFloatingPicker = ReactDOM.render(
        <BaseFloatingPickerWithType
          onResolveSuggestions={ onResolveSuggestions }
          onRenderSuggestionsItem={ basicSuggestionRenderer }
          suggestionsStore={ new SuggestionsStore<ISimple>() }
          onZeroQuerySuggestion={ onZeroQuerySuggestion }
          inputElement={ input }
        />,
        root
      ) as TypedBaseFloatingPicker;

      picker.onQueryStringChanged('a');

      // Change input to be empty string
      picker.onQueryStringChanged('');

      expect(picker.suggestions.length).toEqual(4);

      ReactDOM.unmountComponentAtNode(root);
    });

    it('updates suggestions on query string changed', () => {
      const root = document.createElement('div');
      const input = document.createElement('input');
      document.body.appendChild(input);
      document.body.appendChild(root);

      const picker: TypedBaseFloatingPicker = ReactDOM.render(
        <BaseFloatingPickerWithType
          onResolveSuggestions={ onResolveSuggestions }
          onRenderSuggestionsItem={ basicSuggestionRenderer }
          suggestionsStore={ new SuggestionsStore<ISimple>() }
          inputElement={ input }
        />,
        root
      ) as TypedBaseFloatingPicker;

      picker.onQueryStringChanged('b');

      expect(picker.suggestions.length).toEqual(3);

      ReactDOM.unmountComponentAtNode(root);
    });
  });
});