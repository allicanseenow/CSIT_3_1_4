import React, { Component }                 from 'react';
import PropTypes                            from 'prop-types';
import TextFieldGroup                       from '../../Utility/TextFieldGroup';
import Calendar                             from '../../RecyclableComponents/Calendar';

export default class CreateListingComponent extends Component {
  static propTypes = {
    carListingDetail: PropTypes.object.required,
    onCalendarChange: PropTypes.func.isRequired,
  };

  renderTextFieldGroup = (field, value, label, onChange, onBlur, error, placeholder, type) => {
    return (
      <TextFieldGroup key={`TextFieldGroup-${field}`} field={field} value={value} label={label} onChange={onChange} onBlur={onBlur} error={error} type={type} placeholder={placeholder}/>
    )
  };

  render() {
    const { carListingDetail, onChange, onBlur, errors, onCalendarChange } = this.props;
    return (
      <div className="form-container">
        <div className="form_details_header">

        </div>
        <div className="form_details_contents">
          <div>
            <form>
              { this.renderTextFieldGroup('brandName', carListingDetail.brandName, 'Brand name', onChange, onBlur, errors.brandName) }
              { this.renderTextFieldGroup('model', carListingDetail.model, 'Model', onChange, onBlur, errors.model) }
              { this.renderTextFieldGroup('transmission', carListingDetail.transmission, 'Transmission', onChange, onBlur, errors.transmission) }
              { this.renderTextFieldGroup('odometer', carListingDetail.odometer, 'Odometer', onChange, onBlur, errors.odometer) }
              { this.renderTextFieldGroup('year', carListingDetail.year, 'Year', onChange, onBlur, errors.year, 'YYYY') }
              { this.renderTextFieldGroup('rego', carListingDetail.rego, 'Rego', onChange, onBlur, errors.rego) }
              <Calendar
                calendarName="startDate"
                onChange={onCalendarChange}
                value={carListingDetail.startDate}
                showDateInput
              />
            </form>
          </div>
        </div>
      </div>
    )
  }
}