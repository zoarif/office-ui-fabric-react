﻿/* tslint:disable */
import { FocusZone, FocusZoneDirection } from 'office-ui-fabric-react/lib/components/FocusZone';
import { INavLinkGroup } from 'office-ui-fabric-react/lib/components/Nav';
import { INavState } from 'office-ui-fabric-react/lib/components/Nav/Nav.base';
import { AnimationClassNames } from 'office-ui-fabric-react/lib/Styling';
import * as React from 'react';
import {
  INavProps,
  INavLink,
  INavStyleProps,
  INavStyles
} from './Nav.types';
import {
  getStyles
} from './Nav.styles';
import { NavBase } from './NavBase';
import {
  styled,
  classNamesFunction
} from 'office-ui-fabric-react/lib/Utilities';
import { NavLink } from './NavLink';

const getClassNames = classNamesFunction<INavStyleProps, INavStyles>();

class NavComponent extends NavBase {
  constructor(props: INavProps) {
    super(props);

    this.state = {
      isLinkExpandStateChanged: false,
      selectedKey: props.initialSelectedKey || props.selectedKey
    };
  }

  public render() {
    if (!this.props.groups || this.props.groups.length === 0) {
      return null;
    }

    return (
      <FocusZone direction={ FocusZoneDirection.vertical }>
        <nav role='navigation'>
          {
            this.props.groups.map((group: INavLinkGroup, groupIndex: number) => {
              return this._renderGroup(group, groupIndex);
            })
          }
        </nav>
      </FocusZone>
    );
  }

  private _onLinkClicked(link: INavLink, ev: React.MouseEvent<HTMLElement>): void {
    let nextState: INavState = {
      selectedKey: link.key
    };

    const hasChildren = link.links && link.links.length > 0;

    if (hasChildren) {
      // show child links
      link.isExpanded = !link.isExpanded;
      nextState.isLinkExpandStateChanged = true;
    }
    else if (link.onClick) {
      // if there is a onClick defined, call it
      link.onClick(ev, link);
    }

    this.setState(nextState);

    if (hasChildren || link.onClick) {
      // prevent further action if the link has children or onClick handler is defined
      ev.preventDefault();
    }

    ev.stopPropagation();
  }

  private _renderCompositeLink(link: INavLink, linkIndex: number, nestingLevel: number): React.ReactElement<{}> | null {
    if (!link) {
      return null;
    }

    let rightIconName = undefined;
    if (link.links && link.links.length > 0 && nestingLevel === 0) {
      // for the first level link, show chevron icon if there is a children
      rightIconName = link.isExpanded ? 'ChevronUp' : 'ChevronDown'
    }
    else if (link.url && link.target && link.target === '_blank') {
      // for external links, show an icon
      rightIconName = 'OpenInNewWindow';
    }

    // show nav icon for the first level only
    const leftIconName = nestingLevel === 0 ? link.icon : undefined;
    const isLinkSelected = this.isLinkSelected(link, false /* includeChildren */);
    const isChildLinkSelected = this.isChildLinkSelected(link);
    const hasChildren = !!link.links && link.links.length > 0;
    const isSelected = (isLinkSelected && !hasChildren) || (isChildLinkSelected && !link.isExpanded);
    const { getStyles } = this.props;
    const classNames = getClassNames(getStyles!, { isSelected, nestingLevel });

    return (
      <NavLink
        id={ link.key }
        content={ link.name }
        href={ link.url }
        target={ link.target }
        onClick={ this._onLinkClicked.bind(this, link) }
        dataHint={ this.props.dataHint }
        dataValue={ link.key }
        ariaLabel={ link.name }
        role="menu"
        rootClassName={ classNames.navItemRoot }
        leftIconName={ leftIconName }
        rightIconName={ rightIconName }
        textClassName={ classNames.navItemNameColumn }
        iconClassName={ classNames.navItemIconColumn }>
      </NavLink>
    );
  }

  private _renderLink(link: INavLink, linkIndex: number, nestingLevel: number): React.ReactElement<{}> | null {
    if (!link) {
      return null;
    }

    return (
      <li
        role='listitem'
        key={ link.key || linkIndex }
        title={ link.name }>
        {
          this._renderCompositeLink(link, linkIndex, nestingLevel)
        }
        {
          // show child links
          // 1. only for the first level and
          // 2. if the link is expanded
          nestingLevel == 0 && link.isExpanded ?
            <div className={ AnimationClassNames.slideDownIn20 }>
              {
                this._renderLinks(link.links as INavLink[], ++nestingLevel)
              }
            </div>
            : null
        }
      </li>
    );
  }

  private _renderLinks(links: INavLink[], nestingLevel: number): React.ReactElement<{}> | null {
    if (!links || links.length === 0) {
      return null;
    }

    return (
      <ul role='list'>
        {
          links.map((link: INavLink, linkIndex: number) => {
            return this._renderLink(link, linkIndex, nestingLevel);
          })
        }
      </ul>
    );
  }

  private _renderGroup(group: INavLinkGroup, groupIndex: number): React.ReactElement<{}> | null {
    if (!group || !group.links || group.links.length === 0) {
      return null;
    }

    const { getStyles } = this.props;
    const classNames = getClassNames(getStyles!, {});

    return (
      <div key={ groupIndex }>
        {
          groupIndex > 0 && group.name ?
            <div className={ classNames.navGroupSeparatorRoot }>
              <div className={ classNames.navGroupSeparatorHrLine }>
                {
                  <span className={ classNames.navGroupSeparatorGroupName }>
                    {
                      group.name
                    }
                  </span>
                }
              </div>
            </div> : null
        }
        { this._renderLinks(group.links, 0 /* nestingLevel */) }
      </div>
    );
  }
}

export const Nav = styled<INavProps, INavStyleProps, INavStyles>(
  NavComponent,
  getStyles
);

/* tslint:enable */
