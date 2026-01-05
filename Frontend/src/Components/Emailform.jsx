// src/components/SendEmailForm.jsx
import { useEffect, useState } from "react";
import { Button, Form, Container, Card } from "react-bootstrap";
import { toast, ToastContainer } from "react-toastify";
import axios from "axios";
import "../css/Details.css";

const EmailForm = ({ recipients = [] }) => {
  const [subject, setSubject] = useState("");
  const [body, setBody] = useState("");
  const [prompt, setPrompt] = useState("");
  const [userEmail, setUserEmail] = useState("");

  useEffect(() => {
    const fetchUserEmail = async () => {
      try {
        const token = localStorage.getItem("token");
        const response = await axios.get("http://localhost:8000/users/profile", {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        });
        setUserEmail(response.data.email || "");
      } catch (error) {
        toast.error("Failed to fetch user email");
      }
    };
    fetchUserEmail();
  }, []);

  const handleGenerateEmail = async () => {
    if (!prompt.trim()) {
      toast.error("Prompt cannot be empty!");
      return;
    }

    try {
      console.log("Generating email with prompt:", prompt);
      const token = localStorage.getItem('token');
      if (body === "") {
        setBody("Loading...");
      } else {
        setBody("");
      }
      const response = await axios.post(
        'http://localhost:8000/gemini/generate-email',
        { prompt },
        { headers: { Authorization: `Bearer ${token}` } }
      );
      setBody(response.data.content);
      toast.success('Email generated successfully!');
    } catch (error) {
      console.error("Gemini error:", error);
      toast.error('Failed to generate email');
    }
  };

  const handleSend = async () => {
    if (!recipients || recipients.length === 0) {
      toast.error("No recipients selected");
      return;
    }

    const payload = {
      to: recipients.length === 1 ? recipients[0] : recipients,
      subject,
      body,
    };

    try {
      await axios.post("http://localhost:8000/gemini/send-email", payload, {
        headers: {
          Authorization: `Bearer ${localStorage.getItem("token")}`,
        },
      });
      toast.success("Email sent successfully...");
    } catch (error) {
      console.error("Error sending email:", error);
      toast.error("Failed to send email");
    }
  };

  return (
    <Container className="p-4">
      <ToastContainer autoClose={2000} />
      <h3 className="board-title text-center mb-4"> 📧 Send Email </h3>
      <Card className="task-detail-card p-4" style={{ maxWidth: "600px" }}>
        <Form>
          <Form.Group className="mb-3">
            <Form.Label>From</Form.Label>
            <Form.Control type="email" value={userEmail} disabled />
          </Form.Group>

          <Form.Group className="mb-3">
            <Form.Label>To</Form.Label>
            <Form.Control type="text" value={recipients.join(', ')} disabled />
          </Form.Group>

          <Form.Group className="mb-3">
            <Form.Label>Subject</Form.Label>
            <Form.Control
              type="text"
              value={subject}
              onChange={(e) => setSubject(e.target.value)}
              placeholder="Enter subject"
              required
            />
          </Form.Group>

          <Form.Group className="mb-3">
            <Form.Label>Email Prompt (optional)</Form.Label>
            <Form.Control
              as="textarea"
              rows={2}
              value={prompt}
              onChange={(e) => setPrompt(e.target.value)}
              placeholder="Type prompt to auto-generate email"
            />
            <Button variant="secondary" className="mt-3 mx-auto d-block" onClick={handleGenerateEmail}>
              ⚙️ Generate Email
            </Button>
          </Form.Group>

          <Form.Group className="mb-3">
            <Form.Label>Email Body</Form.Label>
            <Form.Control
              as="textarea"
              rows={10}
              value={body}
              onChange={(e) => setBody(e.target.value)}
              placeholder="Write your email..."
              required
            />
          </Form.Group>

          <Button variant="primary" onClick={handleSend} className="mx-auto d-block">
            📤 Send Email
          </Button>
        </Form>
      </Card>
    </Container>
  );
};

export default EmailForm;