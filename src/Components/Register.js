import axios from 'axios';
import React, { useState } from 'react';
import { Form, Button } from 'react-bootstrap';

function Register() {
  const [user, setUser] = useState({
    fullName: "",
    email: "",
    phone_no : "",
    password: ""
  });

  const handleChange = (e) => {
    setUser({ ...user, [e.target.name]: e.target.value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    axios.post("http://localhost:5000/users/register", user)
      .then(() => {
        alert("Registration Successful...!"); 
      })
      .catch((err) => {
        console.error("Error while registering user:", err); 
        alert("Error while registering user");
      });
  };

  return (
    <div className="register">
      <div className='register-container form-container my-5'>
        <h3> Register </h3>
        <Form onSubmit={handleSubmit}>
          <Form.Group className="mb-3" controlId="exampleForm.ControlInput1"> 
            <Form.Label> Full Name </Form.Label> 
            <Form.Control type="text" name="fullName" value={user.fullName} onChange={handleChange} required placeholder="Enter your Full Name" /> 
          </Form.Group>
          <Form.Group className="mb-3" controlId="exampleForm.ControlInput2"> 
            <Form.Label> Work Email </Form.Label> 
            <Form.Control type="email" name="email" value={user.email} onChange={handleChange} required placeholder="Enter your Email" /> 
          </Form.Group>
          <Form.Group className="mb-3" controlId="exampleForm.ControlInput3"> 
            <Form.Label> Phone No </Form.Label> 
            <Form.Control type="tel" name="phone_no" value={user.phone_no} onChange={handleChange} required placeholder="Enter Phone No "/> 
          </Form.Group>
          <Form.Group className="mb-3" controlId="exampleForm.ControlInput4"> 
            <Form.Label> Password </Form.Label> 
            <Form.Control type="password" name="password" value={user.password} onChange={handleChange} id="inputPassword5" required placeholder="Enter Password" /> 
          </Form.Group>
          <center> <button type="submit"> Register </button> </center>
        </Form>
        <h6> Already have an account? <a href="/login"> Login </a> </h6>
      </div>
    </div>
  );
}

export default Register;