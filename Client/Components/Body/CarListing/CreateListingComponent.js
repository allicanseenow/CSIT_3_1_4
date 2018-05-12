import React, { Component }                 from 'react';
import PropTypes                            from 'prop-types';
import { Grid, Row, Col }                   from 'react-bootstrap';
import { Link }                             from 'react-router-dom';
import { Button, DatePicker, Radio }        from 'antd';
import moment                               from 'moment';
import TextFieldGroup                       from '../../Utility/TextFieldGroup';
import ErrorNotificationBox                 from '../../RecyclableComponents/ErrorNotificationBox';

const { RangePicker } = DatePicker;
const RadioButton = Radio.Button;
const RadioGroup = Radio.Group;

export default class CreateListingComponent extends Component {
  static propTypes = {
    carListingDetail: PropTypes.object.required,
    onCalendarChange: PropTypes.func.isRequired,
    submitError: PropTypes.string,
    defaultCalendarValue: PropTypes.object,
    editCarMode: PropTypes.bool,
  };

  static defaultProps = {
    defaultCalendarValue: null,
    disableSelectCarFromList: false,
  };

  renderTextFieldGroup = (field, value, label, onChange, onBlur, error, placeholder, type) => {
    return (
      <TextFieldGroup key={`TextFieldGroup-${field}`} field={field} value={value} label={label} onChange={onChange} onBlur={onBlur} error={error} type={type} placeholder={placeholder}/>
    )
  };



  renderCarSelection = (cars) => {
    return (
      <div>
        <label className="control-label textField-label">Or select one from your car list</label>
        <RadioGroup onChange={this.props.onSelectCar} className="createListing_selectCar_wrapper" name="rego" value={this.props.selectedCar}>
          { _.map(cars, (car) => {
            const { brand, capacity, model, colour, img, rego, location, transType, year } = car;
            return (
              <div className="display-car-listing-collection createListing_selectCar" key={`car-listing-id-${rego}`}>
                <RadioButton value={rego} className="createListing_selectCar_content">
                  <div>
                    <Row className="display-car-listing-collection_block vertical-align">
                      <Col xs={3} className="display-car-listing-collection_block_cell">
                        <div className="display-car-listing-collection_img" style={{ backgroundImage: `url(api/${img})` }} />
                      </Col>
                      <Col xs={2}/>
                      <Col xs={6} className="display-car-listing-collection_block_cell">
                        <div style={{display: "table"}}>
                          <div><b>Brand:</b> {brand}</div>
                          <div><b>Model:</b> {model}</div>
                          <div><b>Colour:</b> {colour}</div>
                        </div>
                      </Col>
                    </Row>
                  </div>
                </RadioButton>
              </div>
            )
          })}
        </RadioGroup>
      </div>
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

  disabledDate = (current) => {
    return current < moment().startOf('day');
  };

  render() {
    const { carListingDetail, onChange, onBlur, onSubmit, errors, submitError, submitting, onCalendarChange, editCarMode } = this.props;
    const { time, rego, cars } = carListingDetail;
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
              { !editCarMode && (
                <div>
                  { this.renderHeader(1, 'Select a car') }
                  <Col sm={8} xs={12} className="form-inner-col-field">
                    <div className="form_details_contents">
                      <div>
                        { this.renderTextFieldGroup('rego', carListingDetail.rego, 'Enter the rego of the car', onChange, onBlur, errors.rego) }
                        { this.renderCarSelection(cars) }
                      </div>
                    </div>
                  </Col>
                </div>
              )}
              { this.renderHeader(!editCarMode ? 2 : 1, 'Available date range for the listing') }
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
                        disabledDate={this.disabledDate}
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
          <Col smOffset={1} sm={11}>
            { editCarMode && (
              <div>
                <Link to="/car-listings">
                  Return to the car listing page
                </Link>
              </div>
            )}
          </Col>
        </Grid>
      </div>
    )
  }
}