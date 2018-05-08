import React, { Component }                 from 'react';
import PropTypes                            from 'prop-types';
import { Grid, Row, Col }                   from 'react-bootstrap';
import { Button, DatePicker }               from 'antd';
import TextFieldGroup                       from '../../Utility/TextFieldGroup';
import ErrorNotificationBox                 from '../../RecyclableComponents/ErrorNotificationBox';

const { RangePicker } = DatePicker;

export default class CreateListingComponent extends Component {
  static propTypes = {
    carListingDetail: PropTypes.object.required,
    onCalendarChange: PropTypes.func.isRequired,
    submitError: PropTypes.string,
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
    const { carListingDetail, onChange, onBlur, onSubmit, errors, submitError, submitting, onCalendarChange } = this.props;
    const { time, rego } = carListingDetail;
    return (
      <div className="form-container">
        <Grid fluid>
          <Col smOffset={1} sm={11}>
            <form onSubmit={onSubmit}>
              <div className="form_details_header">
                <div className="form-header">
                  <Row>
                    <Col sm={10} xs={12}>
                      { submitError && (
                        <ErrorNotificationBox>
                          <span>{submitError}</span>
                        </ErrorNotificationBox>
                      )}
                    </Col>
                  </Row>
                </div>
              </div>
              { this.renderHeader(1, 'Select a car') }
              <Col sm={8} xs={12} className="form-inner-col-field">
                <div className="form_details_contents">
                  <div>
                    { this.renderTextFieldGroup('rego', carListingDetail.rego, 'Rego', onChange, onBlur, errors.rego) }
                  </div>
                </div>
              </Col>
              { this.renderHeader(2, 'Available date range for the listing') }
              <div className="form-inner-col-field">
                <div className="form_image_contents">
                  <div className={`form-group ${errors && errors.time ? 'has-error': ''}`}>
                    <label className="control-label textField-label">From - To</label>
                    <div style={{display: "block"}}>
                      <RangePicker
                        format="DD-MM-YYYY"
                        showTime
                        value={time}
                        onChange={onCalendarChange}
                      />
                    </div>
                    <div>
                      { errors && errors.time && <span className="help-block">{errors.time}</span> }
                    </div>
                  </div>
                </div>
              </div>
              <Col smOffset={3} xsOffset={5} xs={2} className="form-inner-col-field">
                <div className="form_details_contents">
                  <Button loading={submitting} htmlType="submit" type="primary">Submit</Button>
                </div>
              </Col>
            </form>
          </Col>
        </Grid>
      </div>
    )
  }
}