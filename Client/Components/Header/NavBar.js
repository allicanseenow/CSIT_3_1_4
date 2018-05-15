import React, { Component }                                       from 'react';
import { Link, Switch, Route }                                                   from 'react-router-dom';
import { NavDropdown, Navbar, Nav, MenuItem, NavItem, Badge }     from 'react-bootstrap'
import { LinkContainer }                                          from 'react-router-bootstrap';
import { withRouter }                                             from 'react-router-dom';
import PropTypes                                                  from "prop-types";

class CustomNavBar extends Component {
  static propTypes = {
    username: PropTypes.string.isRequired,
    type: PropTypes.string.isRequired,
    loggedIn: PropTypes.bool.isRequired,
  };

  logOutAction = () => {
    localStorage.removeItem('localToken');
    window.location = "/";
  };

  renderSearchBar = () => {
    return (
      <Nav key="search-box" className="searchBox-nextTo-header">
        <NavItem>
          <form className="search-box">
            <input type="text" className="textbox" placeholder="Search"/>
            <button title="Search" type="submit" className="button"><i className="fas fa-search "/></button>
          </form>
        </NavItem>
      </Nav>
    )
  };

  renderRenterBar = () => {
    return (
      <Nav key="Profile">
        <NavDropdown title={this.props.username} id="basic-nav-dropdown">
          <LinkContainer to="/profile"><MenuItem>My profile</MenuItem></LinkContainer>
          <LinkContainer to="/upgrade-account"><MenuItem>Upgrade Account</MenuItem></LinkContainer>
          <MenuItem onSelect={this.logOutAction}>Logout</MenuItem>
        </NavDropdown>
      </Nav>
    )
  };

  renderOwnerBar = () => {
    return (
      <Nav key="Profile">
        <NavDropdown title={this.props.username} id="basic-nav-dropdown">
          <LinkContainer to="/profile"><MenuItem>My profile</MenuItem></LinkContainer>
          <LinkContainer to="/create-car"><MenuItem>Add new car</MenuItem></LinkContainer>
          <LinkContainer to="/create-car-listing"><MenuItem>Create new car listing</MenuItem></LinkContainer>
          <LinkContainer to="/car-listings"><MenuItem>My car listing</MenuItem></LinkContainer>
          <MenuItem onSelect={this.logOutAction}>Logout</MenuItem>
        </NavDropdown>
      </Nav>
    )
  };

  renderAdminBar = () => {
    return (
      <Nav key="Profile">
        <NavDropdown title={this.props.username} id="basic-nav-dropdown">
          <LinkContainer to="/profile"><MenuItem>My profile</MenuItem></LinkContainer>
          <LinkContainer to="/car-listings"><MenuItem>My car listing</MenuItem></LinkContainer>
          <MenuItem onSelect={this.logOutAction}>Logout</MenuItem>
        </NavDropdown>
      </Nav>
    )
  };

  renderNotRegisteredUserBar = () => {
    return (
      <Nav key="NonRegistered">
        <LinkContainer key={0} to="/about"><NavItem name="About">About</NavItem></LinkContainer>
        <LinkContainer key={1} to="/register"><NavItem name="Join now">Join now</NavItem></LinkContainer>
        <LinkContainer key={2} to="/login"><NavItem name="Log in">Log in</NavItem></LinkContainer>
      </Nav>
    )
  };

  render() {
    const { name, type, loggedIn } = this.props;
    let loginDisplay = null;
    if (loggedIn) {
      switch (type) {
        case 'carRenter':
          loginDisplay = this.renderRenterBar();
          break;
          case 'carOwner':
            loginDisplay = this.renderOwnerBar();
            break;
          case 'admin':
            loginDisplay = this.renderAdminBar();
            break;
      }
    }
    else {
      loginDisplay = this.renderNotRegisteredUserBar();
    }

    return (
      <Navbar className="navbar-custom" inverse collapseOnSelect fluid>
        <Navbar.Header>
          <Navbar.Brand>
            <LinkContainer className="link-container" to="/"><span>Platform</span></LinkContainer>
          </Navbar.Brand>
          <Switch>
            <Route exact path="/">
              { this.renderSearchBar() }
            </Route>
          </Switch>
          <Navbar.Toggle />
        </Navbar.Header>
        <Navbar.Collapse>
          <Nav pullRight>
            { loginDisplay }
          </Nav>
          {/*<Nav>*/}
            {/*<NavItem eventKey={1} href="#">*/}
              {/*Link*/}
            {/*</NavItem>*/}
          {/*</Nav>*/}
          {/*<Nav pullRight>*/}
            {/*<NavItem eventKey={1} href="#">*/}
              {/*Link Right*/}
            {/*</NavItem>*/}
            {/*<NavDropdown eventKey={3} title="Dropdown" id="basic-nav-dropdown">*/}
              {/*<MenuItem eventKey={3.1}>Action</MenuItem>*/}
              {/*<LinkContainer to="/login"><MenuItem eventKey={3.2}>Another action</MenuItem></LinkContainer>*/}
              {/*<MenuItem eventKey={3.3}>Something else here</MenuItem>*/}
              {/*<MenuItem divider />*/}
              {/*<MenuItem eventKey={3.3}>Separated link</MenuItem>*/}
            {/*</NavDropdown>*/}
          {/*</Nav>*/}
        </Navbar.Collapse>
      </Navbar>
    )
  }
}

export default withRouter(CustomNavBar);