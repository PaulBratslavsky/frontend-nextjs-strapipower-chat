import React, { useState, useEffect } from "react";
import MessageBox from "./MessageBox";
import { MessagesAPIService } from "../services/MessagesApi";
import {  useInterval } from "../utils/useInterval";

// 2
function PublicMessagesPage() {

    useInterval(() => {
        fetchMessages();
      }, 10000);
  // 3
  const [user, setUser] = useState("");
  const [message, setMessage] = useState("");
  const [messages, setMessages] = useState([]);

  // 4
  const fetchMessages = async () => {
    const messages = await MessagesAPIService.find();
    setMessages(messages);
  };

  // 5
  useEffect(() => {
    fetchMessages();
  }, []);

  // 6
  const handleSendMessage = async (e) => {
    e.preventDefault();

    if (!user) {
      alert("Please add your username");
      return;
    }

    if (!message) {
      alert("Please add a message");
      return;
    }

    await MessagesAPIService.create({
      data: {
        postedBy: user,
        content: message,
      },
    });

    await fetchMessages();
    setMessage("");
  };

  // 7
  const handleEditMessage = async ({ id, message }) => {
    if (!message) {
      alert("Please add a message");
      return;
    }

    await MessagesAPIService.update({
      id: id,
      data: {
        content: message,
      },
    });

    await fetchMessages();
  };

  // 8
  const handleDeleteMessage = async ({ id }) => {
    if (confirm("Are you sure you want to delete this message?")) {
      await MessagesAPIService.delete({ id });
      await fetchMessages();
    }
  };

  // 9
  return (
    <div>
      <div>
        <h1>Random Talk</h1>
        <p>Post your random thoughts that vanish</p>
      </div>

      <div>
        <form onSubmit={(e) => handleSendMessage(e)}>
          <input
            type="text"
            value={user}
            onChange={(e) => setUser(e.target.value)}
            required
          />
          <div className="d-flex align-items-center overflow-hidden">
            <input
              type="text"
              value={message}
              onChange={(e) => setMessage(e.target.value)}
              required
            />
            <button onClick={(e) => handleSendMessage(e)}>Send</button>
          </div>
        </form>
      </div>

      <div>
        {messages.map((message) => (
          <MessageBox
            key={message.attributes.uid}
            message={message}
            onEdit={handleEditMessage}
            onDelete={handleDeleteMessage}
          />
        ))}
      </div>
    </div>
  );
}

// 10
export default PublicMessagesPage;