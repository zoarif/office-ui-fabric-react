import * as React from 'react';
import { FacepilePage } from 'office-ui-fabric-react/lib/components/Facepile/FacepilePage';
import { PageHeader } from '../../components/PageHeader/PageHeader';
import { ComponentPage } from '../../components/ComponentPage/ComponentPage';
const pageStyles: any = require('../PageStyles.module.scss');

export class FacepileComponentPage extends React.Component<any, any> {
  public render(): JSX.Element {
    return (
      <div className={ pageStyles.basePage }>
        <ComponentPage>
          <PageHeader pageTitle='Facepile' backgroundColor='#038387'
            links={
              [
                {
                  'text': 'Overview',
                  'location': 'Overview'
                },
                {
                  'text': 'Best Practices',
                  'location': 'BestPractices'
                },
                {
                  'text': 'Variants',
                  'location': 'Variants'
                },
                {
                  'text': 'Implementation',
                  'location': 'Implementation'
                }
              ]
            } />
          <FacepilePage isHeaderVisible={ false } />
        </ComponentPage>
      </div>
    );
  }
}
