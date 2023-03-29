import { Capacitor } from "@capacitor/core";
import { useState } from "react";
import { Container, Form, Button, Row, Col } from "react-bootstrap";
import { useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';

function Settings() {
  const [currentPassword, setCurrentPassword] = useState("");
  const [newPassword, setNewPassword] = useState("");
  const [confirmNewPassword, setConfirmNewPassword] = useState("");
  const [error, setError] = useState("");
  const authToken = useSelector(state => state.token);
  const navigate = useNavigate();
  if (!authToken) {
    navigate('/login');
  

  }
  const handleSubmit = (event) => {
    event.preventDefault();
    if (newPassword !== confirmNewPassword) {
      setError("New Password & Confirm Password is different try again.");
      return;
    }
  };

  return (
    <Container className='st-2 mt-4'>
      <Row className="justify-content-center">
          <Col md={6} lg={5}>
            <div className="text-center">

              <h1 className="h3 mb-3">Settings</h1>
            </div>
      <Form onSubmit={handleSubmit}>
        <Form.Group controlId="currentPassword">
          <Form.Label>Existing Password</Form.Label>
          <Form.Control
            type="password"
            value={currentPassword}
            onChange={(event) => setCurrentPassword(event.target.value)}
            placeholder="Current password"
          />
        </Form.Group>

        <Form.Group controlId="newPassword">
          <Form.Label>New Password</Form.Label>
          <Form.Control
            type="password"
            value={newPassword}
            onChange={(event) => setNewPassword(event.target.value)}
            placeholder="New password"
          />
        </Form.Group>

        <Form.Group controlId="confirmNewPassword">
          <Form.Label>Confirm New Password</Form.Label>
          <Form.Control
            type="password"
            value={confirmNewPassword}
            onChange={(event) => setConfirmNewPassword(event.target.value)}
            placeholder="Confirm password"
          />
          {error && (
            <Form.Text className="text-danger">{error}</Form.Text>
          )}
        </Form.Group>

        <Button className="mt-3 mb-3" variant="primary" type="submit">
          Update Password
        </Button>
      </Form>
      </Col>
      </Row>
    </Container>
  );
}

export default Settings;
