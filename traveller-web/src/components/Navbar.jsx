import React, { useState } from 'react';
import { Navbar, Nav, NavDropdown, Container } from 'react-bootstrap';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faUserCircle, faCog, faPencil, faSignOut, faBell } from '@fortawesome/free-solid-svg-icons'
import { useSelector } from 'react-redux';

function AppNavbar() {
  const [showDropdown, setShowDropdown] = useState(false);
  const [showNotification, setShowNotification] = useState(false);
  const username = useSelector(state => state.username);
  
  const handleDropdown = () => {
    setShowDropdown(!showDropdown);
  };
  const handleShowNotification = () => {
    setShowNotification(!showNotification);
  };

  return (
    <Navbar  bg="dark" variant="dark" expand="lg" sticky="top">
      <Container>
        <Navbar.Brand href="#/travel">Traveller</Navbar.Brand>
        <Navbar.Toggle aria-controls="basic-navbar-nav" />
        <Navbar.Collapse id="basic-navbar-nav">
          <Nav className="me-auto">
            <Nav.Link href="#/dashboard">Dashboard</Nav.Link>
            
          </Nav>
          <Nav>
          <Nav.Link eventKey={2} href="" className="ml-2">
              {username}
            </Nav.Link>
            <NavDropdown
              title={
                <FontAwesomeIcon icon={faBell} size="lg" />
              }
              id="basic-nav-dropdown"
              show={showNotification}
              onClick={handleShowNotification}
              className="ml-2"
            >
               
              <NavDropdown.Item >
              Notification 1
              </NavDropdown.Item>
              <NavDropdown.Item >
              Notification 2
              </NavDropdown.Item>
              
            </NavDropdown>
            <NavDropdown
              title={
                <FontAwesomeIcon icon={faUserCircle} size="lg" />
              }
              id="basic-nav-dropdown"
              show={showDropdown}
              onClick={handleDropdown}
            >
               
              <NavDropdown.Item href="#/preference">
              <FontAwesomeIcon icon={faPencil} size="lg" />  Preferences
              </NavDropdown.Item>
              <NavDropdown.Item href="#/settings">
              <FontAwesomeIcon icon={faCog} size="lg" /> Settings
              </NavDropdown.Item>
              <NavDropdown.Item href="#/logout">
              <FontAwesomeIcon icon={faSignOut} size="lg" />Logout
              </NavDropdown.Item>
            </NavDropdown>
            
          </Nav>
        </Navbar.Collapse>
      </Container>
    </Navbar>
  );
}

export default AppNavbar;
