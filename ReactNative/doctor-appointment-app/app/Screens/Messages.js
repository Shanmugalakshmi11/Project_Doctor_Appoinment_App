// Messages.js
import React, { useState, useEffect } from "react";
import axios from "axios";

const Messages = () => {
  const [messages, setMessages] = useState([]);

  useEffect(() => {
    // Fetch messages for a specific doctor (e.g., doctor with id 1)
    axios
      .get("http://localhost:3001/messages/1")
      .then((response) => {
        setMessages(response.data);
      })
      .catch((error) => {
        console.error("There was an error fetching the messages!", error);
      });
  }, []);

  return (
    <div>
      <h1>Messages</h1>
      <ul>
        {messages.map((message) => (
          <li key={message.id}>
            {message.patient}: {message.content}
          </li>
        ))}
      </ul>
    </div>
  );
};

export default Messages;
