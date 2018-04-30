
import * as React from 'react';
import { Icon, IIconProps } from 'office-ui-fabric-react/lib/Icon';
import { css } from 'office-ui-fabric-react/lib/Utilities';
import { Signal, ISignalProps } from './Signal';
import * as SignalsStyles from './Signals.scss';
import * as SignalStyles from './Signal.scss';

export * from './Signal';
export * from './SignalField';

export const YouCheckedOutSignal: Signal = (props: ISignalProps): JSX.Element => {
  return (
    <IconSignal
      { ...props }
      signalClass={ SignalsStyles.youCheckedOut }
      iconName='checkedoutbyyou12'
    />
  );
};

export const BlockedSignal: Signal = (props: ISignalProps): JSX.Element => {
  return (
    <IconSignal
      { ...props }
      signalClass={ SignalsStyles.blocked }
      iconName='blocked12'
    />
  );
};

export const MissingMetadataSignal: Signal = (props: ISignalProps): JSX.Element => {
  return (
    <IconSignal
      { ...props }
      signalClass={ SignalsStyles.missingMetadata }
      iconName='info'
    />
  );
};

export const WarningSignal: Signal = (props: ISignalProps): JSX.Element => {
  return (
    <IconSignal
      { ...props }
      signalClass={ SignalsStyles.warning }
      iconName='warning12'
    />
  );
};

export const AwaitingApprovalSignal: Signal = (props: ISignalProps): JSX.Element => {
  return (
    <IconSignal
      { ...props }
      signalClass={ SignalsStyles.awaitingApproval }
      iconName='clock'
    />
  );
};

export const TrendingSignal: Signal = (props: ISignalProps): JSX.Element => {
  return (
    <IconSignal
      { ...props }
      signalClass={ SignalsStyles.trending }
      iconName='market'
    />
  );
};

export const SomeoneCheckedOutSignal: Signal = (props: ISignalProps): JSX.Element => {
  return (
    <IconSignal
      { ...props }
      signalClass={ SignalsStyles.someoneCheckedOut }
      iconName='checkedoutbyother12'
    />
  );
};

export const RecordSignal: Signal = (props: ISignalProps): JSX.Element => {
  return (
    <IconSignal
      { ...props }
      signalClass={ SignalsStyles.record }
      iconName='lock'
    />
  );
};

/**
 * Renders a signal marking the proceeding content as new.
 */
export const NewSignal: Signal = (props: ISignalProps): JSX.Element => {
  const {
    ariaLabel,
    ...spanProps
  } = props;

  return (
    <span
      { ...spanProps }
      className={ css(SignalStyles.signal, SignalsStyles.newSignal) }
    >
      <Icon
        ariaLabel={ props.ariaLabel }
        className={ css(SignalsStyles.newIcon) }
        iconName='glimmer'
      />
    </span>
  );
};

/**
 * Renders a signal for a live-edit scenario.
 */
export const LiveEditSignal: Signal = (props: ISignalProps): JSX.Element => {
  const {
    className,
    ...spanProps
  } = props;

  return (
    <Signal
      className={ css(className, SignalsStyles.liveEdit) }
      { ...spanProps }
    />
  );
};

export const MentionSignal: Signal = (props: ISignalProps): JSX.Element => {
  return (
    <IconSignal
      { ...props }
      signalClass={ SignalsStyles.mention }
      iconName='accounts'
    />
  );
};

/**
 * Renders a signal for a number of comments.
 */
export const CommentsSignal: Signal = (props: ISignalProps): JSX.Element => {
  const {
    ariaLabel,
    className,
    children,
    ...spanProps
  } = props;

  return (
    <Signal
      className={ css(SignalsStyles.comments, className) }
      { ...spanProps }
    >
      <Icon
        ariaLabel={ props.ariaLabel }
        className={ css(SignalsStyles.commentsIcon) }
        iconName='MessageFill'
      />
      {
        children ? (
          <span className={ css(SignalsStyles.commentsCount) }>
            { children }
          </span>
        ) : null
      }
    </Signal>
  );
};

/**
 * Renders a signal for a number of comments.
 */
export const UnseenReplySignal: Signal = (props: ISignalProps): JSX.Element => {
  return (
    <IconSignal
      { ...props }
      signalClass={ SignalsStyles.unseenReply }
      iconName='commentprevious'
    />
  );
};

export const UnseenEditSignal: Signal = (props: ISignalProps): JSX.Element => {
  return (
    <IconSignal
      { ...props }
      signalClass={ SignalsStyles.unseenEdit }
      iconName='edit'
    />
  );
};

export const ReadOnlySignal: Signal = (props: ISignalProps): JSX.Element => {
  return (
    <IconSignal
      { ...props }
      signalClass={ SignalsStyles.readOnly }
      iconName='uneditablesolid12'
    />
  );
};

export const EmailedSignal: Signal = (props: ISignalProps): JSX.Element => {
  return (
    <IconSignal
      { ...props }
      signalClass={ SignalsStyles.emailed }
      iconName='mail'
    />
  );
};

export const SharedSignal: Signal = (props: ISignalProps): JSX.Element => {
  return (
    <IconSignal
      { ...props }
      signalClass={ SignalsStyles.shared }
      iconName='people'
    />
  );
};

export const MalwareDetectedSignal: Signal = (props: ISignalProps): JSX.Element => {
  return (
    <IconSignal
      { ...props }
      signalClass={ SignalsStyles.malwareDetected }
      iconName='BlockedSite'
    />
  );
};

export const ATPSignal: Signal = MalwareDetectedSignal; // TODO Delete on next major version.

/**
 * Renders a signal for an external item.
 */
export const ExternalSignal: Signal = (props: ISignalProps): JSX.Element => {
  return (
    <IconSignal
      { ...props }
      signalClass={ SignalsStyles.external }
      iconName='Globe'
    />
  );
};

type IIconSignalProps = ISignalProps & Pick<IIconProps, 'iconName'> & {
  /**
   * The class name to use for the Signal type.
   */
  signalClass: string;
};

/**
 * Renders a signal as just an Icon. This is the simplest Signal case.
 */
function IconSignal(props: IIconSignalProps): JSX.Element { // tslint:disable-line:function-name
  const {
    ariaLabel,
    className,
    signalClass,
    ...spanProps
  } = props;

  return (
    <Icon
      { ...spanProps }
      ariaLabel={ props.ariaLabel }
      className={ css(SignalStyles.signal, signalClass, className) }
    />
  );
}
