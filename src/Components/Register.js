import "../css/Login_register.css";
import axios from 'axios';
import React, { useState } from 'react';
import { Form, Row, Col } from 'react-bootstrap';
import { useParams, useNavigate } from "react-router-dom";
import { useLocation } from "react-router-dom";

function Register() {

  const location = useLocation();
  const fromGoogle = location.state?.fromGoogle;
  const email = location.state?.userEmail;

  const [user, setUser] = useState({
    fullName: "",
    email: "",
    phone_no : "",
    password: ""
  });

  const handleChange = (e) => {
    setUser({ ...user, [e.target.name]: e.target.value });
  };
const navigate = useNavigate();
  const handleSubmit = (e) => {
    e.preventDefault();
    axios.post("http://localhost:8000/users/register", user)
      .then(() => {
        alert("Registration Successful...!"); 
        navigate("/login");
      })
      .catch((err) => {
        console.error("Error while registering user:", err); 
        alert("Error while registering user");
      });
  };

  return (
    <div className="register">
      {fromGoogle && (
        <p className="alert alert-warning">
          👋 It looks like you don't have an account yet. Create one below using your email: <strong>{email}</strong>
        </p>
      )}
      <div className='register-container form-container my-5'>
        <h3> Register </h3>
        <Form onSubmit={handleSubmit}>
          <Form.Group as={Row} className="mb-3" controlId="exampleForm.ControlInput1"> 
            <Col md={3} xs={4}> <Form.Label> Full Name </Form.Label> </Col>
            <Col md={9} xs={8}> <Form.Control type="text" name="fullName" value={user.fullName} onChange={handleChange} required placeholder="Enter your Full Name" /> </Col>
          </Form.Group>
          <Form.Group as={Row} className="mb-3" controlId="exampleForm.ControlInput2"> 
            <Col md={3} xs={4}> <Form.Label> Work Email </Form.Label> </Col>
            <Col md={9} xs={8}> <Form.Control type="email" name="email" value={user.email} onChange={handleChange} required placeholder="Enter your Email" /> </Col>
          </Form.Group>
          <Form.Group as={Row} className="mb-3" controlId="exampleForm.ControlInput3"> 
            <Col md={3} xs={4}> <Form.Label> Phone No </Form.Label> </Col>
            <Col md={9} xs={8}> <Form.Control type="tel" name="phone_no" value={user.phone_no} onChange={handleChange} required placeholder="Enter Phone No "/> </Col>
          </Form.Group>
          <Form.Group as={Row} className="mb-3" controlId="exampleForm.ControlInput4"> 
            <Col md={3} xs={4}> <Form.Label> Password </Form.Label> </Col>
            <Col md={9} xs={8}> <Form.Control type="password" name="password" value={user.password} onChange={handleChange} id="inputPassword5" required placeholder="Enter Password" /> </Col>
          </Form.Group>
          <center> <button type="submit"> Register </button> </center>
        </Form>
        <h6> Already have an account? <a href="/login"> Login </a> </h6>
      </div>
    </div>
  );
}

export default Register;