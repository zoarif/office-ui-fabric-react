import * as React from 'react';
import { ProgressIndicatorPage } from 'office-ui-fabric-react/lib/components/ProgressIndicator/ProgressIndicatorPage';
import { PageHeader } from '../../components/PageHeader/PageHeader';
import { ComponentPage } from '../../components/ComponentPage/ComponentPage';
const pageStyles: any = require('../PageStyles.module.scss');

export class ProgressIndicatorComponentPage extends React.Component<any, any> {
  public render(): JSX.Element {
    return (
      <div className={ pageStyles.basePage }>
        <ComponentPage>
          <PageHeader pageTitle='ProgressIndicator' backgroundColor='#038387'
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
          <ProgressIndicatorPage isHeaderVisible={ false } />
        </ComponentPage>
      </div>
    );
  }
}
