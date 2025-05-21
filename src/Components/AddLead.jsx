import { useState } from "react";
import axios from "axios";
import { Form, Button, Container } from "react-bootstrap";
import "../css/Forms.css";
import { toast, ToastContainer } from "react-toastify";

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

    const token = localStorage.getItem("token");

    if (!token) {
      alert("❌ User not authenticated. Please log in.");
      return;
    }

    try {
      const response = await axios.post("http://localhost:8000/lead", form, {
        headers: {
          Authorization: `Bearer ${token}`,
          "Content-Type": "application/json"
        }
      });

      console.log("Lead added successfully:", response.data);

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

      toast.success("✅ Lead added successfully!", {
        onClose: () => (window.location.href = "/leads")
      });
    } catch (error) {
      console.error("Error adding lead:", error.response?.data || error.message);
      toast.error("❌ Failed to add lead. Please try again.");
    }
  };

  return (
    <Container className="p-4">
      <ToastContainer autoClose={2000} />
      <h3 className="board-title text-center mb-4">👤 Add Lead</h3>
      <Form className="card1" onSubmit={handleSubmit}>
        <div className="form-container1">
          {[
            { label: "Company Name", name: "companyName", type: "text", required: true },
            { label: "Contact Person", name: "contactPerson", type: "text", required: true },
            { label: "Email", name: "email", type: "email", required: true },
            { label: "Phone", name: "phone", type: "tel", required: true },
            { label: "Industry", name: "industry", type: "text" }
          ].map((field) => (
            <Form.Group className="mb-3" key={field.name}>
              <Form.Label>{field.label}</Form.Label>
              <Form.Control
                type={field.type}
                name={field.name}
                value={form[field.name]}
                onChange={handleChange}
                placeholder={field.label}
                required={field.required}
              />
            </Form.Group>
          ))}

          <Form.Group className="mb-3">
            <Form.Label>Lead Source</Form.Label>
            <Form.Select
              name="leadSource"
              value={form.leadSource}
              onChange={handleChange}
            >
              <option value="">-- Select --</option>
              <option>Referral</option>
              <option>Website</option>
              <option>Cold Call</option>
              <option>Social Media</option>
              <option>Email Campaign</option>
              <option>Trade Show</option>
              <option>Other</option>
            </Form.Select>
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
            <Form.Control
              type="date"
              name="lastContacted"
              value={form.lastContacted}
              onChange={handleChange}
            />
          </Form.Group>

          <Form.Group className="mb-3">
            <Form.Label>Next Action Date</Form.Label>
            <Form.Control
              type="date"
              name="nextActionDate"
              value={form.nextActionDate}
              onChange={handleChange}
            />
          </Form.Group>

          <Form.Group className="mb-3">
            <Form.Label>Notes</Form.Label>
            <Form.Control
              as="textarea"
              rows={3}
              name="notes"
              value={form.notes}
              onChange={handleChange}
              placeholder="Notes"
            />
          </Form.Group>

          <Button className="button button-save" type="submit">💾 Add</Button>
        </div>
      </Form>
    </Container>
  );
};

export default AddLead;
