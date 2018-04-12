import React, { Component }                                       from 'react';
import { Link }                                                   from 'react-router-dom';
import { Grid, Row, Col }                                         from 'react-bootstrap';

export default class Footer extends Component {
  render() {
    return (
      <footer className="footer">
        <div className="footer-top">
          <Grid>
            <Row>
              <Col xs={12} sm={4}>
                <h4>Introduction</h4>
                <p>This is a group project<br/>
                  Empowered by Spark and ReactJS</p>
              </Col>
              <Col xs={6} sm={4} smOffset={1}>
                <h4>Learn more</h4>
                <ul>
                  <li><Link to="/about-us">About us</Link></li>
                  <li><Link to="/#">Contact us</Link></li>
                </ul>
              </Col>
              <Col xs={6} sm={3}>
                <h4>Follow us</h4>
                <ul>
                  <li><a href="https://facebook.com">Facebook</a></li>
                  <li><a href="https://twitter.com">Twitter</a></li>
                </ul>
              </Col>
            </Row>
          </Grid>
        </div>
        <div className="footer-bottom">
          <Grid>
            <div className="pull-left">
              Copyright: Group 25
            </div>
          </Grid>
        </div>
      </footer>
    )
  }
}