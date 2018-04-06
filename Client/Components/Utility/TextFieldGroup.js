import React, { PureComponent }       from 'react';
import PropTypes                  from 'prop-types';
import classnames                 from 'classnames';

export default class TextFieldGroup extends PureComponent {
  static propTypes = {
    field: PropTypes.string.isRequired,
    value: PropTypes.string.isRequired,
    label: PropTypes.string.isRequired,
    error: PropTypes.string,
    placeholder: PropTypes.string,
    type: PropTypes.string.isRequired,
    onChange: PropTypes.func.isRequired,
    onBlur: PropTypes.func,
  };

  static defaultProps = {
    type: 'text',
    error: undefined
  };

  render() {
    const { field, value, label, error, placeholder, type, onChange, onBlur } = this.props;
    return (
      <div className={ classnames('form-group', {'has-error': error })}>
        <label className="control-label">{label}</label>
        <input
          type={type}
          onChange={onChange}
          onBlur={onBlur}
          value={value}
          name={field}
          placeholder={placeholder}
          className="form-control"
        />
        { error && <span className="help-block">{error}</span> }
      </div>
    )
  }
}