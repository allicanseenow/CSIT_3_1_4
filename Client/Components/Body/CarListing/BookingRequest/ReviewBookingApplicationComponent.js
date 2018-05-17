import React, { Component }                                       from 'react';
import { List }                                                   from 'antd';

export default class ReviewBookingApplicationComponent extends Component {
  showHeader = () => {
    return (
      <div className="display-car-listing-collection_header">
        <div className="display-car-listing-collection_header_title">
          <div className="display-car-listing-collection_header_title_cell">
            <div className="display-car-listing-collection_header_title_cell_word">
              <h3 className="display-car-listing-collection_header_title_cell_word_h3">
                All booking requests for this car listing
              </h3>
            </div>
          </div>
        </div>
      </div>
    )
  };

  showBody = () => {
    const data = this.state;
    return (
      <div>
        <List
          bordered
          dataSource={data}
          renderItem={item => (<List.Item>{item}</List.Item>)}
        />
      </div>
    )
  };

  render() {
    return (
      <div className="display-car-listing-collection">
        { this.showHeader() }
      </div>
    )
  }
}