import * as React from 'react';
import {
  BaseComponent,
  KeyCodes,
  css,
  getId,
  createRef
} from '../../Utilities';
import { CommandButton } from '../../Button';
import { IPivotProps } from './Pivot.types';
import { IPivotItemProps } from './PivotItem.types';
import { FocusZone, FocusZoneDirection } from '../../FocusZone';
import { PivotItem } from './PivotItem';
import { PivotLinkFormat } from './Pivot.types';
import { PivotLinkSize } from './Pivot.types';
import { Icon } from '../../Icon';
import * as stylesImport from './Pivot.scss';
const styles: any = stylesImport;

/**
 *  Usage:
 *
 *   <Pivot>
 *     <PivotItem linkText="Foo">
 *       <Label>Pivot #1</Label>
 *     </PivotItem>
 *     <PivotItem linkText="Bar">
 *       <Label>Pivot #2</Label>
 *     </PivotItem>
 *     <PivotItem linkText="Bas">
 *       <Label>Pivot #3</Label>
 *     </PivotItem>
 *   </Pivot>
 */

export interface IPivotState {
  links: IPivotItemProps[];
  selectedKey: string;
  selectedTabId: string;
}

export class PivotBase extends BaseComponent<IPivotProps, IPivotState> {
  private _keyToIndexMapping: { [key: string]: number };
  private _keyToTabIds: { [key: string]: string };
  private _pivotId: string;
  private focusZone = createRef<FocusZone>();

  constructor(props: IPivotProps) {
    super(props);
    this._pivotId = getId('Pivot');
    const links: IPivotItemProps[] = this._getPivotLinks(this.props);
    let selectedKey: string | undefined;

    if (props.initialSelectedKey) {
      selectedKey = props.initialSelectedKey;
    } else if (props.initialSelectedIndex) {
      selectedKey = links[props.initialSelectedIndex].itemKey as string;
    } else if (props.selectedKey) {
      selectedKey = props.selectedKey;
    } else if (links.length) {
      selectedKey = links[0].itemKey as string;
    }

    this.state = {
      links,
      selectedKey: selectedKey!,
      selectedTabId: this._keyToTabIds[selectedKey!],
    } as IPivotState;

    this._renderPivotLink = this._renderPivotLink.bind(this);
  }

  public componentWillReceiveProps(nextProps: IPivotProps): void {
    const links: IPivotItemProps[] = this._getPivotLinks(nextProps);

    this.setState((prevState, props) => {
      let selectedKey: string | undefined;
      if (this._isKeyValid(nextProps.selectedKey)) {
        selectedKey = nextProps.selectedKey;
      } else if (this._isKeyValid(prevState.selectedKey)) {
        selectedKey = prevState.selectedKey;
      } else if (links.length) {
        selectedKey = links[0].itemKey;
      }

      return {
        links: links,
        selectedKey,
        selectedTabId: this._keyToTabIds[selectedKey as string],
      } as IPivotState;
    });
  }

  /**
   * Sets focus to the first pivot tab.
   */
  public focus(): void {
    if (this.focusZone.current) {
      this.focusZone.current.focus();
    }
  }

  public render(): JSX.Element {
    return (
      <div>
        { this._renderPivotLinks() }
        { this._renderPivotItem() }
      </div>
    );
  }

  /**
   * Renders the set of links to route between pivots
   */
  private _renderPivotLinks(): JSX.Element {
    return (
      <FocusZone componentRef={ this.focusZone } direction={ FocusZoneDirection.horizontal }>
        <ul
          className={ css('ms-Pivot', styles.root,
            { ['ms-Pivot--large ' + styles.rootIsLarge]: this.props.linkSize === PivotLinkSize.large },
            { ['ms-Pivot--tabs ' + styles.rootIsTabs]: this.props.linkFormat === PivotLinkFormat.tabs }) }
          role='tablist'
        >
          { this.state.links.map(this._renderPivotLink) }
        </ul>
      </FocusZone>
    );
  }

  private _renderPivotLink = (link: IPivotItemProps): JSX.Element => {
    const { itemKey, headerButtonProps } = link;
    const tabId = this._keyToTabIds[itemKey as string];
    const { onRenderItemLink } = link;
    let linkContent: JSX.Element | null;

    if (onRenderItemLink) {
      linkContent = onRenderItemLink(link, this._renderLinkContent);
    } else {
      linkContent = this._renderLinkContent(link);
    }

    return (
      <CommandButton
        { ...headerButtonProps }
        id={ tabId }
        key={ itemKey }
        className={ css(
          'ms-Pivot-link',
          styles.link,
          {
            ['is-selected ' + styles.linkIsSelected]: this.state.selectedKey === itemKey
          }
        ) }
        onClick={ this._onLinkClick.bind(this, itemKey) }
        onKeyPress={ this._onKeyPress.bind(this, itemKey) }
        ariaLabel={ link.ariaLabel }
        role='tab'
        aria-selected={ this.state.selectedKey === itemKey }
        name={ link.headerText }
      >
        { linkContent }
      </CommandButton>
    );
  }

  private _renderLinkContent = (link: IPivotItemProps): JSX.Element => {
    const { itemCount, itemIcon, headerText } = link;

    return (
      <span className={ css('ms-Pivot-link-content') }>
        { itemIcon !== undefined && (
          <span className={ css('ms-Pivot-icon', styles.icon) }>
            <Icon iconName={ itemIcon } />
          </span>
        ) }
        { headerText !== undefined && <span className={ css('ms-Pivot-text', styles.text) }> { link.headerText }</span> }
        { itemCount !== undefined && <span className={ css('ms-Pivot-count', styles.count) } > ({ itemCount })</span> }
      </span>
    );
  }

  /**
   * Renders the current Pivot Item
   */
  private _renderPivotItem(): JSX.Element | null {
    if (this.props.headersOnly) {
      return null;
    }

    const itemKey: string = this.state.selectedKey;
    const index = this._keyToIndexMapping[itemKey];
    const { selectedTabId } = this.state;

    return (
      <div
        role='tabpanel'
        aria-labelledby={ selectedTabId }
      >
        { React.Children.toArray(this.props.children)[index] }
      </div>
    );
  }

  /**
   * Gets the set of PivotLinks as arrary of IPivotItemProps
   * The set of Links is determined by child components of type PivotItem
   */
  private _getPivotLinks(props: IPivotProps): IPivotItemProps[] {
    const links: IPivotItemProps[] = [];
    this._keyToIndexMapping = {};
    this._keyToTabIds = {};

    React.Children.map(props.children, (child: any, index: number) => {
      if (typeof child === 'object' && child.type === PivotItem) {
        const pivotItem = child as PivotItem;
        const itemKey = pivotItem.props.itemKey || index.toString();

        links.push({
          headerText: pivotItem.props.headerText || pivotItem.props.linkText,
          headerButtonProps: pivotItem.props.headerButtonProps,
          ariaLabel: pivotItem.props.ariaLabel,
          itemKey: itemKey,
          itemCount: pivotItem.props.itemCount,
          itemIcon: pivotItem.props.itemIcon,
          onRenderItemLink: pivotItem.props.onRenderItemLink
        });
        this._keyToIndexMapping[itemKey] = index;
        this._keyToTabIds[itemKey] = this._getTabId(itemKey, index);
      }
    });

    return links;
  }

  /**
   * Generates the Id for the tab button.
   */
  private _getTabId(itemKey: string, index: number): string {
    if (this.props.getTabId) {
      return this.props.getTabId(itemKey, index);
    }

    return this._pivotId + `-Tab${index}`;
  }

  /**
   * whether the key exists in the pivot items.
   */
  private _isKeyValid(itemKey: string | undefined): boolean {
    return itemKey !== undefined && this._keyToIndexMapping[itemKey] !== undefined;
  }

  /**
   * Handles the onClick event on PivotLinks
   */
  private _onLinkClick(itemKey: string, ev: React.MouseEvent<HTMLElement>): void {
    ev.preventDefault();
    this._updateSelectedItem(itemKey, ev);
  }

  /**
   * Handle the onKeyPress eventon the PivotLinks
   */
  private _onKeyPress(itemKey: string, ev: React.KeyboardEvent<HTMLElement>): void {
    ev.preventDefault();
    if (ev.which === KeyCodes.enter) {
      this._updateSelectedItem(itemKey);
    }
  }

  /**
   * Updates the state with the new selected index
   */
  private _updateSelectedItem(itemKey: string, ev?: React.MouseEvent<HTMLElement>): void {
    this.setState({
      selectedKey: itemKey,
      selectedTabId: this._keyToTabIds[itemKey]
    } as IPivotState);

    if (this.props.onLinkClick && this._keyToIndexMapping[itemKey] >= 0) {
      const index = this._keyToIndexMapping[itemKey];

      // React.Element<any> cannot directly convert to PivotItem.
      const item = React.Children.toArray(this.props.children)[index] as any;

      if (typeof item === 'object' && item.type === PivotItem) {
        this.props.onLinkClick(item as PivotItem, ev);
      }
    }
  }
}
