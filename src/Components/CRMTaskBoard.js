// CRMTaskBoard.js
import React, { useEffect, useState } from 'react';
import { Container, Row, Col, Card, Button, Form } from 'react-bootstrap';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import { FaSearch, FaTimes } from 'react-icons/fa';
import {
  DndContext,
  closestCenter,
  PointerSensor,
  useSensor,
  useSensors
} from '@dnd-kit/core';
import {
  arrayMove,
  SortableContext,
  verticalListSortingStrategy,
  useSortable,
} from '@dnd-kit/sortable';
import { CSS } from '@dnd-kit/utilities';
import '../css/Taskbord.css';

const statuses = ['Not Started', 'Deferred', 'In Progress', 'Completed'];

const SortableTaskCard = ({ task, navigate }) => {
  const { attributes, listeners, setNodeRef, transform, transition } = useSortable({
    id: task._id,
  });

  const style = {
    transform: CSS.Transform.toString(transform),
    transition,
    cursor: 'grab',
  };

  return (
    <Card
      ref={setNodeRef}
      {...attributes}
      {...listeners}
      className="task-card shadow-sm"
      style={style}
      onClick={() => navigate(`/dashboard/tasks/${task._id}`)}
    >
      <Card.Body className="task-data">
        <div className="task-title fw-bold">{task.taskname}</div>
        <div><strong>Due Date:</strong> {new Date(task.duedate).toLocaleDateString()}</div>
        <div><strong>Assigned To:</strong> {task.assignedto}</div>
      </Card.Body>
    </Card>
  );
};

const CRMTaskBoard = () => {
  const [tasks, setTasks] = useState([]);
  const [searchVisible, setSearchVisible] = useState(false);
  const [searchTerm, setSearchTerm] = useState('');
  const navigate = useNavigate();

  useEffect(() => {
    const fetchTasks = async () => {
      const token = localStorage.getItem('token');
      try {
        const res = await axios.get('http://localhost:8000/task/all', {
          headers: {
            Authorization: `Bearer ${token}`
          }
        });
        setTasks(res.data);
      } catch (err) {
        console.error('❌ Error fetching tasks:', err);
      }
    };

    fetchTasks();
  }, []);

  const handleSearchToggle = () => {
    setSearchVisible((prev) => {
      if (prev) {
        setSearchTerm('');
        return false;
      }
      return true;
    });
  };

  const handleKeyDown = (e) => {
    if (e.key === 'Enter') {
      e.preventDefault();
      setSearchVisible(false);
    }
  };

  const filteredTasks = tasks.filter(task =>
    task.taskname.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const groupedTasks = statuses.reduce((acc, status) => {
    acc[status] = filteredTasks.filter(t => t.status === status);
    return acc;
  }, {});

  const sensors = useSensors(
    useSensor(PointerSensor, {
      activationConstraint: {
        distance: 5,
      },
    })
  );

  const handleDragEnd = async (event) => {
    const { active, over } = event;
    if (!over) return;

    const activeTask = tasks.find(t => t._id === active.id);
    const overTask = tasks.find(t => t._id === over.id);

    if (!activeTask) return;

    // Same column reorder
    if (activeTask.status === overTask?.status) {
      const columnTasks = [...groupedTasks[activeTask.status]];
      const oldIndex = columnTasks.findIndex(t => t._id === active.id);
      const newIndex = columnTasks.findIndex(t => t._id === over.id);
      if (oldIndex !== newIndex && newIndex !== -1) {
        const newOrdered = arrayMove(columnTasks, oldIndex, newIndex);

        // Keep tasks from other statuses unchanged
        const otherTasks = tasks.filter(t => t.status !== activeTask.status);

        // Combine other tasks + reordered column tasks
        const newTasks = [
          ...otherTasks,
          ...newOrdered
        ];

        // Sort newTasks so statuses order is maintained
        const sortedTasks = statuses.flatMap(status => {
          if (status === activeTask.status) {
            return newOrdered;
          } else {
            return newTasks.filter(t => t.status === status);
          }
        });

        setTasks(sortedTasks);
      }
    }

    // Cross column move (status change)
    if (activeTask.status !== overTask?.status) {
      try {
        const token = localStorage.getItem('token');
        const updatedTask = { ...activeTask, status: overTask.status };
        await axios.put(`http://localhost:8000/task/${active.id}`, updatedTask, {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        });
        setTasks(prev =>
          prev.map(task =>
            task._id === active.id ? { ...task, status: overTask.status } : task
          )
        );
      } catch (err) {
        console.error('Error updating task status:', err);
      }
    }
  };

  return (
    <Container fluid className="task-board position-relative">
      <div className="title-wrapper position-relative mb-3">
        <h2 className="board-title text-center m-0 contact-list-title">📋 TASK BOARD</h2>
        <div className="search-toggle d-flex align-items-center" style={{ position: 'absolute', top: '5px', right: '0' }}>
          {searchVisible && (
            <div className="search-box me-2 slide-in">
              <Form.Control
                type="text"
                placeholder="Search by task name..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                onKeyDown={handleKeyDown}
                autoFocus
              />
              {searchTerm && (
                <Button
                  variant="light"
                  onClick={() => setSearchTerm('')}
                  className="clear-btn"
                  tabIndex={-1}
                >
                  <FaTimes />
                </Button>
              )}
            </div>
          )}
          <Button variant="outline-secondary" onClick={handleSearchToggle}>
            <FaSearch />
          </Button>
        </div>
      </div>

      <DndContext sensors={sensors} collisionDetection={closestCenter} onDragEnd={handleDragEnd}>
        <Row className="gx-4 gy-4 d-flex flex-nowrap overflow-auto">
          {statuses.map((status) => (
            <Col key={status} className="column-container" style={{ minWidth: '250px' }}>
              <div className="column-header fw-bold text mb-2">
                {status}
                <span className="count ms-2">{groupedTasks[status].length}</span>
              </div>
              <SortableContext
                items={groupedTasks[status].map(task => task._id)}
                strategy={verticalListSortingStrategy}
              >
                <div className="task-column d-flex flex-column gap-0">
                  {groupedTasks[status].map(task => (
                    <SortableTaskCard key={task._id} task={task} navigate={navigate} />
                  ))}
                  {groupedTasks[status].length === 0 && (
                    <div className="no-task">No tasks</div>
                  )}
                </div>
              </SortableContext>
            </Col>
          ))}
        </Row>
      </DndContext>
    </Container>
  );
};

export default CRMTaskBoard;
