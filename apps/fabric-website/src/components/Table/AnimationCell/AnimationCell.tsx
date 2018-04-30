import * as React from 'react';
import '../../../pages/Styles/AnimationsPage/AnimationsPage.scss';

export interface IAnimationCellProps {
  data: any;
}

export class AnimationCell extends React.Component<IAnimationCellProps, {}> {
  constructor(props: IAnimationCellProps) {
    super(props);
  }

  public render(): JSX.Element {
    const name = this.props.data[0].value;
    const animClass = this.props.data[1].value;

    return (
      <div className={ `AnimationExample ${animClass}` }
        data-class={ animClass }
        aria-label={ `Visual Animation Example for ${name}` }
        onClick={ this._doAnimation }
      >
        <div className='AnimationExample-content' aria-hidden='true'>
          <hr />
          <hr />
          <hr />
          <hr />
          <hr />
          <hr />
          <hr />
        </div>
        <div className='animationExample_panel ms-bg-color-themePrimary' data-class={ animClass } />
      </div>
    );
  }

  // Apply animation to animation cell
  private _doAnimation(e): void {
    const cell = e.currentTarget;
    const panel = cell.getElementsByClassName('animationExample_panel')[0];
    const animClass = cell.getAttribute('data-class');
    panel.classList.add(animClass);
    setTimeout(() => {
      panel.classList.remove(animClass);
    }, 1000);
  }
}
