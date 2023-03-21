import React, { useState } from 'react';
import { Container, Row, Col, Form, Button } from 'react-bootstrap';
import axios from 'axios';
import logo from '../logo.svg';
import { Link } from 'react-router-dom';
import { Nav } from 'react-bootstrap';
import { login } from '../auth';
import { useSelector, useDispatch } from 'react-redux';


function Login() {
    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');
    const dispatch = useDispatch();

    const onUsernameChange = (event) => {
        setUsername(event.target.value);
    };

    const onPasswordChange = (event) => {
        setPassword(event.target.value);
    };

    const handleSubmit = (event) => {
        event.preventDefault();
        dispatch(login(username, password));

    };

    return (
        <Container className='st-2 mt-4'>
            <Row className="justify-content-center">
                <Col md={6} lg={5}>
                    <div className="text-center">
                        <h1 className="h3 mb-3">Login</h1>
                    </div>
                    <Form onSubmit={handleSubmit}>
                        <Form.Group controlId="formUsername">
                            <Form.Label>Username</Form.Label>
                            <Form.Control
                                type="text"
                                placeholder="Username"
                                value={username}
                                onChange={onUsernameChange}
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

                        <Button className='mt-3 mb-3' variant="primary" type="submit" block>
                            Sign In
                        </Button>
                        <Nav className='register-container'>
                            <Nav.Item>
                                <Link to="/register" className="nav-link">Register</Link>
                            </Nav.Item>
                        </Nav>
                    </Form>
                </Col>
            </Row>
        </Container>
    );
}

export default Login;
