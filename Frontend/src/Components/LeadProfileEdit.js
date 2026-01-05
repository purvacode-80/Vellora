import { useState, useEffect } from "react";
import axios from "axios";
import { Form, Button, Container } from "react-bootstrap";
import { useParams, useNavigate } from "react-router-dom";
import { toast, ToastContainer } from "react-toastify";
import RequiredLabel from "./RequiredLabel"; // 🧩 Reusable label with *
import "../css/Forms.css";

const LeadProfileEdit = () => {
  const { id } = useParams();
  const navigate = useNavigate();

  const [lead, setLead] = useState({
    companyName: "",
    fullName: "",
    email: "",
    phone: "",
    industry: "",
    leadSource: "",
    status: "",
    priority: "",
    lastContacted: "",
    nextActionDate: "",
    notes: "",
  });

  useEffect(() => {
    const fetchLead = async () => {
      try {
        const res = await axios.get(`http://localhost:8000/lead/${id}`, {
          headers: {
            Authorization: `Bearer ${localStorage.getItem("token")}`,
          },
        });
        setLead(res.data);
      } catch (error) {
        console.error("❌ Error fetching lead:", error);
        toast.error("Failed to load lead details.");
      }
    };

    fetchLead();
  }, [id]);

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setLead((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await axios.put(`http://localhost:8000/lead/editlead/${id}`, lead, {
        headers: {
          Authorization: `Bearer ${localStorage.getItem("token")}`,
        },
      });

      toast.success("✅ Lead profile updated!", {
        onClose: () => navigate("/dashboard/leads"),
      });
    } catch (error) {
      console.error("❌ Error updating lead:", error);
      toast.error("Failed to update lead.");
    }
  };

  return (
    <Container className="p-4">
      <ToastContainer autoClose={2000} />
      <h3 className="board-title text-center mb-4">✏️ Edit Lead Profile</h3>

      <Form className="card1" onSubmit={handleSubmit}>
        <div className="form-container1">
          <Form.Group className="mb-3">
            <Form.Label><RequiredLabel label="Company Name" required /></Form.Label>
            <Form.Control
              type="text"
              name="companyName"
              value={lead.companyName}
              onChange={handleInputChange}
              required
            />
          </Form.Group>

          <Form.Group className="mb-3">
            <Form.Label><RequiredLabel label="Full Name" required /></Form.Label>
            <Form.Control
              type="text"
              name="fullName"
              value={lead.fullName}
              onChange={handleInputChange}
              required
            />
          </Form.Group>

          <Form.Group className="mb-3">
            <Form.Label><RequiredLabel label="Email" required /></Form.Label>
            <Form.Control
              type="email"
              name="email"
              value={lead.email}
              onChange={handleInputChange}
              required
            />
          </Form.Group>

          <Form.Group className="mb-3">
            <Form.Label><RequiredLabel label="Phone" required /></Form.Label>
            <Form.Control
              type="tel"
              name="phone"
              value={lead.phone}
              onChange={handleInputChange}
              required
            />
          </Form.Group>

          <Form.Group className="mb-3">
            <Form.Label><RequiredLabel label="Industry" required /></Form.Label>
            <Form.Select
              name="industry"
              value={lead.industry}
              onChange={handleInputChange}
              required
            >
              <option value="">-- Select Industry --</option>
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
            <Form.Label><RequiredLabel label="Lead Source" required /></Form.Label>
            <Form.Select
              name="leadSource"
              value={lead.leadSource}
              onChange={handleInputChange}
              required
            >
              <option value="">-- Select Source --</option>
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
            <Form.Label><RequiredLabel label="Status" required /></Form.Label>
            <Form.Select
              name="status"
              value={lead.status}
              onChange={handleInputChange}
              required
            >
              <option value="">-- Select Status --</option>
              <option>New</option>
              <option>In Progress</option>
              <option>Converted</option>
              <option>Closed</option>
            </Form.Select>
          </Form.Group>

          <Form.Group className="mb-3">
            <Form.Label><RequiredLabel label="Priority" required /></Form.Label>
            <Form.Select
              name="priority"
              value={lead.priority}
              onChange={handleInputChange}
              required
            >
              <option value="">-- Select Priority --</option>
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
              value={lead.lastContacted?.slice(0, 10) || ""}
              onChange={handleInputChange}
            />
          </Form.Group>

          <Form.Group className="mb-3">
            <Form.Label>Next Action Date</Form.Label>
            <Form.Control
              type="date"
              name="nextActionDate"
              value={lead.nextActionDate?.slice(0, 10) || ""}
              onChange={handleInputChange}
            />
          </Form.Group>

          <Form.Group className="mb-3">
            <Form.Label>Notes</Form.Label>
            <Form.Control
              as="textarea"
              rows={4}
              name="notes"
              value={lead.notes}
              onChange={handleInputChange}
            />
          </Form.Group>

          <div className="button-group-row mt-4">
            <Button type="submit" className="button-save">💾 Update Lead</Button>
            <Button variant="secondary" className="button-back ms-3" onClick={() => navigate(-1)}>
              🔙 Cancel
            </Button>
          </div>
        </div>
      </Form>
    </Container>
  );
};

export default LeadProfileEdit;