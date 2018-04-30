import * as React from 'react';
import {
  ExampleCard,
  IComponentDemoPageProps,
  ComponentPage,
  PageMarkdown,
  PropertiesTableSet
} from '@uifabric/example-app-base';
import './ImagePage.scss';
import { ImageDefaultExample } from './examples/Image.Default.Example';
import { ImageCenterExample } from './examples/Image.Center.Example';
import { ImageContainExample } from './examples/Image.Contain.Example';
import { ImageCoverExample } from './examples/Image.Cover.Example';
import { ImageNoneExample } from './examples/Image.None.Example';
import { ImageMaximizeFrameExample } from './examples/Image.MaximizeFrame.Example';
import { ComponentStatus } from '../../demo/ComponentStatus/ComponentStatus';
import { ImageStatus } from './Image.checklist';

const ImageDefaultExampleCode = require('!raw-loader!office-ui-fabric-react/src/components/Image/examples/Image.Default.Example.tsx') as string;
const ImageCenterExampleCode = require('!raw-loader!office-ui-fabric-react/src/components/Image/examples/Image.Center.Example.tsx') as string;
const ImageContainExampleCode = require('!raw-loader!office-ui-fabric-react/src/components/Image/examples/Image.Contain.Example.tsx') as string;
const ImageCoverExampleCode = require('!raw-loader!office-ui-fabric-react/src/components/Image/examples/Image.Cover.Example.tsx') as string;
const ImageNoneExampleCode = require('!raw-loader!office-ui-fabric-react/src/components/Image/examples/Image.None.Example.tsx') as string;
const ImageMaximizeFrameExampleCode = require('!raw-loader!office-ui-fabric-react/src/components/Image/examples/Image.MaximizeFrame.Example.tsx') as string;

export class ImagePage extends React.Component<IComponentDemoPageProps, {}> {
  public render(): JSX.Element {
    return (
      <ComponentPage
        title='Image'
        componentName='ImageExample'
        componentUrl='https://github.com/OfficeDev/office-ui-fabric-react/tree/master/packages/office-ui-fabric-react/src/components/Image'
        exampleCards={
          <div>
            <ExampleCard title='ImageFit: Not specified' code={ ImageDefaultExampleCode }>
              <ImageDefaultExample />
            </ExampleCard>
            <ExampleCard title='ImageFit: None' code={ ImageNoneExampleCode }>
              <ImageNoneExample />
            </ExampleCard>
            <ExampleCard title='ImageFit: Center' code={ ImageCenterExampleCode }>
              <ImageCenterExample />
            </ExampleCard>
            <ExampleCard title='ImageFit: Contain' code={ ImageContainExampleCode }>
              <ImageContainExample />
            </ExampleCard>
            <ExampleCard title='ImageFit: Cover' code={ ImageCoverExampleCode }>
              <ImageCoverExample />
            </ExampleCard>
            <ExampleCard title='Maximizing the image frame' code={ ImageMaximizeFrameExampleCode }>
              <ImageMaximizeFrameExample />
            </ExampleCard>
          </div>
        }
        allowNativeProps={ true }
        nativePropsElement={ 'img' }
        propertiesTables={
          <PropertiesTableSet
            sources={ [
              require<string>('!raw-loader!office-ui-fabric-react/src/components/Image/Image.types.ts')
            ] }
          />
        }
        overview={
          <PageMarkdown>
            { require<string>('!raw-loader!office-ui-fabric-react/src/components/Image/docs/ImageOverview.md') }
          </PageMarkdown>
        }
        bestPractices={
          <div />
        }
        dos={
          <PageMarkdown>
            { require<string>('!raw-loader!office-ui-fabric-react/src/components/Image/docs/ImageDos.md') }
          </PageMarkdown>
        }
        donts={
          <PageMarkdown>
            { require<string>('!raw-loader!office-ui-fabric-react/src/components/Image/docs/ImageDonts.md') }
          </PageMarkdown>
        }
        isHeaderVisible={ this.props.isHeaderVisible }
        componentStatus={
          <ComponentStatus
            { ...ImageStatus }
          />
        }
      />
    );
  }
}
