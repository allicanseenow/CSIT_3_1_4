import React, { Component }                 from 'react';
import PropTypes                            from 'prop-types';
import { Grid, Row, Col }                         from 'react-bootstrap';
import TextFieldGroup                       from '../../Utility/TextFieldGroup';
import RangeCalendar                        from './RangeCalendar';

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
          <div className="">
            <Grid fluid className="form-header">
              <Row>
                <Col lg={7} md={8} className="form-title">
                  <div className="form-row">
                    <span className="form-number">1</span>
                    <h2 className="text-large inner-form-title">Enter detail</h2>
                  </div>
                </Col>
                <Col lg={3} md={2}>

                </Col>
              </Row>
              <Row>
                <Col md={10}>
                  <hr className="inner-form-hr"/>
                </Col>
              </Row>
            </Grid>
          </div>
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
              <RangeCalendar
                onChange={onCalendarChange}
                startValue={carListingDetail.startAvailableDate}
                endValue={carListingDetail.endAvailableDate}
                showDateInput
              />
            </form>
          </div>
        </div>
      </div>
    )
  }
}