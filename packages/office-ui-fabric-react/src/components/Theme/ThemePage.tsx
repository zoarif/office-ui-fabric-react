import * as React from 'react';
import { classNamesFunction } from '../../Utilities';
import {
  IPalette,
  ISemanticColors,
  loadTheme,
} from '../../Styling';
import {
  ComponentPage,
  IComponentDemoPageProps,
  PageMarkdown,
} from '@uifabric/example-app-base';
import {
  IThemePageStyleProps,
  IThemePageStyles,
  IThemePageState,
} from './ThemePage.types';
import {
  defaultPalette,
  defaultSemanticColors,
} from './defaultTheme';
import { getStyles } from './ThemePage.styles';
import { Callout } from '../Callout';
import { DetailsList, DetailsListLayoutMode } from '../../DetailsList';
import { SelectionMode } from '../../Selection';
import { ColorPicker } from '../ColorPicker';

const getClassNames = classNamesFunction<IThemePageStyleProps, IThemePageStyles>();

export class ThemePage extends React.Component<IComponentDemoPageProps, IThemePageState> {
  constructor(props: IComponentDemoPageProps) {
    super(props);

    this._onPickerDismiss = this._onPickerDismiss.bind(this);

    this.state = {
      palette: defaultPalette,
      semanticColors: defaultSemanticColors,
    };
  }

  public render(): JSX.Element {
    // Don't mutate state to display lists
    const palette = [...this.state.palette];
    const semanticColors = [...this.state.semanticColors];
    return (
      <ComponentPage
        title='Themes'
        componentName='ThemeExample'
        componentUrl='https://github.com/OfficeDev/office-ui-fabric-react/tree/master/packages/office-ui-fabric-react/src/components/Theme'
        overview={
          <PageMarkdown>
            { require<string>('!raw-loader!office-ui-fabric-react/src/components/Theme/docs/ThemesOverview.md') }
          </PageMarkdown>
        }
        otherSections={ [
          {
            title: 'Default Palette',
            section: this._colorList(palette, 'palette')
          },
          {
            title: 'Default Semantic Colors',
            section: this._colorList(semanticColors, 'semanticColors')
          },
        ] }
        isHeaderVisible={ this.props.isHeaderVisible }
      />
    );
  }

  private _colorList = (colors: any, list: 'palette' | 'semanticColors') => {
    const classNames = getClassNames(getStyles);
    const { colorPickerProps } = this.state;
    return (
      <div>
        <DetailsList
          items={ colors }
          selectionMode={ SelectionMode.none }
          layoutMode={ DetailsListLayoutMode.fixedColumns }
          columns={ [
            {
              key: 'name',
              name: 'Name',
              fieldName: 'name',
              minWidth: 150,
              maxWidth: 150
            },
            {
              key: 'color',
              name: 'Color',
              fieldName: 'value',
              minWidth: 200,
              onRender: (item, index) => (
                <div
                  className={ classNames.colorSwatch }
                  data-is-focusable='true'
                  onClick={ this._onSwatchClicked.bind(this, item, index, list) }
                >
                  <span
                    className={ classNames.swatch }
                    style={ { backgroundColor: item.value } }
                  />
                  <span className={ classNames.colorValue }>{ item.value }</span>
                </div>
              )
            },
            {
              key: 'desc',
              name: 'Description',
              fieldName: 'description',
              minWidth: 90
            }
          ] }
        />

        { colorPickerProps && (
          <Callout
            isBeakVisible={ false }
            gapSpace={ 10 }
            target={ colorPickerProps.targetElement }
            onDismiss={ this._onPickerDismiss }
          >

            <ColorPicker
              color={ colorPickerProps.value }
              onColorChanged={ this._onColorChanged.bind(this, colorPickerProps.index) }
            />

          </Callout>
        ) }

      </div>
    );
  }

  private _onSwatchClicked(item: any, index: number, list: string, ev: React.MouseEvent<HTMLElement>): void {
    this.setState({
      colorPickerProps: {
        targetElement: (ev.currentTarget as HTMLElement).children[0] as HTMLElement,
        value: item.value,
        index: index,
      },
      activeList: list
    });
  }

  private _onColorChanged(index: number, newColor: string): void {
    const { activeList } = this.state;
    const partialPalette: Partial<IPalette> = {};
    const partialSemanticColors: Partial<ISemanticColors> = {};

    if (activeList === 'palette') {
      const palette = [...this.state.palette];
      const paletteColor = palette[index];
      paletteColor.value = newColor;
      palette[index] = paletteColor;
      for (let i = 0; i < palette.length; i++) {
        (palette as any)[palette[i].key] = palette[i].value;
      }
    } else if (activeList === 'semanticColors') {
      const semanticColors = [...this.state.semanticColors];
      const semanticColor = semanticColors[index];
      semanticColor.value = newColor;
      semanticColors[index] = semanticColor;
      for (let i = 0; i < semanticColors.length; i++) {
        (semanticColors as any)[semanticColors[i].key] = semanticColors[i].value;
      }
    } else {
      this.setState({ activeList: undefined });
      return undefined;
    }

    this.setState({ activeList: undefined });
    const partialTheme = { ...partialPalette, ...partialSemanticColors };

    loadTheme({ palette: partialTheme });
  }

  private _onPickerDismiss(): void {
    this.setState({
      colorPickerProps: undefined
    });
  }
}
