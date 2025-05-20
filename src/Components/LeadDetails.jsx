import React, { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import axios from "axios";
import { Container, Card, Button,Modal } from "react-bootstrap";
import { toast, ToastContainer } from "react-toastify";
import "../css/Details.css";

const LeadDetails = () => {
  const { id } = useParams();
  const [lead, setLead] = useState(null);
  const [showModal, setShowModal] = useState(false);
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

  const handleDelete = async () => {
    const token = localStorage.getItem('token');
    try {
      await axios.delete(`http://localhost:8000/lead/deletelead/${id}`, {
        headers: {
          Authorization: `Bearer ${token}`
        }
      });
      toast.success('✅ Task deleted successfully!', {
        onClose: () => {
          navigate('/dashboard/leads'); // Redirect to tasks page
        }
      });
    } catch (err) {
      console.error('❌ Delete error:', err);
      toast.error('❌ Failed to delete task. Please try again.');
    } finally {
      setShowModal(false); // Close modal after action
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
            ✏️ Update
          </Button>
          <Button variant="danger" onClick={() => setShowModal(true)}>
            🗑️ Delete
          </Button>
          <Button
            className="button button-secondary"
            onClick={() => navigate(-1)}
          >
            ← Back
          </Button>
        </div>
      </Card>

      {/* Confirmation Modal */}
      <Modal show={showModal} onHide={() => setShowModal(false)} className='mt-5'>
        {/* Close button */}
        <Modal.Header closeButton>
          <Modal.Title>⚠️ Confirm Deletion </Modal.Title>
        </Modal.Header>
        <Modal.Body>
          Are you sure you want to delete this task?
        </Modal.Body>
        <Modal.Footer>
          <Button variant="danger" onClick={handleDelete}>
            Yes, Delete
          </Button>
          <Button variant="secondary" onClick={() => setShowModal(false)}>
            Cancel
          </Button>
        </Modal.Footer>
      </Modal>
    </Container>
  );
};

export default LeadDetails;
