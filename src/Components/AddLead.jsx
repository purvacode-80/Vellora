import { useState } from "react";
import axios from "axios";
import { Form, Button, Container } from "react-bootstrap";
import "../css/Forms.css"; // 👈 make sure to import your Forms.css here too

const AddLead = () => {
  const [form, setForm] = useState({
    companyName: "",
    contactPerson: "",
    email: "",
    phone: "",
    industry: "",
    leadSource: "",
    status: "New",
    priority: "Medium",
    lastContacted: "",
    nextActionDate: "",
    notes: ""
  });

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await axios.post("http://localhost:8000/lead/", form, {
        headers: {
          Authorization: `Bearer ${localStorage.getItem("token")}`
        }
      });
      setForm({
        companyName: "",
        contactPerson: "",
        email: "",
        phone: "",
        industry: "",
        leadSource: "",
        status: "New",
        priority: "Medium",
        lastContacted: "",
        nextActionDate: "",
        notes: ""
      });
      alert("✅ Lead Added");
    } catch (error) {
      console.error("Error adding lead:", error);
      alert("❌ Failed to add lead. Please try again.");
    }
  };

  return (
    <Container className="p-4">
      <h3 className="board-title text-center mb-4">👤 Add Lead</h3>
      <Form className="card1" onSubmit={handleSubmit}>
        <div className="form-container1">
          <Form.Group className="mb-3">
            <Form.Label>Company Name</Form.Label>
            <Form.Control type="text" name="companyName" value={form.companyName} onChange={handleChange} placeholder="Company Name" />
          </Form.Group>

          <Form.Group className="mb-3">
            <Form.Label>Contact Person</Form.Label>
            <Form.Control type="text" name="contactPerson" value={form.contactPerson} onChange={handleChange} placeholder="Contact Person" />
          </Form.Group>

          <Form.Group className="mb-3">
            <Form.Label>Email</Form.Label>
            <Form.Control type="email" name="email" value={form.email} onChange={handleChange} placeholder="Email" />
          </Form.Group>

          <Form.Group className="mb-3">
            <Form.Label>Phone</Form.Label>
            <Form.Control type="tel" name="phone" value={form.phone} onChange={handleChange} placeholder="Phone" />
          </Form.Group>

          <Form.Group className="mb-3">
            <Form.Label>Industry</Form.Label>
            <Form.Control type="text" name="industry" value={form.industry} onChange={handleChange} placeholder="Industry" />
          </Form.Group>

          <Form.Group className="mb-3">
            <Form.Label>Lead Source</Form.Label>
            <Form.Control type="text" name="leadSource" value={form.leadSource} onChange={handleChange} placeholder="Lead Source" />
          </Form.Group>

          <Form.Group className="mb-3">
            <Form.Label>Status</Form.Label>
            <Form.Select name="status" value={form.status} onChange={handleChange}>
              <option>New</option>
              <option>In Progress</option>
              <option>Converted</option>
              <option>Closed</option>
            </Form.Select>
          </Form.Group>

          <Form.Group className="mb-3">
            <Form.Label>Priority</Form.Label>
            <Form.Select name="priority" value={form.priority} onChange={handleChange}>
              <option>High</option>
              <option>Medium</option>
              <option>Low</option>
            </Form.Select>
          </Form.Group>

          <Form.Group className="mb-3">
            <Form.Label>Last Contacted</Form.Label>
            <Form.Control type="date" name="lastContacted" value={form.lastContacted} onChange={handleChange} />
          </Form.Group>

          <Form.Group className="mb-3">
            <Form.Label>Next Action Date</Form.Label>
            <Form.Control type="date" name="nextActionDate" value={form.nextActionDate} onChange={handleChange} />
          </Form.Group>

          <Form.Group className="mb-3">
            <Form.Label>Notes</Form.Label>
            <Form.Control as="textarea" rows={3} name="notes" value={form.notes} onChange={handleChange} placeholder="Notes" />
          </Form.Group>

          <Button className="button button-save" type="submit">💾 Add</Button>
        </div>
      </Form>
    </Container>
  );
};

export default AddLead;
