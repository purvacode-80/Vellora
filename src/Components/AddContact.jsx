import { useState, useEffect } from "react";
import axios from "axios";
import { Form, Button, Container } from "react-bootstrap";
import '../css/Forms.css'; 
import { toast, ToastContainer } from "react-toastify";
import { useNavigate } from "react-router-dom";

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

  const [leads, setLeads] = useState([]);
  const [selectedLeadId, setSelectedLeadId] = useState("");
  const [convertLead, setConvertLead] = useState(false);
  const navigate = useNavigate();

  useEffect(() => {
    const fetchLeads = async () => {
      try {
        const token = localStorage.getItem("token");
        const response = await axios.get("http://localhost:8000/lead/all", {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        });
        setLeads(response.data);
      } catch (error) {
        console.error("Error fetching leads:", error);
      }
    };
    fetchLeads();
  }, []);

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleLeadSelect = (e) => {
    const selectedId = e.target.value;
    setSelectedLeadId(selectedId);
    const selectedLead = leads.find(lead => lead._id === selectedId);
    if (selectedLead) {
      setForm({
        ...form,
        fullName: selectedLead.fullName || "",
        email: selectedLead.email || "",
        phone: selectedLead.phone || "",
        company: selectedLead.companyName || ""
      });
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const token = localStorage.getItem("token");

      await axios.post("http://localhost:8000/contact/", form, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });

      if (convertLead && selectedLeadId) {
        await axios.delete(`http://localhost:8000/lead/deletelead/${selectedLeadId}`, {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        });
      }

      setForm({
        fullName: "",
        email: "",
        phone: "",
        position: "",
        company: "",
        address: "",
        notes: "",
        status: "Active"
      });
      setSelectedLeadId("");
      setConvertLead(false);
      toast.success("Contact added successfully!", {
        onClose: () => navigate('/dashboard/contacts') // Redirect to contacts page
      });
    } catch (error) {
      console.error("Error adding contact : ", error);
      toast.error("Failed to add contact. Please try again.");
    }
  };

  const handleReset = () => {
    setForm({
      fullName: "",
      email: "",
      phone: "",
      position: "",
      company: "",
      address: "",
      notes: "",
      status: "Active"
    });
    setSelectedLeadId("");
    setConvertLead(false);
  }

  return (
    <Container className="p-4">
      <ToastContainer />
      <h3 className="board-title text-center mb-4">📇 Add Contact</h3>
      <Form onSubmit={handleSubmit} className="form-container1">

        <Form.Group className="mb-3">
          <Form.Label>Select from Lead (optional)</Form.Label>
          <Form.Select value={selectedLeadId} onChange={handleLeadSelect}>
            <option value="">-- Select Lead --</option>
            {leads.map(lead => (
              <option key={lead._id} value={lead._id}>{lead.fullName}</option>
            ))}
          </Form.Select>
        </Form.Group>

        {selectedLeadId && (
          <Form.Group className="mb-3">
            <Form.Check
              type="checkbox"
              label="Convert this lead to contact"
              checked={convertLead}
              onChange={(e) => setConvertLead(e.target.checked)}
            />
          </Form.Group>
        )}

        <Form.Group className="mb-3">
          <Form.Label>Full Name</Form.Label>
          <Form.Control type="text" name="fullName" value={form.fullName} onChange={handleChange} placeholder="Full Name" required/>
        </Form.Group>

        <Form.Group className="mb-3">
          <Form.Label>Email</Form.Label>
          <Form.Control type="email" name="email" value={form.email} onChange={handleChange} placeholder="Email" required/>
        </Form.Group>

        <Form.Group className="mb-3">
          <Form.Label>Phone</Form.Label>
          <Form.Control type="tel" name="phone" value={form.phone} onChange={handleChange} placeholder="Phone Number" required/>
        </Form.Group>

        <Form.Group className="mb-3">
          <Form.Label>Company</Form.Label>
          <Form.Control type="text" name="company" value={form.company} onChange={handleChange} placeholder="Company Name" required/>
        </Form.Group>

        <Form.Group className="mb-3">
          <Form.Label>Position</Form.Label>
          <Form.Control type="text" name="position" value={form.position} onChange={handleChange} placeholder="Job Title" required/>
        </Form.Group>

        <Form.Group className="mb-3">
          <Form.Label>Address</Form.Label>
          <Form.Control as="textarea" rows={2} name="address" value={form.address} onChange={handleChange} placeholder="Address" required/>
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

        <Button onClick={handleReset}> Reset </Button>
        <Button type="submit" className="button button-save">💾 Add Contact</Button>
      </Form>
    </Container>
  );
};

export default AddContact;