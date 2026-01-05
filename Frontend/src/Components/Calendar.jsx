import React, { useState, useEffect } from "react";
import { Calendar, momentLocalizer } from "react-big-calendar";
import moment from "moment";
import "react-big-calendar/lib/css/react-big-calendar.css";
import { Modal, Button, Form } from "react-bootstrap";
import eventAxios from "../Utils/eventAxios";
import "../css/Calendar.css";
import { toast, ToastContainer } from "react-toastify";

const localizer = momentLocalizer(moment);

const CalendarView = () => {
  const defaultEvent = {
    title: "",
    start: "",
    end: "",
    description: "",
    notify: false,
    reminderTime: 5,
  };

  const [events, setEvents] = useState([]);
  const [showModal, setShowModal] = useState(false);
  const [isEdit, setIsEdit] = useState(false);
  const [selectedEvent, setSelectedEvent] = useState(null);
  const [confirmDelete, setConfirmDelete] = useState(false);
  const [newEvent, setNewEvent] = useState(defaultEvent);

  useEffect(() => {
    fetchEvents();
    if (Notification.permission !== "granted") {
      Notification.requestPermission();
    }
  }, []);

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

  const handleInputChange = (e) => {
    const { name, value, type, checked } = e.target;
    const newValue = type === "checkbox" ? checked : value;
    setNewEvent(prev => ({ ...prev, [name]: newValue }));
  };

  const scheduleNotification = (event) => {
  // Check if notifications are supported
  if (!("Notification" in window)) {
    console.error("❌ This browser does not support notifications");
    return;
  }

  // Check permission
  if (Notification.permission !== "granted") {
    console.warn(`🔕 Notifications are not granted. Current permission: ${Notification.permission}`);
    return;
  }

  if (!event.notify) {
    console.warn(`🔕 Notifications are disabled for "${event.title || 'Untitled'}"`);
    return;
  }

  const eventTime = new Date(event.start).getTime();
  const reminderMs = (event.reminderTime || 5) * 60000;
  const notifyTime = eventTime - reminderMs;
  const now = Date.now();
  const delay = notifyTime - now;
  const formattedEventDate = new Date(notifyTime);

  // console.log("⏰ Event Time:", new Date(eventTime));
  // console.log("🔔 Reminder set for:", new Date(notifyTime));
  // console.log("⏳ Delay (ms):", delay);
  // console.log("📊 Current time:", new Date(now));

  if (delay > 0) {
    const timeoutId = setTimeout(() => {
      // console.log(`📢 Triggering notification for "${event.title}"`);
      
      try {
        // Create the notification with error handling
        const notification = new Notification("🔔 Event Reminder", {
          body: `Reminder: "${event.title}" is starting at "${formattedEventDate}"`,
          icon: "/favicon.ico", // Optional: add an icon
          tag: `event-${event._id}`, // Prevents duplicate notifications
          requireInteraction: true, // Keeps notification visible until user interacts
        });

        // Add event listeners
        // notification.onclick = () => {
        //   console.log("📱 Notification clicked");
        //   window.focus(); // Focus the window when notification is clicked
        //   notification.close();
        // };

        // notification.onshow = () => {
        //   console.log("✅ Notification successfully shown");
        // };

        notification.onerror = (error) => {
          console.error("❌ Notification error:", error);
        };

        // notification.onclose = () => {
        //   console.log("🔒 Notification closed");
        // };

        // Auto-close after 10 seconds (optional)
        setTimeout(() => {
          notification.close();
        }, 10000);

      } catch (error) {
        console.error("❌ Failed to create notification:", error);
      }
    }, delay);

    // Store timeout ID for potential cancellation (optional)
    console.log(`⏲️ Scheduled notification with timeout ID: ${timeoutId}`);
  } else {
    console.warn("⚠️ Reminder is in the past — not scheduled.");
  }
};

  const handleAddOrUpdateEvent = async () => {
    if (!newEvent.title || !newEvent.start || !newEvent.end) {
      toast.warn("Please fill all fields");
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
        const updated = events.map(ev =>
          ev._id === selectedEvent._id
            ? { ...res.data, start: new Date(res.data.start), end: new Date(res.data.end) }
            : ev
        );
        setEvents(updated);
        toast.success("Event updated successfully");
        scheduleNotification(res.data);
      } else {
        const res = await eventAxios.post("/", payload);
        const savedEvent = {
          ...res.data,
          start: new Date(res.data.start),
          end: new Date(res.data.end),
        };
        setEvents([...events, savedEvent]);
        toast.success("Event created successfully...");
        scheduleNotification(newEvent);
        console.log("🧾 Payload:", payload);
      }

      closeModal();
    } catch (err) {
      console.error("Save failed:", err);
      toast.error("Failed to save event");
    }
  };

  const handleSelectEvent = (event) => {
    setSelectedEvent(event);
    setNewEvent({
      title: event.title,
      start: moment(event.start).format("YYYY-MM-DDTHH:mm"),
      end: moment(event.end).format("YYYY-MM-DDTHH:mm"),
      description: event.description || "",
      notify: event.notify ?? false,
      reminderTime: event.reminderTime ?? 5,
    });
    setIsEdit(true);
    setShowModal(true);
  };

  const confirmDeleteEvent = () => {
    setShowModal(false);
    setConfirmDelete(true);
  };

  const handleDeleteConfirmed = async () => {
    try {
      await eventAxios.delete(`/${selectedEvent._id}`);
      setEvents(events.filter(e => e._id !== selectedEvent._id));
      toast.success("Event deleted");
    } catch (err) {
      console.error("Delete failed:", err);
      toast.error("Failed to delete");
    }
    setConfirmDelete(false);
    closeModal();
  };

  const closeModal = () => {
    setShowModal(false);
    setIsEdit(false);
    setSelectedEvent(null);
    setNewEvent(defaultEvent);
  };

  return (
    <div className="container">
      <ToastContainer autoClose={2000}/>
      <h2 className="text-center calendar-title">📅 My Calendar</h2>
      <Button className="mb-3 purple-button" onClick={() => setShowModal(true)}>
        ➕ Add Event
      </Button>

      <Calendar
        localizer={localizer}
        events={events}
        startAccessor="start"
        endAccessor="end"
        onSelectEvent={handleSelectEvent}
        style={{ height: 500 }}
      />

      {/* Event Form Modal */}
      <Modal show={showModal} onHide={closeModal} className="mt-5">
        <Modal.Header closeButton>
          <Modal.Title>{isEdit ? "Edit Event" : "Add Event"}</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <Form>
            <Form.Group className="mb-3">
              <Form.Label>Title</Form.Label>
              <Form.Control
                type="text"
                name="title"
                value={newEvent.title || ""}
                onChange={handleInputChange}
              />
            </Form.Group>
            <Form.Group className="mb-3">
              <Form.Label>Start</Form.Label>
              <Form.Control
                type="datetime-local"
                name="start"
                value={newEvent.start || ""}
                onChange={handleInputChange}
              />
            </Form.Group>
            <Form.Group className="mb-3">
              <Form.Label>End</Form.Label>
              <Form.Control
                type="datetime-local"
                name="end"
                value={newEvent.end || ""}
                onChange={handleInputChange}
              />
            </Form.Group>
            <Form.Group className="mb-3">
              <Form.Label>Description</Form.Label>
              <Form.Control
                as="textarea"
                name="description"
                value={newEvent.description || ""}
                onChange={handleInputChange}
              />
            </Form.Group>

            <Form.Check
            type="checkbox"
            name="notify"
            label="Add Notification"
            checked={newEvent.notify}
            onChange={(e) => setNewEvent({ ...newEvent, notify: e.target.checked })}
          />

            {newEvent.notify && (
              <Form.Group className="mb-3">
                <Form.Label>Reminder Time</Form.Label>
                <Form.Select
                  name="reminderTime"
                  value={newEvent.reminderTime}
                  onChange={handleInputChange}
                >
                  <option value={5}>5 minutes before</option>
                  <option value={10}>10 minutes before</option>
                  <option value={30}>30 minutes before</option>
                  <option value={60}>1 hour before</option>
                  <option value={1440}>1 day before</option>
                </Form.Select>
              </Form.Group>
            )}
          </Form>
        </Modal.Body>
        <Modal.Footer>
          {isEdit && (
            <Button variant="danger" onClick={confirmDeleteEvent}>
              🗑️ Delete
            </Button>
          )}
          <Button variant="secondary" onClick={closeModal}>
            Cancel
          </Button>
          <Button variant="primary" onClick={handleAddOrUpdateEvent}>
            {isEdit ? "Update" : "Save"}
          </Button>
        </Modal.Footer>
      </Modal>

      {/* Confirm Delete Modal */}
      <Modal show={confirmDelete} onHide={() => setConfirmDelete(false)} centered>
        <Modal.Header closeButton>
          <Modal.Title>Confirm Deletion</Modal.Title>
        </Modal.Header>
        <Modal.Body>Are you sure you want to delete this event?</Modal.Body>
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