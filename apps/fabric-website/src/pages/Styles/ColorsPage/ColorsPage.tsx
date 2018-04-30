import * as React from 'react';
import { ColorTable } from '../../../components/ColorTable/ColorTable';
import { css } from 'office-ui-fabric-react/lib/Utilities';
import { PageHeader } from '../../../components/PageHeader/PageHeader';
import { Table } from '../../../components/Table/Table';
import * as stylesImport from './ColorsPage.module.scss';
const styles: any = stylesImport;
const pageStyles: any = require('../../PageStyles.module.scss');

const accentColorsData = require('../../../data/colors-accent.json');
const colorClassesData = require('../../../data/colors-classes.json');
const neutralColorsData = require('../../../data/colors-neutral.json');
const themeColorsData = require('../../../data/colors-theme.json');

export class ColorsPage extends React.Component<any, any> {
  public render(): JSX.Element {
    return (
      <div className={ pageStyles.basePage }>
        <PageHeader
          pageTitle='Colors'
          links={
            [
              {
                'text': 'Overview',
                'location': 'overview'
              },
              {
                'text': 'Implementation',
                'location': 'implementation'
              },
              {
                'text': 'Palettes',
                'location': 'palettes'
              }
            ]
          }
          backgroundColor='#006f94'
        />
        <div className={ css(pageStyles.u_maxTextWidth, styles.overview) }>
          <h2 id='Overview'>Overview</h2>
          <p>Fabric includes 9 theme colors and 11 neutral colors. Each has helper classes for text, background, border, and hover states. When selecting colors, refer to the <a className={ styles.colorsPageLink } href={ 'https://static2.sharepointonline.com/files/fabric/fabric-website/files/coloraccessibility_29sep2016.pdf' }>color accessibility guidance (PDF)</a> to ensure that your text can be ready by everyone. If you need to customize your theme, see the <a className={ styles.colorsPageLink } href={ '#/styles/themegenerator' }>Theme generator</a>.</p>
        </div>
        <h2 id='implementation'>Implementation</h2>
        <p>Colors can be applied to text, backgrounds, or borders using the following class name conventions:</p>
        <Table content={ colorClassesData } />

        <h2 id='palettes'>Color palettes</h2>

        <div className='ms-Grid ms-Grid--wide'>
          <div className={ css('ms-Grid-row', styles.contentInGrid) }>
            <div className='ms-Grid-col ms-sm12 ms-xl6'>
              <h3>Theme colors</h3>
              <ColorTable content={ themeColorsData } />
            </div>
            <div className='ms-Grid-col ms-sm12 ms-xl6'>
              <h3>Neutral colors</h3>
              <ColorTable content={ neutralColorsData } />
            </div>
          </div>
        </div>

        <h3>Accent colors</h3>
        <div className='ms-Grid ms-Grid--wide'>
          <div className={ css('ms-Grid-row', styles.contentInGrid) }>
            { accentColorsData.map((group, groupIndex) => (
              <div className='ms-Grid-col ms-sm12 ms-xl4 ms-xxl3'
                key={ groupIndex }>
                <div className={ styles.accentGroup }>
                  <h4>{ group.name }</h4>
                  <ColorTable content={ group.colors } />
                </div>
              </div>
            )) }
          </div>
        </div>
      </div>
    );
  }
}
