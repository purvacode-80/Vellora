import { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import axios from "axios";
import { ToastContainer, toast } from "react-toastify";
import { Container, Card, Button, Modal } from "react-bootstrap";
import "../css/Details.css";

const ContactDetails = () => {
  const { id } = useParams();
  const [contact, setContact] = useState(null);
  const [showModal, setShowModal] = useState(false);
  const navigate = useNavigate();

  useEffect(() => {
    const fetchContact = async () => {
      const token = localStorage.getItem('token'); // 🔐 Get the JWT token

      try {
        const res = await axios.get(`http://localhost:8000/contact/${id}`, {
          headers: {
            Authorization: `Bearer ${token}` // ✅ Send token in header
          }
        });
        setContact(res.data);
      } catch (err) {
        console.error('❌ Error fetching contact details : ', err);
        toast.error('Failed to fetch contact details.');
      }
    };

    fetchContact();
  }, [id]);

  const handleDelete = async () => {
    const token = localStorage.getItem('token');
    try {
      await axios.delete(`http://localhost:8000/contact/delete-contact/${id}`, {
        headers: {
          Authorization: `Bearer ${token}`
        }
      });
      toast.success('✅ Contact deleted successfully!', {
        onClose: () => {
          navigate('/dashboard/contacts'); // Redirect to Contacts page
        }
      });
    } catch (err) {
      console.error('❌ Delete error:', err);
      toast.error('❌ Failed to delete Contact. Please try again.');
    } finally {
      setShowModal(false); // Close modal after action
    }
  };

  if (!contact) return <p>Loading contact details </p>;

  return (
    <Container className="p-4">
      <ToastContainer autoClose={2000} />
      <h3 className="board-title text-center mb-4"> 📇 Contact Details</h3>
      <Card className="task-detail-card p-4">
        <p><strong>Name:</strong> {contact.name}</p>
        <p><strong>Email:</strong> {contact.email}</p>
        <p><strong>Phone:</strong> {contact.phone}</p>
        <p><strong>Position:</strong> {contact.position}</p>
        <p><strong>Company:</strong> {contact.company}</p>
        <p><strong>Address:</strong> {contact.address}</p>
        <p><strong>Notes:</strong> {contact.notes}</p>
        <p><strong>Status:</strong> {contact.status}</p>

        <div className="d-flex gap-3 mt-4">
          <Button
            className="button button-update-custom"
            onClick={() => navigate(`/dashboard/contact/update/${contact._id}`)}
          >
            ✏️ Update
          </Button>
          <Button variant="danger" onClick={() => setShowModal(true)}>
            🗑️ Delete
          </Button>
          <Button
            variant="secondary"
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
          Are you sure you want to delete this Contact?
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

export default ContactDetails;
