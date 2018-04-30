import * as React from 'react';
import { CodeBlock } from '../../components/CodeBlock/CodeBlock';
import { css } from 'office-ui-fabric-react/lib/Utilities';
import { DefaultButton } from 'office-ui-fabric-react/lib/Button';
import { PageHeader } from '../../components/PageHeader/PageHeader';

const diagramStyles: any = require('./GetStartedPage.diagram.module.scss');
import * as stylesImport from './GetStartedPage.module.scss';
const styles: any = stylesImport;
const pageStyles: any = require('../PageStyles.module.scss');
const corePackageData = require('../../../node_modules/office-ui-fabric-core/package.json');
const corePackageVersion: string = corePackageData && corePackageData.version || '9.2.0';

export class GetStartedPage extends React.Component<any, any> {
  public render(): JSX.Element {
    return (
      <div id='design' className={ pageStyles.basePage }>
        <PageHeader
          pageTitle='Get started'
          links={
            [
              {
                'text': 'Design',
                'location': 'design'
              },
              {
                'text': 'Design Toolkit',
                'location': 'toolkit'
              },
              {
                'text': 'Structure',
                'location': 'structure'
              },
              {
                'text': 'Fabric React',
                'location': 'react'
              },
              {
                'text': 'Fabric Core',
                'location': 'core'
              }
            ]
          }
          backgroundColor='#5c126b'
        />

        <div className={ styles.designSection }>
          <h2>Use our design language in your own experience</h2>
          <div className='ms-Grid ms-Grid--wide'>
            <div className={ css('ms-Grid-row', styles.contentInGrid) }>
              <div className={ css('ms-Grid-col ms-lg4', styles.feature) }>
                <div className={ styles.featureImage } >
                  <img src={ 'https://static2.sharepointonline.com/files/fabric/fabric-website/images/get-started-styles.svg' } alt='Illustration of Typography and color swatches.' />
                </div>
                <a className={ styles.title } href={ '#/styles' }>Styles</a>
                <div className={ styles.description }>Fabric gives you access to Segoe, Microsoft&rsquo;s official typeface, along with the color palette, type ramp, icons, and responsive grid for Office 365.</div>
              </div>
              <div className={ css('ms-Grid-col ms-lg4', styles.feature) }>
                <div className={ styles.featureImage } >
                  <img src={ 'https://static2.sharepointonline.com/files/fabric/fabric-website/images/get-started-icons.svg' } alt='Illustration of Icons' />
                </div>
                <a className={ styles.title } href={ '#/styles/icons' }>Icons</a>
                <div className={ styles.description }>Fabric includes Office&rsquo;s official product icons. Fabric also provides a suite of product and document symbols, so you can use the same metaphors we use.</div>
              </div>
              <div className={ css('ms-Grid-col ms-lg4', styles.feature) }>
                <div className={ styles.featureImage } >
                  <img src={ 'https://static2.sharepointonline.com/files/fabric/fabric-website/images/get-started-components.svg' } alt='Illustration of Components' />
                </div>
                <a className={ styles.title } href={ '#/components' }>Components</a>
                <div className={ styles.description }>Components are the building blocks of your UI. Fabric has a variety of components, including navigation, commands, containers, and content.</div>
              </div>
            </div>
          </div>
          <div id='toolkit'>
            <a className={ styles.title } href='#/resources'>Design Toolkit</a>
            <span className={ styles.descriptionLarge }>The Fabric design toolkit is built with Adobe XD and provides controls and layout templates that enable you to create seamless, beautiful Office experiences.</span>
          </div>
        </div>

        <div className={ styles.structureSection } id='structure'>
          <h2>Choose the version of Fabric that&rsquo;s right for you</h2>
          <div className={ diagramStyles.diagram }>
            <div className={ diagramStyles.core }>
              <img src={ 'https://static2.sharepointonline.com/files/fabric/fabric-website/images/diagram-core.svg' } />
              <div className={ diagramStyles.text }>
                <span className={ diagramStyles.headline }>Fabric Core Styles</span>
                <span className={ diagramStyles.description }>Core elements of the design language, including icons, colors, type, and grid</span>
                <a className={ styles.getStartedLink } href='#/styles'>See styles</a>
              </div>
            </div>
            <div className={ diagramStyles.or }>or</div>
            <ul className={ diagramStyles.components }>
              <li className={ diagramStyles.component }>
                <div className={ diagramStyles.graphics }>
                  <img className={ diagramStyles.componentImage } src={ 'https://static2.sharepointonline.com/files/fabric/fabric-website/images/diagram-components-many.svg' } width='175' height='90' alt='Illustrated Diagram of many components' />
                  <img className={ diagramStyles.coreImage } src={ 'https://static2.sharepointonline.com/files/fabric/fabric-website/images/diagram-core.svg' } alt='Illustrated representation of Fabric cores styles and libraries.' />
                </div>
                <div className={ diagramStyles.content }>
                  <span className={ diagramStyles.headline }>Fabric React</span>
                  <span className={ diagramStyles.description }>Robust, up-to-date components built with the React framework</span>
                  <a className={ styles.getStartedLink } href='#/components'>See components</a>
                </div>
              </li>
              <li className={ diagramStyles.component }>
                <div className={ diagramStyles.graphics }>
                  <img className={ diagramStyles.componentImage } src={ 'https://static2.sharepointonline.com/files/fabric/fabric-website/images/diagram-components-few.svg' } width='175' height='90' alt='Illustrated Diagram of few components' />
                  <img className={ diagramStyles.coreImage } src={ 'https://static2.sharepointonline.com/files/fabric/fabric-website/images/diagram-core.svg' } alt='Illustrated representation of Fabric cores styles and libraries.' />
                </div>
                <div className={ diagramStyles.content }>
                  <span className={ diagramStyles.headline }>AngularJS</span>
                  <span className={ diagramStyles.description }>Community-driven project to build components for Angular-based apps</span>
                  <a className={ styles.getStartedLink } href='#/angular-js'>Learn more</a>
                </div>
              </li>
            </ul>
          </div>
        </div>

        <div className={ styles.instructionsSection }>
          <h2 id='react'>Get started with Fabric React</h2>
          <p>Use NPM to get Fabric components and core styling. All you need is <a className={ styles.getStartedLink } href='https://nodejs.org/en/'>node.js</a> and <a className={ styles.getStartedLink } href='http://gulpjs.com/'>gulp</a>.</p>

          <ol className={ styles.steps }>
            <li>
              <p>To install the Fabric React NPM package, from the root of your project, run:</p>
              <CodeBlock language='bash' isLightTheme={ true }>
                {
                  `npm --save install office-ui-fabric-react`
                }
              </CodeBlock>
            </li>
            <li>
              <p>The library includes commonjs entry points under the lib folder. To use a control (like DefaultButton), import it along with React and use it in your render method. Note that wrapping your application in the Fabric component is required to support RTL, keyboard focus, and other features.</p>
              <CodeBlock language='javascript' isLightTheme={ true }>
                {
                  `import * as React from 'react';
import * as ReactDOM from 'react-dom';
import { Fabric } from 'office-ui-fabric-react/lib/Fabric';
import { DefaultButton } from 'office-ui-fabric-react/lib/Button';

const MyPage = () => (
  <Fabric>
    <DefaultButton>
      I am a button.
    </DefaultButton>
  </Fabric>
);

ReactDOM.render(<MyPage />, document.body.firstChild);`
                }
              </CodeBlock>
            </li>
            <li>
              <p>Add props to your component to tack advantage of Fabric React's rich functionality.</p>
              <CodeBlock language='javascript' isLightTheme={ true }>
                {
                  `<DefaultButton
  text='See Button'
  primary={ true }
  href='#/components/button'
/>`
                }
              </CodeBlock>
              <DefaultButton
                text='See Button'
                primary={ true }
                href='#/components/button'
              />
              <p>For more information about using components, check out the <a className={ styles.getStartedLink } href='#/components'>components page</a>.</p>
            </li>
            <li>
              <p>If you are using Fabric React components that have icons, you can make all icons available by calling the <code>initializeIcons</code> function from the <code>@uifabric/icons</code> package.</p>
              <CodeBlock language='javascript' isLightTheme={ true }>
                {
                  `import { initializeIcons } from '@uifabric/icons';

// Register icons and pull the fonts from the default SharePoint cdn:
initializeIcons();

// ...or, register icons and pull the fonts from your own cdn:
initializeIcons('https://my.cdn.com/path/to/icons/');`
                }
              </CodeBlock>
              <p>This will make ALL icons in the collection available, but will download them on demand when referenced using the <a className={ styles.getStartedLink } href='#/components/Icon'>Icon component</a>.</p>
            </li>
          </ol>

          <h3>Other ways to get Fabric React</h3>
          <p>For advanced scenarios or alternatives to NPM see the <a className={ styles.getStartedLink } href='https://github.com/OfficeDev/office-ui-fabric-react/blob/master/ghdocs/ADVANCED.md'>advanced documentation in the Fabric React repository</a>.</p>

          <h3>Need a component Fabric React doesn&rsquo;t have?</h3>
          <p>First, check the <a className={ styles.getStartedLink } href='https://github.com/OfficeDev/office-ui-fabric-react/issues'>Fabric React issue queue</a> or <a className={ styles.getStartedLink } href='https://github.com/OfficeDev/office-ui-fabric-react/projects'>projects</a> to see if your component has already been requested or is being worked on. If you don't see an existing issue or project for the component you're looking for, please <a className={ styles.getStartedLink } href='https://github.com/OfficeDev/office-ui-fabric-react/issues'>file an issue in the repo</a>, and we'll respond if it's being built or on our radar.</p>

          <h2 id='core'>Get started with Fabric Core</h2>
          <p>With one reference to our CDN, you can access Fabric&rsquo;s fonts, icons, type styles, colors, grid, and more.</p>

          <ol className={ styles.steps }>
            <li>
              <p>Add the following line to the <code>&lt;head&gt;</code> of your webpage:</p>
              <CodeBlock language='html' isLightTheme={ true }>
                {
                  `<link rel="stylesheet" href="https://static2.sharepointonline.com/files/fabric/office-ui-fabric-core/${corePackageVersion}/css/fabric.min.css">`
                }
              </CodeBlock>
            </li>
            <li>
              <p>Reference core Fabric styles. Add the <code>ms-Fabric</code> class to a containing element, such as <code>&lt;body&gt;</code>, to set the font-family for all Fabric typography classes used within that element.</p>
              <CodeBlock language='html' isLightTheme={ true }>
                {
                  `<body class="ms-Fabric">
  <span class="ms-font-su ms-fontColor-themePrimary">Big blue text</span>
</body>`
                }
              </CodeBlock>
              <p>To reference all the assets available in Fabric Core, see the <a className={ styles.getStartedLink } href='#/styles'>styles page</a>. To use components, see <a className={ styles.getStartedLink } href='#/get-started#react'>Fabric React</a> or <a className={ styles.getStartedLink } href='#/angular-js'>ngOfficeUIFabric</a>.</p>
            </li>
          </ol>

          <h3>Other ways to get Fabric Core</h3>
          <p>You can <a className={ styles.getStartedLink } href='https://github.com/OfficeDev/office-ui-fabric-core/releases'>download a copy of Fabric for your project</a> or <a className={ styles.getStartedLink } href='https://github.com/OfficeDev/office-ui-fabric-core/blob/master/ghdocs/PACKAGES.md'>add it through a package manager</a>. You can also <a className={ styles.getStartedLink } href='https://github.com/OfficeDev/office-ui-fabric-core/blob/master/ghdocs/BUILDING.md'>build your own copy from the source code</a>.</p>

          <h3>Need an icon or feature Fabric Core doesn&rsquo;t have?</h3>
          <p>First, check the <a className={ styles.getStartedLink } href='https://github.com/OfficeDev/office-ui-fabric-react/issues'>Fabric React issue queue</a> or <a className={ styles.getStartedLink } href='https://github.com/OfficeDev/office-ui-fabric-react/projects'>projects</a> to see if your component has already been requested or is being worked on. If you don't see an existing issue or project for the component you're looking for, please <a className={ styles.getStartedLink } href='https://github.com/OfficeDev/office-ui-fabric-react/issues'>file an issue in the repo</a>, and we'll respond if it's being built or on our radar.</p>

          <p className={ styles.trademark }>Usage of Fabric assets, such as fonts and icons, is subject to the <a className={ styles.getStartedLink } href='https://static2.sharepointonline.com/files/fabric/assets/microsoft_fabric_assets_license_agreement_10262017.pdf'>assets license agreement</a>.</p>
        </div>

      </div>
    );
  }

}