import * as React from 'react';
import { IVirtualizedListProps } from './VirtualizedList.types';
import { IScrollContainerContext, ScrollContainerContextTypes } from '../../utilities/scrolling/ScrollContainer';
import { IObjectWithKey } from 'office-ui-fabric-react/lib/Selection';
import { BaseComponent, getParent, css, createRef } from 'office-ui-fabric-react/lib/Utilities';

interface IRange {
  /** Start of range */
  start: number;

  /** Exclusive end of range */
  end: number;
}

function isInRange(range: IRange, index: number): boolean {
  return range.start <= index && index < range.end;
}

export interface IVirtualizedListState {
  viewportHeight: number;

  items: React.ReactNode[];
}

export class VirtualizedList<TItem extends IObjectWithKey> extends BaseComponent<IVirtualizedListProps<TItem>, IVirtualizedListState> {
  public static contextTypes: typeof ScrollContainerContextTypes = ScrollContainerContextTypes;
  public context: IScrollContainerContext;

  private _root = createRef<HTMLDivElement>();

  private _spacerElements: { [key: string]: HTMLElement } = {};

  private _focusedIndex: number;

  constructor(props: IVirtualizedListProps<TItem>, context: IScrollContainerContext) {
    super(props, context);

    this._focusedIndex = -1;

    const {
      initialViewportHeight = window.innerHeight  // Start with the window height if not passed in props, this does not cause layout
    } = this.props;

    this.state = {
      viewportHeight: initialViewportHeight,
      items: this._renderItems(0, initialViewportHeight)
    };
  }

  public componentDidMount(): void {
    this._events.on(this._root, 'focus', this._onFocus, true);

    this.context.scrollContainer.registerVisibleCallback((scrollTop: number) => {
      this._render(scrollTop);
    });

    this.componentDidUpdate();
  }

  public componentDidUpdate(): void {
    // (Re-)register with the observer after every update, this way we'll get an intersection event immediately if one of the spacer
    // elements is visible right now.
    for (const key of Object.keys(this._spacerElements)) {
      const ref = this._spacerElements[key];
      this.context.scrollContainer.observe(ref);
    }
  }

  public componentWillUpdate(): void {
    for (const key of Object.keys(this._spacerElements)) {
      const ref = this._spacerElements[key];
      this.context.scrollContainer.unobserve(ref);
    }
  }

  public render(): JSX.Element {
    const { className } = this.props;
    const { items } = this.state;

    return (
      <div
        className={ css('ms-VirtualizedList', className) }
        ref={ this._root }
      >
        { items }
      </div>
    );
  }

  private _renderItems(scrollTop: number, viewportHeight: number): (JSX.Element | null)[] {
    const {
      itemHeight,
      items,
      itemOverdraw = 2
    } = this.props;

    const ranges: IRange[] = [];

    // Calculate visible range
    const startIndex = Math.floor(
      Math.max(
        scrollTop / itemHeight - itemOverdraw,
        0)
    );
    const endIndex = Math.floor(
      Math.min(
        startIndex + (itemOverdraw * 2) + (viewportHeight / itemHeight),
        items.length)
    );

    const visibleRange = {
      start: startIndex,
      end: endIndex
    };

    ranges.push(visibleRange);

    // Focused item
    if (this._focusedIndex !== -1 && !isInRange(visibleRange, this._focusedIndex)) {
      const focusRange: IRange = {
        start: this._focusedIndex,
        end: this._focusedIndex + 1
      };

      if (this._focusedIndex < visibleRange.start) {
        ranges.unshift(focusRange);
      } else {
        ranges.push(focusRange);
      }
    }

    return this._renderRanges(ranges);
  }

  private _renderRanges(ranges: IRange[]): (JSX.Element | null)[] {
    const { items, onRenderItem } = this.props;
    const result: (JSX.Element | null)[] = [];

    // Assume ranges are sorted.

    let lastRenderedIndex = -1;

    for (const range of ranges) {
      // Spacer item before range or between the last range and this one
      const isFirstRange = lastRenderedIndex === -1;
      if ((isFirstRange && range.start !== 0)
        || (!isFirstRange && lastRenderedIndex !== range.start)) {
        // Last range is not continuous with this one,
        // or the first range does not start from the beginning: insert spacer item
        const spacerStartIndex = (isFirstRange ? 0 : lastRenderedIndex);
        const gapBetweenRanges = range.start - spacerStartIndex;
        if (gapBetweenRanges > 0) {
          result.push(this._renderSpacerItem(gapBetweenRanges, spacerStartIndex));
        }
      }

      for (let i = range.start; i < range.end; ++i) {
        result.push(onRenderItem(items[i], i));
      }

      lastRenderedIndex = range.end - 1;
    }

    // Insert final spacer item
    const itemCount = (items || []).length;
    if (lastRenderedIndex < itemCount - 1) {
      result.push(this._renderSpacerItem(itemCount - lastRenderedIndex, lastRenderedIndex));
    }

    return result;
  }

  private _renderSpacerItem(numberOfItems: number, index: number): JSX.Element {
    const {
      itemHeight,
      items = [],
      spacerItemTagName: ItemTag = 'div'
    } = this.props;

    const spacerHeight = numberOfItems * itemHeight;
    const itemCount = items.length;

    let key: string;
    if (index === 0) {
      key = `spacer-start`;
    } else if (index + numberOfItems === itemCount) {
      key = `spacer-end`;
    } else {
      key = `spacer-item-${index + numberOfItems}`;
    }

    // tslint:disable-next-line:jsx-ban-props
    return <ItemTag ref={ this._spacerRef.bind(this, key) } key={ key } style={ { height: spacerHeight } } />;
  }

  private _spacerRef = (key: string, ref: HTMLElement): void => {
    if (ref) {
      this._spacerElements[key] = ref;
    } else {
      delete this._spacerElements[key];
    }
  }

  private _render(scrollTop: number): void {
    scrollTop = Math.floor(scrollTop);

    this.setState({
      items: this._renderItems(scrollTop, this.state.viewportHeight)
    });
  }

  private _onFocus(ev: React.FocusEvent<HTMLDivElement>): void {
    let target = ev.target as HTMLElement;

    while (target !== this._root.current) {
      const indexString = target.getAttribute('data-selection-index');

      if (indexString) {
        this._focusedIndex = Number(indexString);
        break;
      }

      target = getParent(target) as HTMLElement;
    }
  }
}
