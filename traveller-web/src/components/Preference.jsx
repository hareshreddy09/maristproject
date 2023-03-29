import { useState, useEffect } from "react";
import { Container, Form, Button } from "react-bootstrap";
import { useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { API_BASE_URL as API_BASE_URL } from '../Constants'
import axios from 'axios';
import Loader from "./Loader";
import { Capacitor } from "@capacitor/core";
function Preference() {

  const [homeAddress, setHomeAddress] = useState("");
  const [workAddress, setWorkAddress] = useState("");
  const [options, setOptions] = useState([]);
  const [loading, setLoading] = useState(false);
  


  const authToken = useSelector(state => state.token);
  const navigate = useNavigate();
  if (!authToken) {
    navigate('/login');

  }
  const handleSubmit = async (event) => {
    event.preventDefault();
    try {
      setLoading(true);
      const response = await axios.put(`${API_BASE_URL}/preferences`, {
          "home": homeAddress,
          "work": workAddress,
          
      },{headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${authToken}`
      }});
      const msg = response.data?.message
      setLoading(false);
      if(msg){
        alert(msg)
      } else {
        alert("Save Failed.")
      }

  } catch (error) {
      setLoading(false);
      console.log(error);
      alert(error)
  }
  };
  

  useEffect(() => {
    setLoading(true);
    fetch(`${API_BASE_URL}/preferences`, {
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${authToken}`
      }
    })
      .then(response => response.json())
      .then(data => {
        setLoading(false);
        setWorkAddress(data.work)
        setHomeAddress(data?.home)
      })
      .catch(error => {
        setLoading(false);
        console.error(error);
      });
  }, []);
  

  return (
    <>
    {loading && <Loader />}
    <Container className='st-2 mt-4'>
    <Row className="justify-content-center">
                <Col md={6} lg={5}>
                    <div className="text-center">
                        <h1 className="h3 mb-3">User Preferences</h1>
                    </div>
      
      <Form onSubmit={handleSubmit}>




        <Form.Group controlId="formHome">
          <Form.Label>Home Address</Form.Label>
          <Form.Control as="input" value={homeAddress} onChange={(event) => setHomeAddress(event.target.value)}>
            
          </Form.Control>
        </Form.Group>
        <Form.Group controlId="formWork">
          <Form.Label>WorAddress</Form.Label>
          <Form.Control as="input" value={workAddress} onChange={(event) => setWorkAddress(event.target.value)}>
           
          </Form.Control>
        </Form.Group>




        <Button className="mt-3 mb-3" variant="primary" type="submit">
          Save Preferences
        </Button>
      </Form>
      </Col>
      </Row>
    </Container>
    </>
  );
}

export default Preference;
