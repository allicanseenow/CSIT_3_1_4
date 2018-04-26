import React, { Component }                 from 'react';
import PropTypes                            from 'prop-types';
import { Grid, Row, Col }                   from 'react-bootstrap';
import { Button }                           from 'antd';
import TextFieldGroup                       from '../../Utility/TextFieldGroup';
// import RangeCalendar                        from './RangeCalendar';
import UploadImageComponent                 from './UploadImageComponent';

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

  renderHeader = (index, title) => {
    return (
      <div key={`header-title-${index}`} className="form_details_header">
        <div className="">
          <Grid fluid className="form-header">
            <Row>
              <Col lg={7} md={8} className="form-title">
                <div className="form-row">
                  <span className="form-number">{index}</span>
                  <h2 className="text-large inner-form-title">{title}</h2>
                </div>
              </Col>
              <Col lg={3} md={2}>

              </Col>
            </Row>
            <Row>
              <Col md={10} sm={10} xs={12}>
                <hr className="inner-form-hr"/>
              </Col>
            </Row>
          </Grid>
        </div>
      </div>
    )
  };

  render() {
    const { carListingDetail, onChange, onBlur, onSubmit, errors, onImageChange } = this.props;
    return (
      <div className="form-container">
        <Grid fluid>
          <Col smOffset={1} sm={11}>
            <form onSubmit={onSubmit}>
              { this.renderHeader(1, 'Car listing details') }
              <Col sm={8} xs={12} className="form-inner-col-field">
                <div className="form_details_contents">
                  <div>
                    { this.renderTextFieldGroup('brandName', carListingDetail.brandName, 'Brand name', onChange, onBlur, errors.brandName) }
                    { this.renderTextFieldGroup('model', carListingDetail.model, 'Model', onChange, onBlur, errors.model) }
                    { this.renderTextFieldGroup('transmission', carListingDetail.transmission, 'Transmission', onChange, onBlur, errors.transmission) }
                    { this.renderTextFieldGroup('odometer', carListingDetail.odometer, 'Odometer', onChange, onBlur, errors.odometer) }
                    { this.renderTextFieldGroup('year', carListingDetail.year, 'Year', onChange, onBlur, errors.year, 'YYYY') }
                    { this.renderTextFieldGroup('rego', carListingDetail.rego, 'Rego', onChange, onBlur, errors.rego) }
                    { this.renderTextFieldGroup('location', carListingDetail.location, 'Location', onChange, onBlur, errors.location) }
                    { this.renderTextFieldGroup('colour', carListingDetail.colour, 'Colour', onChange, onBlur, errors.colour) }
                    { this.renderTextFieldGroup('capacity', carListingDetail.capacity, 'Capacity', onChange, onBlur, errors.capacity) }
                  </div>
                </div>
              </Col>
              {/* We skip the available dates for now */}
              {/*{ this.renderHeader(2, 'Available dates') }*/}
              {/*<Col sm={8} xs={12} className="form-inner-col-field">*/}
                {/*<div className="form_details_contents">*/}
                  {/*<RangeCalendar*/}
                    {/*onChange={onCalendarChange}*/}
                    {/*startValue={carListingDetail.startAvailableDate}*/}
                    {/*endValue={carListingDetail.endAvailableDate}*/}
                    {/*showDateInput*/}
                  {/*/>*/}
                {/*</div>*/}
              {/*</Col>*/}
              { this.renderHeader(2, 'Car image') }
              <div className="form-inner-col-field">
                <div className="form_image_contents"><UploadImageComponent onChange={onImageChange} maximumImageAllowed={1}/></div>
              </div>
              <Col smOffset={3} xsOffset={5} xs={2} className="form-inner-col-field">
                <div className="form_details_contents">
                  <Button htmlType="submit" type="primary">Submit</Button>
                </div>
              </Col>
            </form>
          </Col>
        </Grid>
      </div>
    )
  }
}