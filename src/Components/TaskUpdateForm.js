import React, { useEffect, useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { Button, Container, Form } from 'react-bootstrap';
import axios from 'axios';
import { ToastContainer, toast } from 'react-toastify';
import RequiredLabel from './RequiredLabel';
import '../css/Forms.css';

const TaskUpdateForm = () => {
  const { id } = useParams();
  const [task, setTask] = useState(null);
  const navigate = useNavigate();
  const [contacts, setContacts] = useState([]);

  const statuses = ['Not Started', 'Deferred', 'In Progress', 'Completed'];
  const priorities = ['Low', 'Medium', 'High'];

  useEffect(() => {
    const token = localStorage.getItem('token');

    const fetchTaskAndContacts = async () => {
      try {
        const taskRes = await axios.get(`http://localhost:8000/task/${id}`, {
          headers: { Authorization: `Bearer ${token}` },
        });
        const t = taskRes.data;
        setTask({
          ...t,
          duedate: t.duedate?.slice(0, 10),
          assigneddate: t.assigneddate?.slice(0, 10),
        });

        const contactRes = await axios.get("http://localhost:8000/contact/all", {
          headers: { Authorization: `Bearer ${token}` },
        });
        setContacts(contactRes.data);
      } catch (err) {
        console.error("Error loading task or contacts:", err);
        toast.error("Failed to load data. Please make sure you're logged in.");
      }
    };

    fetchTaskAndContacts();
  }, [id]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setTask(prev => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async () => {
    const token = localStorage.getItem('token');

    try {
      await axios.put(`http://localhost:8000/task/${id}`, task, {
        headers: { Authorization: `Bearer ${token}` },
      });

      toast.success("Task updated successfully!", {
        onClose: () => navigate("/dashboard/tasks"),
      });
    } catch (err) {
      console.error("Update failed:", err);
      toast.error("Failed to update task.");
    }
  };

  return (
    <Container className="p-4">
      <ToastContainer autoClose={2000} />
      <h3 className="board-title text-center mb-4">✏️ Update Task</h3>
      {task && (
        <Form className="card1">
          <div className="form-container1">
            <Form.Group className="mb-3">
              <Form.Label><RequiredLabel label="Task Name" required /></Form.Label>
              <Form.Control name="taskname" value={task.taskname} onChange={handleChange} required />
            </Form.Group>

            <Form.Group className="mb-3">
              <Form.Label><RequiredLabel label="Description" required /></Form.Label>
              <Form.Control as="textarea" rows={3} name="description" value={task.description} onChange={handleChange} required />
            </Form.Group>

            <Form.Group className="mb-3">
              <Form.Label><RequiredLabel label="Due Date" required /></Form.Label>
              <Form.Control type="date" name="duedate" value={task.duedate} onChange={handleChange} required />
            </Form.Group>

            <Form.Group className="mb-3">
              <Form.Label><RequiredLabel label="Contact Name" required /></Form.Label>
              <Form.Select name="contact" value={task.contact} onChange={handleChange} required>
                <option value="">-- Select Contact --</option>
                {contacts.map(contact => (
                  <option key={contact.fullName}>
                    {contact.fullName}
                  </option>
                ))}
              </Form.Select>
            </Form.Group>

            <Form.Group className="mb-3">
              <Form.Label><RequiredLabel label="Assigned To" required /></Form.Label>
              <Form.Control as="textarea" rows={2} name="assignedto" value={task.assignedto} onChange={handleChange} required />
            </Form.Group>

            <Form.Group className="mb-3">
              <Form.Label><RequiredLabel label="Status" required /></Form.Label>
              <Form.Select name="status" value={task.status} onChange={handleChange} required>
                <option value="">-- Select Status --</option>
                {statuses.map(s => <option key={s}>{s}</option>)}
              </Form.Select>
            </Form.Group>

            <Form.Group className="mb-3">
              <Form.Label><RequiredLabel label="Priority" required /></Form.Label>
              <Form.Select name="priority" value={task.priority} onChange={handleChange} required>
                <option value="">-- Select Priority --</option>
                {priorities.map(p => <option key={p}>{p}</option>)}
              </Form.Select>
            </Form.Group>

            <Form.Group className="mb-3">
              <Form.Label>Assigned Date</Form.Label>
              <Form.Control type="date" name="assigneddate" value={task.assigneddate} disabled />
            </Form.Group>

            <div className="button-group-row mt-4">
              <Button className="button-save" onClick={handleSubmit}>
                💾 Update Task
              </Button>
              <Button variant="secondary" className="button-back ms-3" onClick={() => navigate(-1)}>
                🔙 Cancel
              </Button>
            </div>
          </div>
        </Form>
      )}
    </Container>
  );
};

export default TaskUpdateForm;