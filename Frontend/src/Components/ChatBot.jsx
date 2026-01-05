// src/components/ChatBot.jsx
import { useEffect, useRef, useState } from "react";
import axios from "axios";
import "../css/ChatBot.css";
import ReactMarkdown from "react-markdown";
import rehypeSanitize from "rehype-sanitize";
import SendIcon from '@mui/icons-material/Send';

const ChatBot = () => {
  const [input, setInput] = useState("");
  const [history, setHistory] = useState([]);
  const messagesEndRef = useRef(null);

  const fetchHistory = async () => {
    try {
      const token = localStorage.getItem("token");
      const res = await axios.get("http://localhost:8000/chat/history", {
        headers: { Authorization: `Bearer ${token}` },
      });
      setHistory(res.data);
    } catch (err) {
      console.error("Failed to fetch history:", err.message);
    }
  };

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  };

  useEffect(() => {
    fetchHistory();
  }, []);

  useEffect(() => {
    scrollToBottom();
  }, [history]);

  const handleSend = async () => {
    if (!input.trim()) return;

    const newMessage = {
      sender: "user",
      text: input,
      timestamp: new Date().toISOString(),
    };
    setHistory((prev) => [...prev, newMessage]);
    setInput("");

    try {
      const token = localStorage.getItem("token");
      const res = await axios.post(
        "http://localhost:8000/chat/chatbot",
        { message: input },
        { headers: { Authorization: `Bearer ${token}` } }
      );

      const botReply = {
        sender: "bot",
        text: res.data.reply,
        timestamp: new Date().toISOString(),
      };
      setHistory((prev) => [...prev, botReply]);
    } catch (err) {
      setHistory((prev) => [
        ...prev,
        {
          sender: "bot",
          text: "❌ Error getting response.",
          timestamp: new Date().toISOString(),
        },
      ]);
    }
  };

  return (
    <div className="chatbot-container">
      <div className="chat-header">🤖 Vellora Assistant</div>

      <div className="chat-history">
        {history.map((msg, idx) => (
          <div key={idx} className={`message ${msg.sender}`}>
            <div className="bubble">
              <ReactMarkdown rehypePlugins={[rehypeSanitize]}>
                {msg.text}
              </ReactMarkdown>
            </div>
            <div className="timestamp">
              {new Date(msg.timestamp).toLocaleTimeString([], {
                hour: "2-digit",
                minute: "2-digit",
              })}
            </div>
          </div>
        ))}
        <div ref={messagesEndRef} />
      </div>

      <div className="chat-input">
        <input
          type="text"
          placeholder="Ask me anything..."
          value={input}
          onChange={(e) => setInput(e.target.value)}
          onKeyDown={(e) => e.key === "Enter" && handleSend()}
        />
        <button onClick={handleSend}><SendIcon /></button>
      </div>
    </div>
  );
};

export default ChatBot;