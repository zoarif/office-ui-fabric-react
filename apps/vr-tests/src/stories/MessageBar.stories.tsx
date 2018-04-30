/*! Copyright (c) Microsoft Corporation. All rights reserved. Licensed under the MIT license. */
import * as React from 'react';
import Screener, { Steps } from 'screener-storybook/src/screener';
import { storiesOf } from '@storybook/react';
import { FabricDecorator } from '../utilities';
import { MessageBarButton, Link, MessageBar, IMessageBarProps, MessageBarType } from 'office-ui-fabric-react';

let noop = (): void => { /**/ };
// tslint:disable-next-line:max-line-length
let longText = 'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Pellentesque vestibulum tellus at malesuada vestibulum. Pellentesque eget mi sagittis, sagittis nisi a, tristique nisl. Sed sed consequat neque, et dignissim ipsum. Integer in neque vestibulum, aliquet erat nec, vestibulum ex. Nullam et imperdiet lectus. Cras tempus eu tortor a elementum. Proin non justo lacus. Donec tincidunt laoreet malesuada. Class aptent taciti sociosqu ad litora torquent per conubia nostra, per inceptos himenaeos. Aenean augue nisl, lobortis ut sodales eu, convallis in metus.';
let link = <Link href='www.bing.com'>Visit our website</Link>;

storiesOf('MessageBar', module)
  .addDecorator(FabricDecorator)
  .addDecorator(story => (
    <Screener
      steps={ new Steps()
        .snapshot('default', { cropTo: '.testWrapper' })
        .end()
      }
    >
      { story() }
    </Screener>
  ))
  .add('Root', () => (<MessageBar>Info/default message bar. { link }</MessageBar>))
  .add('Root dismiss', () => (
    <MessageBar onDismiss={ noop }>Info/default message bar. { link }</MessageBar>))
  .add('Root truncated', () => (
    <MessageBar truncated={ true } isMultiline={ false }>Blocked lorem ipsum dolor sit amet, consectetur adipiscing elit. Morbi luctus, purus a lobortis tristique, odio augue pharetra metus, ac placerat nunc mi nec dui. Vestibulum aliquam et nunc semper scelerisque. Curabitur vitae orci nec quam condimentum porttitor et sed lacus. Vivamus ac efficitur leo. Cras faucibus mauris libero, ac placerat erat euismod et. Donec pulvinar commodo odio sit amet faucibus. In hac habitasse platea dictumst. Duis eu ante commodo, condimentum nibh pellentesque, laoreet enim. Fusce massa lorem, ultrices eu mi a, fermentum suscipit magna. Integer porta purus pulvinar, hendrerit felis eget, condimentum mauris. { link }</MessageBar>))
  .add('Root actions', () => (
    <MessageBar
      actions={
        <div>
          <MessageBarButton>Yes</MessageBarButton>
          <MessageBarButton>No</MessageBarButton>
        </div>
      }
    >Info/default message bar. { link }
    </MessageBar>))
  .add('Root multiline', () => (<MessageBar isMultiline>Info/default message bar. { longText }</MessageBar>))
  .add('Root overflow', () => (<MessageBar isMultiline={ false }>Info/default message bar. { longText }  </MessageBar>))
  .add('Error', () => (
    <MessageBar messageBarType={ MessageBarType.error }>
      Error message bar. { link }
    </MessageBar>))
  .add('Blocked', () => (
    <MessageBar messageBarType={ MessageBarType.blocked }>
      Blocked message bar. { link }
    </MessageBar>))
  .add('Severe Warning', () => (
    <MessageBar messageBarType={ MessageBarType.severeWarning }>
      Severe Warning message bar. { link }
    </MessageBar>))
  .add('Success', () => (
    <MessageBar messageBarType={ MessageBarType.success }>
      Success message bar. { link }
    </MessageBar>))
  .add('Warning', () => (
    <MessageBar messageBarType={ MessageBarType.warning }>
      Warning message bar. { link }
    </MessageBar>));