import React, { useState } from 'react';
import { Navbar, Nav, NavDropdown, Container, Badge } from 'react-bootstrap';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faUserCircle, faCog, faPencil, faSignOut, faBell } from '@fortawesome/free-solid-svg-icons'
import { useSelector, useDispatch } from 'react-redux';

function AppNavbar() {
  const [showDropdown, setShowDropdown] = useState(false);
  const [showNotification, setShowNotification] = useState(false);
  const notifications = useSelector(state => state.notifications);
  const username = useSelector(state => state.username);
  const dispatch = useDispatch();
  
  const handleDropdown = () => {
    setShowDropdown(!showDropdown);
  };
  const handleShowNotification = () => {
    if(showNotification){
      dispatch({
        type: 'SET_NOTIFICATION',
        payload: [],
      })
    }
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
                <span>
          <FontAwesomeIcon icon={faBell} size="lg" />
          {notifications.length > 0 && (
            <Badge pill variant="danger" className="ml-1">
              {notifications.length}
            </Badge>
          )}
        </span>
              }
              id="basic-nav-dropdown"
              show={showNotification}
              onClick={handleShowNotification}
              className="ml-2"
            >
               
               {notifications.map((notification, index) => (
        <NavDropdown.Item key={index}>{notification}</NavDropdown.Item>
      ))}
              
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
