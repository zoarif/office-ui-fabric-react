import * as React from 'react';
import { CommandBarPage } from 'office-ui-fabric-react/lib/components/CommandBar/CommandBarPage';
import { PageHeader } from '../../components/PageHeader/PageHeader';
import { ComponentPage } from '../../components/ComponentPage/ComponentPage';
const pageStyles: any = require('../PageStyles.module.scss');

export class CommandBarComponentPage extends React.Component<any, any> {
  public render(): JSX.Element {
    return (
      <div className={ pageStyles.basePage }>
        <ComponentPage>
          <PageHeader pageTitle='CommandBar' backgroundColor='#038387'
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
          <CommandBarPage isHeaderVisible={ false } />
        </ComponentPage>
      </div>
    );
  }
}
