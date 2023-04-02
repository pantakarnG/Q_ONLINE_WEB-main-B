import React, { Fragment } from 'react';
import Nav from 'react-bootstrap/Nav';
import Navbar from 'react-bootstrap/Navbar';
import NavDropdown from 'react-bootstrap/NavDropdown';
import { Link, useLocation, useNavigate } from 'react-router-dom';
import { Menu } from './Menu';
import { checkActive } from '../../helper/Check';
import { connect } from 'react-redux';
import { AUTHEN, USERINFO ,AUTHORITIES } from '../../actions/Authen';

function NavBar(props) {
  const location = useLocation();
  const navigate = useNavigate();

  return (
    <header id="author">
      <Navbar collapseOnSelect expand="lg" className="navbar px-4">
       
        <Navbar.Toggle aria-controls="responsive-navbar-nav" />
        <Navbar.Collapse id="responsive-navbar-nav">
          <Nav className="me-auto px-3">
            
          </Nav>
          <Nav className = "pl-3"
           >
            <Link
              to="#"
              className="nav-link text-black"
              onClick={() => {
                localStorage.clear();
                props.USERINFO();
                navigate('/');
              }}
            >
              ออกจากระบบ
            </Link>
          </Nav>
        </Navbar.Collapse>
      </Navbar>
    </header>
  );
}

const mapStateToProps = (state) => ({
  auth: state.Authentication,
});

const mapDispatchToProps = (dispatch) => {
  return {
    AUTHEN: (id, idCard, fullname, role) => dispatch(AUTHEN(id, idCard, fullname, role)),
    USERINFO: () => dispatch(USERINFO()),
    AUTHORITIES: (id,idCard,fullname,role) => dispatch(AUTHORITIES(id, idCard, fullname, role)),
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(NavBar);
