import React, { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import axios from "axios";
import { Container, Card, Button,Modal } from "react-bootstrap";
import { toast, ToastContainer } from "react-toastify";
import "../css/Details.css";

const LeadDetails = () => {
  const { id } = useParams();
  const [lead, setLead] = useState(null);
  const [modal, setModal] = useState({
    show: false,
    functionality: '',
    action: null,
    title: '',
    message: ''
  });
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

  const formatDateTime = (dateString) => {
  const date = new Date(dateString);
  return new Intl.DateTimeFormat('en-GB', {
    day: '2-digit',
    month: 'short',
    year: 'numeric'
    }).format(date);
  };

  const handleDelete = async () => {
    const token = localStorage.getItem('token');
    try {
      await axios.delete(`http://localhost:8000/lead/deletelead/${id}`, {
        headers: {
          Authorization: `Bearer ${token}`
        }
      });
      toast.success('Task deleted successfully!', {
        onClose: () => {
          navigate('/dashboard/leads'); // Redirect to tasks page
        }
      });
    } catch (err) {
      console.error('Delete error:', err);
      toast.error('❌ Failed to delete task. Please try again.');
    } finally {
      closeModal(); // Close modal after action
    }
  };

  const confirmDelete = () => {
    setModal({
      show: true,
      functionality: 'delete',
      title: '⚠️ Confirm Deletion',
      message: 'Are you sure you want to delete this lead?',
      action: handleDelete
    });
  };

  const confirmConvert = () => {
    setModal({
      show: true,
      functionality: 'convert',
      title: '🔁 Convert Lead to Contact',
      message: 'Do you want to convert this lead into a contact?',
      action: handleConvertLead
    });
  };

  const closeModal = () => {
    setModal({
      show: false,
      functionality: '',
      action: null,
      title: '',
      message: ''
    });
  };

  const handleConvertLead = async () => {
    const token = localStorage.getItem('token');

    //Change lead data to contact data
    const contactData = {
      fullName: lead.fullName,
      email: lead.email,
      phone: lead.phone,
      company: lead.companyName,
    };
    try {
      await axios.post("http://localhost:8000/contact/add-converted-contact", contactData, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });

      await axios.get(`http://localhost:8000/lead/convert-lead/${id}`, {
        headers: {
          Authorization: `Bearer ${token}`
        }
      });
      toast.success('Lead converted to contact successfully..!', {
        onClose: () => {
          navigate('/dashboard/leads'); // Redirect to contacts page
        }
      });
    } catch (error) {
      console.error('❌ Conversion error:', error);
      toast.error('Failed to convert lead. Please try again.');
    }
  };

  if (!lead) return <p>Loading...</p>;

  return (
    <Container className="p-4">
      <ToastContainer autoClose={2000}/>
      <h3 className="board-title text-center mb-4">🏢 Lead Details</h3>
      <Card className="task-detail-card p-3">
        <p><strong>Company Name:</strong> {lead.companyName}</p>
        <p><strong>Contact Person:</strong> {lead.fullName}</p>
        <p><strong>Email:</strong> {lead.email}</p>
        <p><strong>Phone:</strong> {lead.phone}</p>
        <p><strong>Industry:</strong> {lead.industry}</p>
        <p><strong>Lead Source:</strong> {lead.leadSource}</p>
        <p><strong>Status:</strong> {lead.status}</p>
        <p><strong>Priority:</strong> {lead.priority}</p>
        {lead.lastContacted && <p><strong>Last Contacted:</strong> {formatDateTime(lead.lastContacted)} </p>}
        {lead.nextActionDate && <p><strong>Next Action Date:</strong> {formatDateTime(lead.nextActionDate)} </p>}
        {lead.notes && <p><strong>Notes:</strong> {lead.notes}</p>}

        <div className="d-flex gap-3 mt-4">
          <Button
            className="button button-update-custom"
            onClick={() => navigate(`/dashboard/leads/update/${id}`)}
          >
            ✏️ Update
          </Button>
          <Button 
            variant="danger" 
            onClick={confirmDelete}>
            🗑️ Delete
          </Button>
          <Button
            variant="secondary"
            onClick={() => navigate(-1)}
          >
            ← Back
          </Button>
          <Button 
            variant="primary" 
            onClick={confirmConvert}>
            Convert
          </Button>
          <Button
            variant="success"
            href={`tel:${lead.phone}`}
          >
            📞 Call
          </Button>
          <Button
            variant="warning"
            onClick={() => {
              navigate("/dashboard/send-email", {
                state: { recipients: [lead.email] }
              });
            }}
          >
            Send Email
          </Button>
        </div>
      </Card>

      {/* Confirmation Modal */}
      <Modal show={modal.show} onHide={() => setModal({ ...modal, show: false })} className="mt-5">
        <Modal.Header closeButton>
          <Modal.Title>{modal.title}</Modal.Title>
        </Modal.Header>
        <Modal.Body>{modal.message}</Modal.Body>
        <Modal.Footer>
          <Button variant={modal.functionality === 'delete' ? 'danger' : 'primary'} 
            onClick={() => {
              modal.action?.(); // call the intended function
              setModal({ ...modal, show: false }); // close modal
            }}>
             { modal.functionality === 'delete' ? 'Yes, Delete' : 'Yes, Convert' }
          </Button>
          <Button variant="secondary" onClick={() => setModal({ ...modal, show: false })}>
            Cancel
          </Button>
        </Modal.Footer>
      </Modal>

    </Container>
  );
};

export default LeadDetails;
