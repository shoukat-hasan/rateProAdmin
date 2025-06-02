// src/pages/Support/Tickets.jsx
"use client";

import { useState } from "react";
import { MdCheck, MdClose, MdReply, MdAdd } from "react-icons/md";
import "./Tickets.css";

const SupportTickets = () => {
  const [tickets, setTickets] = useState([
    {
      id: 1,
      subject: "Survey not loading",
      status: "open",
      priority: "high",
      createdAt: "2023-06-01",
      messages: [
        {
          id: 1,
          sender: "Company User",
          message: "The survey page shows a 404 error",
          sentAt: "2023-06-01 10:30"
        },
        {
          id: 2,
          sender: "Support Team",
          message: "We are looking into this issue",
          sentAt: "2023-06-01 11:15"
        }
      ]
    }
  ]);

  const [selectedTicket, setSelectedTicket] = useState(null);
  const [reply, setReply] = useState("");

  const handleReply = () => {
    if (!reply.trim()) return;
    const updatedTickets = tickets.map((ticket) => {
      if (ticket.id === selectedTicket.id) {
        return {
          ...ticket,
          messages: [
            ...ticket.messages,
            {
              id: ticket.messages.length + 1,
              sender: "Support Team",
              message: reply,
              sentAt: new Date().toISOString().slice(0, 16).replace("T", " ")
            }
          ]
        };
      }
      return ticket;
    });
    setTickets(updatedTickets);
    setReply("");
  };

  return (
    <div className="ticket-page">
      <div className="ticket-list">
        <h2>Support Tickets</h2>
        {tickets.map((ticket) => (
          <div
            key={ticket.id}
            className={`ticket-item ${selectedTicket?.id === ticket.id ? "active" : ""}`}
            onClick={() => setSelectedTicket(ticket)}
          >
            <h4>{ticket.subject}</h4>
            <p>Status: {ticket.status}</p>
            <p>Priority: {ticket.priority}</p>
          </div>
        ))}
      </div>

      {selectedTicket && (
        <div className="ticket-detail">
          <h3>Conversation</h3>
          <div className="messages">
            {selectedTicket.messages.map((msg) => (
              <div
                key={msg.id}
                className={`message ${msg.sender === "Support Team" ? "support" : "user"}`}
              >
                <strong>{msg.sender}</strong>
                <p>{msg.message}</p>
                <small>{msg.sentAt}</small>
              </div>
            ))}
          </div>
          <div className="reply-box">
            <textarea
              placeholder="Type your reply..."
              value={reply}
              onChange={(e) => setReply(e.target.value)}
            ></textarea>
            <button onClick={handleReply}>
              <MdReply /> Reply
            </button>
          </div>
        </div>
      )}
    </div>
  );
};

export default SupportTickets;
