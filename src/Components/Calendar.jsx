import React, { useState, useEffect } from "react";
import { Calendar, momentLocalizer } from "react-big-calendar";
import moment from "moment";
import "react-big-calendar/lib/css/react-big-calendar.css";
import { Modal, Button, Form } from "react-bootstrap";
import eventAxios from "../Utils/eventAxios"; //eventAxios setup
import "../css/Calendar.css"; // Import your CSS file

const localizer = momentLocalizer(moment);

const CalendarView = () => {
  const [events, setEvents] = useState([]);
  const [showModal, setShowModal] = useState(false);
  const [isEdit, setIsEdit] = useState(false);
  const [selectedEvent, setSelectedEvent] = useState(null);
  const [confirmDelete, setConfirmDelete] = useState(false);
  const [newEvent, setNewEvent] = useState({
    title: "",
    start: "",
    end: "",
    description: "",
  });

  const fetchEvents = async () => {
    try {
      const res = await eventAxios.get("/");
      const formatted = res.data.map(event => ({
        ...event,
        start: new Date(event.start),
        end: new Date(event.end),
      }));
      setEvents(formatted);
    } catch (err) {
      console.error("Error fetching events:", err);
    }
  };

  useEffect(() => {
    fetchEvents();
  }, []);

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setNewEvent({ ...newEvent, [name]: value });
  };

  const handleAddOrUpdateEvent = async () => {
    if (!newEvent.title || !newEvent.start || !newEvent.end) {
      alert("Please fill all fields");
      return;
    }

    const payload = {
      ...newEvent,
      start: new Date(newEvent.start),
      end: new Date(newEvent.end),
    };

    try {
      if (isEdit && selectedEvent) {
        const res = await eventAxios.put(`/${selectedEvent._id}`, payload);
        const updatedList = events.map(ev =>
          ev._id === selectedEvent._id ? { ...res.data, start: new Date(res.data.start), end: new Date(res.data.end) } : ev
        );
        setEvents(updatedList);
      } else {
        const res = await eventAxios.post("/", payload);
        setEvents([...events, { ...res.data, start: new Date(res.data.start), end: new Date(res.data.end) }]);
      }
      closeModal();
      isEdit ? alert("Event updated successfully") : alert("Event created successfully");
      isEdit ? setIsEdit(false) : setNewEvent({ title: "", start: "", end: "", description: "" });
    } catch (err) {
      console.error("Error saving event:", err);
      alert(err?.response?.data?.message || "Failed to save event");
    }
  };

  const handleSelectEvent = (event) => {
    setSelectedEvent(event);
    setNewEvent({
      title: event.title,
      start: moment(event.start).format("YYYY-MM-DDTHH:mm"),
      end: moment(event.end).format("YYYY-MM-DDTHH:mm"),
      description: event.description || "",
    });
    setIsEdit(true);
    setShowModal(true);
  };

  const closeModal = () => {
    setShowModal(false);
    setIsEdit(false);
    setSelectedEvent(null);
    setNewEvent({ title: "", start: "", end: "", description: "" });
  };

  const confirmDeleteEvent = () => {
    setShowModal(false);
    setConfirmDelete(true);
    setIsEdit(false)
    setNewEvent({ title: "", start: "", end: "", description: "" });
  };

  const handleDeleteConfirmed = async () => {
    try {
      await eventAxios.delete(`/${selectedEvent._id}`);
      setEvents(events.filter((e) => e._id !== selectedEvent._id));
      setConfirmDelete(false);
      closeModal();
      setIsEdit(false)
      setNewEvent({ title: "", start: "", end: "", description: "" });
      setSelectedEvent(null);
      setShowModal(false);
      alert("Event deleted successfully");
    } catch (err) {
      console.error("Delete failed:", err);
      alert("Failed to delete event");
    }
  };

  return (
    <div className="container">
      <h2 className="text-center calendar-title">📅 My Calendar</h2>
      <Button className="mb-3 purple-button" onClick={() => setShowModal(true)}>
        Add New Event
      </Button>

      <Calendar
        localizer={localizer}
        events={events}
        startAccessor="start"
        endAccessor="end"
        onSelectEvent={handleSelectEvent}
        style={{ height: 500 }}
      />

      {/* Add/Edit Event Modal */}
      <Modal show={showModal} onHide={closeModal} className="mt-5">
        <Modal.Header closeButton>
          <Modal.Title>{isEdit ? "Edit Event" : "Create New Event"}</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <Form>
            <Form.Group className="mb-3">
              <Form.Label>Title</Form.Label>
              <Form.Control
                type="text"
                name="title"
                value={newEvent.title}
                onChange={handleInputChange}
              />
            </Form.Group>
            <Form.Group className="mb-3">
              <Form.Label>Start</Form.Label>
              <Form.Control
                type="datetime-local"
                name="start"
                value={newEvent.start}
                onChange={handleInputChange}
              />
            </Form.Group>
            <Form.Group className="mb-3">
              <Form.Label>End</Form.Label>
              <Form.Control
                type="datetime-local"
                name="end"
                value={newEvent.end}
                onChange={handleInputChange}
              />
            </Form.Group>
            <Form.Group className="mb-3">
              <Form.Label>Description</Form.Label>
              <Form.Control
                as="textarea"
                name="description"
                value={newEvent.description}
                onChange={handleInputChange}
              />
            </Form.Group>
          </Form>
        </Modal.Body>
        <Modal.Footer>
          <Button variant="primary" onClick={handleAddOrUpdateEvent} className="purple-button">
            {isEdit ? "Update" : "Save"}
          </Button>
          {isEdit && (
            <Button variant="danger" onClick={confirmDeleteEvent}>
              🗑️ Delete
            </Button>
          )}
          <Button variant="secondary" onClick={closeModal}>
            Cancel
          </Button>
        </Modal.Footer>
      </Modal>

      {/* Confirm Delete Modal */}
      <Modal show={confirmDelete} onHide={() => setConfirmDelete(false)} centered>
        <Modal.Header closeButton>
          <Modal.Title>Are you sure?</Modal.Title>
        </Modal.Header>
        <Modal.Body>Do you really want to delete this event?</Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={() => setConfirmDelete(false)}>
            Cancel
          </Button>
          <Button variant="danger" onClick={handleDeleteConfirmed}>
            Delete
          </Button>
        </Modal.Footer>
      </Modal>
    </div>
  );
};

export default CalendarView;