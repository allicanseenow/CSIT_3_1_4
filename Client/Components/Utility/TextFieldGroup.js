import React, { Component }       from 'react';
import PropTypes                  from 'prop-types';
import classnames                 from 'classnames';

export default class TextFieldGroup extends Component {
  propTypes = {
    field: PropTypes.string.isRequired,
    value: PropTypes.string.isRequired,
    label: PropTypes.string.isRequired,
    error: PropTypes.string,
    type: PropTypes.string.isRequired,
    onChange: PropTypes.func.isRequired,
    checkUserExists: PropTypes.func,
  };

  defaultProps = {
    type: 'text',
    error: undefined
  };

  render() {
    const { field, value, label, error, type, onChange, checkUserExists } = this.props;
    return (
      <div className={classnames('form-group', {'has-error': error})}>
        <label className="control-label">{label}</label>
        <input
          type={type}
          onChange={onChange}
          onBlur={checkUserExists}
          value={value}
          name={field}
          className="form-control"
        />
        { error && <span className="help-block">{error}</span> }
      </div>
    )
  }
}