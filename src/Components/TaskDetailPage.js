import React, { useEffect, useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { Container, Card, Button, Modal } from 'react-bootstrap';
import axios from 'axios';
import { ToastContainer, toast } from 'react-toastify';
import '../css/Details.css';

const TaskDetailPage = () => {
  const { taskId } = useParams();
  const [task, setTask] = useState(null);
  const [showModal, setShowModal] = useState(false);
  const navigate = useNavigate();

  useEffect(() => {
    const fetchTask = async () => {
      const token = localStorage.getItem('token'); // 🔐 Get the JWT token

      try {
        const res = await axios.get(`http://localhost:8000/task/${taskId}`, {
          headers: {
            Authorization: `Bearer ${token}` // ✅ Send token in header
          }
        });
        setTask(res.data);
      } catch (err) {
        console.error('❌ Error fetching task details:', err);
        alert('Failed to fetch task details.');
      }
    };

    fetchTask();
  }, [taskId]);

   const handleDelete = async () => {
    const token = localStorage.getItem('token');

    try {
      await axios.delete(`http://localhost:8000/task/${taskId}`, {
        headers: {
          Authorization: `Bearer ${token}`
        }
      });
      toast.success('✅ Task deleted successfully!', {
        onClose: () => {
          navigate('/dashboard/tasks'); // Redirect to tasks page
        }
      });
    } catch (err) {
      console.error('❌ Delete error:', err);
      toast.error('❌ Failed to delete task. Please try again.');
    } finally {
      setShowModal(false); // Close modal after action
    }
  };

  return (
    <Container className="p-4">
      <ToastContainer autoClose={2000}/>
      <h3 className="board-title text-center mb-4">📝 Task Details</h3>
      {task ? (
        <Card className="task-detail-card p-4">
          <p><strong>Task Name:</strong> {task.taskname}</p>
          <p><strong>Status:</strong> {task.status}</p>
          { task.assignedto && <p><strong>Assigned To:</strong> {task.assignedto}</p> }
          <p><strong>Due Date:</strong> {new Date(task.duedate).toLocaleDateString()}</p>
          <p><strong>Description:</strong> {task.description}</p>
          <p><strong>Priority:</strong> {task.priority}</p>
          <p><strong>Contact:</strong> {task.contact}</p>
          <p><strong>Assigned Date:</strong> {new Date(task.assigneddate).toLocaleDateString()}</p>

          <div className="d-flex gap-3 mt-4">
            <Button className='button-update-custom' variant="primary" onClick={() => navigate(`/dashboard/tasks/update/${taskId}`)}>
              ✏️ Update
            </Button>
            <Button variant="danger" onClick={() => setShowModal(true)}>
              🗑️ Delete
            </Button>
            <Button variant="secondary" onClick={() => navigate(-1)}>
              ← Back
            </Button>
          </div>
        </Card>
      ) : (
        <p>Loading task details...</p>
      )}

       {/* 🔥 Confirmation Modal */}
      <Modal show={showModal} onHide={() => setShowModal(false)} className='mt-5'>
        {/* 🔒 Close button */}
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

export default TaskDetailPage;
