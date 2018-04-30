import * as React from 'react';
import {
  BaseComponent,
  css
} from '../../Utilities';
import { Link } from '../../Link';
import { IGroupDividerProps } from './GroupedList.types';
import { GroupSpacer } from './GroupSpacer';
import * as stylesImport from './GroupShowAll.scss';
const styles: any = stylesImport;

export interface IGroupDividerProps {
  /**
 * The Show All link text.
 * @default 'Show All'
 */
  showAllLinkText: string;
}

export class GroupShowAll extends BaseComponent<IGroupDividerProps, {}> {
  public static defaultProps: IGroupDividerProps = {
    showAllLinkText: 'Show All'
  };

  public render(): JSX.Element | null {
    const { group, groupLevel, showAllLinkText } = this.props;

    if (group) {
      return (
        <div className={ css('ms-groupFooter', styles.root) }>
          { GroupSpacer({ count: groupLevel! }) }
          <Link onClick={ this._onSummarizeClick }>{ showAllLinkText }</Link>
        </div>
      );
    }
    return null;
  }

  private _onSummarizeClick = (ev: React.MouseEvent<HTMLElement>): void => {
    this.props.onToggleSummarize!(this.props.group!);

    ev.stopPropagation();
    ev.preventDefault();
  }
}
