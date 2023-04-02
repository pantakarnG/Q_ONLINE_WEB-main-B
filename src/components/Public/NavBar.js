import React, { useState, useEffect, Fragment } from 'react';
import Nav from 'react-bootstrap/Nav';
import Navbar from 'react-bootstrap/Navbar';
import NavDropdown from 'react-bootstrap/NavDropdown';
import { Link, useLocation, useNavigate } from 'react-router-dom';
import { Menu } from './Menu';
import { checkActive } from '../../helper/Check';
import Login from '../../view/authentication/login/Login';
import { connect } from 'react-redux';
import { AUTHEN, USERINFO,AUTHORITIES } from '../../actions/Authen';
import logo from '../../image/logo.png'; // Tell webpack this JS file uses this image

function NavBar(props) {
  const location = useLocation();
  const navigate = useNavigate();
  const [show, setShow] = useState(false);

  useEffect(() => {
    if (location.pathname === '/login') {
      setShow(true);
    }
  }, [location.pathname]);

  return (
    <header id="public">
      <Navbar collapseOnSelect expand="md" className="navbar px-4">
      <img src={logo}  className="logoImg" alt="Logo" /> 

        <Link to="/" className="logo-title" >
          โรงพยาบาลสมเด็จพระสังฆราช องค์ที่ ๑๗
        </Link>
        <Navbar.Toggle aria-controls="responsive-navbar-nav" />
        <Navbar.Collapse id="responsive-navbar-nav">
          <Nav className="me-auto"></Nav>
          <Nav>
            {Menu.map((item) => (
              <Link to={item.pathname} className={`nav-link ${checkActive(location, item.pathname) ? 'nav-active' : ''}`} key={item.id}>
                {item.title}
              </Link>
            ))}

            {!props.auth.id ? (
              <Fragment>
                <Link to="/register" className={`nav-link ${checkActive(location, '/register') ? 'nav-active' : ''}`}>
                  สมัครสมาชิก
                </Link>
                <Link
                  to="#"
                  className={`nav-link ${checkActive(location, '/login') ? 'nav-active' : ''}`}
                  onClick={() => {
                    setShow(!show);
                  }}
                >
                  เข้าสู่ระบบ
                </Link>
              </Fragment>
            ) : (
              <NavDropdown title={`คุณ ${props.auth.fullname}`} id="collasible-nav-dropdown">
                <div className="px-2">
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
                </div>
              </NavDropdown>
            )}
          </Nav>
        </Navbar.Collapse>
      </Navbar>
      <Login show={show} setShow={setShow} />
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
    AUTHORITIES: (id,idCard,fullname,role) => dispatch(AUTHORITIES(id, idCard, fullname, role))
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(NavBar);
