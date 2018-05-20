import React, { Component }                   from "react";
import { DatePicker }                         from 'antd';
import ButtonRow                              from "./ButtonRow";
import TextFieldGroup                         from '../../Utility/TextFieldGroup';

export default class MoreFilter extends Component {
  state = {
    brand: '',
    model: '',
    transmission: '',
    odometer: '',
    year: '',
    rego: '',
    colour: '',
    hasMoreFilter: false,
  };

  onChange = (event) => {
    this.setState({ [event.target.name]: event.target.value });
  };

  onClickCancel = () => {
    this.props.onBlur('moreFilter', false);
  };

  saveFormResult = () => {
    const { hasMoreFilter, ...restFilter } = this.state;
    const result = { hasMoreFilter: false };
    _.forEach(restFilter, (value, key) => {
      if (!_.isEmpty(value && value.trim())) {
        result[key] = value;
        result['hasMoreFilter'] = true;
      }
    });
    this.props.onFilterChange(result);
  };

  onClickSave = () => {
    this.saveFormResult();
  };

  onKeyDown = (e) => {
    // If "esc" button is pressed
    if (e.keyCode === 27) {
      this.props.onBlur('moreFilter', false);
    }
  };

  onClickOutside = (e) => {
    if (e.target === this.putt) {
      this.saveFormResult();
    }
  };

  renderTextFieldGroup = (field, value, label, onChange, onBlur, error, placeholder, type) => {
    return (
      <TextFieldGroup key={`TextFieldGroup-${field}`} field={field} value={value} label={label} onChange={onChange} onBlur={onBlur} error={error} type={type} placeholder={placeholder}/>
    )
  };

  componentWillMount() {
    this.setState({
      ...this.props.value
    })
  }

  componentDidMount() {
    document.addEventListener("keydown", this.onKeyDown, false);
  }

  componentWillUnmount() {
    document.removeEventListener("keydown", this.onKeyDown, false);
  }

  render() {
    const { brand, model, transmission , odometer, year, rego, colour } = this.state;
    const { onChange } = this;
    return (
      <div className="pop-up" onClick={this.onClickOutside} ref={(input) => this.putt = input}>
        <div className="pop-up_inner pop-up_inner-top" style={{}}>
          <div className="pop-up_inner_content">
            <div>
              { this.renderTextFieldGroup('brand', brand, 'Brand name', onChange) }
              { this.renderTextFieldGroup('model', model, 'Model', onChange) }
              { this.renderTextFieldGroup('transmission ', transmission , 'Transmission', onChange) }
              { this.renderTextFieldGroup('odometer', odometer, 'Odometer', onChange) }
              { this.renderTextFieldGroup('year', year, 'Year', onChange, null, null, 'YYYY') }
              { this.renderTextFieldGroup('rego', rego, 'Rego', onChange) }
              { this.renderTextFieldGroup('colour', colour, 'Colour', onChange) }
            </div>
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