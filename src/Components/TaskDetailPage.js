import React, { useEffect, useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { Container, Card, Button } from 'react-bootstrap';
import axios from 'axios';
import '../css/Taskbord.css';

const TaskDetailPage = () => {
  const { taskId } = useParams();
  const [task, setTask] = useState(null);
  const navigate = useNavigate();

  useEffect(() => {
    axios.get(`http://localhost:8000/task/${taskId}`)
      .then(res => setTask(res.data))
      .catch(err => console.error('Error fetching task details:', err));
  }, [taskId]);

  const handleDelete = () => {
    if (window.confirm('Are you sure you want to delete this task?')) {
      axios.delete(`http://localhost:8000/task/${taskId}`)
        .then(() => {
          alert('Task deleted');
          navigate('/');
        })
        .catch(err => console.error('Delete error:', err));
    }
  };

  return (
    <Container className="p-4">
      <h3 className="board-title" style={{ textAlign: 'center', marginBottom: '1.5rem' }}>📝 Task Details</h3>
      {task && (
<<<<<<< HEAD
        <Card className="task-detail-card">
          <p><strong>Task Name:</strong> {task.taskname}</p>
          <p><strong>Status:</strong> {task.status}</p>
          <p><strong>Assigned To:</strong> {task.assignedto}</p>
          <p><strong>Due Date:</strong> {new Date(task.duedate).toLocaleDateString()}</p>
          <p><strong>Description:</strong> {task.description}</p>
          <p><strong>Priority:</strong> {task.priority}</p>
          <p><strong>Contact:</strong> {task.contact}</p>
          <p><strong>Assigned Date:</strong> {task.assigneddate}</p>

          <div style={{ display: 'flex', gap: '1rem', marginTop: '2rem' }}>
            <Button className="button button-update-custom" onClick={() => navigate(`/dashboard/tasks/update/${taskId}`)}>
              Update
            </Button>
            <Button className="button button-delete" onClick={handleDelete}>
              Delete
            </Button>
            <Button className="button button-secondary" onClick={() => navigate(-1)}>
              Back
            </Button>
          </div>
        </Card>
=======
         <Card className="task-detail-card">
         <p><strong>Task Name:</strong> {task.taskname}</p>
         <p><strong>Status:</strong> {task.status}</p>
         <p><strong>Assigned To:</strong> {task.assignedto}</p>
         <p><strong>Due Date:</strong> {new Date(task.duedate).toLocaleDateString()}</p>
         <p><strong>Description:</strong> {task.description}</p>
         <p><strong>Priority:</strong> {task.priority}</p>
         <p><strong>Contact:</strong> {task.contact}</p>
         <p><strong>Assigned Date:</strong> {task.assigneddate}</p>
   
         <div className="d-flex gap-3 mt-4">
           <Button className="button button-update-custom" onClick={() => navigate(`/dashboard/tasks/update/${taskId}`)}>
             Update
           </Button>
           <Button className="button button-delete" onClick={handleDelete}>
             Delete
           </Button>
           <Button className="button button-secondary" onClick={() => navigate(-1)}>
             Back
           </Button>
         </div>
       </Card>
>>>>>>> ee934d1944db240e0f939cd21d106c890e96e943
      )}
    </Container>
  );
};

export default TaskDetailPage;
