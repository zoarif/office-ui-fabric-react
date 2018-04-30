import * as React from 'react';
import {
  BaseComponent,
  IBaseProps,
  IClassNames,
  customizable
} from 'office-ui-fabric-react/lib/Utilities';
import {
  ITheme,
  IStyle,
  mergeStyleSets
} from 'office-ui-fabric-react/lib/Styling';

export interface IPageContentProps extends React.Props<PageContent>, IBaseProps {
  theme?: ITheme;
}

export interface IPageContentStyles {
  root: IStyle;
}

const getDefaultStyles = (props: IPageContentProps): IPageContentStyles => ({
  root: {
    padding: '20px'
  }
});

@customizable('PageContent', ['theme'])
export class PageContent extends BaseComponent<IPageContentProps, {}> {
  public render(): JSX.Element {
    const { children } = this.props;
    const classNames: IClassNames<IPageContentStyles> = mergeStyleSets(
      getDefaultStyles(this.props)
    );

    return (
      <div className={ classNames.root }>
        { children }
      </div>
    );
  }
}
