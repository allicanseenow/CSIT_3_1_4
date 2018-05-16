import React, { PureComponent } from 'react';
import { Spin }                 from 'antd';

export default class Loading extends PureComponent {
  makeLoading = () => {
    const loadingIcons = [];
    for (let i = 0; i < 3; ++i) {
      loadingIcons[i] = (
        <Spin size="default" key={i}/>
      );
    }
    return loadingIcons;
  };
  
  render() {
    return (
      <div className="centered-loading">
        { this.makeLoading() }
      </div>
    )
  }
}