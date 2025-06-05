import { useState } from "react";
import axios from "axios";
import { Form, Button, Container } from "react-bootstrap";
import "../css/Forms.css";
import { toast, ToastContainer } from "react-toastify";
import { useNavigate } from "react-router-dom";

const AddLead = () => {
  const navigate = useNavigate();

  const [form, setForm] = useState({
    companyName: "",
    fullName: "",
    email: "",
    phone: "",
    industry: "Technology",
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
      const response = await axios.post("http://localhost:8000/lead/", form, {
        headers: {
          Authorization: `Bearer ${token}`
        }
      });

      console.log("Lead added successfully:", response.data);

      setForm({
        companyName: "",
        fullName: "",
        email: "",
        phone: "",
        industry: "Technology",
        leadSource: "",
        status: "New",
        priority: "Medium",
        lastContacted: "",
        nextActionDate: "",
        notes: ""
      });

      toast.success("Lead added successfully!", {
        onClose: () => navigate("/dashboard/leads")
      });
    } catch (error) {
      console.error("Error adding lead:", error.response?.data || error.message);
      toast.error("Failed to add lead. Please try again.");
    }
  };

  const handleReset = () => {
    setForm({
      companyName: "",
      fullName: "",
      email: "",
      phone: "",
      industry: "Technology",
      leadSource: "",
      status: "New",
      priority: "Medium",
      lastContacted: "",
      nextActionDate: "",
      notes: ""
    });
  };

  return (
    <Container className="p-4">
      <ToastContainer autoClose={2000} />
      <h3 className="board-title text-center mb-4">👤 Add Lead</h3>
      <Form className="card1" onSubmit={handleSubmit}>
        <div className="form-container1">
          <Form.Group className="mb-3">
            <Form.Label>Company Name</Form.Label>
            <Form.Control
              type="text"
              name="companyName"
              value={form.companyName}
              onChange={handleChange}
              placeholder="Company Name"
              required
            />
          </Form.Group>

          <Form.Group className="mb-3">
            <Form.Label>Full Name</Form.Label>
            <Form.Control
              type="text"
              name="fullName"
              value={form.fullName}
              onChange={handleChange}
              placeholder="Full Name"
              required
            />
          </Form.Group>

          <Form.Group className="mb-3">
            <Form.Label>Email</Form.Label>
            <Form.Control
              type="email"
              name="email"
              value={form.email}
              onChange={handleChange}
              placeholder="Email"
              required
            />
          </Form.Group>

          <Form.Group className="mb-3">
            <Form.Label>Phone</Form.Label>
            <Form.Control
              type="tel"
              name="phone"
              value={form.phone}
              onChange={handleChange}
              placeholder="Phone"
              required
            />
          </Form.Group>

          <Form.Group className="mb-3">
            <Form.Label>Industry</Form.Label>
            <Form.Select
              name="industry"
              value={form.industry}
              onChange={handleChange}
            >
              <option>Technology</option>
              <option>Healthcare</option>
              <option>Finance</option>
              <option>Retail</option>
              <option>Manufacturing</option>
              <option>Education</option>
              <option>Real Estate</option>
            </Form.Select>
          </Form.Group>

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
            <Form.Select
              name="status"
              value={form.status}
              onChange={handleChange}
            >
              <option>New</option>
              <option>In Progress</option>
              <option>Converted</option>
              <option>Closed</option>
            </Form.Select>
          </Form.Group>

          <Form.Group className="mb-3">
            <Form.Label>Priority</Form.Label>
            <Form.Select
              name="priority"
              value={form.priority}
              onChange={handleChange}
            >
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

          <Form.Group className="mt-4 button-group-row">
            <Button type="button" onClick={handleReset} className="button-reset">
              🔄 Reset
            </Button>

            <Button type="submit" className="button-save">
              💾 Add Lead
            </Button>

            <Button type="button" onClick={() => navigate(-1)} className="button-back">
              🔙 Back
            </Button>
          </Form.Group>
        </div>
      </Form>
    </Container>
  );
};

export default AddLead;
