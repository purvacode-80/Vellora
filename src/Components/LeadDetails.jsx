import React, { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import axios from "axios";
import { Container, Card, Button } from "react-bootstrap";
import { toast, ToastContainer } from "react-toastify";
import "../css/Details.css";

const LeadDetails = () => {
  const { id } = useParams();
  const [lead, setLead] = useState(null);
  const navigate = useNavigate();

  useEffect(() => {
    const fetchLead = async () => {
      const token = localStorage.getItem("token");

      try {
        const response = await axios.get(`http://localhost:8000/lead/${id}`, {
          headers: {
            Authorization: `Bearer ${token}`, // ✅ Add token here
          },
        });
        setLead(response.data);
      } catch (error) {
        console.error("Error fetching lead details:", error);
      }
    };

    fetchLead();
  }, [id]);

  const handleDelete = async (leadId) => {
    const token = localStorage.getItem("token");
    
    try {
      await axios.delete(`http://localhost:8000/lead/deletelead/${leadId}`, {
        headers: {
          Authorization: `Bearer ${token}`, // ✅ Add token here
        },
      });
      toast.success("Lead deleted successfully!", {
        onClose: () => navigate("/leads"), // Redirect to leads page
      });
    }
    catch (error) {
      console.error("Error deleting lead:", error);
      toast.error("Error deleting lead. Please try again.");
    }
};

  if (!lead) return <p>Loading...</p>;

  return (
    <Container className="p-4">
      <ToastContainer autoClose={2000}/>
      <h3 className="board-title text-center mb-4">🏢 Lead Details</h3>
      <Card className="task-detail-card p-3">
        <p><strong>Company Name:</strong> {lead.companyName}</p>
        <p><strong>Contact Person:</strong> {lead.contactPerson}</p>
        <p><strong>Email:</strong> {lead.email}</p>
        <p><strong>Phone:</strong> {lead.phone}</p>
        <p><strong>Industry:</strong> {lead.industry}</p>
        <p><strong>Lead Source:</strong> {lead.leadSource}</p>
        <p><strong>Status:</strong> {lead.status}</p>
        <p><strong>Priority:</strong> {lead.priority}</p>
        <p><strong>Last Contacted:</strong> {lead.lastContacted}</p>
        <p><strong>Next Action Date:</strong> {lead.nextActionDate}</p>
        <p><strong>Notes:</strong> {lead.notes}</p>

        <div className="d-flex gap-3 mt-4">
          <Button
            className="button button-update-custom"
            onClick={() => navigate(`/dashboard/leads/update/${id}`)}
          >
            Update
          </Button>
          <Button
            className="button button-delete"
            onClick={() => handleDelete(lead._id)}
          >
            Delete
          </Button>
          <Button
            className="button button-secondary"
            onClick={() => navigate(-1)}
          >
            Back
          </Button>
        </div>
      </Card>
    </Container>
  );
};

export default LeadDetails;
