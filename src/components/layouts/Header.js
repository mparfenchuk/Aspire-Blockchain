import React, { Component } from 'react';
import { connect } from 'react-redux'
import { Link } from 'react-router-dom'
import { VisibleOnlyAuth, HiddenOnlyAuth } from '../../wrappers'

import {
  Container,
  Collapse,
  Navbar,
  NavbarToggler,
  NavbarBrand,
  Nav,
  NavItem,
  NavLink,
  UncontrolledDropdown,
  DropdownItem,
  DropdownToggle,
  DropdownMenu } from 'reactstrap';

import { logout } from '../../actions'

class Header extends Component {
  constructor(props) {
    super(props);

    this.toggle = this.toggle.bind(this);
    this.state = {
      isOpen: false
    };
    this.logoutUser = this.logoutUser.bind(this);
  }

  toggle() {
    this.setState({
      isOpen: !this.state.isOpen
    });
  }

  logoutUser() {
    
    let { logout } = this.props;

    logout();
  }

  render() {

    let { pathname } = this.props;

    const ToAllLink = HiddenOnlyAuth(() => 
      <Container>
          <NavbarBrand tag={Link} to="/"><b>Aspire Blockchain</b></NavbarBrand>
      </Container>
    );

    const AuthOnlyLink = VisibleOnlyAuth(() => 
      <Container>
        <NavbarBrand tag={Link} to="/"><b>Aspire Blockchain</b></NavbarBrand>
        <NavbarToggler onClick={this.toggle} />
        <Collapse isOpen={this.state.isOpen} navbar>
          <Nav className="ml-auto" navbar>
            <NavItem className="mx-4">
              <NavLink tag={Link} to="/candidate" active={(pathname === '/candidate') ? true : false}><b>Candidate</b></NavLink>
            </NavItem>
            <NavItem className="mx-4">
              <NavLink tag={Link} to="/validator" active={(pathname === '/validator') ? true : false}><b>Validator</b></NavLink>
            </NavItem>
            <NavItem className="mx-4">
              <NavLink tag={Link} to="/employeer" active={(pathname === '/employeer') ? true : false}><b>Employeer</b></NavLink>
            </NavItem>
            <UncontrolledDropdown className="mx-4" nav inNavbar>
              <DropdownToggle nav caret>
              </DropdownToggle>
              <DropdownMenu right>
                <DropdownItem href="#logout" onClick={this.logoutUser}>
                  Logout
                </DropdownItem>
              </DropdownMenu>
            </UncontrolledDropdown>
          </Nav>
        </Collapse>
      </Container>);

    return (
        <Navbar color="light" light expand="md" className="app-header">
          <ToAllLink />
          <AuthOnlyLink />
        </Navbar>
    );
  }
}

const mapStateToProps = (state) => {
  return {
    pathname: state.router.location.pathname
  }
}

export default connect(mapStateToProps, { logout })(Header);