import React, { Component }                           from "react";
import { InputNumber, Button }                        from 'antd';
import ButtonRow                                      from "./ButtonRow";

export default class CostBar extends Component {
  state = {
    fromCost: this.props.value && this.props.value[0] || 0,
    toCost:  this.props.value && this.props.value[1] || 0,
  };

  componentDidMount() {
    document.addEventListener("keydown", this.onKeyDown, false);
  }

  componentWillUnmount() {
    document.removeEventListener("keydown", this.onKeyDown, false);
  }

  onClick = (e) => {
    if (e.target === this.putt) {
      const { fromCost, toCost } = this.state;
      this.props.onCostChange([fromCost, toCost]);
    }
  };

  onClickCancel = () => {
    this.props.onBlur('cost', false);
  };

  onClickSave = () => {
    const { fromCost, toCost } = this.state;
    this.props.onCostChange([fromCost, toCost]);
  };

  /**
   * Check if user presses "esc". If user does, exit this pop-up
   * @param e
   */
  onKeyDown = (e) => {
    // If "esc" button is pressed
    if (e.keyCode === 27) {
      this.props.onBlur('cost', false);
    }
  };

  onChange = (value) => {
    this.props.onCostChange(value);
  };

  onChangeFromCost = (value) => {
    this.setState({ fromCost: value });
  };

  onChangeToCost= (value) => {
    this.setState({ toCost: value });
  };

  render() {
    const { fromCost, toCost } = this.state;
    return (
      <div className="pop-up" onClick={this.onClick} ref={(input) => this.putt = input}>
        <div className="pop-up_inner pop-up_inner-top">
          <div className="pop-up_inner_content" style={{textAlign: "left"}}>
            <div>
              <div className="popUp_cost-bar_title">
                <label>From</label>
              </div>
              <InputNumber
                formatter={(value) => `$ ${value}`.replace(/\B(?=(\d{3})+(?!\d))/g, ',')}
                parser={value => value.replace(/\$\s?|(,*)/g, '')}
                onChange={this.onChangeFromCost}
                className="popUp_cost-bar"
                min={0}
                max={toCost}
                step={10}
                defaultValue={fromCost}
              />
            </div>
            <div>
              <div className="popUp_cost-bar_title">
                <label>To</label>
              </div>
              <InputNumber
                formatter={(value) => `$ ${value}`.replace(/\B(?=(\d{3})+(?!\d))/g, ',')}
                parser={value => value.replace(/\$\s?|(,*)/g, '')}
                onChange={this.onChangeToCost}
                className="popUp_cost-bar"
                min={fromCost}
                step={10}
                defaultValue={toCost}
              />
            </div>
            <div style={{fontSize: "11px", paddingTop: "10px"}}>Note: "from" should have a smaller value than "to"</div>
            <ButtonRow
              onClickCancel={this.onClickCancel}
              onClickSave={this.onClickSave}
            />
          </div>
        </div>
      </div>
    )
  }
}