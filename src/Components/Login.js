import "./Login_register.css";
import axios from 'axios';
import React, { useState } from 'react';
import { Form, Row, Col } from 'react-bootstrap';
import { toast, ToastContainer } from 'react-toastify';
import GoogleLoginAuth from "./GoogleLogin";

function Login() {
  const [user, setUser] = useState({
    email: "",
    password: ""
  });

  const handleChange = (e) => {
    setUser({ ...user, [e.target.name]: e.target.value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    axios.post("http://localhost:8000/users/login", user)
      .then((response) => {
        const token = response.data.token; // Extract token from response
        console.log("Token : ", token); // Print token in console
        localStorage.setItem("token", token); // Store token in localStorage
        toast.success("Login Successful...! Ready to explore ...", { autoClose: 3000 , onClose: () => window.location.href = "/dashboard"}); // Redirect to dashboard after 3 seconds
      })
      .catch((err) => {
        console.error("Invalid Credentials:", err);
        toast.error("Invalid Credentials...! Please try again", { autoClose: 3000 }); // Show error message
      });
  };

  return (
    <div className="login">
      <ToastContainer />
      <div className='login-container form-container my-5'>
        <h3> Login </h3>
        <Form onSubmit={handleSubmit}>
          <Form.Group as={Row} className="mb-3" controlId="exampleForm.ControlInput1"> 
            <Col md={3} xs={3}> <Form.Label> Email </Form.Label> </Col>
            <Col md={9} xs={9}> <Form.Control type="email" name="email" value={user.email} onChange={handleChange} required placeholder="Enter your email" /> </Col>
          </Form.Group>
          <Form.Group as={Row} className="mb-3" controlId="exampleForm.ControlInput2"> 
            <Col md={3} xs={3}> <Form.Label> Password </Form.Label> </Col> 
            <Col md={9} xs={9}> <Form.Control type="password" name="password" value={user.password} onChange={handleChange} id="inputPassword5" required placeholder="Enter Password" /> </Col>
          </Form.Group>
          <center> <button type="submit"> Login </button> </center>
        </Form>
        <GoogleLoginAuth />
        <h6> Don't have an account? <a href="/register"> Register </a> </h6>
      </div>
    </div>
  );
}

export default Login;