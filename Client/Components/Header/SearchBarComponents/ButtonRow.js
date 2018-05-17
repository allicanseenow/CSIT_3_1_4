import React, { Component }                   from "react";
import PropTypes                              from 'prop-types';
import { Button }                             from "antd";

export default class ButtonRow extends Component {
  static propTypes = {
    onClickCancel: PropTypes.func.isRequired,
    onClickSave: PropTypes.func.isRequired,
  };

  render() {
    const { onClickCancel, onClickSave } = this.props;
    return (
      <div className="pop-up_inner_content_button_wrapper">
        <Button onClick={onClickCancel} className="pull-left pop-up_inner_content_button pop-up_inner_content_button-danger">Cancel</Button>
        <Button onClick={onClickSave} className="pull-right pop-up_inner_content_button pop-up_inner_content_button-save">Save</Button>
      </div>
    )
  }
}