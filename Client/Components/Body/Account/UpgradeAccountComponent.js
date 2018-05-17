import React, { Component }                 from 'react';
import { Grid, Row, Col }                   from 'react-bootstrap';
import { Button, Modal }                    from 'antd';
import TextFieldGroup                       from '../../Utility/TextFieldGroup';
import UploadImageComponent                 from '../CarListing/UploadImageComponent';
import ErrorNotificationBox                 from '../../RecyclableComponents/ErrorNotificationBox';
import Loading                              from '../../RecyclableComponents/Loading';
import PropTypes from "prop-types";

export default class UpgradeAccountComponent extends Component {
  static propTypes = {
    submitError: PropTypes.string,
  };

  state = {
    startLoading: false,
    successMessage: false,
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
              <Col lg={3} md={2}/>
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

  static getDerivedStateFromProps(nextProps, prevState) {
    if (nextProps.showSuccessBanner && !prevState.showSuccessBanner) {
      return { startLoading: true };
    }
    return null;
  }

  componentDidUpdate(prevProps, prevState, prevContext) {
    if (!prevState.startLoading && this.state.startLoading) {
      window.setTimeout(() => {
        this.setState({ successMessage: true }, () => {
          window.setTimeout(() => window.location = "/", 4000);
        });
      }, 4000);
    }
  }

  render() {
    const { carListingDetail, onChange, onBlur, onSubmit, errors, submitError, submitting, onImageChange, showSuccessBanner } = this.props;
    const { successMessage } = this.state;
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
                      { !submitError && showSuccessBanner && (
                        <Modal
                          visible={showSuccessBanner}
                          title="Processing request"
                          footer={null}
                          closable={false}
                        >
                          { !successMessage && (
                            <Loading/>)
                          || (
                            <div style={{ width: "100%", textAlign: "center" }}>
                              <div
                                style={{fontSize: "4em", color: "green"}}
                              >
                                <i className="far fa-check-circle"/>
                              </div>
                              <h3>Congratulations, you have become a car owner</h3>
                              <div>Redirect to the home page in 4 seconds</div>
                            </div>
                          )}
                        </Modal>
                      )}
                    </Col>
                  </Row>
                </div>
              </div>
              { this.renderHeader(1, 'Enter your car details') }
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
              { this.renderHeader(2, 'Car image') }
              <div className="form-inner-col-field">
                <div className="form_image_contents">
                  <div className="has-error">
                    <UploadImageComponent onChange={onImageChange} maximumImageAllowed={1}/>
                    { errors && errors.fileList && <span className="help-block">{errors.fileList}</span> }
                  </div>
                </div>
              </div>
              { this.renderHeader(3, 'Enter your billing detail') }
              <Col sm={8} xs={12} className="form-inner-col-field">
                <div className="form-inner-col-field">
                  <div className="form_details_contents">
                    { this.renderTextFieldGroup('bsb', carListingDetail.bsb, 'BSB number', onChange, onBlur, errors.bsb) }
                    { this.renderTextFieldGroup('accountNumber', carListingDetail.accountNumber, 'Bank account number', onChange, onBlur, errors.accountNumber) }
                    { this.renderTextFieldGroup('bankAccountName', carListingDetail.bankAccountName, 'Bank account name', onChange, onBlur, errors.bankAccountName) }
                  </div>
                </div>
              </Col>
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
