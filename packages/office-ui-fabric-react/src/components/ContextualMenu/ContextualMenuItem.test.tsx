jest.mock('../../utilities/contextualMenu');

import * as React from 'react';
import { shallow, ShallowWrapper } from 'enzyme';
import { ContextualMenuItem } from './ContextualMenuItem';
import { IContextualMenuItemProps } from './ContextualMenuItem.types';
import { IContextualMenuItem } from './ContextualMenu.types';
import { IMenuItemClassNames } from './ContextualMenu.classNames';
import { hasSubmenu } from '../../utilities/contextualMenu';

describe('ContextMenuItemChildren', () => {
  describe('when a checkmark icon', () => {
    let onCheckmarkClick: jest.Mock;
    let menuItem: IContextualMenuItem;
    let menuClassNames: IMenuItemClassNames;
    let wrapper: ShallowWrapper<IContextualMenuItemProps, {}>;

    beforeEach(() => {
      menuItem = { key: '123' };
      menuClassNames = getMenuItemClassNames();
      onCheckmarkClick = jest.fn();

      wrapper = shallow(
        <ContextualMenuItem
          item={ menuItem }
          classNames={ menuClassNames }
          index={ 1 }
          hasIcons={ undefined }
          onCheckmarkClick={ onCheckmarkClick }
        />
      );
    });

    it('renders the component with the checkmark', () => {
      expect(wrapper).toMatchSnapshot();
    });

    describe('when the checkmark is clicked', () => {
      let event: jest.Mock;
      beforeEach(() => {
        event = jest.fn();
        wrapper.find('.checkmarkIcon').simulate('click', event);
      });

      it('invokes the onCheckmarkClick callback', () => {
        expect(onCheckmarkClick).toHaveBeenCalledWith(menuItem, event);
      });
    });
  });

  describe('when it has icons', () => {
    describe('when it has iconProps', () => {
      let menuItem: IContextualMenuItem;
      let menuClassNames: IMenuItemClassNames;
      let wrapper: ShallowWrapper<IContextualMenuItemProps, {}>;

      beforeEach(() => {
        menuItem = { key: '123', icon: 'itemIcon', name: 'menuItem' };
        menuClassNames = getMenuItemClassNames();

        wrapper = shallow(
          <ContextualMenuItem
            item={ menuItem }
            classNames={ menuClassNames }
            index={ 1 }
            hasIcons={ true }
          />
        );
      });

      it('renders the icon', () => {
        expect(wrapper).toMatchSnapshot();
      });
    });

    describe('when it doesnt have iconProps', () => {
      let menuItem: IContextualMenuItem;
      let menuClassNames: IMenuItemClassNames;
      let wrapper: ShallowWrapper<IContextualMenuItemProps, {}>;

      beforeEach(() => {
        menuItem = { key: '123', iconProps: {} };
        menuClassNames = getMenuItemClassNames();

        wrapper = shallow(
          <ContextualMenuItem
            item={ menuItem }
            classNames={ menuClassNames }
            index={ 1 }
            hasIcons={ true }
          />
        );
      });

      it('renders the icon with iconName', () => {
        expect(wrapper).toMatchSnapshot();
      });
    });
  });

  describe('when it has a sub menu', () => {
    let menuItem: IContextualMenuItem;
    let menuClassNames: IMenuItemClassNames;
    let wrapper: ShallowWrapper<IContextualMenuItemProps, {}>;

    beforeEach(() => {
      (hasSubmenu as jest.Mock).mockReturnValue(true);
      menuItem = { key: '123', iconProps: {}, submenuIconProps: {} };
      menuClassNames = getMenuItemClassNames();

      wrapper = shallow(
        <ContextualMenuItem
          item={ menuItem }
          classNames={ menuClassNames }
          index={ 1 }
          hasIcons={ true }
        />
      );
    });

    it('renders the menu icon', () => {
      expect(wrapper).toMatchSnapshot();
    });
  });
});

function getMenuItemClassNames(): IMenuItemClassNames {
  return {
    item: 'item',
    divider: '---',
    root: 'root',
    linkContent: 'linkContent',
    icon: 'icon',
    checkmarkIcon: 'checkmarkIcon',
    subMenuIcon: 'subMenuIcon',
    label: 'label',
    splitContainer: 'splitContainer',
    splitPrimary: 'splitPrimary',
    splitMenu: 'splitMenu',
    linkContentMenu: 'linkContentMenu',
  };
}
