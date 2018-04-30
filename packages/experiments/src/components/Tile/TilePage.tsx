import * as React from 'react';
import {
  ExampleCard,
  IComponentDemoPageProps,
  ComponentPage,
  PropertiesTableSet
} from '@uifabric/example-app-base';

import { TileFolderExample } from './examples/Tile.Folder.Example';
const TileFolderExampleCode = require('!raw-loader!@uifabric/experiments/src/components/Tile/examples/Tile.Folder.Example.tsx') as string;

import { TileMediaExample } from './examples/Tile.Media.Example';
const TileMediaExampleCode = require('!raw-loader!@uifabric/experiments/src/components/Tile/examples/Tile.Media.Example.tsx') as string;

import { TileDocumentExample } from './examples/Tile.Document.Example';
const TileDocumentExampleCode = require(
  '!raw-loader!@uifabric/experiments/src/components/Tile/examples/Tile.Document.Example.tsx'
) as string;

export class TilePage extends React.Component<IComponentDemoPageProps, {}> {
  public render(): JSX.Element {
    return (
      <ComponentPage
        title='Tile'
        componentName='Tile'
        exampleCards={
          <div>
            <ExampleCard title='Folder Tile' isOptIn={ true } code={ TileFolderExampleCode }>
              <TileFolderExample />
            </ExampleCard>
            <ExampleCard title='Document Tile' isOptIn={ true } code={ TileDocumentExampleCode }>
              <TileDocumentExample />
            </ExampleCard>
            <ExampleCard title='Media Tile' isOptIn={ true } code={ TileMediaExampleCode }>
              <TileMediaExample />
            </ExampleCard>
          </div>
        }
        propertiesTables={
          <PropertiesTableSet
            sources={ [
              require<string>('!raw-loader!@uifabric/experiments/src/components/Tile/Tile.types.ts')
            ] }
          />
        }
        overview={
          <div />
        }
        bestPractices={
          <div />
        }
        dos={
          <div>
            <ul>
              <li>Use them to represent a large collection of items visually.</li>
            </ul>
          </div>
        }
        donts={
          <div>
            <ul>
              <li>Use them for general layout of components that are not part of the same set.</li>
            </ul>
          </div>
        }
        isHeaderVisible={ this.props.isHeaderVisible }
      />
    );
  }
}
