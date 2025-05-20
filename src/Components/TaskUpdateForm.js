import React, { useEffect, useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { Button, Container, Form } from 'react-bootstrap';
import axios from 'axios';
import { ToastContainer, toast } from 'react-toastify';
import '../css/Forms.css';

const statuses = ['Not Started', 'Deferred', 'In Progress', 'Completed'];
const priorities = ['Low', 'Medium', 'High'];

const TaskUpdateForm = () => {
  const { id } = useParams();
  const [task, setTask] = useState(null);
  const navigate = useNavigate();
  const [contacts, setContacts] = useState([]);

  useEffect(() => {
    const token = localStorage.getItem('token');

    axios.get(`http://localhost:8000/task/${id}`, {
      headers: { Authorization: `Bearer ${token}` }
    })
      .then(res => {
        const t = res.data;
        setTask({
          ...t,
          duedate: t.duedate?.slice(0, 10),
          assigneddate: t.assigneddate?.slice(0, 10)
        });
      })
      .catch(err => {
        console.error("❌ Load task error", err);
        alert("Failed to fetch task. Please make sure you are logged in.");
    });

    // Fetch contacts
    axios.get("http://localhost:8000/contact/all", {
      headers: { Authorization: `Bearer ${token}` }
    })
      .then(res => setContacts(res.data))
      .catch(err => {
        console.error("❌ Failed to load contacts", err);
    });
  }, [id]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setTask(prev => ({ ...prev, [name]: value }));
  };

  const handleSubmit = () => {
    const token = localStorage.getItem('token');

    axios.put(`http://localhost:8000/task/${id}`, task, {
      headers: { Authorization: `Bearer ${token}` }
    })
      .then(() => {
        toast.success("✅ Task updated successfully!", {
          onclose : () => { 
            navigate("/dashboard/tasks");
          }
        });
      })
      .catch(err => {
        console.error("Update failed : ", err);
        toast.error("❌ Failed to update task.")
      });
  };

  return (
    <Container className="p-4">
      <ToastContainer autoClose={2000}/>
      <h3 className="board-title text-center mb-4">✏️ Update Task</h3>
      {task && (
        <Form className="card1">
          <div className="form-container1">
            <Form.Group className="mb-3">
              <Form.Label>Task Name</Form.Label>
              <Form.Control name="taskname" value={task.taskname} onChange={handleChange} />
            </Form.Group>

            <Form.Group className="mb-3">
              <Form.Label>Description</Form.Label>
              <Form.Control as="textarea" rows={3} name="description" value={task.description} onChange={handleChange} />
            </Form.Group>

            <Form.Group className="mb-3">
              <Form.Label>Due Date</Form.Label>
              <Form.Control type="date" name="duedate" value={task.duedate} onChange={handleChange} />
            </Form.Group>

            <Form.Group className="mb-3">
              <Form.Label>Contact Name</Form.Label>
              <Form.Select name="contact" value={task.contact} onChange={handleChange}>
                <option value="">-- Select Contact --</option>
                {contacts.map(contact => (
                  <option key={contact._id} value={contact.name}>{contact.name}</option>
                ))}
              </Form.Select>
            </Form.Group>

            <Form.Group className="mb-3">
              <Form.Label>Assigned To</Form.Label>
              <Form.Control as="textarea" rows={2} name="assignedto" value={task.assignedto} onChange={handleChange} />
            </Form.Group>

            <Form.Group className="mb-3">
              <Form.Label>Status</Form.Label>
              <Form.Select name="status" value={task.status} onChange={handleChange}>
                {statuses.map(s => <option key={s}>{s}</option>)}
              </Form.Select>
            </Form.Group>

            <Form.Group className="mb-3">
              <Form.Label>Priority</Form.Label>
              <Form.Select name="priority" value={task.priority} onChange={handleChange}>
                {priorities.map(p => <option key={p}>{p}</option>)}
              </Form.Select>
            </Form.Group>

            <Form.Group className="mb-3">
              <Form.Label>Assigned Date</Form.Label>
              <Form.Control type="date" name="assigneddate" value={task.assigneddate} disabled />
            </Form.Group>

            <Button className="button button-save" onClick={handleSubmit}>💾 Save</Button>
          </div>
        </Form>
      )}
    </Container>
  );
};

export default TaskUpdateForm;
