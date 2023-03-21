import React, { useState } from 'react';
import { Container, Row, Col, Form, Button, Modal } from 'react-bootstrap';
import axios from 'axios';
import logo from '../logo.svg';
import { API_BASE_URL as API_BASE_URL } from '../Constants'
import { Link } from 'react-router-dom';
import { Nav } from 'react-bootstrap';


function Registration() {

  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [errMsg, setErrMsg] = useState('');
  const [successMsg, setSuccessMsg] = useState('');



  const onEmailChange = (event) => {
    setEmail(event.target.value);
  };

  const onPasswordChange = (event) => {
    setPassword(event.target.value);
  };



  const handleSubmit = async (event) => {
    event.preventDefault();

    try {
      const response = await axios.post(`${API_BASE_URL}/register`, {
        "email": email,
        password,
      });
      if (response.status === 200) {

        setSuccessMsg("Registration is successfull.")
        alert("Registration complete")
      } else {
        setErrMsg(response.data.message)
        alert("Registration Failed.")
      }
    } catch (error) {
      setErrMsg(error?.response?.data?.message)
      alert("Registration Failed.")
      console.error('Failed to register:', error);
    }
  };

  return (
    <>

      <Container className='mt-4 st-2'>
        <Row className="justify-content-center">
          <Col md={6} lg={5}>
            <div className="text-center">

              <h1 className="h3 mb-3">New Registration</h1>
            </div>
            <Form onSubmit={handleSubmit}>


              <Form.Group controlId="formEmail">
                <Form.Label>Email address</Form.Label>
                <Form.Control
                  type="email"
                  placeholder="Enter email"
                  value={email}
                  onChange={onEmailChange}
                  required
                />
              </Form.Group>

              <Form.Group controlId="formPassword">
                <Form.Label>Password</Form.Label>
                <Form.Control
                  type="password"
                  placeholder="Password"
                  value={password}
                  onChange={onPasswordChange}
                  required
                />
              </Form.Group>

              <Button className="mt-3" variant="primary" type="submit" block>
                Create Account
              </Button>
              <Nav className='register-container'>
                <Nav.Item>
                  <Link to="/login" className="nav-link">Login</Link>
                </Nav.Item>
              </Nav>
            </Form>
          </Col>
        </Row>
      </Container>
    </>
  );
}

export default Registration;
