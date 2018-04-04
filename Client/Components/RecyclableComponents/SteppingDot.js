import React, { PureComponent }     from 'react';
import PropTypes                from 'prop-types';

export default class SteppingDot extends PureComponent {
  static propTypes = {
    borderRadius: PropTypes.string.isRequired,
    onClick: PropTypes.func.isRequired,
    clicked: PropTypes.bool.isRequired,
    step: PropTypes.number,
  };

  thisOnClick = () => {
    console.log('click stepping dot ', this.props.step);
    this.props.onClick(this.props.step);
  };

  render() {
    const { borderRadius, clicked, onClick } = this.props;
    const opacity = clicked ? 1 : 0.3;
    return (
      <span className="stepping-dot" style={{ borderRadius, opacity }} onClick={ this.thisOnClick }/>
    )
  }
}