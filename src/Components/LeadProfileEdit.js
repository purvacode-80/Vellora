import { useState, useEffect } from "react";
import axios from "axios";
import { Form, Button, Container } from "react-bootstrap";
import { useParams, useNavigate } from "react-router-dom";
import { toast, ToastContainer } from "react-toastify";
import "../css/Forms.css"; // 👈 Ensure your custom CSS is applied

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
        const res = await axios.get(`http://localhost:8000/lead/${id}`,{
          headers: {
            Authorization: `Bearer ${localStorage.getItem("token")}`,
          },
        });
        setLead(res.data);
      } catch (error) {
        console.error("Error fetching lead: ", error);
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
      toast.success("Lead profile updated successfully!", {
        onClose : () => { 
          navigate("/dashboard/leads");
        }
      }
      );
    } catch (error) {
      console.error("Error updating lead: ", error);
      toast.error("Failed to update lead profile. Please try again.");
    }
  };

  return (
    <Container className="p-4">
      <ToastContainer autoClose={2000} />
      <h3 className="board-title text-center mb-4">✏️ Edit Lead Profile</h3>
      <Form className="card1" onSubmit={handleSubmit}>
        <div className="form-container1">
          <Form.Group className="mb-3">
            <Form.Label>Company Name</Form.Label>
            <Form.Control
              type="text"
              name="companyName"
              value={lead.companyName}
              onChange={handleInputChange}
              required
            />
          </Form.Group>

          <Form.Group className="mb-3">
            <Form.Label>Full Name</Form.Label>
            <Form.Control
              type="text"
              name="fullName"
              value={lead.fullName}
              onChange={handleInputChange}
            />
          </Form.Group>

          <Form.Group className="mb-3">
            <Form.Label>Email</Form.Label>
            <Form.Control
              type="email"
              name="email"
              value={lead.email}
              onChange={handleInputChange}
            />
          </Form.Group>

          <Form.Group className="mb-3">
            <Form.Label>Phone</Form.Label>
            <Form.Control
              type="text"
              name="phone"
              value={lead.phone}
              onChange={handleInputChange}
            />
          </Form.Group>

          <Form.Group className="mb-3">
            <Form.Label>Industry</Form.Label>
            <Form.Select
              name="industry"
              value={lead.industry}
              onChange={handleInputChange}
            >
              <option> Technology </option>
              <option> Healthcare </option>
              <option> Finance </option>
              <option> Retail </option>
              <option> Manufacturing </option>
              <option> Education </option>
              <option> Real Estate </option>
            </Form.Select>
          </Form.Group>

          <Form.Group className="mb-3">
            <Form.Label>Lead Source</Form.Label>
            <Form.Select
              name="leadSource"
              value={lead.leadSource}
              onChange={handleInputChange}
            >
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
              value={lead.status}
              onChange={handleInputChange}
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
              value={lead.priority}
              onChange={handleInputChange}
            >
              <option value="High">High</option>
              <option value="Medium">Medium</option>
              <option value="Low">Low</option>
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

          <Button className="update" type="submit">
            💾 Update Lead
          </Button>
        </div>
      </Form>
    </Container>
  );
};

export default LeadProfileEdit;
