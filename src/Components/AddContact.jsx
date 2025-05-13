import { useState } from "react";
import axios from "axios";
import { Form, Button, Container } from "react-bootstrap";
import '../css/Forms.css'; // Make sure you import your Forms.css here too
import { toast, ToastContainer } from "react-toastify";

const AddContact = () => {
  const [form, setForm] = useState({
    name: "",
    email: "",
    phone: "",
    position: "",
    company: "",
    address: "",
    notes: "",
    linkedin: "",
    status: "Active"
  });

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await axios.post("http://localhost:8000/contact/", form,{
        headers: {
          Authorization: `Bearer ${localStorage.getItem('token')}`,
        },
      });
      // Reset form fields after successful submission
      setForm({
        name: "",
        email: "",
        phone: "",
        position: "",
        company: "",
        address: "",
        notes: "",
        linkedin: "",
        status: "Active"
      });
      alert("Contact Added Successfully!");
    }
    catch (error) {
      console.error("Error adding contact : ", error);
      alert("❌ Failed to add contact. Please try again.");
    }
  };

  return (
    <Container className="mt-4">
      <h2>Add Contact</h2>
      <Form onSubmit={handleSubmit}>
        <Form.Group className="mb-3">
          <Form.Label>Name</Form.Label>
          <Form.Control type="text" name="name" value={form.name} onChange={handleChange} placeholder="Full Name" />
        </Form.Group>

          <Form.Group className="mb-3">
            <Form.Label>Email</Form.Label>
            <Form.Control type="email" name="email" value={form.email} onChange={handleChange} placeholder="Email" />
          </Form.Group>

          <Form.Group className="mb-3">
            <Form.Label>Phone</Form.Label>
            <Form.Control type="tel" name="phone" value={form.phone} onChange={handleChange} placeholder="Phone Number" />
          </Form.Group>

          <Form.Group className="mb-3">
            <Form.Label>Position</Form.Label>
            <Form.Control type="text" name="position" value={form.position} onChange={handleChange} placeholder="Job Title" />
          </Form.Group>

          <Form.Group className="mb-3">
            <Form.Label>Company</Form.Label>
            <Form.Control type="text" name="company" value={form.company} onChange={handleChange} placeholder="Company Name" />
          </Form.Group>

          <Form.Group className="mb-3">
            <Form.Label>Address</Form.Label>
            <Form.Control as="textarea" rows={2} name="address" value={form.address} onChange={handleChange} placeholder="Address" />
          </Form.Group>

          <Form.Group className="mb-3">
            <Form.Label>Notes</Form.Label>
            <Form.Control as="textarea" rows={3} name="notes" value={form.notes} onChange={handleChange} placeholder="Notes" />
          </Form.Group>

          <Form.Group className="mb-3">
            <Form.Label>Status</Form.Label>
            <Form.Select name="status" value={form.status} onChange={handleChange}>
              <option>Active</option>
              <option>Inactive</option>
              <option>Pending</option>
            </Form.Select>
          </Form.Group>

          <Button type="submit" className="button button-save">💾 Add Contact</Button>
        </div>
      </Form>
  
    </Container>
  );
};

export default AddContact;
